let utils = {

    tips: {
        1: '出现一个错误',
        10000: '登录失败，请退出重新登陆',
        30000: '继电器ID不存在',
        404: '继电器名称或ID不能为空'
    },

    rSubstring: function(str, num) {
        return str.substring(num, str.length)
    },
    lSubstring: function(str, num) {
        return str.substring(0, str.length - num)
    },
    lrSubstring: function(str) {
        return this.rSubstring(this.lSubstring(str, 1), 1)
    },
    replace: function(str, oldStr, newStr) {
        let reg = new RegExp(oldStr, "g");
        return str.replace(reg, newStr)
    },
    isEmpty: function(val) {
        if (this.trim(val) == '') {
            return true
        } else {
            return false
        }
    },
    trim: function(str) {
        if (str == undefined) {
            return ''
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    showErr(errCode) {
        if (!errCode) {
            errCode = 1
        }
        wx.showToast({
            title: this.tips[errCode],
            icon: 'none',
            duration: 3000
        })
    },
    showData(data) {
        wx.showToast({
            title: data,
            icon: 'none',
            duration: 3000
        })
    },
    PrefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }

}

export {
    utils
}