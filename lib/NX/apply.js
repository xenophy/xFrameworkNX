/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.apply

/**
 * @method apply
 */
module.exports = function(o, config, defaults) {

    if(defaults) {
        NX.apply(o, defaults);
    }

    if(o && config && typeof config === 'object') {

        for(var key in config) {
            o[key] = config[key];
        }

        if(config.toString !== Object.prototype.toString) {
            o.toString = config.toString;
        }

        if(config.valueOf !== Object.prototype.valueOf) {
            o.valueOf = config.valueOf;
        }

    }

    return o;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
