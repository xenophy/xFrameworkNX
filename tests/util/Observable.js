/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.ObservableTestCase

/**
 * @class NX.util.ObservableTestCase
 *
 * NXクラステストケース
 */
NX.util.ObservableTestCase = NX.extend(NX.test.unit.TestCase, {

    // {{{ testConstractor

    /**
     * NX.util.Observable.constructorテスト
     */
    testConstractor : function() {

        var me = this;

        var o = new NX.util.Observable({
            listeners : {
                'testEvent' : function() {
                }
            }
        });

        console.log(o);

        me.assertOk(NX.isEmpty({}) === false);
    },

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
