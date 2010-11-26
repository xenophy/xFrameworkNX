/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX Messages

/**
 * msgs
 *
 * フレームワーク内メッセージ
 *
 * @type Object
 */
NX.ns(
    'NX.msgs',
    'NX.msgs.NX',
    'NX.msgs.NX.extend',
    'NX.msgs.NX.test',
    'NX.msgs.NX.test.Unit',
    'NX.msgs.NX.test.Unit.run'
);

NX.msgs.NX.extend.SUPERCLS_NOT_OBJECT = 'スーパークラスにオブジェクトが指定されていません。';
NX.msgs.NX.test.Unit.run.FILE_NOT_FOUND = 'ファイル %s が存在しません。';

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
