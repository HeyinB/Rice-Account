// pages/bookkeeping/bookkeeping.js
import { getOwnClassIcon } from "../../http/bookkeeping";

const app = getApp();

Page({
  data: {
    iconList: [],
    keyyboardShow: false,
    isShow: 1,
    id: null,
  },
  onLoad() {
    this.getIconfont();
  },
  showKeyboard(e) {
    const { id, name } = e.target.dataset;

    if (id && name) {
      this.setData({
        keyyboardShow: true,
        isShow: 2,
        id,
      });
    } else {
      this.closeKeyboard();
    }
  },
  async getIconfont() {
    let { userInfo } = app.globalData;
    let { id, user_openid } = userInfo;

    let { data } = await getOwnClassIcon({ id, openid: user_openid });

    if (data.code === 200) {
      this.setData({
        iconList: data.data,
      });
    }
  },
  closeKeyboard() {
    this.setData({
      isShow: 1,
    });
    setTimeout(() => {
      this.setData({
        keyyboardShow: false,
        id: null,
      });
    }, 1000);
  },
});
