/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.http.Dispatcher

/**
 * @class NX.http.Dispatcher
 */
NX.http.Dispatcher = NX.extend(NX.AbstractDispatcher, {

    // {{{ url

    url: '/',

    // }}}
    // {{{ viewConfig

    viewConfig: {

        // タイプ設定
        type: 'http'

    },

    // }}}
    // {{{ constructor

    constructor : function(config) {

        var me = this;

        config = config || {};

        // 設定適用
        NX.apply(me, config);

        // コントローラーディレクトリ設定
        me.controllers = me.controllers || NX.env.dirname + '/controllers';
        me.controllers = NX.path.normalize(me.controllers);

        // スーパークラスメソッドコール
        NX.http.Dispatcher.superclass.constructor.apply(me, arguments);
    },

    // }}}
    // {{{ dispatch

    dispatch: function(req, res) {

        var me = this;

        // リクエストURL設定
        me.url = req.url;

        // スーパークラスメソッドコール
        NX.http.Dispatcher.superclass.dispatch.call(me);

        var pi = NX.pathinfo(req.url);
        var basename = pi.basename;
        var action = pi.basename || 'index';

        var extPos = action.indexOf('.');
        if(extPos > 0) {
            action = action.substr(0,extPos);
        }

        var path = req.url.substr(0, req.url.length - basename.length);

        try {

            var file;

            if(path == '/') {
                file = NX.env.server.controller.special + '.js';
            } else {
                file = path.substr(1, path.length - 2) + '.js';
            }

            var filepath = me.controllers + '/' + file;

            if(NX.fs.exists(filepath)) {

                // アクションクラスを再読込するために、requireのキャッシュをクリア
                // TODO: 前回のキャッシュ日時を保存して、変更されている場合のみクリアするように実装する
                // TODO: キャッシュのクリアをラッピングしてnode.jsの仕様変更に対応
                if(require.main.moduleCache[filepath]) {
                    delete require.main.moduleCache[filepath];
                }

                // コントローラー生成
                var controller = require(filepath);

                // コントローラー初期化
                controller.initController({
                    path: path,
                    action: action,
                    req: req,
                    res: res
                });

                // アクションコール
                if(controller[action] && NX.isFunction(controller[action])) {
                    controller[action].call(controller[action], req, res);
                }

            }

        } catch(e) {


            console.log(e);


            // 500 Internal Server Error
            var file = me.configs + '/' + NX.http.config.errorDocument[500];

            // 500用テンプレートが存在する場合出力
            if(NX.fs.exists(file) && NX.fs.isReadable(file)) {
                res.writeHead(500, {'Content-Type': NX.http.mimetype.html});
                res.write(NX.fs.readFileSync(file, 'utf8'));
            } else {
                res.writeHead(500);
            }

            res.end();

            return;
        }

        // 転送ファイル設定
        NX.applyIf(me.view, {
            public_html: me.public_html,
            configs: me.configs,
            target: req.url
        });

        // ビュー初期化
        me.view.init({
            request: req,
            response: res
        });

        // ビューレンダリング
        me.view.render();

    }

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
