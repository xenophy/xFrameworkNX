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
            singleExpand:true,
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
