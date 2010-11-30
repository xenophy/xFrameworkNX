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

        if(NX.isFunction(tCls.prototype.setUp)) {
            t['setUp']();
        }

        NX.iterate(tCls.prototype, function(member) {

            var pos = NX.strpos(member, 'test');

            if(pos === 0) {

                var fName = member.substr(4);
                fName = fName.charAt(0).toLowerCase() + fName.substr(1);

                var f = t[member];

                if(NX.isFunction(f)) {

                    t.fName = fName;

                    // メソッド実行
                    f.call(t);

                    if(t.failureCount === 0) {
                        console.log(NX.util.EscapseSequence.ok('✔ ') + fName);
                        t.result[fName] = true;
                    } else {
                        t.result[fName] = false;
                    }
                }

            }

        });

        if(NX.isFunction(tCls.prototype.tearDown)) {
            t['tearDown']();
        }

        return t;
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
