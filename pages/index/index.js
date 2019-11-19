// pages/index/index.js

// import {
//     Recorder
// } from '../../utils/recorder.js'
import {
    Days
} from '../../models/days.js'
import {
    UPLOADFILE
} from '../../utils/upload.js'
import {
    RecoManager
} from '../../utils/recordRecoManager.js'
import {
    utils
} from '../../utils/utils.js'

let uploadFile = new UPLOADFILE()
// let recorder = new Recorder()
let days = new Days()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        RecordingFlag: null,
        timerID: 0,
        sendLock: false,
        days: null,
        city: null,
        loading: false,
        bottomFlag: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        RecoManager.initRecord((res) => {
            this.recordStop(res.result)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh")
        wx.showNavigationBarLoading()
        this.selectComponent("#today-weather").getCurrentWeather()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    onVoiceStart: function(event) {
        console.log("start")
        this.data.RecordingFlag = true
        this.data.sendLock = false
        this._showToast("手指上划,取消发送")
        RecoManager.startRecord()
        this.data.timerID = setTimeout(() => {
            this._showToast("已超时，结束录音")
            this.onVoiceEnd()
        }, 10000)
    },

    onVoiceEnd: function(event) {
        console.log("end")
        wx.hideToast()

        if (this.data.RecordingFlag) {
            clearTimeout(this.data.timerID)
            this.data.RecordingFlag = false
            RecoManager.stopRecord()
        }
    },

    recordStop(data) {
        if (!this.data.sendLock) {
            if (utils.isEmpty(data)) {
                this._showToast("未识别到语音信息，请重说")
                return
            }
            this.data.sendLock = false
            this.setData({
                loading: true
            })
            days.getDaysWeather(data)
                .then(res => {
                    console.log(res)
                    this.setData({
                        days: [res.day1, res.day2, res.day3, res.day4, res.day5, res.day6, res.day7, ],
                        city: res.cityName + "近日天气",
                        loading: false
                    })
                }).catch(() => {
                    this.setData({
                        loading: false
                    })
                })
        }
    },

    onVoiceCancel: function(event) {
        if (this.data.RecordingFlag) {
            var moveLenght = event.detail.event.touches[0].clientY - event.detail.touches[0].clientY //移动距离
            if (Math.abs(moveLenght) > 50) {
                this._showToast("松开手指,取消发送")
                this.data.sendLock = true //触发了上滑取消发送，上锁
                console.log(this.data.sendLock)
            } else {
                this._showToast("手指上划,取消发送")
                this.data.sendLock = false //上划距离不足，依然可以发送，不上锁
                console.log(this.data.sendLock)
            }
        }
    },

    onConfirm(event) {
        this.setData({
            loading: true
        })
        days.getDaysWeather(event.detail.data)
            .then(res => {
                console.log(res)
                this.setData({
                    days: [res.day1, res.day2, res.day3, res.day4, res.day5, res.day6, res.day7, ],
                    city: res.cityName + "近日天气",
                    loading: false
                })
            }).catch(() => {
                this.setData({
                    loading: false
                })
            })
    },

    foucus: function(e) {
        console.log('foucus')
        this.setData({
            bottomFlag: true
        })
    },

    blur: function(e) {
        console.log('blur')
        this.setData({
            bottomFlag: false
        })
    },

    _showToast(title) {
        wx.showToast({
            title: title,
            icon: "none",
            mask: true,
            duration: 3000
        });
    }
})