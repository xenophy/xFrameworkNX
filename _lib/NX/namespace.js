/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.namespace

/**
 * @method namespace
 */
module.exports = NX.ns = function() {

    var o, p, g = global;

    NX.iterate(arguments, function(v) {

        p = v.split(".");
        o = g[p[0]] = Object(g[p[0]]);

        for(x = 1, xln = p.length; x < xln; x++) {
            o = o[p[x]] = Object(o[p[x]]);
        }

    });

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
