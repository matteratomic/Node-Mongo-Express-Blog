
(function headerScript(){
    window.addEventListener('DOMContentLoaded',function(){
        let header = document.querySelector('header')
        function scrollHandler(){
            if(window.scrollY > 300 && window.location.pathname === '/'){
                header.style.backgroundColor = 'black'
            }else{
                header.style.backgroundColor = 'transparent'
            }
        }
    
    if(window.location.pathname != '/'){
        window.removeEventListener('scroll',scrollHandler)
        header.style.backgroundColor = 'black' 
    }else{
        let scrollListener = window.addEventListener('scroll',scrollHandler,false)
    }
})})()
