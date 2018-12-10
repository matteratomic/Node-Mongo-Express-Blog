const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String,required:true,unique:true},
  profilePic:{
    type:String,
    default:"data:image/png;base64,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"
  },
  password:{type:String,required:true},
  isAdmin:{type:Boolean,default:false},
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

userSchema.methods.changeProfilePic = function(newProfilePic){
  this.profilePic = newProfilePic
  return this.save()
}

userSchema.methods.changePassword = function(newPassword){
  this.password = newPassword
  return this.save()
}

userSchema.methods.changeEmail = function(newEmail){
  this.email = newEmail
  return this.save()
}

module.exports = mongoose.model('User', userSchema)
