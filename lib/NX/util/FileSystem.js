/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.FileSystem

/**
 * @class NX.util.FileSystem
 */
NX.util.FileSystem = new (NX.extend(Object, require('fs'), {

    // {{{ basename

    /**
     * @method basename
     */
    basename : function(path, suffix) {

        var b = path.replace(/^.*[\/\\]/g, '');

        if(typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
            b = b.substr(0, b.length-suffix.length);
        }

        return b;
    },

    // }}}

}));

// }}}
// {{{ shorthand

NX.fs = NX.util.FileSystem;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
