/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.applyIf

/**
 * @method applyIf
 */
module.exports = function(target, config) {

    if(NX.isObject(target)) {

        NX.iterate(config, function(prop, v) {

            if(target[prop] == undefined) {
                target[prop] = v;
            }

        });

    }

    return target;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
