/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.MixedCollectionTestCase

/**
 * @class NX.util.MixedCollectionTestCase
 *
 * NX.util.MixedCollection Class TestCase
 */
NX.util.MixedCollectionTestCase = NX.extend(NX.test.unit.TestCase, {

    // {{{ testAdd

    /**
     * NX.util.MixedCollection.addテスト
     */
    testAdd : function() {

        var me = this,
            mix,
            f1,
            f2;

        f1 = function(len, obj, key) {
            me.assertStrictEqual(len, 0);
            me.assertStrictEqual(obj, 'testValue');
            me.assertStrictEqual(key, 'testKey');
        };

        f2 = function(len, obj, key) {
            me.assertStrictEqual(len, 1);
            me.assertStrictEqual(obj, 'testValue2');
            me.assertStrictEqual(key, undefined);
        };

        mix = new NX.util.MixedCollection();

        mix.on('add', f1);
        mix.add('testKey', 'testValue');
        mix.un('add', f1);

        me.assertStrictEqual(mix.items[0], 'testValue');
        me.assertStrictEqual(mix.keys[0], 'testKey');
        me.assertStrictEqual(mix.map.testKey, 'testValue');
        me.assertStrictEqual(mix.length, 1);

        mix.on('add', f2);
        mix.add('testValue2');
        mix.un('add', f2);

        me.assertStrictEqual(mix.items[1], 'testValue2');
        me.assertStrictEqual(mix.keys[2], undefined);
        me.assertStrictEqual(mix.length, 2);

    },

    // }}}
    // {{{ testGetKey

    /**
     * NX.util.MixedCollection.getKeyテスト
     */
    testGetKey : function() {

        var me = this,
            mix;

        mix = new NX.util.MixedCollection();

        mix.add('testKey', 'testValue');

        me.assertStrictEqual(mix.getKey({id: 'test'}), 'test');
        me.assertStrictEqual(mix.getKey({}), undefined);
        me.assertStrictEqual(mix.getKey(), undefined);

    },

    // }}}
    // {{{ testReplace

    /**
     * NX.util.MixedCollection.replaceテスト
     */
    testReplace : function() {

    },

    // }}}
    // {{{ testAddAll

    /**
     * NX.util.MixedCollection.addAllテスト
     */
    testAddAll : function() {

    },

    // }}}
    // {{{ testEach

    /**
     * NX.util.MixedCollection.eachテスト
     */
    testEach : function() {

    },

    // }}}
    // {{{ testEachKey

    /**
     * NX.util.MixedCollection.eachKeyテスト
     */
    testEachKey : function() {

    },

    // }}}
    // {{{ testFindBy

    /**
     * NX.util.MixedCollection.findByテスト
     */
    testFindBy : function() {

    },

    // }}}
    // {{{ testInsert

    /**
     * NX.util.MixedCollection.insertテスト
     */
    testInsert : function() {

    },

    // }}}
    // {{{ testRemove

    /**
     * NX.util.MixedCollection.removeテスト
     */
    testRemove : function() {

    },

    // }}}
    // {{{ testRemoveAll

    /**
     * NX.util.MixedCollection.removeAllテスト
     */
    testRemoveAll : function() {

    },

    // }}}
    // {{{ testRemoveAt

    /**
     * NX.util.MixedCollection.removeAtテスト
     */
    testRemoveAt : function() {

    },

    // }}}
    // {{{ testRemoveByKey

    /**
     * NX.util.MixedCollection.removeByKeyテスト
     */
    testRemoveByKey : function() {

    },

    // }}}
    // {{{ testGetCount

    /**
     * NX.util.MixedCollection.getCountテスト
     */
    testGetCount : function() {

    },

    // }}}
    // {{{ testIndexOf

    /**
     * NX.util.MixedCollection.indexOfテスト
     */
    testIndexOf : function() {

    },

    // }}}
    // {{{ testIndexOfKey

    /**
     * NX.util.MixedCollection.indexOfKeyテスト
     */
    testIndexOfKey : function() {

    },

    // }}}
    // {{{ testGet

    /**
     * NX.util.MixedCollection.getテスト
     */
    testGet : function() {

    },

    // }}}
    // {{{ testGetAt

    /**
     * NX.util.MixedCollection.getAtテスト
     */
    testGetAt : function() {

    },

    // }}}
    // {{{ testGetByKey

    /**
     * NX.util.MixedCollection.getByKeyテスト
     */
    testGetByKey : function() {

    },

    // }}}
    // {{{ testContains

    /**
     * NX.util.MixedCollection.containsテスト
     */
    testContains : function() {

    },

    // }}}
    // {{{ testContainsKey

    /**
     * NX.util.MixedCollection.containsKeyテスト
     */
    testContainsKey : function() {

    },

    // }}}
    // {{{ testClear

    /**
     * NX.util.MixedCollection.clearテスト
     */
    testClear : function() {

    },

    // }}}
    // {{{ testFirst

    /**
     * NX.util.MixedCollection.firstテスト
     */
    testFirst : function() {

    },

    // }}}
    // {{{ testLast

    /**
     * NX.util.MixedCollection.lastテスト
     */
    testLast : function() {

    },

    // }}}
    // {{{ testSort

    /**
     * NX.util.MixedCollection.sortテスト
     */
    testSort : function() {

    },

    // }}}
    // {{{ testSortBy

    /**
     * NX.util.MixedCollection.sortByテスト
     */
    testSortBy : function() {

    },

    // }}}
    // {{{ testSortByKey

    /**
     * NX.util.MixedCollection.sortByKeyテスト
     */
    testSortByKey : function() {

    },

    // }}}
    // {{{ testReorder

    /**
     * NX.util.MixedCollection.reorderテスト
     */
    testReorder : function() {

    },

    // }}}
    // {{{ testGetRange

    /**
     * NX.util.MixedCollection.getRangeテスト
     */
    testGetRange : function() {

    },

    // }}}
    // {{{ testFilter

    /**
     * NX.util.MixedCollection.filterテスト
     */
    testFilter : function() {

    },

    // }}}
    // {{{ testFilterBy

    /**
     * NX.util.MixedCollection.filterByテスト
     */
    testFilterBy : function() {

    },

    // }}}
    // {{{ testFindIndex

    /**
     * NX.util.MixedCollection.findIndexテスト
     */
    testFindIndex : function() {

    },

    // }}}
    // {{{ testFindIndexBy

    /**
     * NX.util.MixedCollection.findIndexByテスト
     */
    testFindIndexBy : function() {

    },

    // }}}
    // {{{ testCreateValueMatcher

    /**
     * NX.util.MixedCollection.createValueMatcherテスト
     */
    testCreateValueMatcher : function() {

    },

    // }}}
    // {{{ testClone

    /**
     * NX.util.MixedCollection.cloneテスト
     */
    testClone : function() {

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
