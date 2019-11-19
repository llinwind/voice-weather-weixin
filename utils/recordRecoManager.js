const app = getApp()

class RecoManager {

    static manager = app.plugin.getRecordRecognitionManager()

    static initRecord(fc) {
        RecoManager.manager.onStop = (res) => {
            fc(res)
        }
    }

    static startRecord() {
        RecoManager.manager.start({
            duration: 30000,
            lang: "zh_CN"
        })
    }

    static stopRecord(){
        RecoManager.manager.stop()
    }
}

export {
    RecoManager
}