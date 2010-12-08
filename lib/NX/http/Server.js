/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.http.Server

/**
 * @class NX.http.Server
 */
NX.http.Server = NX.extend(NX.AbstractServer, {

    // {{{ __initPublicDir

    __initPublicDir : function() {

        var me = this;

        // ディレクトリ設定確認
        if(!me.public || !NX.isString(me.public)) {

            // "公開ディレクトリが指定されていません。" 出力
            console.log(NX.util.EscapseSequence.error(NX.msgs.NX.http.Server.start.PUBLIC_DIR_NONE));
            return;
        }

        // ディレクトリ存在確認
        if(!NX.fs.exists(me.public)) {

            // "公開ディレクトリが存在しません。" 出力
            console.log(NX.util.EscapseSequence.error(NX.msgs.NX.http.Server.start.PUBLIC_DIR_NOT_FOUND));
            return;
        }

    },

    // }}}
    // {{{ initialize

    initialize : function() {

        var me = this;

        me.__initPublicDir();


    },

    // }}}
    // {{{ start

    start: function() {

        var me = this;

        // 設定読み込み
        NX.http.conf = require(
            NX.env.dirname + '/' +
            NX.env.dirs.config + '/' +
            NX.env.server.http.config.filename
        );

        // mimetype設定読み込み
        NX.http.mimetype = require(
            NX.env.dirname + '/' +
            NX.env.dirs.config + '/' +
            NX.env.server.http.mimetype.filename
        );

        // HTTPサーバー生成
        me.server = me.createServer(function(req, res) {
            me.fireEvent('request', req, res);
        });

        // ディスパッチャー生成
        me.dispatcher = new NX.http.Dispatcher();
        me.dispatcher.app = me.app;

        // イベント登録
        me.addEvents('request', 'listen');

        // リクエストイベントハンドラ
        me.on('request', me.dispatcher.dispatch, me.dispatcher);

        // リスン開始
        me.server.listen(me.port, me.host, function() {

            var args = ['listen'];

            NX.iterate(arguments, function(v, key) {
                args.push(v);
            });

            me.fireEvent.apply(me, args);
        });

    }

    // }}}

});

// }}}
// {{{ addMethod

NX.apply(NX.http.Server.prototype, require('http'));

// }}}
// {{{ register type

NX.ServiceMgr.registerType('http', NX.http.Server);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
