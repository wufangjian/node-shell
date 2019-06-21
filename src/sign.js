/**
 * @des 百度翻译数字签名
 */
const crypto = require('crypto')


// 参数
const param = {
	appid: '20180803000191366',
	key: 'E6nqPCCbRkmtlBR7TSfJ',
	salt: MathRand(10)
}

/**
 * @des 生成随机数
 * @param {Number} count
 * @return 生成的随机数
 */
function MathRand(count){
    let number = ''
    for (let i = 0; i < count; i++) {
        number += Math.floor(Math.random()*10)
    }
    return number
}


/**
 * @des 获取数字签名
 * @param {String} sign
 * @return MD5加密后的数字签名s
 */
function CryptSign(sign) {
    let md5 = crypto.createHash('md5')
    return md5.update(sign).digest('hex')
}


/**
 * @des 获取路径信息 [参数拼装]
 *  	md5sign = MD5[appid + word + salt + key]
 * @param {String} word
 * @return
 */
function getSignPath(url, word) {
	let sign = CryptSign([param.appid, word, param.salt, param.key].join(''))
	let str = url + '&appid=' + param.appid + '&salt=' + param.salt + '&sign=' + sign
	return str
}


module.exports = {
	getSignPath
}
