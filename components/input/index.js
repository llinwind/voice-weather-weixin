// cmponents/input/index.js
import {
    utils
} from '../../utils/utils.js'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        flag: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        voiceImg: 'images/vocie.png',
        textImg: 'images/text.png',
        focus: true,
        touches: null,
        inputValue: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        change: function(event) {
            this.setData({
                flag: !this.properties.flag,
                focus: true
            })
        },

        touchStart: function(event) {
            console.log(event.touches)
            this.data.touches = event.touches
            this.triggerEvent("touchStart", {}, {})
        },

        touchEnd: function(event) {
            this.triggerEvent("touchEnd", {}, {})
        },

        touchMove: function(event) {
            console.log(this.data.touches)
            if (this.data.touches) {
                this.triggerEvent("touchMove", {
                    event: event,
                    touches: this.data.touches
                }, {})
            }
        },

        onConfirm: function(event) {
            if (!utils.isEmpty(event.detail.value)) {
                console.log(event.detail.value)
                this.triggerEvent("onConfirm", {
                    data: event.detail.value
                }, {})
                this.setData({
                    inputValue: ''
                })
            }
        },

        foucus: function(e) {
            this.triggerEvent("foucus", {}, {})
        },

        blur: function(e) {
            this.triggerEvent("blur", {}, {})
        }

    }
})