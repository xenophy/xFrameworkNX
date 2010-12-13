/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * xFramework NX
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

/**
 * @class NX
 */

// {{{ NX.versionDetail

/**
 * @prop versionDetail
 */
var versionDetail = { major : 0, minor : 1, patch : 0 };
module.exports.versionDetail = versionDetail;

// }}}
// {{{ NX.version

/**
 * @prop version
 */
module.exports.version = (
    versionDetail.major + '.' +
    versionDetail.minor + '.' +
    versionDetail.patch
);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
