/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.http.Controller

/**
 * @class NX.http.Controller
 */
NX.http.Controller = function(config) {

    var parentCls = NX.extend(NX.AbstractController, config);

    var cls = new (NX.extend(parentCls, {

        // {{{ initController

        initController: function(o) {

            // メンバのプロパティに、リクエストオブジェクトとレスポンスオブジェクトを設定
            NX.iterate(config, function(member) {

                cls[member].req = o.req;
                cls[member].res = o.res;

            });

            // スーパークラスメソッドコール
            parentCls.superclass.initController.apply(this, arguments);
        }

        // }}}

    }));

    return cls;

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
