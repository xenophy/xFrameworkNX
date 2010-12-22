/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

const submods = [
    'Format',
    'Functions',
    'String',
    'DelayedTask',
    'MarkDown',
    'MixedCollection',
    'Observable',
];

var main = {};

submods.forEach(function(mod) {
    main[mod] = require('./' + mod);
});

// }}}
// {{{ module.exports

module.exports = main;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
