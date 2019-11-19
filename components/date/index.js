// components/date/index.js
import {
    utils
} from '../../utils/utils.js'
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
        date: '',
        time: ''
    },

    lifetimes: {
        attached() {
            this.msetInterval()
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        msetInterval() {
            setInterval(() => {
                var date = new Date()
                this.setData({
                    date: date.getFullYear() + '年' + utils.PrefixInteger((date.getMonth() + 1), 2) + '月' + utils.PrefixInteger(date.getDate(), 2) + '日',
                    time: utils.PrefixInteger(date.getHours(), 2) + ':' + utils.PrefixInteger(date.getMinutes(), 2) + ':' + utils.PrefixInteger(date.getSeconds(), 2)
                })
            }, 1000)
        }
    }
})