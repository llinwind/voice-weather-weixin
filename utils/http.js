import {
    config
} from "../config.js"
import {
    utils
} from 'utils.js'


class HTTP {

    request(params) {
        let url = config.baseUrl + params.url
        if (!params.method) {
            params.method = 'GET'
        }
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, params.data, params.method)
        })
    }

    _request(url, resolve, reject, data = '', method = 'GET') {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    utils.showData(res.data.msg)
                }
            },
            fail: (err) => {
                reject()
                utils.showErr(1)
            }
        })
    }
}

export {
    HTTP
}