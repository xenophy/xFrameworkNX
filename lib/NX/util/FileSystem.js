/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ require

var fs = require('fs');
var util = require('util');

// }}}
// {{{ NX.util.FileSystem

/**
 * @class NX.util.FileSystem
 */
NX.util.FileSystem = NX.apply(Object, {

    // {{{ renameSync

    /**
     * @method renameSync
     */
    renameSync : fs.renameSync,

    // }}}
    // {{{ truncateSync

    /**
     * @method truncateSync
     */
    truncateSync : fs.trancateSync,

    // }}}
    // {{{ chmodSync

    /**
     * @method chmodSync
     */
    chmodSync : fs.chmodSync,

    // }}}
    // {{{ statSync

    /**
     * @method statSync
     */
    statSync : fs.statSync,

    // }}}
    // {{{ lstatSync

    /**
     * @method lstatSync
     */
    lstatSync : fs.lstatSync,

    // }}}
    // {{{ fstatSync

    /**
     * @method fstatSync
     */
    fstatSync : fs.fstatSync,

    // }}}
    // {{{ linkSync

    /**
     * @method linkSync
     */
    linkSync : fs.linkSync,

    // }}}
    // {{{ symlinkSync

    /**
     * @method symlinkSync
     */
    symlinkSync : fs.symlinkSync,

    // }}}
    // {{{ readlinkSync

    /**
     * @method readlinkSync
     */
    readlinkSync : fs.readlinkSync,

    // }}}
    // {{{ realpathSync

    /**
     * @method realpathSync
     */
    realpathSync : fs.realpathSync,

    // }}}
    // {{{ unlinkSync

    /**
     * @method unlinkSync
     */
    unlinkSync : fs.unlinkSync,

    // }}}
    // {{{ rmdirSync

    /**
     * @method rmdirSync
     */
    rmdirSync : fs.rmdirSync,

    // }}}
    // {{{ mkdirSync

    /**
     * @method mkdirSync
     */
    mkdirSync : fs.mkdirSync,

    // }}}
    // {{{ readdirSync

    /**
     * @method readdirSync
     */
    readdirSync : fs.readdirSync,

    // }}}
    // {{{ closeSync

    /**
     * @method closeSync
     */
    closeSync : fs.closeSync,

    // }}}
    // {{{ openSync

    /**
     * @method openSync
     */
    openSync : fs.openSync,

    // }}}
    // {{{ writeSync

    /**
     * @method writeSync
     */
    writeSync : fs.writeSync,

    // }}}
    // {{{ readSync

    /**
     * @method readSync
     */
    readSync : fs.readSync,

    // }}}
    // {{{ readFileSync

    /**
     * @method readFileSync
     */
    readFileSync : fs.readFileSync,

    // }}}
    // {{{ writeFileSync

    /**
     * @method writeFileSync
     */
    writeFileSync : fs.writeFileSync,

    // }}}
    // {{{ createReadStream

    /**
     * @method createReadStream
     */
    createReadStream : fs.createReadStream,

    // }}}
    // {{{ createWriteStream

    /**
     * @method createWriteStream
     */
    createWriteStream : fs.createWriteStream,

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
    exists : function(path, callback) {

        var me = NX.util.FileSystem,
            scope = this;

        if(NX.isDefined(callback) && NX.isFunction(callback)) {

            fs.stat(path, function(e) {

                if(NX.isNull(e)) {
                    callback.call(scope, true);
                } else {
                    callback.call(scope, false);
                }

            });

            return;
        }

        var deferred = new NX.util.Deferred();

        fs.stat(path, function(e) {

            if(NX.isNull(e)) {
                deferred.call(true);
            } else {
                deferred.call(false);
            }

        });

        return deferred;
    },

    // }}}
    // {{{ existsSync

    /**
     * @method existsSync
     */
    existsSync : function(path) {

        var me = NX.util.FileSystem;

        try {
            me.statSync(path);
        } catch(e) {
            return false;
        }

        return true;
    },

    // }}}
    // {{{ isReadable

    /**
     * @method isReadable
     */
    isReadable : function(path, callback) {

        var me = NX.util.FileSystem,
            scope = this;

        var deferred = new NX.util.Deferred();

        me.exists(path, function(ret) {

            if(NX.isDefined(callback) && NX.isFunction(callback)) {
                if(!ret) {
                    callback.call(scope, false);
                } else {
                    fs.open(path, 'r', function(e, fd) {
                        if(NX.isNull(e)) {
                            fs.close(fd, function() {
                                callback.call(scope, true);
                            });
                        } else {
                            callback.call(scope, false);
                        }
                    });
                }
            } else {
                if(!ret) {
                    deferred.call(false);
                } else {
                    fs.open(path, 'r', function(e, fd) {
                        if(NX.isNull(e)) {
                            fs.close(fd, function() {
                                deferred.call(true);
                            });
                        } else {
                            deferred.call(false);
                        }
                    });
                }
            }
        });

        if(!NX.isDefined(callback) || !NX.isFunction(callback)) {
            return deferred;
        }

    },

    // }}}
    // {{{ isReadableSync

    /**
     * @method isReadableSync
     */
    isReadableSync : function(path) {

        var me = NX.util.FileSystem;

        if(!me.existsSync(path)) {
            return false;
        }

        try {
            var fp = me.openSync(path, 'r');
            me.closeSync(fp);
        } catch(e) {
            return false;
        }

        return true;
    },

    // }}}
    // {{{ isWritable

    /**
     * @method isWritable
     */
    isWritable : function(path, callback) {

        var me = NX.util.FileSystem,
            scope = this;

        var deferred = new NX.util.Deferred();

        me.exists(path, function(ret) {

            if(NX.isDefined(callback) && NX.isFunction(callback)) {
                if(!ret) {
                    callback.call(scope, false);
                } else {
                    me.open(path, 'w', function(e, fd) {
                        if(NX.isNull(e)) {
                            me.close(fd, function() {
                                callback.call(scope, true);
                            });
                        } else {
                            callback.call(scope, false);
                        }
                    });
                }
            } else {
                if(!ret) {
                    deferred.call(false);
                } else {
                     me.open(path, 'w', function(e, fd) {
                        if(NX.isNull(e)) {
                            me.close(fd, function() {
                                deferred.call(true);
                            });
                        } else {
                            deferred.call(false);
                        }
                    });
                }
            }
        });

        if(!NX.isDefined(callback) || !NX.isFunction(callback)) {
            return deferred;
        }
    },

    // }}}
    // {{{ isWritableSync

    /**
     * @method isWritableSync
     */
    isWritableSync : function(path) {

        var me = NX.util.FileSystem;

        if(!me.existsSync(path)) {
            return false;
        }

        try {
            var fp = me.openSync(path, 'w');
            me.closeSync(fp);
        } catch(e) {
            return false;
        }

        return true;
    },

    // }}}
    // {{{ touch

    /**
     * @method touch
     */
    touch : function(path, time, atime, callback) {

        var callback;
        var cmd = ['touch ' + path];

        if(NX.isDefined(time) && NX.isFunction(time)) {
            callback = time;
        } else if(NX.isDefined(time) && NX.isDefined(atime) && NX.isFunction(atime)) {
            callback = atime;
            cmd.push('-t ' + time);
        } else if(NX.isDefined(time) && NX.isDefined(atime) && NX.isDefined(callback) && NX.isFunction(callback)) {
            cmd.push('-t ' + time);
            cmd.push('-a ' + atime);
            callback = callback;
        } else {
            callback = false;
        }

        cmd = NX.implode(' ', cmd);

        var exec = require('child_process').exec,
            child;

        if(callback !== false) {
            child = exec(cmd, callback);
        } else {

            var deferred = new NX.util.Deferred();
            child = exec(cmd, function(error, stdout, stderr) {

                if(!NX.isNull(error)) {
                    deferred.fail(error);
                } else {
                    deferred.call();
                }

            });

            return deferred;
        }

    },

    // }}}
    // {{{ touchSync

    /**
     * @method touchSync
     */
    /*
    touchSync : function(path, time, atime) {

        var cmd = ['touch ' + path];

        if(NX.isDefined(time)) {
            cmd.push('-t ' + time);
        } else if(NX.isDefined(time) && NX.isDefined(atime)) {
            cmd.push('-t ' + time);
            cmd.push('-a ' + atime);
        }

        cmd = NX.implode(' ', cmd);

        var exec = require('child_process').exec,
            child;

        var loop = true;

        child = exec(cmd, function(error, stdout, stderr) {
            loop = false;
        });

        while(loop) {

            // JSだけで同期化できないので、ペンディング

        }

    },

    */

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
// {{{ rename

/**
 * @method rename
 */
NX.fs.rename = function(path1, path2, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.rename(path1, path2, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.rename(path1, path2, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('rename', NX.fs.rename);

// }}}
// {{{ NX.fs.truncate

/**
 * @method truncate
 */
NX.fs.truncate = function(fd, len, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.truncate(fd, len, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.truncate(fd, len, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('truncate', NX.fs.truncate);

// }}}
// {{{ chmod

/**
 * @method chmod
 */
NX.fs.chmod = function(path, mode, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.chmod(path, mode, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.chmod(path, mode, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('chmod', NX.fs.chmod);

// }}}
// {{{ stat

/**
 * @method stat
 */
NX.fs.stat = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.stat(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.stat(path, function(e, stat) {

        if(NX.isNull(e)) {
            deferred.call(stat);
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('stat', NX.fs.stat);

// }}}
// {{{ lstat

/**
 * @method lstat
 */
NX.fs.lstat = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.lstat(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.lstat(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('lstat', NX.fs.lstat);

// }}}
// {{{ fstat

/**
 * @method fstat
 */
NX.fs.fstat = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.fstat(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.lstat(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('fstat', NX.fs.fstat);

// }}}
// {{{ link

/**
 * @method link
 */
NX.fs.link = function(srcpath, dstpath, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.link(srcpath, dstpath, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.link(srcpath, dstpath, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('link', NX.fs.link);

// }}}
// {{{ symlink

/**
 * @method symlink
 */
NX.fs.symlink = function(linkdata, path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.symlink(linkdata, path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.symlink(linkdata, path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('symlink', NX.fs.symlink);

// }}}
// {{{ readlink

/**
 * @method readlink
 */
NX.fs.readlink = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.readlink(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.readlink(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('readlink', NX.fs.readlink);

// }}}
// {{{ realpath

/**
 * @method realpath
 */
NX.fs.realpath = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.realpath(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.realpath(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('realpath', NX.fs.realpath);

// }}}
// {{{ unlink

/**
 * @method unlink
 */
NX.fs.unlink = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.unlink(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.unlink(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('unlink', NX.fs.unlink);

// }}}
// {{{ rmdir

/**
 * @method rmdir
 */
NX.fs.rmdir = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.rmdir(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.rmdir(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('rmdir', NX.fs.rmdir);

// }}}
// {{{ mkdir

/**
 * @method mkdir
 */
NX.fs.mkdir = function(path, mode, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.mkdir(path, mode, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.mkdir(path, mode, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('mkdir', NX.fs.mkdir);

// }}}
// {{{ readdir

/**
 * @method readdir
 */
NX.fs.readdir = function(path, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.readdir(path, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.readdir(path, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('readdir', NX.fs.readdir);

// }}}
// {{{ close

/**
 * @method close
 */
NX.fs.close = function(fd, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.close(fd, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.close(fd, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('close', NX.fs.close);

// }}}
// {{{ open

/**
 * @method open
 */
NX.fs.open = function(path, flag, mode, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.open(path, flag, mode, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.open(path, flag, mode, function(e, fd) {

        if(NX.isNull(e)) {
            deferred.call(fd);
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('open', NX.fs.open);

// }}}
// {{{ write

/**
 * @method write
 */
NX.fs.write = function(fd, buffer, offset, length, position, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.write(fd, buffer, offset, length, position, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.write(fd, buffer, offset, length, position, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('write', NX.fs.write);

// }}}
// {{{ read

/**
 * @method read
 */
NX.fs.read = function(fd, buffer, offset, length, position, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.read(fd, buffer, offset, length, position, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.read(fd, buffer, offset, length, position, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('read', NX.fs.read);

// }}}
// {{{ readFile

/**
 * @method readFile
 */
NX.fs.readFile = function(filename, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.readFile(filename, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.readFile(filename, function(e, data) {

        if(NX.isNull(e)) {
            deferred.call(data);
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('readFile', NX.fs.readFile);

// }}}
// {{{ writeFile

/**
 * @method writeFile
 */
NX.fs.writeFile = function(filename, data, encoding, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.writeFile(filename, data, encoding, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.writeFile(filename, data, encoding, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('writeFile', NX.fs.writeFile);


// }}}
// {{{ watchFile

/**
 * @method watchFile
 */
NX.fs.watchFile = function(filename, options, listener) {

    if(NX.isDefined(listener) && NX.isFunction(listener) && !NX.isFunction(options)) {
        fs.watchFile(filename, options, listener, callback);
        return;
    } else if(NX.isDefined(options) && NX.isFunction(options)) {
        fs.watchFile(filename, listener, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    if(NX.isDefined(options)) {

        fs.watchFile(filename, options, function(e) {

            if(NX.isNull(e)) {
                deferred.call();
            } else {
                deferred.fail(e);
            }

        });

    } else {

        fs.watchFile(filename, function(e) {

            if(NX.isNull(e)) {
                deferred.call();
            } else {
                deferred.fail(e);
            }

        });

    }
    return deferred;
};

NX.util.Deferred.register('watchFile', NX.fs.watchFile);

// }}}
// {{{ unwatchFile

/**
 * @method unwatchFile
 */
NX.fs.unwatchFile = function(filename, callback) {

    if(NX.isDefined(callback) && NX.isFunction(callback)) {
        fs.unwatchFile(filename, callback);
        return;
    }

    var deferred = new NX.util.Deferred();

    fs.unwatchFile(filename, function(e) {

        if(NX.isNull(e)) {
            deferred.call();
        } else {
            deferred.fail(e);
        }

    });

    return deferred;
};

NX.util.Deferred.register('unwatchFile', NX.fs.unwatchFile);

// }}}
// {{{

NX.util.Deferred.register('isReadable', NX.fs.isReadable);
NX.util.Deferred.register('isWritable', NX.fs.isWritable);

// }}}
// {{{ NX class shorthand

/**
 * @class NX
 */

// }}}
// {{{ NX.rename

/**
 * @method rename
 */
NX.rename = NX.fs.rename;

// }}}
// {{{ NX.truncate

/**
 * @method truncate
 */
NX.truncate = NX.fs.truncate;

// }}}
// {{{ NX.chmod

/**
 * @method chmod
 */
NX.chmod = NX.fs.chmod;

// }}}
// {{{ NX.stat

/**
 * @method stat
 */
NX.stat = NX.fs.stat;

// }}}
// {{{ NX.lstat

/**
 * @method lstat
 */
NX.lstat = NX.fs.lstat;

// }}}
// {{{ NX.fstat

/**
 * @method fstat
 */
NX.fstat = NX.fs.fstat;

// }}}
// {{{ NX.link

/**
 * @method link
 */
NX.link = NX.fs.link;

// }}}
// {{{ NX.symlink

/**
 * @method symlink
 */
NX.symlink = NX.fs.symlink;

// }}}
// {{{ NX.readlink

/**
 * @method readlink
 */
NX.readlink = NX.fs.readlink;

// }}}
// {{{ NX.realpath

/**
 * @method realpath
 */
NX.realpath = NX.fs.realpath;

// }}}
// {{{ NX.unlink

/**
 * @method unlink
 */
NX.unlink = NX.fs.unlink;

// }}}
// {{{ NX.rmdir

/**
 * @method rmdir
 */
NX.rmdir = NX.fs.rmdir;

// }}}
// {{{ NX.mkdir

/**
 * @method mkdir
 */
NX.mkdir = NX.fs.mkdir;

// }}}
// {{{ NX.readdir

/**
 * @method readdir
 */
NX.readdir = NX.fs.readdir;

// }}}
// {{{ NX.close

/**
 * @method close
 */
NX.close = NX.fs.close;

// }}}
// {{{ NX.open

/**
 * @method open
 */
NX.open = NX.fs.open;

// }}}
// {{{ NX.write

/**
 * @method write
 */
NX.write = NX.fs.write;

// }}}
// {{{ NX.read

/**
 * @method read
 */
NX.read = NX.fs.read;

// }}}
// {{{ NX.readFile

/**
 * @method readFile
 */
NX.readFile = NX.fs.readFile;

// }}}
// {{{ NX.writeFile

/**
 * @method writeFile
 */
NX.writeFile = NX.fs.writeFile;

// }}}
// {{{ NX.watchFile

/**
 * @method watchFile
 */
NX.watchFile = NX.fs.watchFile;

// }}}
// {{{ NX.unwatchFile

/**
 * @method unwatchFile
 */
NX.unwatchFile = NX.fs.unwatchFile;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
