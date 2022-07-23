// pages/details/details.js
import vxCloud from '../../utils/vxCloud'
import { DAY_UNIX } from '../../utils/day.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    billInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  onReady() {
    this.getDetails()
  },
  async getDetails() {

    let { result } = await vxCloud('getDetails', { id: this.data.id })

    if(result){
      result.cdata = DAY_UNIX(result.create_date)
    }
    this.setData({
      billInfo: result
    })
  }
})
