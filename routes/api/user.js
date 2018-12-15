// user route
const userCtrl = require('../../controllers/userCtrl')

module.exports = router => {
   // Route to add a user
  router.post('/user',userCtrl.addUser)
   // Route to get a user
  router.get('/user/:name',userCtrl.getUser)
  // Route to get all users
  router.get('/users',userCtrl.getAllUsers)
  // Route to delete a user
  router.get('/user/delete/:id',userCtrl.verifyIsAdmin,userCtrl.deleteUser)//only admins can delete users
  // Route to get a user's articles
  router.get('/user/articles/:name',userCtrl.getUserArticles)
}
