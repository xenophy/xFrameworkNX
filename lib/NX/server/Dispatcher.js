/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

var sys = require('sys'),
    url = require('url');

// }}}
// {{{ NX.server.Dispatcher

/**
 * @class NX.server.Dispatcher
 */
NX.server.Dispatcher = NX.extend(NX.server.AbstractDispatcher, {

    // {{{ errorHandler

    /**
     * @method errorHandler
     */
    errorHandler : function(options) {

        var me = this;

        options = options || {};

        var showStack = options.showStack,
            showMessage = options.showMessage,
            dumpExceptions = options.dumpExceptions,
            formatUrl = options.formatUrl;

        if(process.connectEnv.showErrorStack !== undefined) {
            showStack = NX.toBoolean(process.connectEnv.showErrorStack);
        }

        if(process.connectEnv.showErrorMessage !== undefined) {
            showMessage = NX.toBoolean(process.connectEnv.showErrorMessage);
        }

        if(process.connectEnv.dumpExceptions !== undefined) {
            dumpExceptions = NX.toBoolean(process.connectEnv.dumpExceptions);
        }

        var formatLine = function(v) {
            return '<li>' + v + '</li>';
        };

        if(formatUrl) {
            var parts,
                re = /(\/[^\(\)]+):(\d+):(\d+)/;
            var formatters = {
                'file': function(parts) {
                    return {
                        'protocol':'file',
                        'hostname':'' + parts[1]
                    };
                },
                'txmt': function(parts) {
                    return {
                        'protocol':'txmt',
                        'hostname':'//open',
                        'query':{
                            'url':'file://' + parts[1],
                            'line': parts[2],
                            'column': parts[3]
                        }
                    };
                }
            };

            formatLine = function(v) {

                parts = v.match(re);

                if(parts) {
                    v = v.replace(parts[0],'<a href="'+url.format( formatters[formatUrl](parts) )+'">'+parts[0]+'</a>');
                }

                return '<li>' + v + '</li>';
            };
        }

        return function errorHandler(err, req, res) {

            if(dumpExceptions) {
                sys.error(err.stack);
            }

            if(showStack) {

                var accept = req.headers.accept || '';

                if(accept.indexOf('html') !== -1) {

                    var filename = NX.env.libdir + '/config/error/HTTP_INTERNAL_SERVER_ERROR.html';

                    NX.fs.readFile(filename).next(function(html) {

                        var stack = err.stack
                            .split('\n').slice(1)
                            .map(formatLine).join('');
                        html = html
                            .toString('utf8')
                            .replace('{stack}', stack)
                            .replace(/\{error\}/g, err.toString());
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end(html);

                    });

                } else if(accept.indexOf('json') !== -1) {

                    var json = JSON.stringify({ error: err });
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(json);

                } else {

                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end(err.stack);

                }

            } else {

                var body = showMessage ? err.toString() : 'Internal Server Error';
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(body);

            }

        };

    },

    // }}}
    // {{{ dispatch

    /**
     * @method dispatch
     */
    dispatch : function(req, res) {

        var me = this;

        // リクエストURL設定
        me.requestPath = req.url;

        // パス情報設定
        me.requestPathinfo = NX.fs.pathinfo(req.url);

        // スーパークラスメソッドコール
        NX.server.Dispatcher.superclass.dispatch.call(me, arguments);

        // コントローラーパス取得
        var file = me.getControllerFilePath();

        NX.fs.exists(file).next(function(exists) {

            var controller,
                o = {
                    path: me.path,
                    modules: me.modules,
                    configs: me.configs,
                    contents: me.contents,
                    action: me.getAction(),
                    request : req,
                    response : res
                };

            try {

                // コントローラーが存在する場合、Viewオブジェクトを渡す。
                if(exists) {

                    // コントローラーキャッシュクリア
                    NX.moduleCacheClear(file);

                    // コントローラー生成
                    var controllerCls = require(file);
                    controller = new controllerCls(o);

                } else {

                    // コントローラー生成
                    controller = new NX.WebController(o);

                }

                // コントローラー実行
                controller.execute();

            } catch(e) {

                // エラーハンドラー実行
                me.errorHandler({
                    showStack: true,
                    dumpExceptions: true
                })(e, req, res);

            }
        });

    },

    // }}}
    // {{{ getAction

    /**
     * @method getAction
     */
    getAction : function() {

        var me = this,
            pi = me.requestPathinfo;

        me.action =  pi.basename || 'index';

        var extPos = me.action.indexOf('.');
        if(extPos > 0) {
            me.action = me.action.substr(0, extPos);
        }

        return me.action;
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
