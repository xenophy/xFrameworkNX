/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 *
 * http://xFrameworknx.com
 */

// {{{ Ext.app.App

/**
 * Ext.app.App
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 */
Ext.app.App = function(cfg){

    var me = this;

    Ext.apply(me, cfg);

    me.addEvents({
        'ready' : true,
        'beforeunload' : true
    });

    Ext.onReady(me.initApp, me);
};

Ext.extend(Ext.app.App, Ext.util.Observable, {

    // {{{ initApp

    initApp : function() {

        // ビューポート生成
        new Ext.Viewport({

            // レイアウト設定
            layout: 'border',

            // アイテム設定
            items: [{

                // リージョン設定
                region: 'north',

                // xtype設定
                xtype: 'header',

                // ID設定
                id: 'header'

            },{

                // リージョン設定
                region: 'west',
                width: 235
            },{

                // リージョン設定
                region: 'center'

            
            },{

                // リージョン設定
                region: 'south',
                height: 20
            
            }]

        });

    }

    // }}}

});

// }}}
// {{{ Start Application

Application = new Ext.app.App();

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
