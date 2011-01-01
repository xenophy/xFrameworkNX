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

        // カテゴリノード追加
        me.root.appendChild([{
            id: 'man-root',
            text: 'マニュアル',
            cls: 'category-node man-root',
            expanded: true,
            children: Ext.docs.man
        }, {
            id: 'api-root',
            text: 'API ドキュメント',
            cls: 'category-node api-root',
            expanded: true,
            children: Ext.docs.api
        }]);

        me.on('afterrender', function() {

            me.manroot = me.root.findChild('id', 'man-root');
            me.apiroot = me.root.findChild('id', 'api-root');

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

                } else {

                    var t = e.getTarget('div.cls-node');

                    if(t) {

                        var t = Ext.get(t);
                        var a = t.down('a');
                        var id = a.getAttribute('href');

                        var tn = me.apiroot.findChild('href', id, true);
                        tn.expand();

                        me.fireEvent('opendoc', id);

                    } else {

                        var t = e.getTarget('div.pkg-node');

                        if(t) {

                            var t = Ext.get(t);
                            var a = t.down('a');
                            var id = a.getAttribute('href');

                            var tn = me.apiroot.findChild('href', id, true);
                            tn.expand();
                        }

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
