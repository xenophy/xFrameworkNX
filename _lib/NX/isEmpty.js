/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.isEmpty

/**
 * @method isEmpty
 */
module.exports = function(v, allowBlank){
    return v === null || v === undefined || ((NX.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
