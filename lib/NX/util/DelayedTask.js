/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.DelayedTask

/**
 * @class NX.util.DelayedTask
 *
 * 遅延タスククラス
 */
NX.util.DelayedTask = function(fn, scope, args) {

    // {{{ internal

    var me = this,
        id,
        call = function() {
            clearInterval(id);
            id = null;
            fn.apply(scope, args || []);
        };

    // }}}
    // {{{ delay

    /**
     * タイムアウト待ちのキューをキャンセルして、新しいキューを実行します。
     *
     * @param {Number} delay 遅延ミリ秒
     * @param {Function} newFn (オプション) キュー関数をオーバーライドします。
     * @param {Object} newScope (オプション) キュー関数のスコープをオーバーライドします。
     * @param {Array} newArgs (オプション) キュー関数の引数をオーバーライドします。
     */
    me.delay = function(delay, newFn, newScope, newArgs) {

        me.cancel();

        fn = newFn || fn;

        scope = newScope || scope;

        args = newArgs || args;

        id = setInterval(call, delay);
    };

    // }}}
    // {{{ cancel

    /**
     * 最終キューをキャンセルします。
     */
    me.cancel = function(){
        if (id) {
            clearInterval(id);
            id = null;
        }
    };

    // }}}

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
