// article route
const articleCtrl = require('../../controllers/articleCtrl')

module.exports = router => {
  //Route to get all articles
  router.get('/articles', articleCtrl.getAllArticles)
  //Route to add an article
  router.post('/article', articleCtrl.addArticle)
  //Route to add an article
  router.get('/article/:title', articleCtrl.getArticle)
  //Route to comment delete an article
  router.get('/article/delete/:id', articleCtrl.deleteArticle)
  //Route to comment delete all articles
  router.get('/article/delete', articleCtrl.deleteAllArticles)
  //Route to comment on an article
  router.post('/article/comment', articleCtrl.addComment)
}
