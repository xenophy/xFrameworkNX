/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('../../../lib/NX.js');

// }}}
// {{{ generate document

var mpath = require('path');

var path = __dirname + '/../wiki/';
path = mpath.normalize(path);
var wikifiles = [];
var target;
var category;

var getWikiFiles = function(path) {

    var dl = NX.fs.readdirSync(path);

    NX.each(dl, function(dirname) {

        var s = NX.fs.statSync(path + dirname);

        if(s.isDirectory() === true) {

            var file = path + dirname;
            file = mpath.normalize(file);
            var c = NX.fs.readFileSync(file + '/.category.js', 'utf-8');
            category = NX.decode(c);

            var o = {
                text: category.name,
                cls: 'doc-node',
                expanded: true,
                children: []
            };

            if(wikifiles.length > 0) {
                o.expanded = false;
            }

            target = o.children;

            wikifiles.push(o);

            getWikiFiles(file + '/');


        } else if(s.isFile() === true) {

            var file = path + dirname;
            file = mpath.normalize(file);
            var pi = NX.pathinfo(file);

            if(pi['extension'] === 'wiki') {

                if(target) {

                    path = path.substr(__dirname.length);

                    var o = {
                        href: path + pi['filename'],
                        ctext: category['name'],
                        text: category[pi['filename']],
                        cls: 'doc',
                        leaf: true
                    };

                    target.push(o);

                }
            }

        }

    });


}

getWikiFiles(path);

output = NX.encode(wikifiles);
output = 'Ext.docs.wiki = ' + output + ';';

NX.fs.writeFileSync(__dirname + '/../wiki.js', output, 'utf-8');

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */



