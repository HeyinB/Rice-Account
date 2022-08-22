// pages/details/details.js
// import vxCloud from '../../utils/vxCloud'
import { getBillById } from "../../http/home";
import { DAY_UNIX } from "../../utils/day.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    billInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    });
  },
  onReady() {
    this.getDetails();
  },
  async getDetails() {
    // let { result } = await vxCloud('getDetails', { id: this.data.id })

    let { data } = await getBillById({ id: this.data.id });

    console.log('-------data-----',data);

    
    if (data.code === 200) {
      data.data.cdata = DAY_UNIX(data.data[0].create_date);
    }
    this.setData({
      billInfo: data.data[0],
    });
  },
  async delete() {},
});
