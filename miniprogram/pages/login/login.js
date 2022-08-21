const app = getApp();
import { loginReq } from "../../http/login";
import { setStorageFun } from "../../utils/storageFun";
Page({
  data: {
    userInfo: {},
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  getUserInfo() {
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (user) => {
        let { userInfo } = user;
        wx.login({
          async success(res) {
            userInfo.code = res.code;

            let data = await loginReq(userInfo);
            
            if (data) {
              await setStorageFun("userInfo", data);
              setTimeout(()=>{
                wx.reLaunch({
                  url: "../home/home",
                });
              },1000)
            }
          },
        });
      },
    });
  },
});
