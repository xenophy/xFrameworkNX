/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.util.String
 */

// {{{ NX.util.String.explode

/**
 * @method explode
 */
module.exports = function(delimiter, string, limit) {

    var args = arguments,
    len = args.length;

    if(len < 2 || !NX.isDefined(args[0]) || !NX.isDefined(args[1])) {
        return null;
    }

    if(delimiter === '' || delimiter === false || delimiter === null ) {
        return false;
    }

    if(
        NX.isFunction(delimiter) ||
                NX.isObject(delimiter) ||
                        NX.isFunction(string) ||
                                NX.isObject(string)
    ) {
        return [];
    }

    if(delimiter === true) {
        delimiter = '1';
    }

    if(!limit) {
        return string.toString().split(delimiter.toString());
    } else {
        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;
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
