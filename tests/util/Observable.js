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

    // {{{ testAddEvents

    /**
     * NX.util.Observable.addEventsテスト
     */
    testAddEvents : function() {

        var me = this;
        var o = new NX.util.Observable();
        var v;
        var f = function(name) {
            v = name;
        }

        o.addEvents({
            event1: true,
            event2: false
        });

        o.on('event1', f);
        o.fireEvent('event1', 'Fired Event1');
        me.assertStrictEqual(v, 'Fired Event1');

        v = undefined;
        o.on('event2', f);
        o.fireEvent('event2', 'Fired Event2');
        me.assertStrictEqual(v, undefined);

        o.addEvents('event3');

        v = undefined;
        o.on('event3', f);
        o.fireEvent('event3', 'Fired Event3');
        me.assertStrictEqual(v, 'Fired Event3');

    },

    // }}}
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
    },

    // }}}
    // {{{ testRemoveListener

    /**
     * NX.util.Observable.removeListenerテスト
     */
    testRemoveListener : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;
        var f = function(value) {
            v = value;
        }

        o.addListener('testevent', f);

        o.fireEvent('testevent', true);

        me.assertOk(v);

        o.removeListener('testevent', f);

        o.fireEvent('testevent', false);

        me.assertOk(v);
    },

    // }}}
    // {{{ testUn

    /**
     * NX.util.Observable.unテスト
     */
    testUn : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;
        var f = function(value) {
            v = value;
        }

        o.on('testevent', f);

        o.fireEvent('testevent', true);

        me.assertOk(v);

        o.un('testevent', f);

        o.fireEvent('testevent', false);

        me.assertOk(v);
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
