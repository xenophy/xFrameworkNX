/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

var path = require('path');

// }}}
// {{{ NX.AbstractDispatcher

/**
 * @class NX.AbstractDispatcher
 */
NX.AbstractDispatcher = NX.extend(NX.util.Observable, {

    // {{{ _appControlerName

    _appControlerName : 'app',

    // }}}
    // {{{ requestPath

    /**
     * @prop requestPath
     */
    requestPath : '',

    // }}}
    // {{{ requestPathinfo

    requestPathinfo : {},

    // }}}
    // {{{ action

    action : '',

    // }}}
    // {{{ constructor

    /**
     * @method AbstractDispatcher
     */
    constructor : function(config) {

        var me = this;

        config = config || {};

        // 設定適用
        NX.apply(me, config);

        // スーパークラスメソッドコール
        NX.AbstractDispatcher.superclass.constructor.apply(me, arguments);

        // 実行パス初期化
        me.path = me.path || NX.env.dirname;

        // コンフィグパス初期化
        me.configs = me.configs || me.path + '/configs';
        me.configs = path.normalize(me.configs);

        // コンテンツパス初期化
        me.contents = me.contents || me.path + '/public_html';
        me.contents = path.normalize(me.contents);

        // コントローラーディレクトリ初期化
        me.controllers = me.controllers || me.path + '/controllers';
        me.controllers = path.normalize(me.controllers);
    },

    // }}}
    // {{{ dispatch

    /**
     * @method dispatch
     */
    dispatch : NX.emptyFn,

    // }}}
    // {{{ getControllerFileName

    /**
     * @method getControllerFileName
     */
    getControllerFileName : function() {

        var me = this,
            ret = '';

        var path = me.requestPath.substr(0, me.requestPath.length - me.requestPathinfo.basename.length);

        if(path == '/') {
            ret = me._appControlerName + '.js';
        } else {
            ret = path.substr(1, path.length - 2) + '.js';
        }

        return ret;
    },

    // }}}
    // {{{ getControllerFilePath

    /**
     * @method getControllerFilePath
     */
    getControllerFilePath : function() {

        var me = this;

        return me.controllers + '/' + me.getControllerFileName();
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
