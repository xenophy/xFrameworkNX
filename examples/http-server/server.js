/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('../../lib/NX.js');

// }}}
// {{{ setup server

NX.service({

    // {{{ items

    /**
     * サービス設定
     */
    items: [{

        // アプリケーションディレクトリ
        app: __dirname + '/webapp',

        // 設定ディレクトリ
        config: __dirname + '../../config'

    }]

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
