/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.DelayedTaskTestCase

/**
 * @class NX.util.DelayedTaskTestCase
 *
 * NXクラステストケース
 */
NX.util.DelayedTaskTestCase = NX.extend(NX.test.unit.TestCase, {

    // {{{ testDelay

    /**
     * NX.util.DelayedTask.delayテスト
     */
    testDelay : function() {

        var me = this;

        NX.sleep(2000);

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
