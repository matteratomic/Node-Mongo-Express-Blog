const router = require('express').Router()
const userCtrl = require('../../controllers/userCtrl')
const articleCtrl = require('../../controllers/articleCtrl')
const cloudinary = require('cloudinary')


router.get('/',articleCtrl.getPaginatedArticles,(req, res) => {
  res.render('index',{
     page: 'home',
     currentPage:req.query.page || 1,
     posts:res.locals.posts,
     loginMessage:req.flash('login-message') || null,
     logoutMessage:req.flash('logout-message') || null,
     isLoggedIn:typeof req.session.user !== 'undefined',
     user:req.session.user || null,})
})

router.post('/login',userCtrl.authenticateUser,(req,res) => {
    res.status(302).json({message:'Login successful'})
})

router.get('/logout',(req,res) => {
  if(req.session.user){
    req.session.destroy((err)=>{
      if(err) res.status(500).send('Internal server error')
      res.redirect('/')
    })
  }else{
    //Only logged in users can hit this endpoint
    res.send('You are not logged in')
  }
  
})

router.get('/dashboard',userCtrl.verifyIsAdmin,userCtrl.getUserArticles,(req,res) => {
  res.render('dashboard-articles',{
    layout:'dashboard.html',
    posts:res.locals.posts[0].articles,
    user:req.session.user || null,
  })
})

router.get('/dashboard/editor',userCtrl.verifyIsAdmin,(req,res) => {
  res.render('editor',{
    layout:'dashboard.html',
    user:req.session.user || null,
  })
})

router.get('/search',articleCtrl.searchForArticles,(req,res) => {
  res.status(200).json({results:res.locals.results})
})


router.get('/category', (req, res) => {
  res.render('category', { 
    page: 'category',
    isLoggedIn:typeof req.session.user !== 'undefined',
    user:req.session.user || null,
   });
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
  res.render('single-audio', { 
    page: 'blog',
    isLoggedIn:typeof req.session.user !== 'undefined',
    user:req.session.user || null,});
});

router.get('/single-gallery', (req, res) => {
  res.render('single-gallery', {
    isLoggedIn:typeof req.session.user !== 'undefined',
    user:req.session.user || null,});
});

// end of blog pages


router.get('/about', (req, res) => {
  res.render('about', { 
    page: 'about',
    isLoggedIn:typeof req.session.user !== 'undefined',
    user:req.session.user || null});
});

router.get('/contact', (req, res) => {
  res.render('contact', { 
    page: 'contact',
    isLoggedIn:typeof req.session.user !== 'undefined',
    user:req.session.user || null,
  });
});


module.exports = router
