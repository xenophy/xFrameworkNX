/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.iterate

/**
 * @method iterate
 */
module.exports = function(obj, fn, scope) {

    if(NX.isEmpty(obj)) {
        return;
    }

    if(NX.isIterable(obj)) {

        NX.each(obj, fn, scope);
        return;

    } else if(typeof obj == 'object' || typeof 'function') {

        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                    return;
                };
            }
        }

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
