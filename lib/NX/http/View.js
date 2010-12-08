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
        var file = me.root + me.target;

        var displayError = function(code) {

            file = NX.env.dirname + '/' + NX.http.config.errorDocument[code];

            if(NX.fs.exists(file) && NX.fs.isReadable(file)) {
                me.response.writeHead(code, {'Content-Type': NX.http.mimetype.html});
                me.response.write(NX.fs.readFileSync(file, 'utf8'));
            } else {
                me.response.writeHead(code);
            }

        }

        if(!NX.fs.exists(file)) {

            // 404 Not Found
            displayError(404);
            me.response.end();
            return;

        } else if(!NX.fs.isReadable(file)) {

            // 403 Forbidden
            displayError(403);
            me.response.end();
            return;
        }

        var pi = NX.pathinfo(me.target);

        if(pi.filename === '') {

            var exists = false;
            NX.each(NX.http.config.directoryIndex, function(v) {

                if(NX.fs.exists(file + v)) {
                    exists = true;
                    file += v;
                    return false;
                }

            });

            if(!exists) {

                // 404 Not Found
                displayError(404);
                me.response.end();
                return;
            }
        }

        pi = NX.pathinfo(file);
        var mime = NX.http.mimetype[pi.extension] || 'text/plane';
        me.response.writeHead(200, {'Content-Type': mime});
        me.response.write(NX.fs.readFileSync(file));
        me.response.end();

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
