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
