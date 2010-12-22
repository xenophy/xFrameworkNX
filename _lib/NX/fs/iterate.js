/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.fs
 */

// {{{ NX.fs.iterate

/**
 * @method iterate
 */
module.exports = function(path, callback, scope) {

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
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
