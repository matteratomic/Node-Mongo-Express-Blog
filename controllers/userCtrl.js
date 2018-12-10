//  Article controller -> All actions for the article model
const User = require('../models/user')
const Article = require('../models/user')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')


module.exports = {
	addUser: (req,res,next) => {
		User.findOne({name:req.body.name},(err,user)=>{
			if(err) throw err
				if(user){
					res.send('That username has already been taken')
				}else{
					
					saveUser({...req.body},res)
				}
		})	
		function saveUser(obj,res){
			bcrypt.hash(obj.password,12,(err,hash)=>{
				if(err) throw err
				new User({...obj,password:hash}).save((err,user)=>{
					if(err) throw err
						res.send(`${user.name} has been saved`)
				})
			  })
		}},
	getAllUsers: (req,res,next) => {
		User.find({})
		.populate('articles')
		.exec((err,users)=>{
			if (err) throw err
				res.status(200).json(users)
		})
	},
	getUser:(req,res,next) => {
		User.find({name:req.params.name})
		.populate('articles')
		.exec((err,user)=>{
			if(err) throw err
				res.status(400).json({user})
		})
	},
	authenticateUser:(req,res,next) => {
		User.findOne({name:req.body.name},(err,user) => {
			if(err) res.status(500).send('Internal server error')
			if(user){
				bcrypt.compare(req.body.password,user.password,(err,result) => {
					if(err){
						res.status(500).send('Internal server error')
					}
					if(result){
						req.session.user = user
						next()
					}else{
						res.send('The username or password provided is incorrect')
					}
				  })
			}else{
				res.send('The username or password provided is incorrect')
			}
		})
	},
	deleteUser:(req,res,next) => {
		Article.deleteMany({author:req.params.id},(err) => {
			if(err) res.status(500).json({error:err})
			User.findByIdAndDelete({_id:req.params.id},(err)=>{
				if(err){
					res.status(404).json({error:err})
				}
				res.status(400).json({message:'User account has been deleted'})
			})
		})
	},
	getUserArticles:(req,res,next) => {
		User.find({name:req.params.name})
		.populate('articles')
		.exec((err,articles) => {
			if(err) throw err
				res.status(400).json({articles})
		})
	},
	deleteArticles:(req,res,next) => {
		User.find({articles:req.params.id},(err,user)=>{
			if(err) throw err
			user.removeArticle(req.params.id)
				.then(()=>{

				}).catch((err)=>{

				})
		})
	}
}