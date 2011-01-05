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
// {{{ NX.util.MixedCollection Class Tests

module.exports = {

    // {{{ test MixedCollection keyFn

    'test MixedCollection keyFn': function() {

        var mc = new NX.util.MixedCollection(false, function(o) {
            return o.seq;
        });

        mc.add({seq:'data0', data: 'text0'});
        mc.add({seq:'data1', data: 'text1'});
        mc.add({seq:'data2', data: 'text2'});
        mc.add({seq:'data3', data: 'text3'});
        mc.add({seq:'data4', data: 'text4'});

        assert.equal(mc.get('data2').data, 'text2');

        delete mc;

    },

    // }}}
    // {{{ test add#standard

    'test add#standard': function() {

        var mc = new NX.util.MixedCollection();

        var o = {foo: 'bar'};
        var arr = [1,2,3,4,5];
        var f = function() {
            return 'test function';
        };

        mc.add('key1', 'value1');
        mc.add('key2', 123);
        mc.add('key3', true);
        mc.add('key4', o);
        mc.add('key5', f);
        mc.add('key6', arr);

        assert.equal(mc.map['key1'], 'value1');
        assert.equal(mc.map['key2'], 123);
        assert.equal(mc.map['key3'], true);
        assert.equal(mc.map['key4'], o);
        assert.equal(mc.map['key5'](), 'test function');
        assert.equal(mc.map['key6'], arr);

        mc.add('key3', false);

        assert.equal(mc.map['key3'], false);

        delete mc;
    },

    // }}}
    // {{{ test getKey#standard

    'test getKey#standard': function() {

        var mc = new NX.util.MixedCollection();

        assert.equal(mc.getKey({ id: 'id1' }), 'id1');

        delete mc;
    },

    // }}}
    // {{{ test replace#standard

    'test replace#standard': function() {

        var mc = new NX.util.MixedCollection();

        var event = false;
        mc.on('replace', function() {
            event = true;
        });
        mc.add('key1', 'value1');
        mc.replace('key1', 'replace1');

        assert.equal(mc.map['key1'], 'replace1');
        assert.equal(event, true);

        delete mc;
    },

    // }}}
    // {{{ test replace one args

    'test replace one args': function() {

        var mc = new NX.util.MixedCollection();

        mc.add('data1');
        mc.add('data2');
        mc.add('data3');

        mc.replace('data4');

        assert.equal(mc.getCount(), 4);

    },

    // }}}
    // {{{ test addAll#standard

    'test addAll#standard': function() {

        var mc = new NX.util.MixedCollection();

        mc.addAll({
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        });

        assert.equal(mc.map['key1'], 'value1');
        assert.equal(mc.map['key2'], 'value2');
        assert.equal(mc.map['key3'], 'value3');

    },

    // }}}
    // {{{ test addAll#args

    'test addAll#args': function() {

        var mc = new NX.util.MixedCollection();

        mc.addAll('value1', 'value2', 'value3');

        assert.equal(mc.items[0], 'value1');
        assert.equal(mc.items[1], 'value2');
        assert.equal(mc.items[2], 'value3');

    },

    // }}}
    // {{{ test each#standerd

    'test each#standerd': function() {

        var mc = new NX.util.MixedCollection();

        mc.addAll('value1', 'value2', 'value3');

        mc.each(function(item, i) {

            if(i === 0) {
                assert.equal(item, 'value1');
            } else if(i === 1) {
                assert.equal(item, 'value2');
            } else if(i === 2) {
                assert.equal(item, 'value3');
            }

        });

        var cnt = 0;
        mc.each(function(item, i) {
            if(i === 1) {
                return false;
            }
            cnt++;
        });

        assert.equal(cnt, 1);
    },

    // }}}
    // {{{ test eachKey#standerd

    'test eachKey#standerd': function() {

        var mc = new NX.util.MixedCollection();

        mc.addAll({
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        });

        mc.eachKey(function(key, i) {

            if(i === 0) {
                assert.equal(key, 'key1');
            } else if(i === 1) {
                assert.equal(key, 'key2');
            } else if(i === 2) {
                assert.equal(key, 'key3');
            }

        });

    },

    // }}}
    // {{{ test find#standerd

    'test find#standerd': function() {

        var mc = new NX.util.MixedCollection();

        mc.addAll({
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        });

        var o = mc.find(function(item, key) {
            if(item == 'value2' && key == 'key2') {
                return true;
            }
        });

        assert.equal(o, 'value2');

        var o = mc.find(function(item, key) {
            if(item == 'value1' && key == 'key2') {
                return true;
            }
        });

        assert.equal(o, null);

    },

    // }}}
    // {{{ test insert/remove#standerd

    'test insert/remove#standerd': function() {

        var mc = new NX.util.MixedCollection();

        mc.addAll({
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        });

        mc.insert(1, 'insert');

        assert.equal(mc.items[1], 'insert');

        mc.insert(1, 'key2', 'insert2');

        assert.equal(mc.items[1], 'insert2');
        assert.equal(mc.map['key2'], 'insert2');

        mc.insert(100, 'keyEnd', 'insert3');

        assert.equal(mc.items[4], 'insert3');

        var o = {foo: 'bar'};
        mc.insert(100, o);

        assert.equal(mc.items[5].foo, 'bar');

        mc.remove(o);

        assert.equal(mc.items[5], undefined);

        mc.removeAt(0);

        assert.equal(mc.items[0], 'insert2');

        mc.removeAt(100);

        assert.equal(mc.getCount(), 4);

        assert.equal(mc.itemAt(2), 'value3');

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
