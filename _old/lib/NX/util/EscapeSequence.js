/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFrameworkNX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.EscapeSequence

/**
 * @class NX.util.EscapseSequence
 *
 * ユニットテストクラス
 *
 * @singleton
 */
NX.util.EscapseSequence = {

    // {{{ props

    ok_prefix: '\u001B[32m',
    ok_suffix: '\u001B[39m',
    error_prefix: '\u001B[31m',
    error_suffix: '\u001B[39m',
    bold_prefix: '\u001B[1m',
    bold_suffix: '\u001B[22m',

    // }}}
    // {{{ ok

    /**
     * 正常時エスケープシーケンス合成メソッド
     */
    ok : function(s) {

        return this._bind(s, 'ok');
    },

    // }}}
    // {{{ error

    /**
     * エラー時エスケープシーケンス合成メソッド
     */
    error : function(s) {

        return this._bind(s, 'error');
    },

    // }}}
    // {{{ bold

    /**
     * 太字エスケープシーケンス合成メソッド
     */
    bold : function(s) {

        return this._bind(s, 'bold');
    },

    // }}}
    // {{{ _bind

    /**
     * エスケープシーケンス合成メソッド
     */
    _bind : function(s, t) {

        var pre = this[t + '_prefix'];
        var suf = this[t + '_suffix'];

        return pre + s + suf;
    }

    // }}}

};

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
