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

        // 公開ディレクトリ
        public_html: __dirname + '/public_html',

        // 設定ディレクトリ
        configs: __dirname + '/../../configs',

        // コントローラーディレクトリ(オプション)
        //controllers: __dirname + '/controllers'

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
