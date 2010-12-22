/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX.AbstractManager
 */

// {{{ NX.AbstractManager

module.exports = NX.extend(Object, {

    // {{{ typeName

    typeName: 'type',

    // }}}
    // {{{ constructor

    /**
     * @method constructor
     */
    constructor: function(config) {

        NX.apply(this, config || {});

        this.all = new NX.util.MixedCollection();

        this.types = {};
    },

    // }}}
    // {{{ get

    /**
     * @method get
     */
    get : function(id) {
        return this.all.get(id);
    },

    // }}}
    // {{{ register

    /**
     * @method register
     */
    register: function(item) {
        this.all.add(item);
    },

    // }}}
    // {{{ unregister

    /**
     * @method unregister
     */
    unregister: function(item) {
        this.all.remove(item);
    },

    // }}}
    // {{{ registerType

    /**
     * @method registerType
     */
    registerType : function(type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
    },

    // }}}
    // {{{ isRegistered

    /**
     * @method isRegistered
     */
    isRegistered : function(type){
        return this.types[type] !== undefined;
    },

    // }}}
    // {{{ create

    /**
     * @method create
     */
    create: function(config, defaultType) {

        var type        = config[this.typeName] || config.type || defaultType,
            Constructor = this.types[type];

        if (Constructor == undefined) {
            throw new Error(NX.util.Format.format("The '{0}' type has not been registered with this manager", type));
        }

        return new Constructor(config);
    },

    // }}}
    // {{{ onAvailable

    /**
     * @method onAvailable
     */
    onAvailable : function(id, fn, scope) {

        var all = this.all;

        all.on('add', function(index, o){
            if (o.id == id) {
                fn.call(scope || o, o);
                all.un("add", fn, scope);
            }
        });
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
