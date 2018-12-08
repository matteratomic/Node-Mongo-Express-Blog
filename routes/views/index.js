const router = require('express').Router()
const userCtrl = require('../../controllers/userCtrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/login',userCtrl.authenticateUser,(req,res) => {
    res.send('Logged in')
})

router.get('/logout',(req,res) => {
  if(req.session.user){
    req.session.destroy((err)=>{
      if(err) res.status(500).send('Internal server error')
      console.log('user logged out')
      res.redirect('/')
    })
  }else{
    //Only logged in users can hit this endpoint
    res.send('You are not logged in')
  }
  
})

module.exports = router
