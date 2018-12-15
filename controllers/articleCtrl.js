//  Article controller -> All actions for the article model
const fs = require('fs')
const path = require('path')
const Article = require('../models/article')
const User = require('../models/user')
const cloudinary = require('cloudinary')
const formidable = require('formidable')

const parseRequestBody = (req,cb)=>{
    console.log('Reaches server')
    let body = {files:{}}
    let form = new formidable.IncomingForm()
   
    form.on('field',(field,value)=>{
        body[field] = value
    })

    form.on('file',(field,file)=>{
         body.files[field] = file
    })
    form.parse(req)

    form.on('end',() => {
        req.body = body
        cb(body)
    })
}

const uploadToCloudinary = (req,cb)=>{
    let body = {}
    let form = new formidable.IncomingForm()
    form.on('field',(field,value)=>{
        body[field] = value
    })
    form.on('file',(field,file)=>{
        if(field === 'featuredImage'){
            cloudinary.v2.uploader.upload(path.resolve(__dirname,file.path),(err,result)=>{
                // Remove image from tmp
                body['featuredImage'] = result.secure_url
                fs.unlink(file.path,(err) => {
                    if(body.type === 'standard-post'){
                        console.log(`calling cb with image url: ${body.featuredImage}`)
                        cb(body)
                    }
                  
                })
            })
        }
    })
    form.parse(req)
}

// const uploadToCloudinary1 = (req,res,next)=>{
//     cloudinary.v2.uploader.upload(path.resolve(__dirname,req.body.files.featuredImage.path),(err,result)=>{
//          req.body.featuredImage = result.secure_url
//          next()
//     })
// }

const saveArticle = (res,obj) => {
    new Article(obj).save((err, article) => {
        if (err) {
            res.json({ error: err })
        }
        article.addAuthor(obj.authorID).then(() => {
            User.findById({_id:obj.authorID},(err,author) => {
                if(err) throw err
                if(author){
                    author.addArticle(article._id).then(() =>{
                        res.status(200).json({message:'The post was successfully added'})
                    }).catch((err)=>{
                        throw err
                    })
                }
            })
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }) 
}

module.exports = {
    getAllArticles: (req, res, next) => {
        Article.find({})
        .populate('author')
        .exec((err, articles) => {
            if (err) {
                throw new Error(err)
            }
            !articles && res.json({message:'No articles found'})
            if(req.query.json){
                res.json({results:articles.reverse()})
            }
            res.locals.results = articles
            next()

        })
    },
    getPaginatedArticles: (req, res, next) => {
        let query = req.query.s ? {title:{$regex:req.query.s,$options:'i'}} : {}
        Article.find(query)
        .populate('author')
        .populate('comments.author')
        .skip(((req.query.page || 1)-1)*10)
        .limit(10)
        .exec((err, articles) => {
            if (err) {
                throw new Error(err)
            }
            !articles && console.log('No articles')
            if(req.query.json){
                res.json({articles})
            }
            Article.find(query).count().exec((err,totalPosts)=>{
                res.locals.posts = articles
                res.locals.totalPosts = totalPosts
                next()
            })            
        })
    },
    getArticle:(req,res,next)=>{
        if(req.query.id){
            Article.findById({_id:req.query.id})
            .populate('author')
            .exec((err, article) => {
                if (err) {
                    throw new Error(err)
                }
                !article && console.log('No articles')
                if(req.query.json){
                    res.json(article)
                }
                res.locals.post = article
                next()
            })
        }else{
            next()
        }
       
    },
    searchForArticles:(req,res,next)=>{
        if(req.query.q){
            Article.find({title:{$regex:req.query.q,$options:'i'}})
            .exec((err,articles)=>{
                if (err) {
                    throw new Error(err)
                }
                res.locals.results = articles
                next()

            })
        }else{
            res.redirect('/api/articles?json=true')
        }
    },
    addArticle: (req, res, next) => {
        console.log('endpoint hit')
        uploadToCloudinary(req,(body) => {
        saveArticle(res,body)
        })
    },
    updateArticle:(req,res,next)=>{
        parseRequestBody(req,(body)=>{
            console.log(body.postId)
            Article.findById({_id:body.postId})
            .exec((err,article)=>{
                if(article){
                    let fieldsToUpdate = {}
                    for(field in body){
                        
                        if(!!body[field] && typeof body[field] != 'null'){
                            console.log('These are the fields to update',field,body[field])
                            fieldsToUpdate[field] = body[field]
                        }}

                        if(fieldsToUpdate.files.featuredImage){
                            cloudinary.v2.uploader.upload(path.resolve(__dirname,fieldsToUpdate.files.featuredImage.path),(err,result)=>{
                                // Remove image from tmp
                                fieldsToUpdate['featuredImage'] = result.secure_url
                                fs.unlink(fieldsToUpdate.files.featuredImage.path,(err) => {
                                    Article.updateOne({_id:body.postId},{$set:{...fieldsToUpdate}})//CALLBACK HELL!!!
                                        .exec((err)=>{
                                         if(err){res.status(500).json({message:'Internal server error'})}// NEXT TIME USE ASYNC/AWAIT
                                        res.json({message:'The post was successfully updated'})//CRAPPPY CODE ...IN A HURRY : (
                        })
                                })
                            }) 
                        }else{
                            Article.updateOne({_id:body.postId},{$set:{...fieldsToUpdate,featuredImage:fieldsToUpdate.prevImage}})
                        .exec((err)=>{
                            if(err) {res.status(500).json({message:'Internal server error'})}
                            console.log('HERE IS THE EEROR')
                            res.json({message:'The post was successfully updated'})
                        })
                        }
                }else{
                res.json({message:"Article does not exist"})
                }
            })
        }) 
    },
    deleteAllArticles:(req,res)=>{
        Article.deleteMany({},(err)=>{
            if(err) throw err
            res.send('All articles removed')
        })
    },
    deleteArticle:(req,res,next)=>{
        if(req.params.id){
            //Better to use a mongoose static
            Article.findById({_id:req.params.id}).exec((err,article)=>{
                let fileName = path.basename(article.featuredImage)
                let match = fileName.match(/(.+)(\..+$)/)
                cloudinary.uploader.destroy(match[1],(err)=>{
                    if(err) console.log(err)
                    Article.findByIdAndDelete({_id:req.params.id},(err)=>{
                        if(err) throw err
                        //Use connect flash for this
                        User.findOne({articles:req.params.id},(err,user) => {
                            if(err) throw err
                            if(!user) {
                                res.status(200).json({message:'Article does not have an author'})
                            }
                            user.removeArticle(req.params.id).then(()=>{
                                res.status(200).json({message:'The post was successfully deleted'})
                            })
                            .catch((err)=>{
                                res.status(500).send('Internal server error')
                            })
                        })
                    })
                })
            })
        }
    }
}

