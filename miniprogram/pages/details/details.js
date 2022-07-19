// pages/details/details.js
import vxCloud from '../../utils/vxCloud'
import { DAY_UNIX } from '../../utils/day.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(options)
  },
  async getDetails(options) {
    console.log('-------options.id---------', options.id);
    let { result } = await vxCloud('getDetails', { id: options.id })
    console.log('-------result---------', result);
    result.cdata = DAY_UNIX(result.create_date)
    this.setData({
      billInfo: result
    })
  }
})
