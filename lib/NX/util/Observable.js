/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFrameworkNX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.Observable

/**
 * @class NX.util.Observable
 *
 * Observableクラス
 */
NX.util.Observable = NX.extend(Object, {

    // @private
    isObservable: true,

    // @private
    eventOptionsRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|vertical|horizontal)$/,

    // {{{ constructor

    /**
     * コンストラクタ
     *
     * @param config コンフィグオプション
     */
    constructor: function(config) {

        var me = this;

        NX.apply(me, config);

        me.events = me.events || {};

        if (me.listeners) {
            me.on(me.listeners);
            delete me.listeners;
        }


        if (me.bubbleEvents) {
            me.enableBubble(me.bubbleEvents);
        }
    },

    // }}}
    // {{{ fireEvent

    /**
     * イベント発火メソッド
     */
    fireEvent: function() {

        var me = this,
            a = NX.toArray(arguments),
            ename = a[0].toLowerCase(),
            ret = true,
            ev = me.events[ename],
            queue = me.eventQueue,
            parent;

        if (me.eventsSuspended === true) {

            if (queue) {
                queue.push(a);
            }

            return false;

        } else if (ev && NX.isObject(ev) && ev.bubble) {

            if (ev.fire.apply(ev, a.slice(1)) === false) {
                return false;
            }

            parent = me.getBubbleTarget && me.getBubbleTarget();

            if (parent && parent.isObservable) {
                if (!parent.events[ename] || !NX.isObject(parent.events[ename]) || !parent.events[ename].bubble) {
                    parent.enableBubble(ename);
                }
                return parent.fireEvent.apply(parent, a);
            }
        } else if (ev && NX.isObject(ev)) {
            a.shift();
            ret = ev.fire.apply(ev, a);
        }

        return ret;
    },

    // }}}
    // {{{ addListener

    /**
     * リスナー追加メソッド
     */
    addListener: function(ename, fn, scope, o) {

        var me = this,
            config,
            ev;

        if(NX.isObject(ename)) {

            o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.addListener(ename, config.fn || config, config.scope || o.scope, config.fn ? config : o);
                }
            }

        } else {

            ename = ename.toLowerCase();

            me.events[ename] = me.events[ename] || true;

            ev = me.events[ename] || true;

            if(NX.isBoolean(ev)) {

                me.events[ename] = ev = new NX.util.Event(me, ename);

            }

            ev.addListener(fn, scope, NX.isObject(o) ? o: {});
        }
    },

    // }}}
    // {{{ removeListener

    removeListener: function(ename, fn, scope) {
        var me = this,
            config,
            ev;

        if (NX.isObject(ename)) {
            var o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.removeListener(ename, config.fn || config, config.scope || o.scope);
                }
            }
        }
        else {
            ename = ename.toLowerCase();
            ev = me.events[ename];
            if (ev.isEvent) {
                ev.removeListener(fn, scope);
            }
        }
    },

    // }}}
    // {{{ clearListeners

    clearListeners: function() {
        var events = this.events,
            ev,
            key;

        for (key in events) {
            if (!events.hasOwnProperty(key)) {
                continue;
            }
            ev = events[key];
            if (ev.isEvent) {
                ev.clearListeners();
            }
        }

        this.clearManagedListeners();
    },

    // }}}
    // {{{ purgeListeners

    purgeListeners : function() {
        console.warn('MixedCollection: purgeListeners has been deprecated. Please use clearListeners.');
        return this.clearListeners.apply(this, arguments);
    },

    // }}}
    // {{{ addEvents

    addEvents: function(o) {
        var me = this;
            me.events = me.events || {};
        if (NX.isString(o)) {
            var a = arguments,
            i = a.length;
            while (i--) {
                me.events[a[i]] = me.events[a[i]] || true;
            }
        } else {
            NX.applyIf(me.events, o);
        }
    },

    // }}}
    // {{{ suspendEvents

    suspendEvents: function(queueSuspended) {
        this.eventsSuspended = true;
        if (queueSuspended && !this.eventQueue) {
            this.eventQueue = [];
        }
    },

    // }}}
    // {{{ resumeEvents

    resumeEvents: function() {
        var me = this,
            queued = me.eventQueue || [];

        me.eventsSuspended = false;
        delete me.eventQueue;

        NX.each(queued,
        function(e) {
            me.fireEvent.apply(me, e);
        });
    },

    // }}}
    // {{{ relayEvents

    relayEvents : function(origin, events, prefix) {
        prefix = prefix || '';
        var me = this,
            len = events.length,
            i, ename;

        function createHandler(ename){
            return function(){
                return me.fireEvent.apply(me, [prefix + ename].concat(Array.prototype.slice.call(arguments, 0, -1)));
            };
        }

        for(i = 0, len = events.length; i < len; i++){
            ename = events[i].substr(prefix.length);
            me.events[ename] = me.events[ename] || true;
            origin.on(ename, createHandler(ename), me);
        }
    },

    // }}}
    // {{{ enableBubble

    enableBubble: function(events) {
        var me = this;
        if (!NX.isEmpty(events)) {
            events = NX.isArray(events) ? events: NX.toArray(arguments);
            NX.each(events,
            function(ename) {
                ename = ename.toLowerCase();
                var ce = me.events[ename] || true;
                if (NX.isBoolean(ce)) {
                    ce = new NX.util.Event(me, ename);
                    me.events[ename] = ce;
                }
                ce.bubble = true;
            });
        }
    }

    // }}}

});

// }}}
// {{{ shorthand

NX.override(NX.util.Observable, {

    on: NX.util.Observable.prototype.addListener,

    un: NX.util.Observable.prototype.removeListener

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
