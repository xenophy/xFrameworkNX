/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.util.Functions
 */

// {{{ NX.util.Functions.defer

/**
 * @method defer
 */
module.exports = function(fn, millis, obj, args, appendArgs) {

    fn = NX.util.Functions.createDelegate(fn, obj, args, appendArgs);
    if (millis > 0) {
        return setTimeout(fn, millis);
    }

    fn();

    return 0;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
