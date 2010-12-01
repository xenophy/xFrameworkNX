/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.FunctionTestCase

/**
 * @class NX.util.FunctionTestCase
 *
 * NX.util.Function Class TestCase
 */
NX.util.FunctionTestCase = NX.extend(NX.test.unit.TestCase, {

    // {{{ testCreateInterceptor

    /**
     * NX.util.Functions.createInterceptorテスト
     */
    testCreateInterceptor : function() {

        var me = this;
        var v;
        var f = function(){
            v = 'called';
        }

        var fi = NX.util.Functions.createInterceptor(f, function(value) {
            return value == 'xFrameworkNX';
        });

        fi();
        me.assertStrictEqual(v, undefined);

        fi('xFrameworkNX');
        me.assertStrictEqual(v, 'called');

    },

    // }}}
    // {{{ testCreateDelegate

    /**
     * NX.util.Functions.createDelegateテスト
     */
    testCreateDelegate : function() {

        var me = this;
        var v;
        var f = function(value){
            v = value + ' called';
        }

        var fi = NX.util.Functions.createDelegate(f, me, ['Delegate']);

        fi();

        me.assertStrictEqual(v, 'Delegate called');

    },

    // }}}
    // {{{ testCreateSequence

    /**
     * NX.util.Functions.createSequenceテスト
     */
    testCreateSequence : function() {

        var me = this;
        var v;
        var f = function(value){
            v = 'origFn';
        }

        var fi = NX.util.Functions.createSequence(f, function() {
            v += ' newFn';
        });

        fi();

        me.assertStrictEqual(v, 'origFn newFn');

    },

    // }}}
    // {{{ testDefer

    /**
     * NX.util.Functions.deferテスト
     */
    testDefer : function() {

        var me = this;
        var v;
        var f = function(value){
            v = 'called';
        }

        NX.util.Functions.defer(f, 100);

        me.assertStrictEqual(v, undefined);

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
