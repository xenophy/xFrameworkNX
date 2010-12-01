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

    // {{{ testAddListener

    /**
     * NX.util.Observable.addListenerテスト
     */
    testAddListener : function() {

        var me = this,
            t,
            ret;

        me.testValue = 'testValue';

        var o = new NX.util.Observable({
            listeners : {
                'testevent' : function() {
                    return this.events.testevent.name;
                }
            }
        });

        me.assertStrictEqual(o.events.testevent.name, 'testevent');

        t = o.events.testevent.listeners[0];
        ret = t.fn.apply(t.scope);

        me.assertStrictEqual(ret, 'testevent');


        var o = new NX.util.Observable({
            listeners : {
                'testevent' : {
                    fn : function() {
                        return this.testValue;
                    },
                    scope: me
                }
            }
        });

        t = o.events.testevent.listeners[0];
        ret = t.fn.apply(t.scope);

        me.assertStrictEqual(ret, 'testValue');

    },

    // }}}
    // {{{ testOn

    /**
     * NX.util.Observable.onテスト
     */
    testOn : function() {

        var me = this,
            t,
            ret;

        me.testValue = 'testValue';

        var o = new NX.util.Observable({
            listeners : {
                'testevent' : function() {
                    return this.events.testevent.name;
                }
            }
        });

        me.assertStrictEqual(o.events.testevent.name, 'testevent');

        t = o.events.testevent.listeners[0];
        ret = t.fn.apply(t.scope);

        me.assertStrictEqual(ret, 'testevent');


        var o = new NX.util.Observable({
            listeners : {
                'testevent' : {
                    fn : function() {
                        return this.testValue;
                    },
                    scope: me
                }
            }
        });

        t = o.events.testevent.listeners[0];
        ret = t.fn.apply(t.scope);

        me.assertStrictEqual(ret, 'testValue');

    },

    // }}}
    // {{{ testFireEvent

    /**
     * NX.util.Observable.fireEventテスト
     */
    testFireEvent : function() {

        var me = this,
            t,
            testValue,
            ret;

        var o = new NX.util.Observable();

        o.on('testevent', function() {
            testValue = true;
        });

        o.fireEvent('testevent');

        me.assertOk(testValue);
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
