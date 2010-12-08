/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.AbstractController

/**
 * @class NX.AbstractController
 */
NX.AbstractController = NX.extend(NX.util.Observable, {

    // {{{ constructor

    constructor : function(config) {

        var me = this;

        config = config || {};

        // 設定適用
        NX.apply(me, config);
    },

    // }}}
    // {{{ initController

    initController : function() {

        // コントローラー名とマッチしたモジュールが存在した場合、自動的にバインドする


        // uses 配列プロパティで定義されたモジュールを読み込む


        // import（静的）メソッドで手動でモジュールを読み込む








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
