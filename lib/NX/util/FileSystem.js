/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.FileSystems

/**
 * @class NX.util.FileSystems
 */
NX.util.FileSystem = require('fs');

NX.applyIf(NX.util.FileSystem, {

    // {{{ exists

    exists : function(path) {

        var me = NX.util.FileSystem;

        try {
            me.statSync(path);
        } catch(e) {
            console.log(e);
            return false;
        }

        return true;
    }

    // }}}

});

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
