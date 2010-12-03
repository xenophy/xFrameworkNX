/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.AbstractServer

/**
 * @class NX.AbstractServer
 */
NX.AbstractServer = NX.extend(NX.util.Observable, {

    // {{{ port

    port: 8124,

    // }}}
    // {{{ host

    host: '127.0.0.1',

    // }}}
    // {{{ start

    start: NX.emptyFn

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
