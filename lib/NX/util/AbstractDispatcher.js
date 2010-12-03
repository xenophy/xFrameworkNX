/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.AbstractDispatcher

/**
 * @class NX.AbstractDispatcher
 */
NX.AbstractDispatcher = NX.extend(NX.util.Observable, {

    // {{{ dispatch

    dispatch: function() {

        var me = this;

        // ビュー生成
        eval('me.view = new NX.' + me.viewConfig.type + '.View(me.viewConfig);');

        // コントローラー実行






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
