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
