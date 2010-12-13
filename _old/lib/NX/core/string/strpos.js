/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Implement NX String Utility

NX.apply(NX, {

    // {{{ strpos

    /**
     * 文字列が最初に現れる場所を見つける
     *
     * @param haystack 検索対象文字列
     * @param needle 検索文字列
     * @param offset [オプション]検索開始位置
     */
    strpos : function(haystack, needle, offset) {
        var i = (haystack+'').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
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
