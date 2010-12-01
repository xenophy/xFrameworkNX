/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Implement NX String Utility

NX.apply(NX, {

    // {{{ implode

    /**
     */
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
