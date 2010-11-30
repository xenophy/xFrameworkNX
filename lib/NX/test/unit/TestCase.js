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

    /**
     * アサーションカウント
     */
    assertCount: 0,

    /**
     * 失敗カウント
     */
    failureCount: 0,

    // }}}
    // {{{ assertOk

    assertOk : function(v) {
        this.assertCount++;

        try {
            var ret = NX.assert.ok.apply(this, arguments);
        } catch(e) {
            this.failureCount++;
            console.log(NX.util.EscapseSequence.error('✖ ' + this.fName));
            console.log();
            console.log(e.stack);
            console.log();
        }

        return ret;
    },

    // }}}
    // {{{ assertEqual

    assertEqual: function () {
        this.assertCount++;
        return assert.equal.apply(this, arguments);
    },

    // }}}
    // {{{ assertNotEqual

    assertNotEqual: function () {
        this.assertCount++;
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
        this.assertCount++;
        return assert.notDeepEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertStrictEqual

    assertStrictEqual: function () {
        this.assertCount++;
        return assert.strictEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertNotStrictEqual

    assertNotStrictEqual: function () {
        this.assertCount++;
        return assert.notStrictEqual.apply(this, arguments);
    },

    // }}}
    // {{{ assertThrows

    assertThrows: function () {
        this.assertCount++;
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
        this.assertCount++;
        return assert.doesNotThrow.apply(this, arguments);
    },

    // }}}
    // {{{ assertIfError

    assertIfError: function () {
        this.assertCount++;
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
