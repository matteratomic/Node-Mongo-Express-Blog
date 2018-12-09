const router = require('express').Router()
const userCtrl = require('../../controllers/userCtrl')

router.get('/', (req, res) => {
  res.render('index',{ page: 'home' })
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

router.get('/category', (req, res) => {
  res.render('category', { page: 'category' });
});

// blog pages
router.get('/single-standard', (req, res) => {
  res.render('single-standard', { page: 'blog' });
});

router.get('/single-video', (req, res) => {
  res.render('single-video', { page: 'blog' });
});

router.get('/single-audio', (req, res) => {
  res.render('single-audio', { page: 'blog' });
});

router.get('/single-gallery', (req, res) => {
  res.render('single-gallery', { page: 'blog' });
});

router.get('/single-standard', (req, res) => {
  res.render('single-standard', { page: 'blog' });
});
// end of blog pages


router.get('/about', (req, res) => {
  res.render('about', { page: 'about' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { page: 'contact' });
});


module.exports = router
