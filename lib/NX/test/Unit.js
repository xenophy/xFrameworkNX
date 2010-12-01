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
NX.test.Unit = new (NX.extend(NX.test.unit.TestRunner, {

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
        var result = {};
        var assertCount = 0;
        var failureCount = 0;

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

        // 計測開始
        var ds = new Date();
        var start = ds.getTime();

        // テストケース読み込み&実行
        NX.each(config.items, function(ns) {

            var file = ns;
            var clsName = ns + 'TestCase';

            if(NX.isNumber(NX.strpos(ns, '.'))) {
                ns = NX.explode('.', ns);
                var tmp = ns[0];
                delete ns[0];
                ns = NX.implode('.',ns);
                ns = ns.substr(1);
                file = ns.replace(/\./g, '/');
                clsName = tmp + '.' + ns + 'TestCase';
            }

            file = me.path + '/' + file + '.js';

            // テスト実行クラス名出力
            console.log(NX.util.EscapseSequence.bold(clsName));

            // 同期でファイル存在チェック、存在しない場合は例外発生
            NX.fs.readFileSync(file);

            // テストケースファイル読み込み
            require(file);

            // テストケースオブジェクト取得&生成
            var tCls = eval(clsName);

            // テストケース実行
            var r = me._run(tCls, clsName);

            me.result[clsName] = r.result;
            assertCount += r.assertCount;
            failureCount += r.failureCount;

            console.log();
        });

        // 計測
        var de = new Date();
        var end = de.getTime();

        // テスト結果チェック
        var success = true;
        var tCount = 0;
        var fCount = 0;
        var sCount = 0;
        NX.iterate(me.result, function(clsName, result) {
            NX.iterate(result, function(methodName, v) {
                if(v === false) {
                    success = false;
                    fCount++;
                } else {
                    sCount++;
                }
                tCount++;
            });
        });

        console.log();
        if(success === false) {
            console.log(NX.util.EscapseSequence.error('FAILURES!'));
        } else {
            console.log(NX.util.EscapseSequence.ok('SUCCESS!'));
        }
        console.log('Tests: ' + tCount + ', Assertions: ' + assertCount + ', Failures: ' + failureCount + '. (' + Math.floor((end-start)/1000) + ' seconds)');
    }

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
