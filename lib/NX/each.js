/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.each

/**
 * @method each
 */
module.exports = function(array, fn, scope){

    if(NX.isEmpty(array, true)){
        return;
    }

    if(!NX.isIterable(array) || NX.isPrimitive(array)){
        array = [array];
    }

    for(var i = 0, len = array.length; i < len; i++){
        if(fn.call(scope || array[i], array[i], i, array) === false){
            return i;
        };
    }

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
