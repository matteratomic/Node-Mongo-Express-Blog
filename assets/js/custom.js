
(function headerScript(){
    window.addEventListener('DOMContentLoaded',function(){
        let header = document.querySelector('header')

        if(!!window.location.search){
            header.setAttribute('style','background:black;box-shadow:0 0 10px black')
        }

        function scrollHandler(){
            if(window.scrollY > 300 && window.location.pathname === '/' && !window.location.search){
                header.setAttribute('style','background:black;box-shadow:0 0 10px black')
            }else{
                if(!!window.location.search){
                    header.setAttribute('style','background:black;box-shadow:0 0 10px black')
                }else{
                    header.setAttribute('style','background:transparent;box-shadow:0 0 10px transparent')
                }  
            }
        }
    
    if(window.location.pathname != '/'){
        window.removeEventListener('scroll',scrollHandler)
        header.setAttribute('style','background:black;box-shadow:0 0 10px black')
    }else{
        let scrollListener = window.addEventListener('scroll',scrollHandler,false)
    }
})})();


(function heroScript(){
    let scrollDown = document.querySelector('.hero-scroll-down')
    scrollDown.addEventListener('click',function(){
        window.scrollBy({top:window.innerHeight-100,left:0,behavior:'smooth'})
    })
})();
