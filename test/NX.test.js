/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

var NX = require('NX'),
    assert = require('assert');

// }}}
// {{{ NX Class Tests

module.exports = {

    'test version': function(){

        assert.ok(/^\d+\.\d+\.\d+$/.test(NX.version), 'Test framework version format');

    }

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
