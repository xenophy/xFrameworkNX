/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

var assert = require('assert'),
    fs = require('fs'),
    sys = require('sys'),
    util = require('util');

/**
 * @class NX
 */
NX = require('./version');

const submods = [
    'apply',
    'applyIf',
    'each',
    'emptyFn',
    'extend',
    'isArray',
    'isBoolean',
    'isDate',
    'isDefined',
    'isEmpty',
    'isFunction',
    'isIterable',
    'isNumber',
    'isObject',
    'isPrimitive',
    'isString',
    'iterate',
    'namespace',
    'override',
    'sleep',
    'toArray',
    'AbstractManager',
    'fs',
    'util',
];

submods.forEach(function(mod) {
    NX[mod] = require('./' + mod);
});

// }}}
// {{{ module.exports

module.exports = NX;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
