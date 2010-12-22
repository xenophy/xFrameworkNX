/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.fs
 */

// {{{ NX.fs.isReadable

/**
 * @method isReadable
 */
module.exports = function(path) {

    var me = NX.util.FileSystem;

    try {
        var fp = me.openSync(path, 'r');
        me.closeSync(fp);
    } catch(e) {
        console.log(e);
        return false;
    }

    return true;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
