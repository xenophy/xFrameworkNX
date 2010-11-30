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
    result: {},

    // }}}
    // {{{ assertOk

    assertOk : function(v) {
        return NX.assert.ok.apply(this, arguments);
    },

    // }}}
    // {{{ assertEqual

    assertEqual: function () {
        return assert.equal.apply(this, arguments);
    },

    // }}}
    // {{{ assertNotEqual

    assertNotEqual: function () {
        return assert.notEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertDeepEqual

    assertDeepEqual: function () {
        return assert.deepEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertNotDeepEqual

    assertNotDeepEqual: function () {
        return assert.notDeepEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertStrictEqual

    assertStrictEqual: function () {
        return assert.strictEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertNotStrictEqual

    assertNotStrictEqual: function () {
        return assert.notStrictEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertThrows

    assertThrows: function () {
        return assert.throws.apply(this, arguments);
    },

    // }}}
    // {{{ assertFail

    assertFail: function () {
        return assert.fail.apply(this, arguments);
    },

    // }}}
    // {{{ assertDoesNotThrow

    assertDoesNotThrow: function () {
        return assert.doesNotThrow.apply(this, arguments);
    },

    // }}}
    // {{{ assertIfError

    assertIfError: function () {
        return assert.ifError.apply(this, arguments);
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
