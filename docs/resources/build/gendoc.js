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

var manualPath = __dirname + '/../manual/';

var filename = manualPath + '01.intro/001.welcome.mdown';

var c = NX.fs.readFileSync(filename, 'utf8');

var docHtml = NX.util.MarkDown.parse(c);

console.log(docHtml);


/*
var mpath = require('path');

var path = __dirname + '/../wiki/';
path = mpath.normalize(path);
var outpath = __dirname + '/../output/';
outpath = mpath.normalize(outpath);
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
            var pi = NX.pathinfo(file);

            var o = {
                text: category.name,
                cls: 'doc-node',
                expanded: true,
                children: []
            };

            if(wikifiles.length > 0) {
                o.expanded = false;
            }

            var subdir = pi['dirname'].substr(path.length);
            var outputDir = outpath + '/' + subdir + '/' + pi['basename'];
            outputDir = mpath.normalize(outputDir);

            if(!NX.fs.exists(outputDir)) {
                NX.fs.mkdirSync(outputDir,0777);
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

                    var tmpPath = path.substr(__dirname.length);

                    var docWiki = NX.fs.readFileSync(file, 'utf8');
                    var docHtml = NX.util.Wiki.parse(docWiki);

                    var outFile = __dirname + '/../output/' + tmpPath + pi['filename'] + '.html';
                    outFile = mpath.normalize(outFile);

                    NX.fs.writeFileSync(outFile, docHtml, 'utf-8');

                    var o = {
                        href: tmpPath + pi['filename'],
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

*/

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */



