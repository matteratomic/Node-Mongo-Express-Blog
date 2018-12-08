//  Article controller -> All actions for the article model
const Article = require('../models/article')
const User = require('../models/user')
module.exports = {
    deleteAllArticles:(req,res)=>{
        Article.deleteMany({},(err)=>{
            if(err) throw err
            res.send('All articles removed')
        })
    },
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
    addArticle: (req, res, next) => {
        let {featuredImage} = req.body
        if(!!featuredImage){
            res.send('TODO: Setup cloudinary account')
        }else{
            saveArticle({...req.body,featuredImage:""},res)
        }
            
        function saveArticle(obj,res) {
            new Article(obj).save((err, article) => {
                if (err) {
                    res.json({ error: err })
                }
                article.addAuthor(req.body.authorID).then(() => {
                    User.findById({_id:req.body.authorID},(err,author) => {
                        if(err) throw err
                        if(author){
                            author.addArticle(article._id).then(() =>{
                                res.send('Successfully added an article')
                            }).catch((err)=>{
                                throw err})
                        }
                    })
                }).catch((err)=>{
                    res.status(500).json({error:err})
                })
            }) 
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
    deleteArticle:(req,res,next)=>{
        if(req.params.id){
            Article.findByIdAndDelete({_id:req.params.id},(err)=>{
                if(err) throw err
                //Use connect flash for this
                User.find({articles:req.params.id},(err,user) => {
                    if(err) throw err
                    if(!user.length) {
                        console.log(user)
                        res.send('Successfully removed the article')
                    }
                    user.removeArticle(req.params.id).then(()=>{
                        res.send('Successfully removed the article')
                    })
                    .catch((err)=>{
                        next(err)
                    })
                })
            })
        }
    }
}

