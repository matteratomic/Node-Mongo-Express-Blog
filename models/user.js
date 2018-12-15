const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String,required:true,unique:true},
  profilePic:{
    type:String,
    default:"https://cdn.shopify.com/s/files/1/0080/8372/products/tattly_rainbow_jessi_arrington_00_1024x1024@2x.png?v=1531923002"
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
