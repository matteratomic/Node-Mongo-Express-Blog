//  Article controller -> All actions for the article model
const fs = require('fs')
const path = require('path')
const Article = require('../models/article')
const User = require('../models/user')
const cloudinary = require('cloudinary')
const formidable = require('formidable')


module.exports = {
    getAllArticles: (req, res, next) => {
        Article.find({})
        .populate('author')
        .populate('comments.author')
        .exec((err, articles) => {
            if (err) {
                throw new Error(err)
            }
            !articles && console.log('No articles')
            res.json({articles})
        })
    },
    getPaginatedArticles: (req, res, next) => {
        Article.find({})
        .populate('author')
        .populate('comments.author')
        .skip(((req.query.page || 1)-1)*4)
        .limit(4)
        .exec((err, articles) => {
            if (err) {
                throw new Error(err)
            }
            !articles && console.log('No articles')
            if(req.query.json){
                res.json({articles})
            }
            res.locals.posts = articles
            next()
            
        })
    },
    getArticle:(req,res,next)=>{
        Article.findOne({title:req.query.title})
        .populate('author')
        .populate('comments.author')
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
    },
    addArticle: (req, res, next) => {
        console.log('endpoint hit')
        uploadToCloudinary(req,(body) => {
            console.log('cloudinary result returned')
            console.log('cloudinary result returned value is',body.featuredImage)
          
                saveArticle(body)
            
            
        })
        
        function saveArticle(obj) {
            console.log(`object received in saveArticle: ${obj}`)
            new Article(obj).save((err, article) => {
                if (err) {
                    res.json({ error: err })
                }
                article.addAuthor(obj.authorID).then(() => {
                    User.findById({_id:obj.authorID},(err,author) => {
                        if(err) throw err
                        if(author){
                            author.addArticle(article._id).then(() =>{
                                res.redirect(`/post?title=${article.title}`)
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
        function uploadToCloudinary (req,cb){
            console.log('Begin cloudinary upload')
            let galleryImageUrls = []
            let body = {}

            let form = new formidable.IncomingForm()

            form.on('field',(field,value)=>{
                //console.log('form fields',field,value)
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
                }else if(field === 'featuredGalleryImages'){
                    cloudinary.uploader.upload(file.path,(err,result)=>{
                        // Remove image from tmp
                        fs.unlink(file.path,(err) => {
                            galleryImageUrls.push(result.secure_url)
                        })
                    })
                }
            })

            // form.on('end',()=>{
            //     console.log('File upload complete..fields of body are',body)
            //     if(body.type === 'standard-post'){
            //         console.log(`calling cb with image url: ${body.featuredImage}`)
            //         cb(body)
            //     }else if(body === 'gallery-post'){
            //         //don't know whether this happens after all files are uploaded or just after one
            //         //so to be sure....
            //         if(galleryImageUrls.length >= 3){
            //             cb(galleryImageUrls,body)
            //         }
            //     }
            // })

            form.parse(req)
        }
    },
    addComment: (req, res, next) => {
        Article.findById({authorID:req.body.authorID},(err,article) => {
            let {title,text,authorID} = req.body
            return article.addComment({
                title,
                text,
                authorID
            }).then(()=>{ 
                res.send("Comment added")
            }).catch(next)
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
            Article.findByIdAndDelete({_id:req.params.id},(err)=>{
                if(err) throw err
                //Use connect flash for this
                User.findOne({articles:req.params.id},(err,user) => {
                    if(err) throw err
                    if(!user) {
                        res.send('Article does not have an author')
                    }
                    user.removeArticle(req.params.id).then(()=>{
                        res.send('Successfully removed the article')
                    })
                    .catch((err)=>{
                        res.status(500).send('Successfully removed the article')
                    })
                })
            })
        }
    }
}

