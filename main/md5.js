const common = require('../libs/common');
var str = '123456';
var result = common.md5(str+common.MD5_SUFFIX);
console.log(result);