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
            autoScroll: true
        });

        me.on('afterrender', function() {

            var el = me.getEl();
            el.on('click', function(e, t) {

                if(t = e.getTarget('.micon', 2)) {

                    e.stopEvent();

                    var tr = Ext.fly(t.parentNode);

                    if(tr.hasClass('expandable')){
                        tr.toggleClass('expanded');



                    }
                }

            });

        });
        /*
        }
 
        * */
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
