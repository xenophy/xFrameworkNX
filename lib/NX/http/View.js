/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.http.View

/**
 * @class NX.http.View
 */
NX.http.View = NX.extend(NX.AbstractView, {

    // {{{ init

    init : function(cfg) {

        var me = this;

        cfg = cfg || {};

        NX.apply(me, cfg);
    },

    // }}}
    // {{{ render

    render : function() {

        var me = this;


            me.response.writeHead(200, {'Content-Type': 'text/plain'});
            me.response.end('Hello World\n');

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
