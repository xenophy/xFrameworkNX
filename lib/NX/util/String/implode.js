/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.util.String
 */

// {{{ NX.util.String.implode

/**
 * @method implode
 */
module.exports = function(glue, pieces) {

    var i = '',
    retVal='',
    tGlue='',
    args = arguments,
    len = args.length;

    if(len === 1) {
        pieces = glue;
        glue = '';
    }

    if(NX.isArray(pieces)) {

        return pieces.join(glue);

    } else if(NX.isObject(pieces)) {

        NX.iterate(pieces, function(i, v) {
            retVal += tGlue + v;
            tGlue = glue;
        });

        return retVal;

    } else {

        return pieces;

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
