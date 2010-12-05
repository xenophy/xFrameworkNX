/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFrameworkNX
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */
// {{{ NX.util.Wiki

/**
 * @class NX.util.Wiki
 *
 * NX.util.Wikiクラス
 */
//NX.util.Wiki = new (NX.extend(Object, {
NX.util.Wiki = (function() {


    var hStartLevel = 3;
    var notes = [];
    var noteCount = 0;

    /*
private function _parseLine($line)
    {
        $ret = array();
        $level = 0;
        $match = array();

        // ブロックのパース処理
        switch (true) {

            // 見出し
            case (preg_match('/^\*{1,3}([^\*]+.*)$/', $line, $match)):
                $level = $this->_getLevel($line);
                $ret['type'] = 'h';
                $ret['content'][] = array(
                    'level' => $level,
                    'line' => $match[1]
                );

                break;

            // 整形済みテキスト
            case (preg_match('/^(?: |\t)(.*)$/', $line, $match)):
                $ret['type'] = 'pre';
                $ret['content'][] = array('line' => $match[1]);

                break;

            case (preg_match(
                '/^\{{3}(?:([^\{\}\|]*)\|)?(.*)\}{3}$/', $line, $match
            )):

            case (preg_match(
                '/^\{{3}(?:([^\{\}\|]*)\|)?(.*)$/', $line, $match
            )):
                $ret['type'] = 'src';
                $ret['content'][] = array(
                    'name' => ($match[1] !== '')
                               ? strtolower(trim($match[1]))
                               : null,

                    'line' => ($match[2] !== '') ? $match[2] : null
                );

                break;

            // 引用文
            case (preg_match('/^>{1,3}([^>]+.*)$/', $line, $match)):
                $level = $this->_getLevel($line);
                $ret['type'] = 'quote';
                $ret['content'][] = array(
                    'level' => $level,
                    'line' => $match[1]
                );

                break;

            // 水平線
            case (preg_match('/^-{4,}/', $line)):
                $ret['type'] = 'hr';

                break;

            // リスト（順序なし）
            case (preg_match('/^-{1,3}(.*)$/', $line, $match)):
                $level = $this->_getLevel($line);
                $ret['type'] = 'ul';
                $ret['content'][] = array(
                    'level' => $level,
                    'line' => $match[1]
                );

                break;

            // リスト（順序あり）
            case (preg_match('/^\+{1,3}(.*)$/', $line, $match)):
                $level = $this->_getLevel($line);
                $ret['type'] = 'ol';
                $ret['content'][] = array(
                    'level' => $level,
                    'line' => $match[1]
                );

                break;

            // 定義リスト
            case (preg_match('/^:{1,3}([^\|]*)\|(.+)$/', $line, $match)):
                $level = $this->_getLevel($line);
                $ret['type'] = 'dl';
                $ret['content'][] = array(
                    'level' => $level,
                    'line' => $match[2],
                    'option' => $match[1]
                );

                break;

            // テーブル
            case (preg_match(
                '/^\|(.+)\|(c|r|l)?(?:\((.*)\))?$/i', $line, $match
            )):
                $ret['type'] = 'table';
                $ret['align'] = (isset($match[2]))
                                ? strtolower($match[2])
                                : '';
                $ret['summary'] = (isset($match[3])) ? $match[3] : '';
                $ret['content'][] = array('line' => $match[1]);

                break;

            // 配置
            case (preg_match('/^(left):(.*)$/i', $line, $match)):

            case (preg_match('/^(center):(.*)$/i', $line, $match)):

            case (preg_match('/^(right):(.*)$/i', $line, $match)):
                $ret['type'] = 'div';
                $ret['content'][] = array(
                    'line' => $match[2],
                    'option' => strtolower($match[1])
                );

                break;

            // コメント
            case (preg_match('/^\/{2}(.*)/', $line, $match)):
                $ret['type'] = 'com';

                break;

            // 段落
            case (preg_match('/^~(.*)$/', $line, $match)):

            case (preg_match('/^(.+)$/', $line, $match)):
                $ret['type'] = 'p';
                $ret['content'][] = array('line' => $match[1]);

                break;

            default:
                $ret['type'] = false;
        }

        return $ret;
    }
    */

    // {{{ addBlock

    addBlock = function(from, to, preType) {

        var ret = to;

        // 要素追加処理
        if (preType === from.type) {

            // 子要素として追加
            /*
            $arrLast = array_pop($ret);
            $arrLast['content'][] = $from['content'][0];
            $ret[] = $arrLast;
            */

        } else {
            ret.push(from);
        }

        return ret;
    };

    // }}}
    // {{{ match

    match = function(t, regex) {
        return t.match(regex);
    };

    // }}}
    // {{{ getLevel

    getLevel = function(line) {

        var ret = 1;

        for(var i = 1; i < 3; ++i) {
            if(line.charAt(0) !== line.charAt(i)) {
                break;
            }
            ret = i + 1;
        }

        return ret;
    };

    // }}}
    // {{{ parseLine

    parseLine = function(line) {

        var ret = {};
        var matches = {};
        var regex = {
            h : /^\*{1,3}([^\*]+.*)$/
        };

        switch (true) {


            // 見出し
            case NX.isArray(match(line, regex.h)):
                matches = match(line, regex.h);
                ret['type'] = 'h';
                ret['content'] = {
                    level: getLevel(line),
                    line: NX.trim(matches[1])
                };
                break;

            default: 
                ret = false;

        }

        return ret;
    };

    // }}}
    // {{{ parse

    parse = function(source, lv) {

        var ret = [];

        lv = lv || 0;

        if(!NX.isArray(source)) {
            source = NX.explode("\n", source.replace(/\r\n?/g,"\n"));
        } else if(!NX.isArray(source)) {
        } else {
            return source;
        }

        NX.each(source, function(line) {

            line = parseLine(line);

            switch(line.type) {

                // 見出し, 水平線
                case 'h':
                case 'hr':

                    ret = addBlock(ret, line);

                    break;

            }


        });

        return ret;

    };

    // }}}
    // {{{ toHtml

    toHtml = function(line, inline) {

        var ret = line;

        inline = inline || true;



        return line;
    };

    /*
    private function _toHtml($line, $inliner = true)
    {
        $ret = $line;

        // HTMLエスケープ処理
        $ret = str_replace('<', '&lt;', $ret);
        $ret = str_replace('>', '&gt;', $ret);
        $ret = str_replace('"', '&quot;', $ret);

        // インライン要素HTML変換
        if ($inliner) {
            $ret = $this->_execFootNote($ret);
            $ret = $this->_execInline($ret);
        }

        return $ret;
    }
    */



    // }}}
    // {{{ renderLine

    renderLine = function(line) {
    
        var ret = '';

        switch(line.type) {

            // 見出し
            case 'h':

                var lv = line.content.level + hStartLevel - 1;
                var html = toHtml(line.content.line);

                ret += NX.sprintf("<h%s>%s</h%s>\n", lv, html, lv);


                /*
                $content = $line['content'][0];
                $lv = $content['level'] + $this->_hStartLv - 1;
                $lineContent = $this->_toHtml($content['line']);

                $ret .= sprintf("<h%s>%s</h%s>\n", $lv, $lineContent, $lv);
                */

                break;

        }

        return ret;
    };

    // }}}
    // {{{ render

    render = function(parse) {

        ret = '';

        NX.each(parse, function(line) {
            ret += renderLine(line);
        });

        return ret;
    }

    // }}}
    // {{{ Wiki Class

    return new (NX.extend(Object, {

         // {{{ parse

        parse : function(source) {

            var ret = source;

            ret = render(parse(source));

            //render
            //getNotes

            return ret;
        }

        // }}}

    }));

    // }}}

})();

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
