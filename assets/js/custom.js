
(function headerScript() {
    window.addEventListener('DOMContentLoaded', function () {
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
    })
})();


(function heroScript() {
    if(!!document.querySelector('.hero-scroll-down')){
        let scrollDown = document.querySelector('.hero-scroll-down')
        scrollDown.addEventListener('click', function () {
        window.scrollBy({ top: window.innerHeight - 100, left: 0, behavior: 'smooth' })
    })
    }
})();

(function loginModalScript() {
    window.addEventListener('DOMContentLoaded',function(){
     
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
        
            loginModal.addEventListener('click', e => e.stopPropagation())
            loginModalTrigger.addEventListener('click', toggleModalState)
            modalCloseBtn.addEventListener('click', toggleModalState)
            modalWrapper.addEventListener('click', toggleModalState)
            modalLoginButton.addEventListener('click', submitCredentials)
        
            function submitCredentials() {
                let name = usernameInput.value
                let password = passwordInput.value
                modalCloseBtn.setAttribute('disabled',true);
                loginError.textContent = '';
                if(usernameInput.value.trim() && passwordInput.value.trim()){
                let body = JSON.stringify(({name,password}))
                
                fetch('/login',{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:body,
                }).then((res)=>res.json())
                .then((json)=>{
                    modalCloseBtn.setAttribute('disabled',false)
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
    })
})();

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
