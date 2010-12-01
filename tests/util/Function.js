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


    },

    // }}}
    // {{{ testCreateSequence

    /**
     * NX.util.Functions.createSequenceテスト
     */
    testCreateSequence : function() {


    },

    // }}}
    // {{{ testDefer

    /**
     * NX.util.Functions.deferテスト
     */
    testDefer : function() {


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
