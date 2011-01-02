/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.FileSystem

/**
 * @class NX.util.FileSystem
 */
NX.util.FileSystem = NX.applyIf(require('fs'), {

    // {{{ rename

    /**
     * builtin
     * @method rename
     */

    // }}}
    // {{{ renameSync

    /**
     * builtin
     * @method renameSync
     */

    // }}}
    // {{{ truncate

    /**
     * builtin
     * @method truncate
     */

    // }}}
    // {{{ truncateSync

    /**
     * builtin
     * @method truncateSync
     */

    // }}}
    // {{{ chmod

    /**
     * builtin
     * @method chmod
     */

    // }}}
    // {{{ chmodSync

    /**
     * builtin
     * @method chmodSync
     */

    // }}}
    // {{{ stat

    /**
     * builtin
     * @method stat
     */

    // }}}
    // {{{ lstat

    /**
     * builtin
     * @method lstat
     */

    // }}}
    // {{{ fstat

    /**
     * builtin
     * @method fstat
     */

    // }}}
    // {{{ statSync

    /**
     * builtin
     * @method statSync
     */

    // }}}
    // {{{ lstatSync

    /**
     * builtin
     * @method lstatSync
     */

    // }}}
    // {{{ fstatSync

    /**
     * builtin
     * @method fstatSync
     */

    // }}}
    // {{{ link

    /**
     * builtin
     * @method link
     */

    // }}}
    // {{{ linkSync

    /**
     * builtin
     * @method linkSync
     */

    // }}}
    // {{{ symlink

    /**
     * builtin
     * @method symlink
     */

    // }}}
    // {{{ symlinkSync

    /**
     * builtin
     * @method symlinkSync
     */

    // }}}
    // {{{ readlink

    /**
     * builtin
     * @method readlink
     */

    // }}}
    // {{{ readlinkSync

    /**
     * builtin
     * @method readlinkSync
     */

    // }}}
    // {{{ realpath

    /**
     * builtin
     * @method realpath
     */

    // }}}
    // {{{ realpathSync

    /**
     * builtin
     * @method realpathSync
     */

    // }}}
    // {{{ unlink

    /**
     * builtin
     * @method unlink
     */

    // }}}
    // {{{ unlinkSync

    /**
     * builtin
     * @method unlinkSync
     */

    // }}}
    // {{{ rmdir

    /**
     * builtin
     * @method rmdir
     */

    // }}}
    // {{{ rmdirSync

    /**
     * builtin
     * @method rmdirSync
     */

    // }}}
    // {{{ mkdir

    /**
     * builtin
     * @method mkdir
     */

    // }}}
    // {{{ mkdirSync

    /**
     * builtin
     * @method mkdirSync
     */

    // }}}
    // {{{ readdir

    /**
     * builtin
     * @method readdir
     */

    // }}}
    // {{{ readdirSync

    /**
     * builtin
     * @method readdirSync
     */

    // }}}
    // {{{ close

    /**
     * builtin
     * @method close
     */

    // }}}
    // {{{ closeSync

    /**
     * builtin
     * @method closeSync
     */

    // }}}
    // {{{ open

    /**
     * builtin
     * @method open
     */

    // }}}
    // {{{ openSync

    /**
     * builtin
     * @method openSync
     */

    // }}}
    // {{{ write

    /**
     * builtin
     * @method write
     */

    // }}}
    // {{{ writeSync

    /**
     * builtin
     * @method writeSync
     */

    // }}}
    // {{{ read

    /**
     * builtin
     * @method read
     */

    // }}}
    // {{{ readSync

    /**
     * builtin
     * @method readSync
     */

    // }}}
    // {{{ readFile

    /**
     * builtin
     * @method readFile
     */

    // }}}
    // {{{ readFileSync

    /**
     * builtin
     * @method readFileSync
     */

    // }}}
    // {{{ writeFile

    /**
     * builtin
     * @method writeFile
     */

    // }}}
    // {{{ writeFileSync

    /**
     * builtin
     * @method writeFileSync
     */

    // }}}
    // {{{ watchFile

    /**
     * builtin
     * @method watchFile
     */

    // }}}
    // {{{ unwatchFile

    /**
     * builtin
     * @method unwatchFile
     */

    // }}}
    // {{{ createReadStream

    /**
     * builtin
     * @method createReadStream
     */

    // }}}
    // {{{ createWriteStream

    /**
     * builtin
     * @method createWriteStream
     */

    // }}}
    // {{{ basename

    /**
     * @method basename
     */
    basename : function(path, suffix) {

        var b = path.replace(/^.*[\/\\]/g, '');

        if(typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
            b = b.substr(0, b.length-suffix.length);
        }

        return b;
    },

    // }}}
    // {{{ dirname

    /**
     * @method dirname
     */
    dirname : function(path) {
        return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
    },

    // }}}
    // {{{ exists

    /**
     * @method exists
     */
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

    /**
     * @method isReadable
     */
    isReadable : function(path) {

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

    /**
     * @method isWritable
     */
    isWritable : function(path) {

        var me = NX.util.FileSystem;

        try {
            var fp = me.openSync(path, 'w');
            me.closeSync(fp);
        } catch(e) {
            console.log(e);
            return false;
        }

        return true;
    },

    // }}}
    // {{{ iterate

    /**
     * @method iterate
     */
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
                var pi = NX.fs.pathinfo(path + file);

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
    },

    // }}}
    // {{{ pathinfo

    /**
     * @method pathinfo
     */
    pathinfo : function(path, options) {

        var opt = '',
        optName = '',
        optTemp = 0,
        tmp_arr = {},
        cnt = 0,
        i = 0,
        have_basename = false,
        have_extension = false,
        have_filename = false;

        if(!path) {
            return false;
        }

        if(!options) {
            options = 'PATHINFO_ALL';
        }

        var OPTS = {
            'PATHINFO_DIRNAME': 1,
            'PATHINFO_BASENAME': 2,
            'PATHINFO_EXTENSION': 4,
            'PATHINFO_FILENAME': 8,
            'PATHINFO_ALL': 0
        };

        for(optName in OPTS) {
            OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
        }

        if(typeof options !== 'number') {

            options = [].concat(options);

            for(i=0; i < options.length; i++) {

                if(OPTS[options[i]]) {
                    optTemp = optTemp | OPTS[options[i]];
                }

            }

            options = optTemp;
        }

        var __getExt = function(path) {
            var str  = path+'';
            var dotP = str.lastIndexOf('.')+1;
            return str.substr(dotP);
        };

        if(options & OPTS.PATHINFO_DIRNAME) {
            tmp_arr.dirname = this.dirname(path);
        }

        if(options & OPTS.PATHINFO_BASENAME) {

            if (false === have_basename) {
                have_basename = this.basename(path);
            }

            tmp_arr.basename = have_basename;
        }

        if(options & OPTS.PATHINFO_EXTENSION) {

            if(false === have_basename) {
                have_basename = this.basename(path);
            }

            if(false === have_extension) {
                have_extension = __getExt(have_basename);
            }

            tmp_arr.extension = have_extension;
        }

        if(options & OPTS.PATHINFO_FILENAME) {
            if(false === have_basename) {
                have_basename = this.basename(path);
            }

            if(false === have_extension) {
                have_extension = __getExt(have_basename);
            }

            if(false === have_filename) {
                have_filename  = have_basename.substr(0, (have_basename.length - have_extension.length)-1);
            }

            tmp_arr.filename = have_filename;
        }

        cnt = 0;

        for(opt in tmp_arr) {
            cnt++;
        }

        if(cnt == 1) {
            return tmp_arr[opt];
        }

        return tmp_arr;
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
