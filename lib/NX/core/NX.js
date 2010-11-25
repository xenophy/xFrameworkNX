/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Create NX Object

if (typeof NX === "undefined") {
    NX = {};
}

// }}}
// {{{ NX.apply

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

    // {{{ isEmpty

    isEmpty : function(v, allowBlank){
        return v === null || v === undefined || ((NX.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },

    // }}}
    // {{{ isArray

    isArray : function(v){
        return toString.apply(v) === '[object Array]';
    },

    // }}}
    // {{{ isDate

    isDate : function(v){
        return toString.apply(v) === '[object Date]';
    },

    // }}}
    // {{{ isObject

    isObject : function(v){
        return !!v && Object.prototype.toString.call(v) === '[object Object]';
    },

    // }}}
    // {{{ isPrimitive

    isPrimitive : function(v){
        return NX.isString(v) || NX.isNumber(v) || NX.isBoolean(v);
    },

    // }}}
    // {{{ isFunction

    isFunction : function(v){
        return toString.apply(v) === '[object Function]';
    },

    // }}}
    // {{{ isNumber

    isNumber : function(v){
        return typeof v === 'number' && isFinite(v);
    },

    // }}}
    // {{{ isString

    isString : function(v){
        return typeof v === 'string';
    },

    // }}}
    // {{{ isBoolean

    isBoolean : function(v){
        return typeof v === 'boolean';
    },

    // }}}
    // {{{ isElement

    isElement : function(v) {
        return v ? !!v.tagName : false;
    },

    // }}}
    // {{{ isDefined

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
        if(NX.isIterable(obj)){
            NX.each(obj, fn, scope);
            return;
        }else if(typeof obj == 'object'){
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
    //
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
            // First we check if the user passed in just the superClass with overrides
            if (NX.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor != objectConstructor
                    ? overrides.constructor
                    : function(){ superclass.apply(this, arguments); };
            }

            if (!superclass) {
                throw "Attempting to extend from a class which has not been loaded on the page.";
            }

            // We create a new temporary class
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

    override : function(origclass, overrides) {
        NX.apply(origclass.prototype, overrides);
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
    'NX.util'
);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
