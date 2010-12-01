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
 * NX.util.Observable Class TestCase
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
        me.assertStrictEqual(v, 'Fired Event2');

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
    },

    // }}}
    // {{{ testClearListeners

    /**
     * NX.util.Observable.clearListenersテスト
     */
    testClearListeners : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;
        var f = function(value) {
            v = value;
        }

        o.on('event1', f);
        o.on('event2', f);
        o.on('event3', f);

        o.fireEvent('event1', 'Event1');

        me.assertStrictEqual(v, 'Event1');

        o.fireEvent('event2', 'Event2');

        me.assertStrictEqual(v, 'Event2');

        o.fireEvent('event3', 'Event3');

        me.assertStrictEqual(v, 'Event3');

        o.clearListeners();

        o.fireEvent('event1', 'Event1');
        me.assertStrictEqual(v, 'Event3');

        o.fireEvent('event2', 'Event1');
        me.assertStrictEqual(v, 'Event3');

        o.fireEvent('event3', 'Event1');
        me.assertStrictEqual(v, 'Event3');

    },

    // }}}
    // {{{ testSuspendEvents

    /**
     * NX.util.Observable.suspendEventsテスト
     */
    testSuspendEvents : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;
        var f = function(value) {
            v = value;
        }

        o.on('event1', f);
        o.on('event2', f);
        o.on('event3', f);

        o.fireEvent('event1', 'Event1');
        me.assertStrictEqual(v, 'Event1');

        o.suspendEvents();

        o.fireEvent('event2', 'Event2');
        me.assertStrictEqual(v, 'Event1');

        o.fireEvent('event3', 'Event3');
        me.assertStrictEqual(v, 'Event1');

    },

    // }}}
    // {{{ testResumeEvents

    /**
     * NX.util.Observable.resumeEventsテスト
     */
    testResumeEvents : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;
        var f = function(value) {
            v = value;
        }

        o.on('event1', f);
        o.on('event2', f);
        o.on('event3', f);

        o.fireEvent('event1', 'Event1');
        me.assertStrictEqual(v, 'Event1');

        o.suspendEvents();

        o.fireEvent('event2', 'Event2');
        me.assertStrictEqual(v, 'Event1');

        o.fireEvent('event3', 'Event3');
        me.assertStrictEqual(v, 'Event1');

        o.resumeEvents();

        o.fireEvent('event2', 'Event2');
        me.assertStrictEqual(v, 'Event2');

        o.fireEvent('event3', 'Event3');
        me.assertStrictEqual(v, 'Event3');

        o.fireEvent('event1', 'Event1');
        me.assertStrictEqual(v, 'Event1');

        o.suspendEvents(true);

        o.fireEvent('event2', 'Event2');
        me.assertStrictEqual(v, 'Event1');

        o.fireEvent('event3', 'Event3');
        me.assertStrictEqual(v, 'Event1');

        o.resumeEvents();

        me.assertStrictEqual(v, 'Event3');

    },

    // }}}
    // {{{ testRelayEvents

    /**
     * NX.util.Observable.relayEventsテスト
     */
    testRelayEvents : function() {

        var me = this;

        var op = new NX.util.Observable();
        var o = new NX.util.Observable();
        var v;
        var fp = function(value) {
            v = 'Parent! ' + value;
        }
        var f = function(value) {
            v = value;
        }

        op.addEvents('parentevent');

        op.on('parentevent', fp);

        o.relayEvents(op, ['parentevent']);

        o.on('parentevent', f);

        op.fireEvent('parentevent', 'fired');

        me.assertStrictEqual(v, 'fired');

    },

    // }}}
    // {{{ testEnableBubble

    /**
     * NX.util.Observable.enableBubbleテスト
     */
    testEnableBubble : function() {

        var me = this;

        var op = new NX.util.Observable();
        var o = new NX.util.Observable();
        var v;

        o.enableBubble('event1');

        o.getBubbleTarget = function() {
            return op;
        };

        op.on('event1', function() {
            v = 'event1 called';
        });

        o.fireEvent('event1');

        me.assertStrictEqual(v, 'event1 called');

    },

    // }}}
    // {{{ testCapture

    /**
     * NX.util.Observable.testCaptureテスト
     */
    testCapture : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;

        NX.util.Observable.capture(o, function(ename, value) {
            v = value;
        });

        o.fireEvent('event1', 'event1 called');

        me.assertStrictEqual(v, 'event1 called');

    },

    // }}}
    // {{{ testReleaseCapture

    /**
     * NX.util.Observable.testReleaseCaptureテスト
     */
    testReleaseCapture : function() {

        var me = this;

        var o = new NX.util.Observable();
        var v;
        var f = function(ename, value) {
            v = value;
        }

        NX.util.Observable.capture(o, f);

        o.fireEvent('event1', 'event1 called');

        me.assertStrictEqual(v, 'event1 called');

        v = undefined;
        NX.util.Observable.releaseCapture(o, f);

        o.fireEvent('event1', 'event1 called');

        me.assertStrictEqual(v, undefined);
    },

    // }}}
    // {{{ testObserve

    /**
     * NX.util.Observable.observeテスト
     */
    testObserve : function() {

        var me = this;
        var o = {};
        var v;

        NX.util.Observable.observe(o, {
            'event1' : function() {
                v = 'event1 called';
            }
        });

        o.fireEvent('event1');

        me.assertStrictEqual(v, 'event1 called');

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
