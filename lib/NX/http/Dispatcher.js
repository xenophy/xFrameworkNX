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
        var action = pi.filename;
        var path = req.url.substr(0, req.url.length - basename.length);

        try {




        } catch(e) {

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
