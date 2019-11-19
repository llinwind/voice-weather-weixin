// components/weather/today/index.js
import {
    Map
} from '../../../models/qqmap.js'
import {
    Today
}
from '../../../models/today.js'
let today = new Today()
let map = new Map()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        day: null,
        dayTemperature: null,
        dayWeather: null,
        night: null,
        nightTemperature: null,
        nightWeather: null,
        city: '',
        showModal: false
    },

    lifetimes: {
        created() {
            this.getLocation()
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getLocation: function() {
            this.getCurrentWeather()
        },

        getCurrentWeather: function() {
            map.getLocation()
                .then((res) => {
                    console.log(res)
                    map.getLocationFromSDK(res.latitude, res.longitude)
                        .then(res => {
                            console.log(res)
                            this.setData({
                                city: res.result.ad_info.city
                            })
                            today.getTodayWeather(res.result.ad_info.city)
                                .then(res => {
                                    console.log(res)
                                    this.setData({
                                        day: res.day,
                                        dayTemperature: res.dayTemperature,
                                        dayWeather: res.dayWeather,
                                        night: res.night,
                                        nightTemperature: res.nightTemperature,
                                        nightWeather: res.nightWeather,
                                    })
                                })
                        })
                })
                .catch((res) => {
                    console.log("catch")
                    this.setData({
                        showModal: true
                    })
                })
        },

        onSure:function(){
            wx.openSetting({
                
            })
        }
    }
})