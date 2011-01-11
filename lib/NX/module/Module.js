/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.Module

/**
 * @class NX.Module
 */
NX.Module = NX.extend(NX.module.AbstractModule, {

    // {{{ constructor

    /**
     * @method Module
     */
    constructor : function() {

        var me = this;

        // スーパークラスメソッドコール
        NX.Module.superclass.constructor.apply(me, arguments);

        if(me.autoConnect === true) {
            me.connect(me.connName);
        }

    },

    // }}}
    // {{{ connect

    /**
     * @method connect
     */
    connect : function(name) {

        var me = this;
        var config = NX.config.database.connections[name];

        // TODO:設定が無ければつながない

        if(config) {

            me.connection = new NX.module.Connection(config);

        } else {

            me.connection = null;

        }

        if(me.connection) {

            me.connection.connect();


        }


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
