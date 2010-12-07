/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('../../../lib/NX.js');

// }}}
// {{{ setting

var path = {
    manual : NX.path.normalize(__dirname + '/../manual/'),
    api : NX.path.normalize(__dirname + '/../api/')
};

// }}}
// {{{ generate document

var manual = [];

NX.fs.iterate(path.manual, function(file) {

    var p = file.getPath();

    if(file.isDir()) {

        var dirname = NX.path.normalize(p + '/' + file.getFilename());
        var filepath = NX.path.normalize(path.manual + dirname);
        var outputPath = filepath.replace(/manual/g, 'output');

        if(!NX.fs.exists(outputPath)) {
            NX.fs.mkdirSync(outputPath, 0777);
        }

        var category = {
            name: file.getFilename()
        };

        if(NX.fs.exists(filepath + '/.category.js')) {
            category = NX.fs.readFileSync(filepath + '/.category.js', 'utf-8');
            category = NX.decode(category);
        }

        var o = {
            text: category.name,
            dirname: file.getFilename(),
            cls: 'doc-node',
            expanded: false,
            children: []
        };

        var target = manual;
        var deep = 0;

        NX.each((NX.explode('/', dirname)), function(v) {
            if(v != '') {
                NX.each(target, function(to) {
                    if(to.dirname == v) {
                        target = to.children;
                        return false;
                    }
                });
                deep++;
            }
        });

        o.cls += ' doc-deep' + deep;

        target.push(o);

    } else {

        if(file.getFilename() == '.category.js') {
            return;
        }

        filename = file.getFilename();
        var pi = NX.pathinfo(filename);
        outputFilename = pi['filename'] + '.html';
        filepath = path.manual + file.getPath() + '/' + filename;

        var mdown = '';
        var title = filename;
        if(NX.fs.exists(filepath)) {
            mdown = NX.fs.readFileSync(filepath, 'utf8');
            var LF = String.fromCharCode(10);
            var smdown = NX.explode(LF, mdown);
            title = smdown[0];
        }

        // コンバート
        var html = NX.util.MarkDown.parse(mdown);

        var outputPath = path.manual + outputFilename;
        var outputPath = NX.path.normalize(filepath.replace(/manual/g, 'output'));
        pi = NX.pathinfo(outputPath);
        outputPath = pi['dirname'] + '/' + pi['filename'] + '.html';
        NX.fs.writeFileSync(outputPath, html, 'utf-8');

        outputPath = NX.path.normalize(filepath.replace(/output/g, 'manual'));
        outputPath = outputPath.substr(path.manual.length);
        pi = NX.pathinfo(outputPath);
        outputPath = pi['dirname'] + '/' + pi['filename'] + '.html';

        var o = {
            href: outputPath,
//            ctext: 'dummy',
            text: title,
            cls: 'doc',
            leaf: true
        };

        var target = manual;

        var dirname = NX.path.normalize(p + '/' + file.getFilename());

        NX.each((NX.explode('/', dirname)), function(v) {
            if(v != '') {
                NX.each(target, function(to) {
                    if(to.dirname == v) {
                        target = to.children;
                        return false;
                    }
                });
            }
        });

        target.push(o);

    }

});

output = NX.sprintf('Ext.docs.manual = %s;', NX.encode(manual));
NX.fs.writeFileSync(__dirname + '/../manual.js', output, 'utf-8');

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
