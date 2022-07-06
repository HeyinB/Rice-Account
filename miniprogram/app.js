// app.js
App({
    globalData: {
        userInfo: {}
    },
    onLaunch: function() {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                env: 'cloud1-2gmwalpz8616f6fa',
                traceUser: true,
            });
        }
        this.getUserInfo_Storage()
    },
    // 获取头像数据
    getUserInfo_Storage() {
        wx.getStorage({
            key: "userInfo",
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success: (res) => {
                if (res) {
                    this.globalData.userInfo = res.data
                    // wx.reLaunch({
                    //     url: '/pages/ledger/ledger'
                    // })
                }
            }
        })
    }
});