/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Create NX Object

/**
 * @class NX
 */
NX = {

    // {{{ version

    /**
     * @prop version
     */
    version : '0.1.0',

    // }}}
    // {{{ versionDetail

    /**
     * @prop versionDetail
     */
    versionDetail : {
        major : 0,
        minor : 1,
        patch : 0
    }

    // }}}

}

// }}}
// {{{ NX.apply

/**
 * @method apply
 */
NX.apply = function(o, config, defaults) {

    if(defaults) {
        NX.apply(o, defaults);
    }

    if(o && config && typeof config === 'object') {
        for(var key in config) {
            o[key] = config[key];
        }
    }

    return o;
}

// }}}
// {{{ Implement NX Class

NX.apply(NX, {

    // {{{ applyIf

    /**
     * @method applyIf
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
    // {{{ clone

    /**
     * @method clone
     */
    clone : function(obj) {

        function doClone(o) {

            if(!o || 'object' !== typeof o) {
                return o;
            }

            if('function' === typeof o.clone) {
                return o.clone();
            }

            if(o.hasOwnProperty('__clonedTo')) {
                return o.__clonedTo;
            }

            var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};

            o.__clonedTo = c;

            var p, v;

            for(p in o) {

                if((p !== '__clonedTo') && o.hasOwnProperty(p)) {

                    v = o[p];

                    if(v && 'object' === typeof v) {
                        c[p] = doClone(v);
                    } else {
                        c[p] = v;
                    }

                }
            }

            return c;
        }

        function finalizeClone(o) {

            if(o.hasOwnProperty('__clonedTo')) {

                delete o.__clonedTo;
                var p, v;

                for(p in o) {
                    if(o.hasOwnProperty(p)) {
                        v = o[p];
                        if(v && 'object' === typeof v) {
                            finalizeClone(v);
                        }
                    }
                }
            }
        }

        var clone = doClone(obj);

        finalizeClone(obj);

        return clone;
    },

    // }}}
    // {{{ each

    /**
     * @method each
     */
    each : function(array, fn, scope) {

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
    // {{{ emptyFn

    /**
     * @method emptyFn
     */
    emptyFn : function() {
    },

    // }}}
    // {{{ extend

    extend : function() {

        var inlineOverrides = function(o) {
            for(var m in o) {
                this[m] = o[m];
            }
        };

        var objectConstructor = Object.prototype.constructor;

        return function(subclass, superclass, overrides) {

            if(NX.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor != objectConstructor
                ? overrides.constructor
                : function(){ superclass.apply(this, arguments); };
            }

            if(!superclass) {
                throw "The specified superclass object is illegal.";
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
    // {{{ isArray

    /**
     * @method isArray
     */
    isArray : function(v) {
        return toString.apply(v) === '[object Array]';
    },

    // }}}
    // {{{ isBoolean

    /**
     * @method isBoolean
     */
    isBoolean : function(v) {
        return typeof v === 'boolean';
    },

    // }}}
    // {{{ isDate

    /**
     * @method isDate
     */
    isDate : function(v) {
        return toString.apply(v) === '[object Date]';
    },

    // }}}
    // {{{ isDefined

    /**
     * @method isDefined
     */
    isDefined : function(v) {
        return typeof v !== 'undefined';
    },

    // }}}
    // {{{ isEmpty

    /**
     * @method isEmpty
     */
    isEmpty : function(v, allowBlank) {
        return v === null || v === undefined || ((NX.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },

    // }}}
    // {{{ isFunction

    /**
     * @method isFunction
     */
    isFunction : function(v) {
        return toString.apply(v) === '[object Function]';
    },

    // }}}
    // {{{ isIterable

    /**
     * @method isIterable
     */
    isIterable : function(v) {

        if(NX.isArray(v) || v.callee){
            return true;
        }

        return false;
    },

    // }}}
    // {{{ isNumber

    /**
     * @method isNumber
     */
    isNumber : function(v) {
        return typeof v === 'number' && isFinite(v);
    },

    // }}}
    // {{{ isObject

    /**
     * @method isObject
     */
    isObject : function(v) {
        return !!v && Object.prototype.toString.call(v) === '[object Object]';
    },

    // }}}
    // {{{ isPrimitive

    /**
     * @method isPrimitive
     */
    isPrimitive : function(v) {
        return NX.isString(v) || NX.isNumber(v) || NX.isBoolean(v);
    },

    // }}}
    // {{{ isString

    /**
     * @method isString
     */
    isString : function(v) {
        return typeof v === 'string';
    },

    // }}}
    // {{{ iterate

    /**
     * @method iterate
     */
    iterate : function(obj, fn, scope) {

        if(NX.isEmpty(obj)) {
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

    /**
     * @method namespace
     */
    namespace : function() {

        var o, p, g = global;

        NX.iterate(arguments, function(v) {

            p = v.split(".");
            o = g[p[0]] = Object(g[p[0]]);

            for(x = 1, xln = p.length; x < xln; x++) {
                o = o[p[x]] = Object(o[p[x]]);
            }

        });

        return o;
    },

    // }}}
    // {{{ override

    /**
     * @method override
     */
    override : function(orgcls, overrides) {
        NX.apply(orgcls.prototype, overrides);
    },

    // }}}
    // {{{ service

    /**
     * @method service
     */
    service : function(config) {

        return function(config) {
            new NX.util.Service(config);
        }

    }(),

    // }}}
    // {{{ sleep

    /**
     * @method sleep
     */
    sleep : function(ms) {

        var start = new Date;

        while(1) {
            var cur = new Date;
            if(ms <= cur.getTime() - start.getTime()) {
                break;
            }
        }

    },

    // }}}
    // {{{ toArray

    /**
     * @method toArray
     */
    toArray : function(array, start, end) {
        return Array.prototype.slice.call(array, start || 0, end || array.length);
    }

    // }}}

});

// }}}
// {{{ shorhand

NX.ns = NX.namespace;

// }}}
// {{{ namespace

NX.ns(
    'NX.fs',
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
