/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Implement NX String Utility

NX.apply(NX, {

    // {{{ explode

    /**
     * 文字列を文字列により分割する
     *
     * @param delimiter 区切り文字列
     * @param string 入力文字列
     * @param limit limit に正の値が指定された場合、返される配列には 最大 limit の要素が含まれ、その最後の要素には string の残りの部分が全て含まれます。
     *              もし limit パラメータが負の場合、 最後の -limit 個の要素を除く全ての構成要素が返されます。
     *              limit パラメータがゼロの場合は、1 を指定したものとみなされます。
     */
    explode : function(delimiter, string, limit) {

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
