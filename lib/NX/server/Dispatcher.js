/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.server.Dispatcher

/**
 * @class NX.server.Dispatcher
 */
NX.server.Dispatcher = NX.extend(NX.AbstractDispatcher, {

    // {{{ dispatch

    /**
     * @method dispatch
     */
    dispatch : function(req, res) {

        var me = this;

        // リクエストURL設定
        me.path = req.url;

        // パス情報設定
        me.pathinfo = NX.fs.pathinfo(req.url);

        // スーパークラスメソッドコール
        NX.server.Dispatcher.superclass.dispatch.call(me, arguments);

        // ビュー生成
        eval('me.view = new NX.view.' + NX.config.view.type + 'View();');

        // ビュー初期化
        me.view.init({
            request: req,
            response: res
        });

        // コントローラー実行

        // コントローラーが存在する場合、Viewオブジェクトを渡す。


        // 以下、コントローラーレスの場合

        // ビューレンダリング
        me.view.render();
    },

    // }}}
    // {{{ getAction

    getAction : function() {

        var me = this,
            pi = me.pathinfo;

        if(!me.action) {
            me.action =  pi.basename || 'index';
        }

        return me.action;
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
