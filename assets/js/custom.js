
(function headerScript() {
    window.addEventListener('DOMContentLoaded', function () {
        if(document.querySelector('header')){
            let header = document.querySelector('header')

            if (!!window.location.search) {
                header.setAttribute('style', 'background:black;box-shadow:0 0 10px black')
            }
    
            function scrollHandler() {
                if (window.scrollY > 300 && window.location.pathname === '/' && !window.location.search) {
                    header.setAttribute('style', 'background:black;box-shadow:0 0 10px black')
                } else {
                    if (!!window.location.search) {
                        header.setAttribute('style', 'background:black;box-shadow:0 0 10px black')
                    } else {
                        header.setAttribute('style', 'background:transparent;box-shadow:0 0 10px transparent')
                    }
                }
            }
    
            if (window.location.pathname != '/') {
                window.removeEventListener('scroll', scrollHandler)
                header.setAttribute('style', 'background:black;box-shadow:0 0 10px black')
            } else {
                let scrollListener = window.addEventListener('scroll', scrollHandler, false)
            }
        }
    })
})();


(function heroScript() {
    if(!!document.querySelector('.hero-scroll-down')){
        let scrollDown = document.querySelector('.hero-scroll-down')
        scrollDown.addEventListener('click', function () {
        window.scrollBy({ top: window.innerHeight - 70, left: 0, behavior: 'smooth' })
    })
    }
})();

(function loginModalScript() {
    window.addEventListener('DOMContentLoaded',function(){
     if(document.querySelector('#login-modal-trigger')){
            let loginModal = document.querySelector('#login-modal')
            let modalWrapper = document.querySelector('#login-modal-wrapper.--wrapper')
            let usernameInput = document.querySelector('#login-modal--username')
            let usernameError = document.querySelector('#login-modal--username-error')
            let passwordInput = document.querySelector('#login-modal--password')
            let passwordError = document.querySelector('#login-modal--password-error')
            let loginError = document.querySelector('#login-modal--login-error')
            let modalLoginButton = document.querySelector('#login-modal--button')
            let loginModalTrigger = document.querySelector('#login-modal-trigger')
            let modalCloseBtn = document.querySelector('.modal--close-btn')
            var loader = document.querySelector('#loader-wrapper')
        
            loginModal.addEventListener('click', e => e.stopPropagation())
            loginModalTrigger.addEventListener('click', toggleModalState)
            modalCloseBtn.addEventListener('click', toggleModalState)
            modalWrapper.addEventListener('click', toggleModalState)
            modalLoginButton.addEventListener('click', submitCredentials)

            if(modalWrapper.classList.contains('wrapper-active')){
                window.addEventListener('keydown',function(e){
                    e.stopPropagation()
                    if(e.keyCode === 13){
                        modalLoginButton.addEventListener('click', submitCredentials)
                    }
                })
            }else{
                window.removeListener('keydown',function(e){
                    e.stopPropagation()
                    if(e.keyCode === 13){
                        modalLoginButton.addEventListener('click', submitCredentials)
                    }
                })
            }
        
            function submitCredentials() {
                let name = usernameInput.value
                let password = passwordInput.value
                modalLoginButton.setAttribute('disabled',true);
                loginError.textContent = '';
                if(usernameInput.value.trim() && passwordInput.value.trim()){
                let body = JSON.stringify(({name,password}))
                loader.classList.add('wrapper-active')
                fetch('/login',{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:body,
                }).then((res)=>res.json())
                .then((json)=>{
                    loader.classList.remove('wrapper-active')
                    modalLoginButton.setAttribute('disabled',false)
                    usernameInput.value = ''
                    passwordInput.value = ''
                    if(!!json.error){
                        loginError.textContent = 'The username or password provided is incorrect'
                    }else{
                        window.location.href = '/'
                    }
                })
                .catch(err => {console.log(err)})
                }else{
                    loader.classList.remove('wrapper-active')
                    if(!name.trim()){
                        usernameError.textContent = '*Username field is empty!'
                    }else if(!password.trim()){
                        passwordError.textContent = '*Password field is empty!'
                    }
                }
            }
        
            function toggleModalState() {
                loginModal.classList.toggle('modal-active')
                modalWrapper.classList.toggle('wrapper-active')
            }   
     }
    })
})();

(function searchScript(){
    var firstLoad = true
    window.addEventListener('DOMContentLoaded',function(){
       if(document.querySelector('#articles')){
        var searchBar = document.querySelector('input#dashboard-search')
        var container = document.querySelector('#articles')
        var loader = document.querySelector('#loader-wrapper')
        var postCount = document.querySelector('#article-count')
        searchForArticle('',populateArticleContainer)

        searchBar.onkeyup = function(e){
            loader.classList.add('wrapper-active')
            container.innerHTML = ''
            var searchTerm = e.target.value
                searchForArticle(searchTerm,populateArticleContainer)
        }

        function populateArticleContainer(results){
            if(firstLoad){
                postCount.textContent = results.length
                firstLoad = false
            }
            container.innerHTML = ''
            if(results.length){
                results.forEach((post)=>{
                    container.innerHTML += `
                    <div class="article-item">
                            <p id="article-title">${post.title}</p>
                            <p id="article-description">${post.description}</p>
                            <p id="article-published-date">${post.publishedDate}</p>
                            <p id="article-author">You</p>
                            <div class="stylish-row-group">
                                <a href="/dashboard/editor?id=${post._id}"><div class="stylish-tag">EDIT</div></a>
                                <div id="delete-article" data-article-id=${post._id} class="stylish-tag" style="background-color: #E91E63!important;">DELETE</div>
                            </div>
                </div>
                    `
                })
                addListeners()
            }else{
                container.innerHTML += `
                    <div class="article-item">
                            <p id="article-title">No post found</p>
                </div>`
                loader.classList.remove('wrapper-active')
            }
        }
        
        function addListeners(){

            loader.classList.remove('wrapper-active')

            function toggleAlertModalState (articleId = null){ 
                if(articleId && typeof articleId === "string"){
                    console.log('Deleting',articleToDeleteId)
                    loader.classList.add('wrapper-active')
                    deleteArticle(articleId,(message)=>{
                        articleToDeleteId = ''
                        loader.classList.remove('wrapper-active')
                        alert(message)
                        window.location.reload()
                    })
                }else{
                    alertModal.classList.toggle('modal-active')
                    alertModalWrapper.classList.toggle('wrapper-active')
                }
            }

            var alertModal = document.querySelector('#alert-modal')
            var alertModalWrapper = document.querySelector('#alert-modal-wrapper.--wrapper')
            var alertModalCloseBtn = document.querySelector('#alert-modal--closeBtn')

            var alertModalYes = document.querySelector('#alert-modal-yes')
            var alertModalNo = document.querySelector('#alert-modal-no')
            
            var alertModalCloseBtn = document.querySelector('#alert-modal--closeBtn')

            var articleToDeleteId = ''

            alertModal.addEventListener('click', e => e.stopPropagation())
            
            alertModalCloseBtn.addEventListener('click', toggleAlertModalState)
            alertModalWrapper.addEventListener('click', toggleAlertModalState)
            alertModalNo.addEventListener('click', toggleAlertModalState)
            
            alertModalYes.addEventListener('click', ()=>{toggleAlertModalState(articleToDeleteId)})
          
            setTimeout(()=>{
                Array.from(document.querySelectorAll('#delete-article')).forEach( t => t.onclick = (e)=> {
                    articleToDeleteId = e.target.dataset.articleId
                    console.log('Triggering modal',articleToDeleteId)
                    toggleAlertModalState()
                })           
            },0)

        }
        function searchForArticle(searchTerm,cb){
            loader.classList.add('wrapper-active')
            fetch(`/search?q=${searchTerm}`)
                .then(res => res.json())
                    .then((json)=>{
                        loader.classList.remove('wrapper-active')
                        cb(json.results)
                        loader.classList.remove('wrapper-active')
                    }).catch(err => alert('An error occurred'))
        }

        function deleteArticle(articleId,cb){
            loader.classList.add('wrapper-active')
            fetch(`/api/article/delete/${articleId}`)
                .then(res => res.json())
                    .then((json)=>{
                        loader.classList.remove('wrapper-active')
                        cb(json.message)
                    }).catch((err)=>{
                        loader.classList.remove('wrapper-active')
                        alert('An error occured when deleting the post')
                    })
        }
       }
    })
})()


(function sidebarScript() {
    if(document.querySelector('.sidebar')){
        let sidebar = document.querySelector('.sidebar')
        let sidebarWrapper = document.querySelector('#sidebar-wrapper.--wrapper')
    
    if(document.querySelector('.sidebar--trigger')){
        let sidebarTrigger = document.querySelector('.sidebar--trigger')
        sidebarTrigger.addEventListener('click',toggleSidebarState)
        sidebarWrapper.addEventListener('click',toggleSidebarState)

    function toggleSidebarState(e) {
        e.stopPropagation()
        sidebar.classList.toggle('sidebar-active')
        sidebarWrapper.classList.toggle('wrapper-active')
    }
    }
    }
})();
