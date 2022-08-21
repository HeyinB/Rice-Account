// components/Keyboard/Keyboard.js
// import vxCloud from '../../utils/vxCloud'
const app = getApp();

import { setBill } from "../../http/bookkeeping";
import { getStorageFun } from "../../utils/storageFun";

Component({
  properties: {
    isShow: Number,
    classid: Number,
    iconclass: String,
  },
  data: {
    loadModal: false,
    showBtn: false,
    remark: "", //备注信息
    time: "", //日期显示时间
    date: "", //不显示的事件
    show_num: 0, //计算器输入价格
    hide_num: "",
    input_height: "250", //计算输入法的高度
    KEYBOART_DATA: [
      { id: 1, value: "7", type: "num" },
      { id: 2, value: "8", type: "num" },
      { id: 3, value: "9", type: "num" },
      { id: 4, value: "今天", type: "today" },
      { id: 5, value: "4", type: "num" },
      { id: 6, value: "5", type: "num" },
      { id: 7, value: "6", type: "num" },
      { id: 8, value: "+", type: "add" },
      { id: 9, value: "1", type: "num" },
      { id: 10, value: "2", type: "num" },
      { id: 11, value: "3", type: "num" },
      { id: 12, value: "-", type: "reduce" },
      { id: 13, value: ".", type: "num" },
      { id: 14, value: "0", type: "num" },
      { id: 15, value: "X", type: "delete" },
      { id: 16, value: "完成", type: "finish" },
    ],
  },
  ready() {
    this.GET_TODAY_DATE();
  },
  methods: {
    //获取键盘高度
    bindfocusfunction({ detail }) {
      this.setData({
        input_height: detail.height,
      });
    },
    finish_enter() {
      this.setData({
        showBtn: false,
      });
    },
    clickbtn() {
      const { showBtn } = this.data;
      console.log("----showBtn----", showBtn);

      this.setData({
        showBtn: true,
      });
    },
    // 日期修改
    bindDateChange(e) {
      let data_arr = e.detail.value.split("-");

      this.setData({
        date: e.detail.value,
        time: `${data_arr[0]}/${data_arr[1]}/${data_arr[2]}`,
      });
    },
    //获取当天日期
    GET_TODAY_DATE() {
      var nowDate = new Date();
      var year = nowDate.getFullYear(),
        month = nowDate.getMonth() + 1,
        day = nowDate.getDate();
      this.setData({
        date: `${year}-${month}-${day}`,
        time: `${year}/${month}/${day}`,
      });
    },
    RPG_TWO_POINT(VAL, value) {
      if (!VAL) return true;
      let str = VAL.lastIndexOf(".");
      if (str != -1 && value == "." && VAL.length - str <= 3) return;
      let lastWard = VAL.slice(VAL.length - 1);

      let NUM_STR = true;

      if (
        str != -1 &&
        VAL.length - str == 3 &&
        lastWard !== "+" &&
        lastWard !== "-"
      ) {
        NUM_STR = isNaN(value);
      }
      return NUM_STR;
    },
    CACULATE({ target }) {
      const { value, type } = target.dataset;
      let { show_num, hide_num } = this.data;

      if (type != "delete") {
        let flg = this.RPG_TWO_POINT(String(show_num), value);
        if (!flg) return;
      }

      if (!value || (show_num.length > 11 && type == "num")) return;
      if (show_num == 0 && +value === 0) return;

      let SUM = this.CACULATE_THE_SUM(type, show_num, hide_num);
      SUM = this.TYPE_DETECTION(value, type, SUM);

      this.setData({
        show_num: SUM.SHOW,
        hide_num: SUM.HIDE,
      });
      if (type == "finish") {
        console.log("进来了");
        this.setBill();
      }
    },
    //类型检测Type detection
    TYPE_DETECTION(VALUE, TYPE, TARGET) {
      let { SHOW, HIDE } = TARGET;

      switch (TYPE) {
        case "num":
          SHOW =
            SHOW == 0 && VALUE != "." && SHOW.length == 1
              ? VALUE
              : SHOW + VALUE;
          HIDE += VALUE;
          break;
        case "finish":
          SHOW = SHOW;
          HIDE = HIDE;
          break;
        case "delete":
          let SUM = this.delete(SHOW, HIDE);
          SHOW = SUM.SHOW;
          HIDE = SUM.HIDE;
          break;
        default:
          SHOW += VALUE;
          HIDE += TYPE;
      }
      return { SHOW, HIDE };
    },
    delete(SHOW, HIDE) {
      if (String(SHOW).length <= 1) return { SHOW: 0, HIDE: 0 };

      SHOW = SHOW.slice(0, SHOW.length - 1);
      HIDE = HIDE.slice(0, HIDE.length - 1);
      return { SHOW, HIDE };
    },
    // 计算
    CACULATE_THE_SUM(ENTERNUM, SHOW, HIDE) {
      HIDE = String(HIDE);
      SHOW = String(SHOW);
      if (ENTERNUM !== "add" && ENTERNUM !== "reduce" && ENTERNUM !== "finish")
        return { SHOW, HIDE };
      if (HIDE.indexOf("add") != -1) {
        SHOW = HIDE.split("add").reduce((PRE, NEXT) => {
          NEXT = NEXT == "." ? 0 : NEXT;
          return Number(PRE) + Number(NEXT);
        });
      } else if (HIDE.indexOf("reduce") != -1) {
        SHOW = HIDE.split("reduce").reduce((PRE, NEXT) => {
          NEXT = NEXT == "." ? 0 : NEXT;
          return Number(PRE) - Number(NEXT);
        });
      }
      HIDE = SHOW;

      return { SHOW, HIDE };
    },
    fakeCallback() {},
    async setBill() {
      let ledgerInfo = await getStorageFun("ledgerInfo");
      let { userInfo } = app.globalData;
      // return
      this.setData({
        loadModal: true,
      });

      let bill_Data = {};
      let dataInof = this.data;
      bill_Data.bill_price = dataInof.show_num; //价格
      bill_Data.bill_remark = dataInof.remark;
      bill_Data.bill_classid = dataInof.classid;
      bill_Data.bill_iconclass = dataInof.iconclass;
      bill_Data.bill_datetime = dataInof.date;
      bill_Data.bill_ledger = ledgerInfo.id;
      bill_Data.openid = userInfo.user_openid;
      bill_Data.userid = userInfo.id;

      // let { result } = await vxCloud('setBill', bill_Data)

      let { data } = await setBill(bill_Data);

      console.log("-------data-----", data);

      if (data.code === 200) {
        this.setData({
          loadModal: false,
          showBtn: false,
        });
        wx.navigateBack({
          delta: 1,
        });
      }
    },
  },
});
