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

    // {{{ constructor

    constructor : function(config) {

        var me = this;

        // パス正規化
        NX.each([
            'public_html',
            'configs'
        ], function(prop) {

            if(NX.isString(config[prop])) {
                config[prop] = NX.path.normalize(config[prop]);
            }

        });

        // 初期設定保存
        me.initialConfig = config;

        // スーパークラスメソッドコール
        NX.http.Server.superclass.constructor.apply(me, arguments);

    },

    // }}}
    // {{{ start

    start: function() {

        var me = this, init = true;

        // エラー表示関数オブジェクト
        var displayError = function(text) {
            console.log(NX.util.EscapseSequence.error(text));
        }

        // ディレクトリチェック
        NX.each([
            'public_html',
            'configs'
        ], function(prop) {

            // ディレクトリ設定確認
            if(!me[prop] || !NX.isString(me[prop])) {
                displayError(NX.msgs.NX.http.Server[prop.toUpperCase() + '_DIR_NONE']);
                init = false;
                return false;
            }

            // ディレクトリ存在確認
            if(!NX.fs.exists(me[prop])) {
                displayError(NX.msgs.NX.http.Server[prop.toUpperCase() + '_DIR_NOT_FOUND']);
                init = false;
                return false;
            }

        });

        // 設定読み込み
        NX.each([
            'config',
            'mimetype'
        ], function(prop) {
            NX.http[prop] = require(me.configs + '/' + NX.env.server.http[prop].filename);
        });

        // 初期化チェック
        if(init !== true) {
            return;
        }

        // HTTPサーバー生成
        me.server = me.createServer(function(req, res) {
            me.fireEvent('request', req, res);
        });

        // ディスパッチャー生成
        me.dispatcher = new NX.http.Dispatcher(me.initialConfig);

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
