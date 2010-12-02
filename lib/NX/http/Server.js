/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ http

http = require('http');

// }}}
// {{{ NX.http.Server

/**
 * @class NX.http.Server
 *
 * ユニットテストクラス
 *
 * @singleton
 */
NX.http.Server = new (NX.extend(NX.util.Observable, {

    // {{{ server

    server: undefined,

    // }}}
    // {{{ constructor

    /**
     * コンストラクタ
     */
    constructor : function() {

        var me = this;

        // イベント登録
        me.addEvents('request');

        // HTTPサーバー生成
        me.server = global.http.createServer(function(req, res) {
            me.fireEvent('request', req, res);
        });

    },

    // }}}
    // {{{ run

    run : function() {

        var me = this;

        me.on('request', function(req, res) {

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World\n');

        });

        me.server.listen(8124, "127.0.0.1");

    }

    // }}}

}));

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
