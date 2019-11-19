import {
    config
} from '../config.js'
var QQMapWX = require('../libs/qqmap/qqmap-wx-jssdk.js');
class Map {
    getLocation() {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'gcj02',
                success: res => {
                    resolve(res)
                },
                fail: () => {
                    reject()
                }
            })
        })
    }

    getLocationFromSDK(latitude, longitude) {
        let qqmapsdk = new QQMapWX({
            key: config.qqMapKey
        })
        return new Promise((resolve, reject) => {
            qqmapsdk.reverseGeocoder({
                location: {
                    latitude: latitude,
                    longitude: longitude
                },
                success: res => {
                    resolve(res)
                }
            })
        })

    }
}

export {
    Map
}