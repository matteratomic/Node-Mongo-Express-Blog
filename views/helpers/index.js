let __helpers = {}
__helpers.ifeq = function(a,b,opt){
    if (a === b){
        return opt.fn(this)
    }else{
        return opt.inverse(this)
    }
}
module.exports = __helpers