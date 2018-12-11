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

module.exports = __helpers