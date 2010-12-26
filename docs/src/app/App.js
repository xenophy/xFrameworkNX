/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 *
 * http://xFrameworknx.com
 */

// {{{ Namespace

Ext.ns(
    'Ext.docs',
    'Ext.docs.wiki',
    'Ext.docs.api'
);

// }}}
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

        var me = this;

        // ビューポート生成
        me.viewport = new Ext.Viewport({

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

                // xtype設定
                xtype: 'nav',

                // ID設定
                id: 'nav',

                // 参照設定
                ref: 'nav',

                // サイズ設定
                width: 225,
                minSize: 175,
                maxSize: 400,

                // スプリット設定
                split:true,

                // マージン設定
                margins:'0 0 5 5',
                cmargins:'0 5 5 5',

                // 自動スクロール設定
                autoScroll:true,

                // リスナー設定
                listeners: {
                    opendoc: function(id, node) {
                        me.viewport.main.load({
                            url: 'resources/output/' + id,
                            callback: function() {
                            }
                        });
                    }
                }

            },{

                // リージョン設定
                region: 'center',

                // xtype設定
                xtype: 'main',

                // ID設定
                id: 'doc-body',

                // 参照設定
                ref: 'main',

                // マージン設定
                margins:'0 5 5 0',
                cmargins:'0 5 5 0'

            },{

                // リージョン設定
                region: 'south',

                // xtype設定
                xtype: 'footer',

                // ID設定
                id: 'footer'

            }]

        });

        /*
        var firstNode;
        me.viewport.nav.root.findChildBy(function(node) {

                console.log(node);
            if(node.isLeaf() && !firstNode) {
                firstNode = node;
                return;
            }


//            console.log(node.text);
//            node.expand();
        }, me, true);
        firstNode.select();
        var t = Ext.get(firstNode.getUI().getEl());
        var a = t.child('a');
        me.viewport.nav.fireEvent('opendoc', a.getAttribute('href'), firstNode);
        */

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
