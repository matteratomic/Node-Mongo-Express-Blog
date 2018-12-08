const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String,required:true,unique:true},
  password:{type:String,required:true},
  isAdmin:{type:Boolean,default:false},
  userImage: { type: String,default:''},
  email: { 
    type: String,
    required:true,
    validate(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  articles: [
    { type: mongoose.Schema.ObjectId,
      ref: 'Article'}
  ]
})


userSchema.methods.makeAdmin = function() {
  this.isAdmin = true
  return this.save()
}

userSchema.methods.addArticle = function(articleID){
  this.articles.push(articleID)
  return this.save()
}

userSchema.methods.removeArticle = function(articleID){
  let articles = this.articles.filter(article => article._id != articleID)
  this.articles = articles
  return this.save()
}

module.exports = mongoose.model('User', userSchema)
