// pages/statistics/statistics.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: 'day',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    radioChange({ target }) {
        let { checked } = target.dataset

        if (!checked) return
        console.log('----checked----', checked);
        this.setData({
            checked
        })
    },
})