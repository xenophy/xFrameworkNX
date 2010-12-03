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

    // {{{ start

    start: function() {

        var me = this;

        if(!me.app || !NX.isString(me.app)) {

            // "アプリケーションディレクトリが指定されていません。" 出力
            console.log(NX.util.EscapseSequence.error(NX.msgs.NX.http.Server.start.APP_DIR_NONE));
            return;
        }

        // ディレクトリ存在確認
        if(!NX.fs.exists(me.app)) {

            // "アプリケーションディレクトリが存在しません。" 出力
            console.log(NX.util.EscapseSequence.error(NX.msgs.NX.http.Server.start.APP_DIR_NOT_FOUND));
            return;
        }

        // mimetype設定読み込み
        NX.http.mimetype = require(NX.env.dirname + '/' + NX.env.configDirName + '/mimetype.js');

        // HTTPサーバー生成
        me.server = me.createServer(function(req, res) {
            me.fireEvent('request', req, res);
        });

        // ディスパッチャー生成
        me.dispatcher = new NX.http.Dispatcher();

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
