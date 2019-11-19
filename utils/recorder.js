import {
    config
} from '../config.js'

let RecorderManager = null

class Recorder {

    recorderStart() {
        RecorderManager = wx.getRecorderManager()

        const options = {
            sampleRate: 16000,
            numberOfChannels: 1,
            format: 'mp3'
        }
        RecorderManager.start(options)
    }

    recorderStop() {
        RecorderManager.stop()
        return new Promise((resolve, reject) => {
            this._recorderStop(resolve, reject)
        })
        
    }

    _recorderStop(resolve, reject) {
        RecorderManager.onStop((res) => {
            resolve(res)
        })
    }

}

export {
    Recorder
}