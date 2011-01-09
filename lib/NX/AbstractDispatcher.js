/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.AbstractDispatcher

/**
 * @class NX.AbstractDispatcher
 */
NX.AbstractDispatcher = NX.extend(NX.util.Observable, {

    // {{{ path

    /**
     * @prop path
     */
    path : '',

    // }}}
    // {{{ pathinfo

    pathinfo : {},

    // }}}
    // {{{ action

    action : '',

    // }}}
    // {{{ dispatch

    /**
     * @method dispatch
     */
    dispatch : NX.emptyFn

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
