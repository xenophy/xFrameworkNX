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
                            url: 'resources/output/' + id + '.html',
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

        var firstNode;
        me.viewport.nav.root.findChildBy(function(node) {
            if(node.isLeaf() && !firstNode) {
                firstNode = node;
            }
        }, me, true);
        firstNode.select();
        var t = Ext.get(firstNode.getUI().getEl());
        var a = t.child('a');
        me.viewport.nav.fireEvent('opendoc', a.getAttribute('href'), firstNode);

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
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 *
 * http://xFrameworknx.com
 */

// {{{ Ext.HeaderBoxComponent

/**
 * Ext.HeaderBoxComponent
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 */
Ext.HeaderBoxComponent = Ext.extend(Ext.BoxComponent, {

    // {{{ initComponent

    initComponent : function() {

        var me = this;

        // 設定適用
        Ext.apply(me, {
            html: [{
                tag: 'img',
                src: 'resources/images/title.png',
                width: 195,
                height: 49
            
            
            
            }]
        });

        // スーパークラスメソッドコール
        Ext.HeaderBoxComponent.superclass.initComponent.apply(me, arguments);
    }

    // }}}

});

// }}}
// {{{ register xtype

Ext.reg('header', Ext.HeaderBoxComponent);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 *
 * http://xFrameworknx.com
 */

// {{{ Ext.FooterBoxComponent

/**
 * Ext.FooterBoxComponent
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 */
Ext.FooterBoxComponent = Ext.extend(Ext.BoxComponent, {

    // {{{ initComponent

    initComponent : function() {

        var me = this;

        // 設定適用
        Ext.apply(me, {
            html: [{
                tag: 'address',
                html: 'Copyright &copy; 2010 Xenophy.CO.,LTD All rights Reserved.'
            }]
        });

        // スーパークラスメソッドコール
        Ext.FooterBoxComponent.superclass.initComponent.apply(me, arguments);
    }

    // }}}

});

// }}}
// {{{ register xtype

Ext.reg('footer', Ext.FooterBoxComponent);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 *
 * http://xFrameworknx.com
 */

// {{{ Ext.NavPanel

/**
 * Ext.NavPanel
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 */
Ext.NavPanel = Ext.extend(Ext.tree.TreePanel, {

    // {{{ initComponent

    initComponent : function() {

        var me = this;

        // 設定適用
        Ext.apply(me, {
            animate: false,
            rootVisible:false,
            lines:false,
            root: new Ext.tree.TreeNode(),
            collapseFirst:false
        });

        me.root.appendChild([{
            text: 'マニュアル',
            cls: 'category-node',
            expanded: true,
            children: Ext.docs.wiki
        }, {
            text: 'API ドキュメント',
            cls: 'category-node',
            expanded: true,
            children: Ext.docs.api
        }]);

        me.on('afterrender', function() {
            var el = me.getEl();
            el.on('click', function(e, t) {
                var t = e.getTarget('div.x-tree-node-leaf');

                if(t) {
                    var t = Ext.get(t);
                    var a = t.down('a');

                    var id = a.getAttribute('href');

                    if(id !== '#') {
                        me.fireEvent('opendoc', id);
                    }
                }
                e.stopEvent();
            });
        });

        // スーパークラスメソッドコール
        Ext.NavPanel.superclass.initComponent.apply(me, arguments);
    }

    // }}}

});

// }}}
// {{{ register xtype

Ext.reg('nav', Ext.NavPanel);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX Docs
 *
 * http://xFrameworknx.com
 */

// {{{ Ext.MainPanel

/**
 * Ext.MainPanel
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 */
Ext.MainPanel = Ext.extend(Ext.Panel, {

    // {{{ initComponent

    initComponent : function() {

        var me = this;

        // 設定適用
        Ext.apply(me, {
            padding: 20
        });

        // スーパークラスメソッドコール
        Ext.MainPanel.superclass.initComponent.apply(me, arguments);
    }

    // }}}

});

// }}}
// {{{ register xtype

Ext.reg('main', Ext.MainPanel);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
