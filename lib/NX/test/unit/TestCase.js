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

        try {
            var ret = NX.assert.equal.apply(this, arguments);
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
    // {{{ assertNotEqual

    assertNotEqual: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.notEqual.apply(this, arguments);
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
    // {{{ assertDeepEqual

    assertDeepEqual: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.deepEqual.apply(this, arguments);
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
    // {{{ assertNotDeepEqual

    assertNotDeepEqual: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.notDeepEqual.apply(this, arguments);
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
    // {{{ assertStrictEqual

    assertStrictEqual: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.strictEqual.apply(this, arguments);
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
    // {{{ assertNotStrictEqual

    assertNotStrictEqual: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.notStrictEqual.apply(this, arguments);
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
    // {{{ assertThrows

    assertThrows: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.throws.apply(this, arguments);
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
    // {{{ assertFail

    assertFail: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.fail.apply(this, arguments);
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
    // {{{ assertDoesNotThrow

    assertDoesNotThrow: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.doseNotThrow.apply(this, arguments);
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
    // {{{ assertIfError

    assertIfError: function () {

        this.assertCount++;

        try {
            var ret = NX.assert.ifError.apply(this, arguments);
        } catch(e) {
            this.failureCount++;
            console.log(NX.util.EscapseSequence.error('✖ ' + this.fName));
            console.log();
            console.log(e.stack);
            console.log();
        }

        return ret;
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
