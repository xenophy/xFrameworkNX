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
    // {{{ dispatch

    dispatch: function(req, res) {

        var me = this;

        // リクエストURL設定
        me.url = req.url;

        // スーパークラスメソッドコール
        NX.http.Dispatcher.superclass.dispatch.call(me);

        // ビュー初期化
        me.view.init.call(me.view, {
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
