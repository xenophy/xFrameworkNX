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
        me.requestPath = req.url;

        // パス情報設定
        me.requestPathinfo = NX.fs.pathinfo(req.url);

        // スーパークラスメソッドコール
        NX.server.Dispatcher.superclass.dispatch.call(me, arguments);

        // コントローラーパス取得
        var file = me.getControllerFilePath();

        NX.fs.exists(file).next(function(exists) {

            var controller,
                o = {
                    path: me.path,
                    modules: me.modules,
                    configs: me.configs,
                    contents: me.contents,
                    action: me.getAction(),
                    request : req,
                    response : res
                };

            // コントローラーが存在する場合、Viewオブジェクトを渡す。
            if(exists) {

                // コントローラーキャッシュクリア
                NX.moduleCacheClear(file);

                // コントローラー生成
                var controllerCls = require(file);
                controller = new controllerCls(o);

            } else {

                // コントローラー生成
                controller = new NX.WebController(o);

            }

            try {

                // コントローラー実行
                controller.execute();

            } catch(e) {

                // 内部エラー処理
                controller.error(e);

            }

        });

    },

    // }}}
    // {{{ getAction

    /**
     * @method getAction
     */
    getAction : function() {

        var me = this,
            pi = me.requestPathinfo;

        me.action =  pi.basename || 'index';

        var extPos = me.action.indexOf('.');
        if(extPos > 0) {
            me.action = me.action.substr(0, extPos);
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
