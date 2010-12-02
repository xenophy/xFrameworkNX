/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFrameworkNX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.MixedCollection

/**
 * @class NX.util.MixedCollection
 *
 * ユニットテストクラス
 *
 * @singleton
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
     * コンストラクタ
     *
     * @param {Boolean} allowFunctions
     * @param {Function} keyFn
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
     * 追加メソッド
     */
    add : function(key, obj) {

        var me = this,
            myObj = obj,
            myKey = key;

        if(arguments.length == 1) {
            myObj = myKey;
            myKey = me.getKey(myObj);
        }

        if(typeof myKey != 'undefined' && myKey !== null) {

            var old = me.map[myKey];

            if(typeof old != 'undefined'){
                return me.replace(myKey, myObj);
            }

            me.map[myKey] = myObj;

        }

        me.length++;
        me.items.push(myObj);
        me.keys.push(myKey);

        // イベント発火
        me.fireEvent('add', me.length-1, myObj, myKey);

        return myObj;

    },

    // }}}
    // {{{ getKey

    getKey : function(o) {

        o = o || {};

        return o.id;
    },

    // }}}
    // {{{ replace

    replace : function(key, o){

        var me = this;

        if(arguments.length == 1) {
            o = arguments[0];
            key = me.getKey(o);
        }

        var old = me.map[key];

        if(
            typeof key == 'undefined' ||
            key === null ||
            typeof old == 'undefined'
        ) {
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

    addAll : function(objs){
        if(arguments.length > 1 || NX.isArray(objs)){
            var args = arguments.length > 1 ? arguments : objs;
            for(var i = 0, len = args.length; i < len; i++){
                this.add(args[i]);
            }
        }else{
            for(var key in objs){
                if (!objs.hasOwnProperty(key)) {
                    continue;
                }
                if(this.allowFunctions || typeof objs[key] != 'function'){
                    this.add(key, objs[key]);
                }
            }
        }
    },

    // }}}
    // {{{ each

    each : function(fn, scope){
        var items = [].concat(this.items); // each safe for removal
        for(var i = 0, len = items.length; i < len; i++){
            if(fn.call(scope || items[i], items[i], i, len) === false){
                break;
            }
        }
    },

    // }}}
    // {{{ eachKey

    eachKey : function(fn, scope){
        for(var i = 0, len = this.keys.length; i < len; i++){
            fn.call(scope || window, this.keys[i], this.items[i], i, len);
        }
    },

    // }}}
    // {{{ findBy

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

    insert : function(index, key, obj){
        var myKey = key, myObj = obj;
        if(arguments.length == 2){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(this.containsKey(myKey)){
            this.suspendEvents();
            this.removeByKey(myKey);
            this.resumeEvents();
        }
        if(index >= this.length){
            return this.add(myKey, myObj);
        }
        this.length++;
        this.items.splice(index, 0, myObj);
        if(typeof myKey != 'undefined' && myKey !== null){
            this.map[myKey] = myObj;
        }
        this.keys.splice(index, 0, myKey);
        this.fireEvent('add', index, myObj, myKey);
        return myObj;
    },

    // }}}
    // {{{ remove

    remove : function(o){
        return this.removeAt(this.indexOf(o));
    },

    // }}}
    // {{{ removeAll

    removeAll : function(items){
        NX.each(items || [], function(item) {
            this.remove(item);
        }, this);

        return this;
    },

    // }}}
    // {{{ removeAt

    removeAt : function(index){
        if(index < this.length && index >= 0){
            this.length--;
            var o = this.items[index];
            this.items.splice(index, 1);
            var key = this.keys[index];
            if(typeof key != 'undefined'){
                delete this.map[key];
            }
            this.keys.splice(index, 1);
            this.fireEvent('remove', o, key);
            return o;
        }
        return false;
    },

    // }}}
    // {{{ removeByKey

    removeByKey : function(key){
        return this.removeAt(this.indexOfKey(key));
    },

    // }}}
    // {{{ getCount

    getCount : function(){
        return this.length;
    },

    // }}}
    // {{{ indexOf

    indexOf : function(o){
        return this.items.indexOf(o);
    },

    // }}}
    // {{{ indexOfKey

    indexOfKey : function(key){
        return this.keys.indexOf(key);
    },

    // }}}
    // {{{ get

    get : function(key) {
        var mk = this.map[key],
        item = mk !== undefined ? mk : (typeof key == 'number') ? this.items[key] : undefined;
        return typeof item != 'function' || this.allowFunctions ? item : null; // for prototype!
    },

    // }}}
    // {{{ getAt

    getAt : function(index) {
        return this.items[index];
    },

    // }}}
    // {{{ getByKey

    getByKey : function(key) {
        return this.map[key];
    },

    // }}}
    // {{{ contains

    contains : function(o){
        return this.indexOf(o) != -1;
    },

    // }}}
    // {{{ containsKey

    containsKey : function(key){
        return typeof this.map[key] != 'undefined';
    },

    // }}}
    // {{{ clear

    clear : function(){
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent('clear');
    },

    // }}}
    // {{{ first

    first : function() {
        return this.items[0];
    },

    // }}}
    // {{{ last

    last : function() {
        return this.items[this.length-1];
    },

    // }}}
    // {{{ _sort

    _sort : function(property, dir, fn){
        var i, len,
            dsc   = String(dir).toUpperCase() == 'DESC' ? -1 : 1,

            //this is a temporary array used to apply the sorting function
            c     = [],
            keys  = this.keys,
            items = this.items;

        //default to a simple sorter function if one is not provided
        fn = fn || function(a, b) {
            return a - b;
        };

        //copy all the items into a temporary array, which we will sort
        for(i = 0, len = items.length; i < len; i++){
            c[c.length] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        //sort the temporary array
        c.sort(function(a, b){
            var v = fn(a[property], b[property]) * dsc;
            if(v === 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return v;
        });

        //copy the temporary array back into the main this.items and this.keys objects
        for(i = 0, len = c.length; i < len; i++){
            items[i] = c[i].value;
            keys[i]  = c[i].key;
        }

        this.fireEvent('sort', this);
    },

    // }}}
    // {{{ sort

    sort : function(property, direction) {
        //in case we were passed an array of sorters
        var sorters = property;

        //support for the simple case of sorting by property/direction
        if (NX.isString(property)) {
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

        if (length == 0) {
            return;
        }

        //construct an amalgamated sorter function which combines all of the Sorters passed
        var sorterFn = function(r1, r2) {
            var result = sorters[0].sort(r1, r2),
                length = sorters.length,
                i;

                //if we have more than one sorter, OR any additional sorter functions together
                for (i = 1; i < length; i++) {
                    result = result || sorters[i].sort.call(this, r1, r2);
                }

            return result;
        };

        this.sortBy(sorterFn);
    },

    // }}}
    // {{{ sortBy

    sortBy: function(sorterFn) {
        var items  = this.items,
            keys   = this.keys,
            length = items.length,
            temp   = [],
            i;

        //first we create a copy of the items array so that we can sort it
        for (i = 0; i < length; i++) {
            temp[i] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        temp.sort(function(a, b) {
            var v = sorterFn(a.value, b.value);
            if (v === 0) {
                v = (a.index < b.index ? -1 : 1);
            }

            return v;
        });

        //copy the temporary array back into the main this.items and this.keys objects
        for (i = 0; i < length; i++) {
            items[i] = temp[i].value;
            keys[i]  = temp[i].key;
        }

        this.fireEvent('sort', this);
    },

    // }}}
    // {{{ reorder

    reorder: function(mapping) {
        this.suspendEvents();

        var items = this.items,
            index = 0,
            length = items.length,
            order = [],
            remaining = [],
            oldIndex;

        //object of {oldPosition: newPosition} reversed to {newPosition: oldPosition}
        for (oldIndex in mapping) {
            order[mapping[oldIndex]] = items[oldIndex];
        }

        for (index = 0; index < length; index++) {
            if (mapping[index] == undefined) {
                remaining.push(items[index]);
            }
        }

        for (index = 0; index < length; index++) {
            if (order[index] == undefined) {
                order[index] = remaining.shift();
            }
        }

        this.clear();
        this.addAll(order);

        this.resumeEvents();
        this.fireEvent('sort', this);
    },

    // }}}
    // {{{ sortByKey

    sortByKey : function(dir, fn){
        this._sort('key', dir, fn || function(a, b){
            var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        });
    },

    // }}}
    // {{{ getRange

    getRange : function(start, end){
        var items = this.items;
        if(items.length < 1){
            return [];
        }
        start = start || 0;
        end = Math.min(typeof end == 'undefined' ? this.length-1 : end, this.length-1);
        var i, r = [];
        if(start <= end){
            for(i = start; i <= end; i++) {
                r[r.length] = items[i];
            }
        }else{
            for(i = start; i >= end; i--) {
                r[r.length] = items[i];
            }
        }
        return r;
    },

    // }}}
    // {{{ filter

    filter : function(property, value, anyMatch, caseSensitive) {
        var filters = [];

        //support for the simple case of filtering by property/value
        if (NX.isString(property)) {
            filters.push(new NX.util.Filter({
                property     : property,
                value        : value,
                anyMatch     : anyMatch,
                caseSensitive: caseSensitive
            }));
        } else if (NX.isArray(property) || property instanceof NX.util.Filter) {
            filters = filters.concat(property);
        }

        //at this point we have an array of zero or more NX.util.Filter objects to filter with,
        //so here we construct a function that combines these filters by ANDing them together
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

        return this.filterBy(filterFn);
    },

    // }}}
    // {{{ filterBy

    filterBy : function(fn, scope) {
        var newMC  = new NX.util.MixedCollection(),
            keys   = this.keys,
            items  = this.items,
            length = items.length,
            i;

        newMC.getKey = this.getKey;

        for (i = 0; i < length; i++) {
            if (fn.call(scope||this, items[i], keys[i])) {
                newMC.add(keys[i], items[i]);
            }
        }

        return newMC;
    },

    // }}}
    // {{{ findIndex

    findIndex : function(property, value, start, anyMatch, caseSensitive){
        if(NX.isEmpty(value, false)){
            return -1;
        }
        value = this.createValueMatcher(value, anyMatch, caseSensitive);
        return this.findIndexBy(function(o){
            return o && value.test(o[property]);
        }, null, start);
    },

    // }}}
    // {{{ findIndexBy

    findIndexBy : function(fn, scope, start){
        var k = this.keys, it = this.items;
        for(var i = (start||0), len = it.length; i < len; i++){
            if(fn.call(scope||this, it[i], k[i])){
                return i;
            }
        }
        return -1;
    },

    // }}}
    // {{{ createValueMatcher

    createValueMatcher : function(value, anyMatch, caseSensitive, exactMatch) {
        if (!value.exec) { // not a regex
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

    clone : function(){
        var r = new NX.util.MixedCollection();
        var k = this.keys, it = this.items;
        for(var i = 0, len = it.length; i < len; i++){
            r.add(k[i], it[i]);
        }
        r.getKey = this.getKey;
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
