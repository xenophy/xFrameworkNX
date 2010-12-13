/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.FileSystems

/**
 * @class NX.util.FileSystems
 */
NX.util.FileSystem = require('fs');

NX.applyIf(NX.util.FileSystem, {

    // {{{ exists

    exists : function(path, displayError) {

        var me = NX.util.FileSystem;
        displayError = displayError || false;

        try {
            me.statSync(path);
        } catch(e) {
            if(displayError) {
                console.log(e);
            }
            return false;
        }

        return true;
    },

    // }}}
    // {{{ isReadable

    isReadable: function(path) {

        var me = NX.util.FileSystem;

        try {
            var fp = me.openSync(path, 'r');
            me.closeSync(fp);
        } catch(e) {
            console.log(e);
            return false;
        }

        return true;
    },

    // }}}
    // {{{ isWritable

    isWritable: function(path) {

    },

    // }}}
    // {{{ iterate

    iterate : function(path, callback, scope) {

        scope = scope || this;
        callback = callback || NX.emptyFn;

        var status = function(pi , s) {

            this.isDir = function() {
                return s.isDirectory();
            };

            this.isFile = function() {
                return s.isFile();
            };

            this.getFilename = function() {
                return pi['basename'];
            };

            this.getPath = function() {
                return NX.path.normalize('/' + pi['dirname'].substr(path.length));
            };

            this.getFullPath = function() {
                return pi['dirname'];
            };

        };

        var iterator = function(path) {

            var dirList = NX.fs.readdirSync(path);

            NX.each(dirList, function(file) {

                var s = NX.fs.statSync(path + file);
                var pi = NX.pathinfo(path + file);

                if(s.isDirectory() === true) {

                    if(!callback.call(scope, new status(pi, s)) === false) {
                        return false;
                    }

                    iterator(path + file + '/');

                } else if(s.isFile() === true) {

                    if(callback.call(scope, new status(pi, s)) === false) {
                        return false;
                    }

                }

            });

        };

        iterator(path);
    }

    // }}}

});

// }}}
// {{{ shorthand

NX.fs = NX.util.FileSystem;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
