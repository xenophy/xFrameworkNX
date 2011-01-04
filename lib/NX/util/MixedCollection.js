/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFrameworkNX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.MixedCollection

/**
 * @class NX.util.MixedCollection
 * @extend NX.util.Observable
 */
NX.util.MixedCollection = NX.extend(NX.util.Observable, {

    // {{{ items

    items : [],

    // }}}
    // {{{ map

    map : {},

    // }}}
    // {{{ keys

    keys : [],

    // }}}
    // {{{ length

    length : 0,

    // }}}
    // {{{ allowFunctions

    allowFunctions : false,

    // }}}
    // {{{ constructor

    /**
     * @method MixedCollection
     */
    constructor : function(allowFunctions, keyFn) {

        var me = this;

        me.addEvents(
            'clear',
            'add',
            'replace',
            'remove',
            'sort'
        );

        me.allowFunctions = allowFunctions === true;

        if(NX.isFunction(keyFn)) {
            me.getKey = keyFn;
        }

        // スーパークラスメソッドコール
        NX.util.MixedCollection.superclass.constructor.call(me);
    },

    // }}}
    // {{{ add

    /**
     * @method add
     */
    add : function(key, obj) {

        var me = this,
            myObj = obj,
            myKey = key;

        if(arguments.length == 1) {
            myObj = myKey;
            myKey = me.getKey(myObj);
        }

        if(NX.isDefined(myKey) && !NX.isNull(myKey)) {

            if(NX.isDefined(me.map[myKey])) {
                return me.replace(myKey, myObj);
            }

            me.map[myKey] = myObj;
        }

        me.length++;
        me.items.push(myObj);
        me.keys.push(myKey);

        // イベント発火
        me.fireEvent('add', me.length - 1, myObj, myKey);

        return myObj;

    },

    // }}}
    // {{{ getKey

    /**
     * @method getKey
     */
    getKey : function(o) {

        o = o || {};
        return o.id;
    },

    // }}}
    // {{{ replace

    /**
     * @method replace
     */
    replace : function(key, o) {

        var me = this;

        if(arguments.length == 1) {
            o = arguments[0];
            key = me.getKey(o);
        }

        var old = me.map[key];

        if(!NX.isDefined(key) || NX.isNull(key) || !NX.isDefined(old)) {
             return me.add(key, o);
        }

        var index = me.indexOfKey(key);

        me.items[index] = o;
        me.map[key] = o;

        // イベント発火
        me.fireEvent('replace', key, old, o);

        return o;
    },

    // }}}
    // {{{ allAll

    /**
     * @method addAll
     */
    addAll : function(objs) {

        var me = this;

        if(arguments.length > 1 || NX.isArray(objs)) {

            var args = arguments.length > 1 ? arguments : objs;

            for(var i = 0, len = args.length; i < len; i++) {
                me.add(args[i]);
            }

        } else {

            for(var key in objs) {

                if(!objs.hasOwnProperty(key)) {
                    continue;
                }

                if(me.allowFunctions || typeof objs[key] != 'function') {
                    me.add(key, objs[key]);
                }
            }
        }
    },

    // }}}
    // {{{ each

    /**
     * @method each
     */
    each : function(fn, scope) {

        var me = this,
            items = [].concat(me.items);

        for(var i = 0, len = items.length; i < len; i++) {
            if(fn.call(scope || items[i], items[i], i, len) === false) {
                break;
            }
        }
    },

    // }}}
    // {{{ eachKey

    /**
     * @method eachKey
     */
    eachKey : function(fn, scope) {
        for(var i = 0, len = this.keys.length; i < len; i++) {
            fn.call(scope || window, this.keys[i], this.items[i], i, len);
        }
    },

    // }}}
    // {{{ findBy

    /**
     * @method findBy
     */
    findBy : function(fn, scope) {
        for(var i = 0, len = this.items.length; i < len; i++){
            if(fn.call(scope || window, this.items[i], this.keys[i])){
                return this.items[i];
            }
        }
        return null;
    },

    // }}}
    // {{{ insert

    /**
     * @method insert
     */
    insert : function(index, key, obj) {

        var me = this,
            myKey = key,
            myObj = obj;

        if(arguments.length == 2) {
            myObj = myKey;
            myKey = me.getKey(myObj);
        }

        if(me.containsKey(myKey)) {
            me.suspendEvents();
            me.removeByKey(myKey);
            me.resumeEvents();
        }

        if(index >= me.length){
            return me.add(myKey, myObj);
        }

        me.length++;
        me.items.splice(index, 0, myObj);

        if(typeof myKey != 'undefined' && myKey !== null){
            me.map[myKey] = myObj;
        }

        me.keys.splice(index, 0, myKey);
        me.fireEvent('add', index, myObj, myKey);

        return myObj;
    },

    // }}}
    // {{{ remove

    /**
     * @method remove
     */
    remove : function(o) {

        var me = this;

        return me.removeAt(me.indexOf(o));
    },

    // }}}
    // {{{ removeAll

    /**
     * @method removeAll
     */
    removeAll : function(items) {

        var me = this;

        NX.each(items || [], function(item) {
            me.remove(item);
        }, me);

        return me;
    },

    // }}}
    // {{{ removeAt

    /**
     * @method removeAt
     */
    removeAt : function(index) {

        var me = this;

        if(index < me.length && index >= 0) {

            me.length--;

            var o = me.items[index];

            me.items.splice(index, 1);

            var key = me.keys[index];

            if(typeof key != 'undefined') {
                delete me.map[key];
            }

            me.keys.splice(index, 1);
            me.fireEvent('remove', o, key);

            return o;
        }

        return false;
    },

    // }}}
    // {{{ removeByKey

    /**
     * @method removeByKey
     */
    removeByKey : function(key) {

        var me = this;

        return me.removeAt(me.indexOfKey(key));
    },

    // }}}
    // {{{ getCount

    /**
     * @method getCount
     */
    getCount : function() {

        var me = this;

        return me.length;
    },

    // }}}
    // {{{ indexOf

    /**
     * indexOf
     */
    indexOf : function(o) {

        var me = this;

        return me.items.indexOf(o);
    },

    // }}}
    // {{{ indexOfKey

    /**
     * @method indexOfKey
     */
    indexOfKey : function(key) {

        var me = this;

        return me.keys.indexOf(key);
    },

    // }}}
    // {{{ get

    /**
     * @method get
     */
    get : function(key) {

        var me = this,
            mk = me.map[key],

        item = mk !== undefined ? mk : (typeof key == 'number') ? me.items[key] : undefined;

        return typeof item != 'function' || me.allowFunctions ? item : null;
    },

    // }}}
    // {{{ getAt

    /**
     * @method getAt
     */
    getAt : function(index) {

        var me = this;

        return me.items[index];
    },

    // }}}
    // {{{ getByKey

    /**
     * @method getByKey
     */
    getByKey : function(key) {

        var me = this;

        return me.map[key];
    },

    // }}}
    // {{{ contains

    /**
     * @method contains
     */
    contains : function(o) {

        var me = this;

        return me.indexOf(o) != -1;
    },

    // }}}
    // {{{ containsKey

    /**
     * @method containsKey
     */
    containsKey : function(key) {

        var me = this;

        // TODO
        return typeof me.map[key] != 'undefined';
    },

    // }}}
    // {{{ clear

    /**
     * @method clear
     */
    clear : function() {

        var me = this;

        me.length = 0;
        me.items = [];
        me.keys = [];
        me.map = {};

        me.fireEvent('clear');
    },

    // }}}
    // {{{ first

    /**
     * @method first
     */
    first : function() {

        var me = this;

        return me.items[0];
    },

    // }}}
    // {{{ last

    /**
     * @method last
     */
    last : function() {

        var me = this;

        return me.items[me.length-1];
    },

    // }}}
    // {{{ _sort

    _sort : function(property, dir, fn){
        var me = this,
            i,
            len,
            dsc   = String(dir).toUpperCase() == 'DESC' ? -1 : 1,
            c     = [],
            keys  = me.keys,
            items = me.items;

        fn = fn || function(a, b) {
            return a - b;
        };

        for(i = 0, len = items.length; i < len; i++) {
            c[c.length] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        c.sort(function(a, b) {
            var v = fn(a[property], b[property]) * dsc;
            if(v === 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return v;
        });

        for(i = 0, len = c.length; i < len; i++) {
            items[i] = c[i].value;
            keys[i]  = c[i].key;
        }

        me.fireEvent('sort', me);
    },

    // }}}
    // {{{ sort

    /**
     * @method sort
     */
    sort : function(property, direction) {

        var sorters = property;

        if(NX.isString(property)) {

            // TODO
            sorters = [new NX.util.Sorter({
                property : property,
                direction: direction || "ASC"
            })];

        } else if (property instanceof NX.util.Sorter) {

            sorters = [property];

        } else if (NX.isObject(property)) {

            sorters = [new NX.util.Sorter(property)];

        }

        var length = sorters.length;

        if(length == 0) {
            return;
        }

        var sorterFn = function(r1, r2) {
            var result = sorters[0].sort(r1, r2),
                length = sorters.length,
                i;

                for (i = 1; i < length; i++) {
                    result = result || sorters[i].sort.call(this, r1, r2);
                }

            return result;
        };

        me.sortBy(sorterFn);
    },

    // }}}
    // {{{ sortBy

    /**
     * @method sortBy
     */
    sortBy: function(sorterFn) {
        var me = this,
            items  = me.items,
            keys   = me.keys,
            length = items.length,
            temp   = [],
            i;

        for(i = 0; i < length; i++) {
            temp[i] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        temp.sort(function(a, b) {
            var v = sorterFn(a.value, b.value);
            if(v === 0) {
                v = (a.index < b.index ? -1 : 1);
            }

            return v;
        });

        for(i = 0; i < length; i++) {
            items[i] = temp[i].value;
            keys[i]  = temp[i].key;
        }

        me.fireEvent('sort', me);
    },

    // }}}
    // {{{ reorder

    /**
     * @method reorder
     */
    reorder: function(mapping) {

        var me = this;

        me.suspendEvents();

        var items = me.items,
            index = 0,
            length = items.length,
            order = [],
            remaining = [],
            oldIndex;

        for(oldIndex in mapping) {
            order[mapping[oldIndex]] = items[oldIndex];
        }

        for(index = 0; index < length; index++) {
            if (mapping[index] == undefined) {
                remaining.push(items[index]);
            }
        }

        for(index = 0; index < length; index++) {
            if (order[index] == undefined) {
                order[index] = remaining.shift();
            }
        }

        me.clear();
        me.addAll(order);

        me.resumeEvents();
        me.fireEvent('sort', this);
    },

    // }}}
    // {{{ sortByKey

    /**
     * @method sortByKey
     */
    sortByKey : function(dir, fn) {

        var me = this;

        me._sort('key', dir, fn || function(a, b) {
            var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        });
    },

    // }}}
    // {{{ getRange

    /**
     * @method getRange
     */
    getRange : function(start, end) {

        var me = this,
            items = me.items;

        if(items.length < 1) {
            return [];
        }

        start = start || 0;
        end = Math.min(typeof end == 'undefined' ? me.length-1 : end, me.length-1);

        var i, r = [];
        if(start <= end) {
            for(i = start; i <= end; i++) {
                r[r.length] = items[i];
            }
        } else {
            for(i = start; i >= end; i--) {
                r[r.length] = items[i];
            }
        }

        return r;
    },

    // }}}
    // {{{ filter

    /**
     * @method filter
     */
    filter : function(property, value, anyMatch, caseSensitive) {

        var me = this,
            filters = [];

        if (NX.isString(property)) {

            // TODO
            filters.push(new NX.util.Filter({
                property     : property,
                value        : value,
                anyMatch     : anyMatch,
                caseSensitive: caseSensitive
            }));

        } else if(NX.isArray(property) || property instanceof NX.util.Filter) {
            filters = filters.concat(property);
        }

        var filterFn = function(record) {
            var isMatch = true,
                length = filters.length,
                i;

            for (i = 0; i < length; i++) {
                var filter = filters[i],
                    fn     = filter.filterFn,
                    scope  = filter.scope;

                isMatch = isMatch && fn.call(scope, record);
            }

            return isMatch;
        };

        return me.filterBy(filterFn);
    },

    // }}}
    // {{{ filterBy

    /**
     * @method filterBy
     */
    filterBy : function(fn, scope) {

        var me = this,
            newMC  = new NX.util.MixedCollection(),
            keys   = me.keys,
            items  = me.items,
            length = items.length,
            i;

        newMC.getKey = me.getKey;

        for(i = 0; i < length; i++) {
            if(fn.call(scope||me, items[i], keys[i])) {
                newMC.add(keys[i], items[i]);
            }
        }

        return newMC;
    },

    // }}}
    // {{{ findIndex

    /**
     * @method findIndex
     */
    findIndex : function(property, value, start, anyMatch, caseSensitive) {

        var me = this;

        if(NX.isEmpty(value, false)){
            return -1;
        }

        value = me.createValueMatcher(value, anyMatch, caseSensitive);

        return me.findIndexBy(function(o){
            return o && value.test(o[property]);
        }, null, start);
    },

    // }}}
    // {{{ findIndexBy

    /**
     * @method findIndexBy
     */
    findIndexBy : function(fn, scope, start) {

        var me = this,
            k = me.keys,
            it = me.items;

        for(var i = (start||0), len = it.length; i < len; i++) {
            if(fn.call(scope||me, it[i], k[i])) {
                return i;
            }
        }

        return -1;
    },

    // }}}
    // {{{ createValueMatcher

    /**
     * @method createValueMatcher
     */
    createValueMatcher : function(value, anyMatch, caseSensitive, exactMatch) {

        if(!value.exec) {
            var er = NX.util.Format.escapeRegex;
            value = String(value);

            if (anyMatch === true) {
                value = er(value);
            } else {
                value = '^' + er(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }
         return value;
    },

    // }}}
    // {{{ clone

    /**
     * @method clone
     */
    clone : function() {

        var me = this,
            r = new NX.util.MixedCollection(),
            k = me.keys,
            it = me.items;

        for(var i = 0, len = it.length; i < len; i++) {
            r.add(k[i], it[i]);
        }

        r.getKey = me.getKey;

        return r;
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
