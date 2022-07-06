const app = getApp()
import vxCloud from '../../utils/vxCloud'
Page({
    data: {
        userInfo: {}
    },
    onLoad() {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    getUserInfo() {
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: async(res) => {
                // 本地储存
                res.userInfo.loginData = new Date()

                let { result } = await vxCloud('initLedger', res.userInfo)

                if (result.code == 200) {
                    wx.setStorage({
                        key: "userInfo",
                        data: res.userInfo,
                        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
                        success() {
                            wx.getStorage({
                                key: "userInfo",
                                encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
                                success(res) {
                                    getApp().globalData.userInfo = res.data
                                    wx.reLaunch({
                                        url: '../ledger/ledger'
                                    })
                                }
                            })
                        }
                    })
                }

            }
        })

    }
})