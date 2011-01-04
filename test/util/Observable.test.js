/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('NX');
var assert = require('assert');

// }}}
// {{{ NX.util.Observable Class Tests

module.exports = {

    // {{{ test addEvents

    'test addEvents': function() {

        var obs = new NX.util.Observable();

        obs.addEvents('event1', 'event2');

        assert.equal(obs.events['event1'], true);
        assert.equal(obs.events['event2'], true);

    },

    // }}}
    // {{{ test addListener/on/fireEvent

    'test addListener/on/fireEvent': function(beforeExit) {

        var obs = new NX.util.Observable();

        obs.addEvents('event1', 'event2');

        var ret1;
        obs.addListener('event1', function() {
            ret1 = 'fired';
        });
        obs.fireEvent('event1');

        var ret2;
        obs.on('event2', function() {
            ret2 = 'fired';
        });
        obs.fireEvent('event2');

        beforeExit(function(){
            assert.equal(ret1, 'fired');
            assert.equal(ret2, 'fired');
        });

    },

    // }}}
    // {{{ test removeListener/un

    'test removeListener/un': function(beforeExit) {

        var obs = new NX.util.Observable();
        var ret = 0;
        var f = function() {
            ret++;
        };

        obs.addEvents('event1');

        obs.on('event1', f);
        obs.fireEvent('event1');
        obs.un('event1', f);
        obs.fireEvent('event1');

        beforeExit(function(){
            assert.equal(ret, 1);
        });

    },

    // }}}
    // {{{ test clearListener

    'test clearListener': function(beforeExit) {

        var obs = new NX.util.Observable();
        var ret = 0;
        var f = function() {
            ret++;
        };

        obs.addEvents('event1', 'event2', 'event3');

        obs.on('event1', f);
        obs.on('event2', f);
        obs.on('event3', f);

        obs.clearListeners();

        obs.fireEvent('event1');
        obs.fireEvent('event2');
        obs.fireEvent('event3');

        beforeExit(function(){
            assert.equal(ret, 0);
        });

    },

    // }}}
    // {{{ test resumeEvents/suspendEvents

    'test resumeEvents/suspendEvents': function(beforeExit) {

        var obs = new NX.util.Observable();
        var ret = 0;
        var f = function() {
            ret++;
        };

        obs.addEvents('event1');

        obs.on('event1', f);

        obs.suspendEvents();

        obs.fireEvent('event1');

        assert.equal(ret, 0);

        obs.resumeEvents();

        obs.fireEvent('event1');

        assert.equal(ret, 1);

        obs.suspendEvents(true);

        obs.fireEvent('event1');

        assert.equal(ret, 1);

        obs.resumeEvents();

        assert.equal(ret, 2);

    },

    // }}}
    // {{{ test relayEvents

    'test relayEvents': function(beforeExit) {

        var ret;

        var org = new NX.util.Observable();
        org.addEvents('event1');

        org.on('event1', function() {
        });

        var obs = new NX.util.Observable();
        obs.addEvents('event1');

        obs.on('event1', function() {
            ret = 'fired';
        });

        obs.relayEvents(org, ['event1']);

        org.fireEvent('event1');

        assert.equal(ret, 'fired');

    },

    // }}}
    // {{{ test enableBubble

    'test enableBubble': function(beforeExit) {

        var ret;

        var org = new NX.util.Observable();
        org.addEvents('event1');

        org.on('event1', function() {
            ret = 'fired';
        });

        var obs = new NX.util.Observable();
        obs.addEvents('event1');
        obs.getBubbleTarget = function() {
            return org;
        };
        obs.enableBubble('event1');

        obs.fireEvent('event1');

        assert.equal(ret, 'fired');

    }

    // }}}

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
