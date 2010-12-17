/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.sleep

/**
 * @method sleep
 */
module.exports = function(ms) {

    var start = new Date;

    while(1) {
        var cur = new Date;
        if(ms <= cur.getTime() - start.getTime()) {
            break;
        }
    }

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
