/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.test.Unit

/**
 * @class NX.test.Unit
 *
 * ユニットテストクラス
 *
 * @singleton
 */
NX.test.Unit = new (NX.extend(Object, {

    // {{{ run

    /**
     * run
     *
     * ユニットテスト実行メソッド
     *
     * @param config コンフィグオプション
     */
    run : function(config) {

        var me = this;

        config = config || {};

        // 初期コンフィグオプション格納
        me.initialConfig = config;

        // コンフィグオプション適用
        NX.apply(me, config);

        // 初期値設定
        NX.applyIf(me, {
            items: NX.isArray(config.items) || [],
            path: me.path || '/'
        });

        // テストケース読み込み&実行
        NX.each(config.items, function(ns) {

            var file = me.path + '/' + ns + '.js';

            // 同期でファイル存在チェック、存在しない場合は例外発生
            NX.fs.readFileSync(file);

            // テストケースファイル読み込み
            require(file);

            // テストケースオブジェクト取得&生成
            var tCls = eval(ns + 'TestCase');
            var t = new tCls();



        });

    }

    // }}}




    // }}}

}));

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
