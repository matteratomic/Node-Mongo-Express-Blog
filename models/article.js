const mongoose = require('mongoose')
const moment = require('moment')

const articleSchema = new mongoose.Schema({
  title: { type: String,required:true},
  description: { type: String,required:true},
  featuredImage: { 
    type: String,
    default:'http://cdn.onlinewebfonts.com/svg/img_148071.png',
    required:function(){
      return this.type === 'standard-post'
    }
  },
  featuredVideo:{
    type:String,default:'http://cdn.onlinewebfonts.com/svg/img_148071.png',
    required:function(){
      return this.type === 'video-post'
    }},
  featuredGalleryImages:{
    type:Array,
    default:'http://cdn.onlinewebfonts.com/svg/img_148071.png',
    required:function(){
      return this.type === 'gallery-post'
    }
  },
  text: { type: String,default:''},
  type:{
    type:String,
    enum:['video-post','standard-post','gallery-post'],
    default:'standard-post'
  },
  publishedDate:{
    type:Date,
    default:moment().format('MMMM DD YYYY')
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
  category:[{type:String,enum:['Lifestyle','Health','News','Other'],default:'Other'}]
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
