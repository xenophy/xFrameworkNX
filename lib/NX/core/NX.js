/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Create NX Object

/**
 * @class NX
 *
 * xFramework NX コアユーティリティ
 *
 * @singleton
 */
NX = {

    // {{{ version

    /**
     * バージョン情報
     *
     * @type String
     */
    version : '0.1.0',

    // }}}
    // {{{ versionDetail

    /**
     * バージョン詳細情報
     *
     * @type String
     */
    versionDetail : {
        major : 0,
        minor : 1,
        patch : 0
    }

    // }}}

};

// }}}
// {{{ NX.apply

/**
 * apply
 *
 * オブジェクトに指定されたオブジェクトの内容をコピーします。
 *
 * @param {Object} 設定先オブジェクト
 * @param {Object} 設定元オブジェクト
 * @param {Object} 初期値オブジェクト
 * @return {Object} 適用されたオブジェクト
 */
NX.apply = (function() {

    return function(o, cfg, defaults) {

        if(defaults) {
            NX.apply(o, defaults);
        }

        if(o && cfg && typeof cfg === 'object') {

            for (var key in cfg) {
                o[key] = cfg[key];
            }
            if (cfg.toString !== Object.prototype.toString) {
                o.toString = cfg.toString;
            }
            if (cfg.valueOf !== Object.prototype.valueOf) {
                o.valueOf = cfg.valueOf;
            }

        }

        return cfg;

    };

})();

// }}}
// {{{ Implement NX Class

NX.apply(NX, {

    // {{{ applyIf

    /**
     * applyIf
     *
     * すべてのプロパティをコピーします。コピー先に既にプロパティが存在している場合、上書きしません。
     *
     * @param {Object} 設定先オブジェクト
     * @param {Object} 設定元オブジェクト
     * @return {Object} 適用されたオブジェクト
     */
    applyIf : function(target, config) {

        if(NX.isObject(target)) {

            NX.iterate(config, function(prop, v) {

                if(target[prop] == undefined) {
                    target[prop] = v;
                }

            });

        }

        return target;
    },

    // }}}
    // {{{ isEmpty

    /**
     * 空確認メソッド
     *
     * @param v 検査値
     * @param allowBlank 空白拒否フラグ
     * @return true:空,false:それ以外
     */
    isEmpty : function(v, allowBlank){
        return v === null || v === undefined || ((NX.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },

    // }}}
    // {{{ isArray

    /**
     * 配列オブジェクト確認メソッド
     *
     * @param v 検査値
     * @return true:配列オブジェクト,false:それ以外
     */
    isArray : function(v){
        return toString.apply(v) === '[object Array]';
    },

    // }}}
    // {{{ isDate

    /**
     * 日付オブジェクト確認メソッド
     *
     * @param v 検査値
     * @return true:日付オブジェクト,false:それ以外
     */
    isDate : function(v){
        return toString.apply(v) === '[object Date]';
    },

    // }}}
    // {{{ isObject

    /**
     * オブジェクト確認メソッド
     *
     * @param v 検査値
     * @return true:オブジェクト,false:それ以外
     */
    isObject : function(v){
        return !!v && Object.prototype.toString.call(v) === '[object Object]';
    },

    // }}}
    // {{{ isPrimitive

    /**
     * プリミティブ値確認メソッド
     *
     * @param v 検査値
     * @return true:文字列、数値、真偽値のいずれか,false:それ以外
     */
    isPrimitive : function(v){
        return NX.isString(v) || NX.isNumber(v) || NX.isBoolean(v);
    },

    // }}}
    // {{{ isFunction

    /**
     * 関数オブジェクト確認メソッド
     *
     * @param v 検査値
     * @return true:関数オブジェクト,false:それ以外
     */
    isFunction : function(v){
        return toString.apply(v) === '[object Function]';
    },

    // }}}
    // {{{ isNumber

    /**
     * 数値確認メソッド
     *
     * @param v 検査値
     * @return true:数値,false:それ以外
     */
    isNumber : function(v){
        return typeof v === 'number' && isFinite(v);
    },

    // }}}
    // {{{ isString

    /**
     * 文字列確認メソッド
     *
     * @param v 検査値
     * @return true:文字列,false:それ以外
     */
    isString : function(v){
        return typeof v === 'string';
    },

    // }}}
    // {{{ isBoolean

    /**
     * 真偽値確認メソッド
     *
     * @param v 検査値
     * @return true:真偽値,false:それ以外
     */
    isBoolean : function(v){
        return typeof v === 'boolean';
    },

    // }}}
    // {{{ isDefined

    /**
     * 定義検査メソッド
     *
     * @param v 検査値
     * @return true:定義済み,false:未定義
     */
    isDefined : function(v){
        return typeof v !== 'undefined';
    },

    // }}}
    // {{{ isIterable

    isIterable : function(v){

        if(NX.isArray(v) || v.callee){
            return true;
        }

        if(/NodeList|HTMLCollection/.test(toString.call(v))){
            return true;
        }

        return ((typeof v.nextNode != 'undefined' || v.item) && NX.isNumber(v.length));
    },

    // }}}
    // {{{ each

    each : function(array, fn, scope){

        if(NX.isEmpty(array, true)){
            return;
        }

        if(!NX.isIterable(array) || NX.isPrimitive(array)){
            array = [array];
        }
        for(var i = 0, len = array.length; i < len; i++){
            if(fn.call(scope || array[i], array[i], i, array) === false){
                return i;
            };
        }
    },

    // }}}
    // {{{ iterate

    iterate : function(obj, fn, scope){

        if(NX.isEmpty(obj)){
            return;
        }

        if(NX.isIterable(obj)) {

            NX.each(obj, fn, scope);
            return;

        } else if(typeof obj == 'object' || typeof 'function') {
            for(var prop in obj){

                if(obj.hasOwnProperty(prop)){
                    if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                        return;
                    };
                }
            }
        }
    },

    // }}}
    // {{{ namespace

    namespace : function() {

        var o, p, g = global;

        NX.iterate(arguments, function(v) {

            p = v.split(".");
            o = g[p[0]] = Object(g[p[0]]);
            for (x = 1, xln = p.length; x < xln; x++) {
                o = o[p[x]] = Object(o[p[x]]);
            }

        });

        return o;
    },

    // }}}
    // {{{ extend

    /**
     * クラスを継承します。
     *
     * @param
     */
    extend : function() {

        var inlineOverrides = function(o){
            for (var m in o) {
                if (!o.hasOwnProperty(m)) {
                    continue;
                }
                this[m] = o[m];
            }
        };

        var objectConstructor = Object.prototype.constructor;

        return function(subclass, superclass, overrides){

            if (NX.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor != objectConstructor
                    ? overrides.constructor
                    : function(){ superclass.apply(this, arguments); };
            }

            if (!superclass) {
                throw NX.msgs.NX.extend.SUPERCLS_NOT_OBJECT;
            }

            var F = function(){},
                subclassProto,
                superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;

            if(superclassProto.constructor == objectConstructor){
                superclassProto.constructor = superclass;
            }

            subclass.override = function(overrides){
                NX.override(subclass, overrides);
            };

            subclassProto.superclass = subclassProto.supr = (function(){
                return superclassProto;
            });

            subclassProto.override = inlineOverrides;
            subclassProto.proto = subclassProto;

            subclass.override(overrides);
            subclass.extend = function(o) {
                return NX.extend(subclass, o);
            };

            return subclass;
        };
    }(),

    // }}}
    // {{{ override

    /**
     * クラスのプロパティをオーバーライドします。
     *
     * @param orgcls オーバーライドするクラスオブジェクト
     * @param overrides オーバーライドオブジェクト
     */
    override : function(orgcls, overrides) {

        NX.apply(orgcls.prototype, overrides);

    },

    // }}}
    // {{{ sleep

    /**
     * スリープメソッド
     *
     * @param sec 停止秒
     */
    sleep(sec) {
        var start = new Date;
        while(1) {
            var cur = new Date;
            if (sec * 1000 <= cur.getTime() - start.getTime()) {
                break;
            }
        }
    },

    // }}}
    // {{{ http

    http: function() {
        NX.http.Server.run(arguments);
    },

    // }}}
    // {{{ socket

    socket: function() {
        NX.socket.Server.run(arguments);
    },

    // }}}

});

// }}}
// {{{ namespace shorthand

NX.ns = NX.namespace;

// }}}
// {{{ Namespaces

NX.namespace(
    'NX.app',
    'NX.http',
    'NX.socket',
    'NX.test',
    'NX.test.unit',
    'NX.util'
);

// }}}
// {{{ require File System

NX.fs = require('fs');

// }}}
// {{{ require util

NX.util = require('util')

// }}}
// {{{ require Assert

NX.assert = require('assert')

// }}}


/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
