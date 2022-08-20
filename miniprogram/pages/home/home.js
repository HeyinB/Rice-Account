// pages/home/home.js
const app = getApp();

import request from "../../utils/request";
import { DAY_FROMAT } from "../../utils/day";

import {getBill} from '../../http/home'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    BillList: [],
    sumPrice: 0,
    avgSum: 0,
    nowDate: "",
    dateMsg: "",
    total: "",
    modalName: null,
  },
  onShow() {
    wx.hideHomeButton();
    // this.setData({
    //     BillList: [],
    //     total: 0,
    // })
    this.getBillData();
    // this.getUser();
  },
  onLoad: function (options) {
    wx.hideHomeButton();
  },
  async getBillData() {
    //获取账单
    let { userInfo } = app.globalData;
    let { id, user_openid } = userInfo;

    let { data } = await getBill({ id, openid: user_openid });

    console.log('-------getBillData-----',data);
    
    // let { result } = await vxCloud('getBill')
    // console.log('result', result)
    // let list = this.formatPrice(result.data)

    // this.setData({
    //     BillList: list,
    //     total: result.total,
    // })
  },

  formatPrice(Data) {
    let List = [];
    let sum = 0;
    Data.forEach((e) => {
      sum += Number(e.price);
      let index = List.findIndex((item) => {
        return item.date_unix === e.date_unix;
      });
      let info = {
        cdata: DAY_FROMAT(e.create_date, "MM-DD HH:mm:ss"),
        iconclass: e.classInfo[0].iconclass,
        iconname: e.classInfo[0].iconname,
        ...e,
      };
      if (index === -1) {
        List.push({
          date_unix: e.date_unix,
          lumpSum: Number(e.price),
          mdata: DAY_FROMAT(e.date_unix, "MM-DD"),
          list: [info],
        });
      } else {
        List[index].lumpSum += Number(e.price);
        List[index].list.push(info);
      }
    });
    this.setData({
      sumPrice: sum.toFixed(2),
      avgSum: (sum.toFixed(2) / Data.length).toFixed(2),
    });
    return List;
  },
  tostatistics() {
    // wx.navigateTo({
    //     url: '../statistics/statistics',
    // })
  },
  showModal(e) {

    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    });
  },
  tabSelect(e) {
    this.TabCur = e.currentTarget.dataset.id;
    this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
  },
  async getUser() {
    let res = await request({ url: "user/findUserInfo", data: { id: 14 } });
    console.log(res);
  },
});
