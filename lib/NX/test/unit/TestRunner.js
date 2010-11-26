/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.test.unit.TestRunner

/**
 * @class NX.test.unit.TestRunner
 *
 * テストランナークラス
 */
NX.test.unit.TestRunner = NX.extend(Object, {

    // {{{ result

    /**
     * テスト結果オブジェクト
     *
     * @type Object
     */
    result: {},

    // }}}
    // {{{ _run

    /**
     * _run
     *
     * テストケース実行メソッド
     *
     * @param {tCls} テストケースクラスオブジェクト
     * @private
     */
    _run : function(tCls, clsName) {

        var t = new tCls();
        var me = this;

        NX.iterate(tCls.prototype, function(member) {

            if(NX.strpos(member, 'test') === 0) {

                var f = t[member];

                if(NX.isFunction(f)) {

                    // メソッド実行
                    f();

                    // 結果取得
                    var o = me.result;
                    var r = o[clsName] = {};
                    r[member] = t.getResult();

                }

            }

        });

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
