/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('../../../lib/NX');
var path = require('path');

// }}}
// {{{ Setting

var NXDoc = {
    lib: path.normalize(__dirname + '/../../../lib/NX/'),
    manuscript: path.normalize(__dirname + '/../manuscript/'),
    output: path.normalize(__dirname + '/../output/'),
    versions: [],
    manual: [],
    api: [],
    cls: {}
};

// }}}
// {{{ Starting Message

console.log('Building xFramework NX Documentations...');

// }}}
// {{{ Scan Versions

NX.each(NX.fs.readdirSync(NXDoc.manuscript), function(file) {

    var s = NX.fs.statSync(NXDoc.manuscript + file);

    if(s.isDirectory()) {
        NXDoc.versions.push(file);
    }

});

// }}}
// {{{ create tree

var genManNode = function(rootPath, targetPath, deploy, outputDir) {

    NX.each(NX.fs.readdirSync(rootPath + targetPath), function(file) {

        var targetFullPath = rootPath + targetPath;

        var s = NX.fs.statSync(targetFullPath + file);
        var pi = NX.fs.pathinfo(targetFullPath + file);

        if(s.isDirectory()) {

            if(NX.fs.exists(targetFullPath + file + '/.category.js')) {
                category = NX.fs.readFileSync(targetFullPath + file + '/.category.js', 'utf-8');
                category = NX.decode(category);
            }

            var o = {
                text: category.text,
                dirname: pi['basename'],
                cls: 'doc-node',
                expanded: false,
                children: []
            };

            deploy.push(o);

            // 出力ディレクトリ作成

            if(!NX.fs.exists(outputDir + targetPath + file + '/')) {
                NX.fs.mkdirSync(outputDir + targetPath + file + '/', 0755);
            }

            // 再帰処理
            genManNode(rootPath, targetPath + file + '/', o.children, outputDir);

        } else if(pi['extension'] === 'mdown') {

            // コンテンツディレクトリ名取得
            var cd = pi['dirname'].substr(rootPath.length);

            // コンテンツファイル名取得
            var cf = pi['filename'] + '.html';

            // タイトル取得
            mdown = NX.fs.readFileSync(targetFullPath + file, 'utf8');
            var LF = String.fromCharCode(10);
            var smdown = NX.str.explode(LF, mdown);
            title = smdown[0];

            var o = {
                text: title,
                href: cd + '/' + cf,
                cls: 'doc',
                leaf: true
            };

            deploy.push(o);

        }

    });

};

var genApiNode = function(rootPath, targetPath, deploy, outputDir) {

    var targetFullPath = rootPath + targetPath;

    NX.fs.iterate(NXDoc.lib, function(file) {

        if(file.isDir()) {

        } else {

            var filename = file.getFilename();
            var src = NX.fs.readFileSync(file.getFullPath() + '/' + filename, 'utf8');

            if(/@class/.test(src)) {

                var matches = src.match(/@class .+/g);

                if(matches && NX.isArray(matches)) {

                    NX.each(matches, function(line) {

                        var clsName = line.substr('@class '.length);

                        if(!NXDoc.cls[clsName]) {
                            NXDoc.cls[clsName] = {
                                _prop: [],
                                _method: []
                            };
                        }

                        var cls = NXDoc.cls[clsName];

                        var matches = src.match(/@prop .+/g);

                        if(matches) {
                            NX.each(matches, function(prop) {
                                prop = prop.substr('@prop '.length);
                                cls._prop.push(prop);
                            });
                        }

                        var matches = src.match(/@method .+/g);

                        if(matches) {
                            NX.each(matches, function(method) {
                                method = method.substr('@method '.length);
                                cls._method.push(method);
                            });
                        }

                    });

                }

            }

        }

    });

    var createNode = function(clsName, ns, deploy) {

        if(ns.length === 0) {

            // クラスツリー作成
            var o = {
                text: clsName,
//                href: cd + '/' + cf,
                cls: 'cls-node',
                leaf: true
            };

            deploy.push(o);

        } else {

            var pkgName = ns[0];

            ns.splice(0, 1);

            var exists = false;
            NX.each(deploy, function(item) {

                if(item.text === pkgName) {
                    exists = item;
                    return false;
                }

            });

            if(!exists) {

                // パッケージツリー作成
                var o = {
                    text: pkgName,
                    cls: 'pkg-node',
                    expanded: false,
                    children: []
                };

                deploy.push(o);

            } else {
                o = exists;
            }

            createNode(clsName, ns, o.children);
        }

    };

    NX.iterate(NXDoc.cls, function(key, v) {

        var ns = NX.str.explode('.', key);
        var clsName = ns[ns.length -1];

        ns.splice(ns.length -1, 1);

        if(ns.length > 0) {
            ns.splice(0, 1);
        }

        createNode(clsName, ns, deploy);

    });

};

NX.each(NXDoc.versions, function(version) {

    NXDoc.manual[version] = [];
    NXDoc.api[version] = [];

    var targetDir = NXDoc.manuscript + version + '/';
    var outputDir = NXDoc.output + version + '/';

    if(NX.fs.exists(outputDir)) {
//        NX.fs.rmdirSync(outputDir);
    } else {
        NX.fs.mkdirSync(outputDir, 0755);
    }

    if(NX.fs.exists(outputDir + 'man/')) {
//        NX.fs.rmdirSync(outputDir + 'man/');
    } else {
        NX.fs.mkdirSync(outputDir + 'man/', 0755);
    }

    if(NX.fs.exists(outputDir + 'api/')) {
//        NX.fs.rmdirSync(outputDir + 'api/');
    } else {
        NX.fs.mkdirSync(outputDir + 'api/', 0755);
    }

    // マニュアルノード生成
    genManNode(targetDir, 'man/', NXDoc.manual[version], outputDir);

    var manNode = 'Ext.docs.man = ' + NX.encode(NXDoc.manual[version]) + ';';
    NX.fs.writeFileSync(outputDir + '/man.js', manNode, 'utf-8');

    // APIノード生成
    genApiNode(targetDir, 'api/', NXDoc.api[version], outputDir);

    var apiNode = 'Ext.docs.api = ' + NX.encode(NXDoc.api[version]) + ';';
    NX.fs.writeFileSync(outputDir + '/api.js', apiNode, 'utf-8');

});

// }}}
// {{{ Ending Message

console.log('Done.');

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
