const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: { type: String,required:true},
  description: { type: String,required:true},
  featuredImage: { type: String,default:''},
  text: { type: String,default:''},
  publishedDate:{
    type:Date,
    default:new Date().toDateString()
  },
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  comments: [{
    title: String,
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  category:[{type:String,enum:['Lifestyle','Health','News','Other']}]
})

articleSchema.methods.addComment = function (comment) {
  this.comments.push(comment)
  return this.save()
}

articleSchema.methods.addAuthor = function (authorID) {
  this.author = authorID
  return this.save()
}

articleSchema.methods.getAuthorID = function () {
  return this.author
}

module.exports = mongoose.model('Article', articleSchema)
