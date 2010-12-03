/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ require

require('./NX/core/NX.js');
require('./NX/core/NX.msgs.js');
require('./NX/core/string/strpos.js');
require('./NX/core/string/explode.js');
require('./NX/core/string/implode.js');
require('./NX/core/fs/basename.js');
require('./NX/core/fs/dirname.js');
require('./NX/core/fs/pathinfo.js');
require('./NX/util/DelayedTask.js');
require('./NX/util/Function.js');
require('./NX/util/Event.js');
require('./NX/util/Observable.js');
require('./NX/util/EscapeSequence.js');
require('./NX/util/MixedCollection.js');
require('./NX/util/AbstractManager.js');
require('./NX/util/AbstractController.js');
require('./NX/util/AbstractServer.js');
require('./NX/util/AbstractDispatcher.js');
require('./NX/util/AbstractView.js');
require('./NX/util/FileSystem.js');
require('./NX/ServiceMgr.js');
require('./NX/Url.js');
require('./NX/http/Server.js');
require('./NX/http/Dispatcher.js');
require('./NX/http/View.js');
require('./NX/test/unit/TestCase.js');
require('./NX/test/unit/TestRunner.js');
require('./NX/test/Unit.js');

// }}}
// {{{ NX env settings

NX.env = NX.pathinfo(module.parent.filename);
NX.apply(NX.env, {
    dirs: {
        config: 'configs',
        controller: 'controllers',
        module: 'modules'
    },
    server: {
        http: {
            config: {
                filename: 'httpd-conf.js'
            },
            mimetype: {
                filename: 'httpd-mimetype.js'
            }
        }
    }
});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
