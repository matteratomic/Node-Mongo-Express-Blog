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
		User.find({},{password:-1})
		.populate('articles')
		.exec((err,users)=>{
			if (err) throw err
			if(req.query.json){
				res.status(200).json(users)
			}
			next()
		})
	},
	getUser:(req,res,next) => {
		User.findOne({name:req.params.name},{password:-1})
		.populate('articles')
		.exec((err,user)=>{
			if(err) throw err
			if(req.query.json){
				res.status(200).json({user})
			}
			next()
		})
	},
	authenticateUser:(req,res,next) => {
		console.log(JSON.stringify(req.body))
		let loginSuccessMsg = 'You are now logged in'
		let loginErrorMsg ='The username or password provided is incorrect'
		let serverErrorMsg = 'Internal server error'
		User.findOne({name:req.body.name},(err,user) => {
			if(err) res.status(500).send(serverErrorMsg)
			if(user){
				bcrypt.compare(req.body.password,user.password,(err,result) => {
					if(err){
						res.status(500).send(serverErrorMsg)
					}
					if(result){
						req.flash('login-message',loginSuccessMsg)
						req.session.user = {
							name:user.name,
							email:user.email,
							_id:user._id,
							isAdmin:user.isAdmin,
							profilePic:user.profilePic
						}
						next()
					}else{
						res.status(200).json({error:loginErrorMsg})
					}
				  })
			}else{
				res.status(200).json({error:loginErrorMsg})
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
				res.status(200).json({message:'User account has been deleted'})
			})
		})
	},
	getUserArticles:(req,res,next) => {
		let query =  req.session.user ? req.session.user.name : req.params.name
		User.find({name:query},{articles:1})
		.populate('articles')
		.exec((err,articles) => {
			if(err) throw err
			if(req.query.json){
				res.status(200).json({articles})
			}
			res.locals.posts = articles
			next()
		})
	},
	deleteArticles:(req,res,next) => {
		User.find({articles:req.params.id},(err,user)=>{
			if(err) throw err
			user.removeArticle(req.params.id)
				.then(()=>{
					res.status(200).send('Article has been deleted')
				}).catch((err)=>{
					res.status(500).send('Internal server error')
				})
		})
	},
	verifyIsAdmin:(req,res,next)=>{
		if(!!req.session.user){
			if(req.session.user.isAdmin){
				next()
			}else{
				res.setHeader('Content-Type','text/html')
				res.send(`
				<html>
					<body>
						<h1>403:Forbidden</h1>
						<p>You do not have the permissions required</p>
					</body>
				<html>`)
			}
		}else{
			res.setHeader('Content-Type','text/html')
			res.send(`
			<html>
				<body>
					<h1>403:Forbidden</h1>
					<p>You do not have the permissions required</p>
				</body>
			<html>`)
		}
	}
}