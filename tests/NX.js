/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NXTestCase

/**
 * @class NXTestCase
 *
 * NXクラステストケース
 */
NXTestCase = NX.extend(NX.test.unit.TestCase, {

    // {{{ testIsString

    /**
     * NX.isSringテスト
     */
    testIsString : function() {

        var me = this;

        // 正常系テスト
        me.assertOk(NX.isString('xFrameworkNX'));

        // 真偽値テスト
        me.assertOk(NX.isString(true) === false);
        me.assertOk(NX.isString(false) === false);


    },

    // }}}
    // {{{ testIsNumber

    /**
     * NX.isNumberテスト
     */
    testIsNumber : function() {

        var me = this;

        // 正常系テスト
        me.assertOk(NX.isString('xFrameworkNX'));



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
