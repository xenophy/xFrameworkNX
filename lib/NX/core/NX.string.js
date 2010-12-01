/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Implement NX String Utility

NX.apply(NX, {

    // {{{ strpos

    strpos : function(haystack, needle, offset) {
        var i = (haystack+'').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
    },

    // }}}
    // {{{ explode

    explode : function(delimiter, string, limit) {

        var emptyArray = { 0: '' };

        if ( arguments.length < 2 ||
            typeof arguments[0] == 'undefined' ||
                    typeof arguments[1] == 'undefined' ) {
            return null;
        }

        if ( delimiter === '' ||
            delimiter === false ||
                    delimiter === null ) {
            return false;
        }

        if ( typeof delimiter == 'function' ||
            typeof delimiter == 'object' ||
                    typeof string == 'function' ||
                            typeof string == 'object' ) {
            return emptyArray;
        }

        if ( delimiter === true ) {
            delimiter = '1';
        }

        if (!limit) {
            return string.toString().split(delimiter.toString());
        } else {
            var splitted = string.toString().split(delimiter.toString());
            var partA = splitted.splice(0, limit - 1);
            var partB = splitted.join(delimiter.toString());
            partA.push(partB);
            return partA;
        }
    },

    // }}}
    // {{{ implode

    implode : function(glue, pieces) {

        var i = '', retVal='', tGlue='';
        if (arguments.length === 1) {
            pieces = glue;
            glue = '';
        }
        if (typeof(pieces) === 'object') {
            if (pieces instanceof Array) {
                return pieces.join(glue);
            }
            else {
                for (i in pieces) {
                    retVal += tGlue + pieces[i];
                    tGlue = glue;
                }
                return retVal;
            }
        }
        else {
            return pieces;
        }
    }

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
