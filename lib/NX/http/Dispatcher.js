/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.http.Dispatcher

/**
 * @class NX.http.Dispatcher
 */
NX.http.Dispatcher = NX.extend(NX.AbstractDispatcher, {

    // {{{ dispatch

    dispatch: function(req, res) {



            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World\n');


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
