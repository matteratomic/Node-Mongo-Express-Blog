const router = require('express').Router()
const userCtrl = require('../../controllers/userCtrl')
const articleCtrl = require('../../controllers/articleCtrl')


router.get('/',articleCtrl.getPaginatedArticles,(req, res) => {
  res.render('index',{
     page: 'home',
     hideHero:res.locals.hideHero,
     currentPage:parseInt(req.query.page,10) || 1,
     posts:res.locals.posts,
     totalPosts:res.locals.totalPosts,
     loginMessage:req.flash('login-message') || null,
     isLoggedIn:typeof req.session.user !== 'undefined',
     user:req.session.user || null,})
})

router.get('/home/search',articleCtrl.searchForArticles,(req,res)=>{
  res.render('search',{
    results:res.locals.results
  })
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

router.get('/dashboard/editor',userCtrl.verifyIsAdmin,articleCtrl.getArticle,(req,res) => {
  res.render('editor',{
    layout:'dashboard.html',
    user:req.session.user || null,
    post:res.locals.post || null,
    editMode: res.locals.post ? true : false
  })
})

router.get('/search',articleCtrl.searchForArticles,(req,res) => {
  res.status(200).json(
    {
    results:res.locals.results,
    hideHero:true
  })
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
