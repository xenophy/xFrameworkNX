/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('../lib/NX.js');

// }}}
// {{{ run unit tests

NX.test.Unit.run({

    // {{{ 実行パス設定

    path: __dirname,

    // }}}
    // {{{ items

    /**
     * ユニットテストアイテム設定
     */
    items: [
        'NX',
        'NX.util.Observable',
        'NX.util.Function',
        'NX.util.MixedCollection'
    ]

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
