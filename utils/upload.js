import {
    config
} from "../config.js"
import {
    utils
} from 'utils.js'


class UPLOADFILE {

    uploadFile(params) {
        let url = config.recorderUrl

        return new Promise((resolve, reject) => {
            this._uploadFile(url, resolve, reject, params.filePath, params.name)
        })
    }

    _uploadFile(url, resolve, reject, filePath = '', name = 'file') {
        wx.uploadFile({
            url: url,
            filePath: filePath,
            name: name,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                console.log(res)
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(JSON.parse(res.data))
                } else {
                    reject()
                    utils.showData(JSON.parse(res.data).msg)
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
    UPLOADFILE
}