// components/weather/basic/index.js
import {
    weather
}
from '../../../utils/weather-ICO.js'
import {
    utils
} from '../../../utils/utils.js'

Component({

    externalClasses: ['container', 'img', 'text'],
    /**
     * 组件的属性列表
     */
    properties: {
        day: {
            type: String
        },
        temperature: {
            type: String
        },
        weather: {
            type: String,
            value: [],
            observer: function (newVal, oldVal) {
                console.log(newVal)
                if (!utils.isEmpty(newVal)) {
                    let weatherICO = weather.ICO[newVal.split("转")[0]]
                    if (!weatherICO){
                        weatherICO = weather.ICO[newVal.split("转")[1]]
                    }
                    this.setData({
                        temperatureICO: weather.basicICO + weatherICO
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        temperatureICO: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})