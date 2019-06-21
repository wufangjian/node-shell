const Table = require('cli-table2')
const request = require('superagent')
const sign = require('./sign.js')


// API
const API = {
    YD: 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1',
    BD: 'http://api.fanyi.baidu.com/api/trans/vip/translate?from=auto&to=en',
    langdetect: 'http://fanyi.baidu.com/langdetect?' // 暂时没有用 判断输入文字所属语言
}


/**
 * @des 有道翻译
 */
function youdao(word) {
	request.get(API.YD).query({ q: word}).end(function (err, res) {
		if(err){
            console.log('翻译失败，请重试')
            return false
        }
        
        let data = JSON.parse(res.text)
        let result = {}

        if(data.basic){
            result[word] = data['basic']['explains']
        }else if(data.translation){
            result[word] = data['translation']
        }else {
            console.error('error')
        }

        let table = new Table()
        table.push(result)
        console.log('[有道翻译] =>  ' + table.toString())
    })
}

/**
 * @des 百度翻译
 */
function baidu(word) {
    const url = sign.getSignPath(API.BD, word)
    request.get(url).query({ q: word}).end(function (err, res) {
        if (err) {
            console.log('err')
            return false
        } else {
            let result = {}
            let data = JSON.parse(res.text)
            let arr = []
            data['trans_result'].forEach(item => {
                arr.push(item.dst)
            })
            result[word] = arr

            let table = new Table()
            table.push(result)
            console.log('[百度翻译] =>  ' + table.toString())
        }
    })
}

module.exports = {
	baidu,
	youdao
}
