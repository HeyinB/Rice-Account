// app.js
App({
    globalData: {
        userInfo: {}
    },
    onLaunch: function() {
        this.getUserInfo_Storage()
    },
    // 获取头像数据
    async getUserInfo_Storage() {
        await wx.getStorage({
            key: "userInfo",
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success: (res) => {
                if (res) {
                    this.globalData.userInfo = res.data
                    wx.reLaunch({
                        url: '/pages/home/home'
                    })
                }
            }
        })
    }
});