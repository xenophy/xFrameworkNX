/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.test.unit.TestCase

/**
 * @class NX.test.unit.TestCase
 *
 * テストケースクラス
 */
NX.test.unit.TestCase = NX.extend(Object, {

    // {{{ result

    /**
     * テスト結果オブジェクト
     */
    result: undefined,

    // }}}
    // {{{ constructor

    /**
     * コンストラクタ
     */
    constructor : function() {

        var me = this;

        // テスト結果オブジェクト生成
        me.result = new NX.test.unit.TestResult();

    },

    // }}}
    // {{{ getResult

    /**
     * テスト結果取得メソッド
     */
    getResult : function() {

        return this.result;

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
