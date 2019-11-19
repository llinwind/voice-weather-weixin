// components/show-model/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showModal: {
            type: Boolean,
            observer: function(newVal, oldVal) {
                console.log(newVal)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        Sure: function() {
            this.triggerEvent("onSure", {}, {})
            this.setData({
                showModal: false
            })
        },
        modal_click_Hidden: function() {
            this.setData({
                showModal: false
            })
        }
    }
})