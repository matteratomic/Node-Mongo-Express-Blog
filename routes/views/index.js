const router = require('express').Router()
const userCtrl = require('../../controllers/userCtrl')
const articleCtrl = require('../../controllers/articleCtrl')
const cloudinary = require('cloudinary')


router.get('/',articleCtrl.getPaginatedArticles,(req, res) => {
  res.render('index',{
     page: 'home',
     currentPage:req.query.page || 1,
     posts:res.locals.posts,
     tags:['Lifestyle','Health']})
})

router.post('/login',userCtrl.authenticateUser,(req,res) => {
    res.send('Logged in')
})

router.get('/logout',(req,res) => {
  if(req.session.user){
    req.session.destroy((err)=>{
      if(err) res.status(500).send('Internal server error')
      // use connect-flash
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
router.get('/post',articleCtrl.getArticle,(req, res) => {
  if(res.locals && res.locals.post && res.locals.post.type){
    if(res.locals.post.type === 'video-post'){
      res.render('single-video', { 
        page: 'blog',
        post:res.locals.post
        });
    }else if(res.locals.post.type === 'standard-post'){
         res.render('single-standard', { 
        page: 'blog',
        post:res.locals.post
        });
    }
  }else{
    res.redirect('/')
  }
  
});


router.get('/single-audio', (req, res) => {
  res.render('single-audio', { page: 'blog' });
});

router.get('/single-gallery', (req, res) => {
  res.render('single-gallery', { page: 'blog' });
});

// end of blog pages


router.get('/about', (req, res) => {
  res.render('about', { page: 'about' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { page: 'contact' });
});


module.exports = router
