/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFrameworkNX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */
NX.util.Functions = {

    // {{{ createInterceptor

    createInterceptor: function(origFn, newFn, scope, returnValue) {

        var method = origFn;

        if(!NX.isFunction(newFn)) {

            return origFn;

        } else {

            return function() {

                var me = this,
                    args = arguments;

                newFn.target = me;
                newFn.method = origFn;

                return (newFn.apply(scope || me || window, args) !== false) ?
                        origFn.apply(me || window, args) :
                        returnValue || null;
            };

        }
    },

    // }}}
    // {{{ createDelegate

    createDelegate: function(fn, obj, args, appendArgs) {
        if (!NX.isFunction(fn)) {
            return fn;
        }
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (NX.isNumber(appendArgs)) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args);
                // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs);
                // splice them in
            }
            return fn.apply(obj || window, callArgs);
        };
    },

    // }}}
    // {{{ defer

    defer: function(fn, millis, obj, args, appendArgs) {
        fn = NX.util.Functions.createDelegate(fn, obj, args, appendArgs);
        if (millis > 0) {
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },

    // }}}
    // {{{ createSequence

    createSequence: function(origFn, newFn, scope) {
        if (!NX.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var retval = origFn.apply(this || window, arguments);
                newFn.apply(scope || this || window, arguments);
                return retval;
            };
        }
    }

    // }}}

};

// }}}
// {{{ NX.defer

NX.defer = NX.util.Functions.defer;

// }}}
// {{{ NX.createInterceptor

NX.createInterceptor = NX.util.Functions.createInterceptor;

// }}}
// {{{ NX.createSequence

NX.createSequence = NX.util.Functions.createSequence;

// }}}
// {{{ NX.createDelegate

NX.createDelegate = NX.util.Functions.createDelegate;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
