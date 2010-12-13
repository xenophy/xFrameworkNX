/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Implement NX FileSystem Utility

NX.apply(NX, {

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

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
