// article route
const articleCtrl = require('../../controllers/articleCtrl')
const userCtrl = require('../../controllers/userCtrl')

module.exports = router => {
  //Route to get all articles
  router.get('/articles',articleCtrl.getAllArticles)
  //Route to add an article
  router.post('/article',userCtrl.verifyIsAdmin,articleCtrl.addArticle)
  //Route to get an article
  router.get('/article/:title', articleCtrl.getArticle)
  //Route to delete an article
  router.get('/article/delete/:id',userCtrl.verifyIsAdmin,articleCtrl.deleteArticle)
  //Route to delete all articles
  router.get('/article/delete',userCtrl.verifyIsAdmin,articleCtrl.deleteAllArticles)
  //Route to comment on an article
  router.post('/article/comment', articleCtrl.addComment)
}
