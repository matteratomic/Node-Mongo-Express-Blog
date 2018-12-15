const _ = require('lodash')

let __helpers = {}

__helpers.ifeq = function(a,b,opt){
    if (a === b){
        return opt.fn(this)
    }else{
        return opt.inverse(this)
    }
}

__helpers.ifor = function(a,b,opt){
    if (a || b){
        return opt.fn(this)
    }else{
        return opt.inverse(this)
    }
}

__helpers.minusOne = function(a){
        return parseInt(a,10)-1
}

__helpers.plusOne = function(a){
    return parseInt(a,10)+1
}

__helpers.getPaginationItems = function(totalPosts,currentPage){
    let lastPage = (totalPosts%10 ? Math.floor(totalPosts/10)+1 : totalPosts/10)
    let out = `<a style="${ currentPage === 1 ? 'pointer-events:none': null}" href="${currentPage === 1 ? '/' : '/?page='+parseInt(currentPage-1)}" class="page-numbers prev ${currentPage == 1 ? 'inactive' : null}">Prev</a>`
    for(let i = 1 ; i <= (lastPage || 1); i++){
        out += `<a href="/?page=${i}" class="page-numbers {{# ifeq currentPage '${i}'}}current{{/ifeq}}">${i}</a>`
    }    
    out +=`<a style="${ currentPage === lastPage ? 'pointer-events:none': null}" href="${currentPage === lastPage ? '' : '/?page='+_.sum([parseInt(currentPage),1])}" class="page-numbers next" ${currentPage === lastPage ? 'inactive' : null}>Next</a>`
    return out
}
module.exports = __helpers