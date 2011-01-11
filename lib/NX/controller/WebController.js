/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

var parseUrl = require('url').parse,
    path = require('path'),
    queryString = require('querystring');

// }}}
// {{{ NX.WebController

/**
 * @class NX.WebController
 */
NX.WebController = NX.extend(NX.controller.AbstractController, {

    // {{{ constructor

    /**
     * @method WebController
     */
    constructor : function(config) {

        var me = this,
            url = parseUrl(config.request.url);

        // 設定適用
        NX.apply(me, config || {});

        // ビュー生成
        eval('me.view = new NX.' + NX.config.view.type + 'View();');

        // ビュー初期化
        me.view.init({
            request: me.request,
            response: me.response,
            configs: me.configs,
            url: url,
            template : path.join(me.contents, queryString.unescape(url.pathname))
        });

        // スーパークラスメソッドコール
        NX.WebController.superclass.constructor.call(me);
    },

    // }}}
    // {{{ execute

    /**
     * @method execute
     */
    execute : function() {

        var me = this,
            action = me[me.action];

        if(action && NX.isFunction(action)) {

            // アクション実行
            action.call(me, me.request, me.response);

        }

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
