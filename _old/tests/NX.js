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
 * NX Class TestCase
 */
NXTestCase = NX.extend(NX.test.unit.TestCase, {

    // {{{ testIsEmpty

    /**
     * NX.isEmptyテスト
     */
    testIsEmpty : function() {

        var me = this;

        me.assertOk(NX.isEmpty(undefined));
        me.assertOk(NX.isEmpty(null));
        me.assertOk(NX.isEmpty([]));
        me.assertOk(NX.isEmpty(''));
        me.assertOk(NX.isEmpty('', true) === false);
        me.assertOk(NX.isEmpty('xFrameworkNX') === false);
        me.assertOk(NX.isEmpty({}) === false);
    },

    // }}}
    // {{{ testIsArray

    /**
     * NX.isArrayテスト
     */
    testIsArray : function() {

        var me = this;

        me.assertOk(NX.isArray(undefined) === false);
        me.assertOk(NX.isArray(null) == false);
        me.assertOk(NX.isArray([]));
        me.assertOk(NX.isArray('') === false);
        me.assertOk(NX.isArray('xFrameworkNX') === false);
        me.assertOk(NX.isObject(8124) === false);
        me.assertOk(NX.isArray({}) === false);
        me.assertOk(NX.isArray(new Date()) === false);
    },

    // }}}
    // {{{ testIsDate

    /**
     * NX.isDateテスト
     */
    testIsDate : function() {

        var me = this;

        me.assertOk(NX.isDate(undefined) === false);
        me.assertOk(NX.isDate(null) == false);
        me.assertOk(NX.isDate([]) === false);
        me.assertOk(NX.isDate('') === false);
        me.assertOk(NX.isDate('xFrameworkNX') === false);
        me.assertOk(NX.isObject(8124) === false);
        me.assertOk(NX.isDate({}) === false);
        me.assertOk(NX.isDate(new Date()));
    },

    // }}}
    // {{{ testIsObject

    /**
     * NX.isObjectテスト
     */
    testIsObject : function() {

        var me = this;

        me.assertOk(NX.isObject(undefined) === false);
        me.assertOk(NX.isObject(null) == false);
        me.assertOk(NX.isObject([]) === false);
        me.assertOk(NX.isObject('') === false);
        me.assertOk(NX.isObject('xFrameworkNX') === false);
        me.assertOk(NX.isObject(8124) === false);
        me.assertOk(NX.isObject({}));
        me.assertOk(NX.isObject(new Date()) === false);
    },

    // }}}
    // {{{ testIsPrimitive

    /**
     * NX.isPrimitiveテスト
     */
    testIsPrimitive : function() {

        var me = this;

        me.assertOk(NX.isPrimitive(undefined) === false);
        me.assertOk(NX.isPrimitive(null) == false);
        me.assertOk(NX.isPrimitive([]) === false);
        me.assertOk(NX.isPrimitive(''));
        me.assertOk(NX.isPrimitive('xFrameworkNX'));
        me.assertOk(NX.isPrimitive(8124));
        me.assertOk(NX.isPrimitive({}) === false);
        me.assertOk(NX.isPrimitive(new Date()) === false);
    },

    // }}}
    // {{{ testIsFunction

    /**
     * NX.isFunctionテスト
     */
    testIsFunction : function() {

        var me = this;

        me.assertOk(NX.isFunction(undefined) === false);
        me.assertOk(NX.isFunction(null) == false);
        me.assertOk(NX.isFunction([]) === false);
        me.assertOk(NX.isFunction('') === false);
        me.assertOk(NX.isFunction('xFrameworkNX') === false);
        me.assertOk(NX.isFunction(8124) === false);
        me.assertOk(NX.isFunction({}) === false);
        me.assertOk(NX.isFunction(new Date()) === false);
        me.assertOk(NX.isFunction((function() {})));
    },

    // }}}
    // {{{ testIsNumber

    /**
     * NX.isNumberテスト
     */
    testIsNumber : function() {

        var me = this;

        // 文字列テスト
        me.assertOk(NX.isNumber('xFrameworkNX') === false);

        // 数値テスト
        me.assertOk(NX.isNumber(8124));

        // 真偽値テスト
        me.assertOk(NX.isString(true) === false);
        me.assertOk(NX.isString(false) === false);

        // オブジェクトテスト
        me.assertOk(NX.isString({}) === false);

        // 配列オブジェクトテスト
        me.assertOk(NX.isString([]) === false);

        // 関数オブジェクトテスト
        me.assertOk(NX.isString((function(){})) === false);
    },

    // }}}
    // {{{ testIsString

    /**
     * NX.isSringテスト
     */
    testIsString : function() {

        var me = this;

        // 文字列テスト
        me.assertOk(NX.isString('xFrameworkNX'));

        // 数値テスト
        me.assertOk(NX.isString(8124) === false);

        // 真偽値テスト
        me.assertOk(NX.isString(true) === false);
        me.assertOk(NX.isString(false) === false);

        // オブジェクトテスト
        me.assertOk(NX.isString({}) === false);

        // 配列オブジェクトテスト
        me.assertOk(NX.isString([]) === false);

        // 関数オブジェクトテスト
        me.assertOk(NX.isString((function(){})) === false);

    },

    // }}}
    // {{{ testIsBoolean

    /**
     * NX.isIsBooleanテスト
     */
    testIsBoolean : function() {

        var me = this;

        me.assertOk(NX.isBoolean(undefined) === false);
        me.assertOk(NX.isBoolean(null) == false);
        me.assertOk(NX.isBoolean([]) === false);
        me.assertOk(NX.isBoolean('') === false);
        me.assertOk(NX.isBoolean('xFrameworkNX') === false);
        me.assertOk(NX.isBoolean(8124) === false);
        me.assertOk(NX.isBoolean({}) === false);
        me.assertOk(NX.isBoolean(new Date()) === false);
        me.assertOk(NX.isBoolean((function() {})) === false);
        me.assertOk(NX.isBoolean(true));
        me.assertOk(NX.isBoolean(false));
    },

    // }}}
    // {{{ testStrpos

    /**
     * NX.strposテスト
     */
    testStrpos : function() {

        var me = this;
        var v;

        me.assertStrictEqual(NX.strpos(v, '.'), false);

        v = 'aaa.bbb.ccc';
        me.assertStrictEqual(NX.strpos(v, '.'), 3);

    },

    // }}}
    // {{{ testExplode

    /**
     * NX.explodeテスト
     */
    testExplode : function() {

        var me = this;
        var v = 'aaa.bbb.ccc';

        var ret = NX.explode('.', v);

        me.assertStrictEqual(ret[0], 'aaa');
        me.assertStrictEqual(ret[1], 'bbb');
        me.assertStrictEqual(ret[2], 'ccc');
    },

    // }}}
    // {{{ testImplode

    /**
     * NX.implodeテスト
     */
    testImplode : function() {

        var me = this,
            v,
            ret;

        v = ['aaa','bbb','ccc'];
        ret = NX.implode('.', v);
        me.assertStrictEqual(ret, 'aaa.bbb.ccc');

        v = {0: 'aaa', 1: 'bbb', 2: 'ccc'};
        ret = NX.implode('.', v);
        me.assertStrictEqual(ret, 'aaa.bbb.ccc');
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
