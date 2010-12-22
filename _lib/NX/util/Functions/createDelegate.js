/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.util.Functions
 */

// {{{ NX.util.Functions.createDelegate

/**
 * @method createDelegate
 */
module.exports = function(fn, obj, args, appendArgs) {

    if(!NX.isFunction(fn)) {
        return fn;
    }

    return function() {

        var callArgs = args || arguments;

        if(appendArgs === true) {

            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);

        } else if(NX.isNumber(appendArgs)) {

            callArgs = Array.prototype.slice.call(arguments, 0);

            var applyArgs = [appendArgs, 0].concat(args);

            Array.prototype.splice.apply(callArgs, applyArgs);
        }

        return fn.apply(obj || global, callArgs);
    };

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
