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
     * 配列要素を文字列により連結する
     *
     * @param glue 連結文字列
     * @param pieces 連結したい文字列の配列
     */
    implode : function(glue, pieces) {

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
