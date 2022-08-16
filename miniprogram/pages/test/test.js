// pages/test/test.js
import require from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async getuser() {
    let id = wx.getStorageSync('id')
    let data = await require({
      url: 'user/findUserInfo',
      method: 'get',
      data: {
        id
      }
    })
    console.log('-------getuser---------', data);
  },
  async login() {
    wx.login({
      async success(res) {
        console.log('登录！' + res.code)
        if (res.code) {
          //发起网络请求
          let data = await require({
            url: 'login/LoginOrRegister',
            method: 'post',
            data: {
              ...res
            }
          })
          wx.setStorageSync('token', data.data.token)
          wx.setStorageSync('id', data.data.id)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
