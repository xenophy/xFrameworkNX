/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.fs
 */

// {{{ NX.fs.dirname

/**
 * @method dirname
 */
module.exports = function(path) {
    return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
}

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
