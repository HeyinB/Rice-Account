// pages/home/home.js
import vxCloud from '../../utils/vxCloud'
import { DAY_FROMAT } from '../../utils/day'
// import { DAY_UNIX } from '../../utils/day.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollViewHeight: '',
        BillList: [],
        sumPrice: 0,
        avgSum: 0,
        nowDate: "",
        dateMsg: "",
        total: ""
    },
    onShow() {
        wx.hideHomeButton()
        // this.setData({
        //     BillList: [],
        //     total: 0,
        // })
        this.getBillData()

    },
    onLoad: function (options) {
        wx.hideHomeButton()
        this.getNowDate()
    },
    async getBillData() {

        let { result } = await vxCloud('getBill')
        // console.log('result', result)
        let list = this.formatPrice(result.data)

        this.setData({
            BillList: list,
            total: result.total,
        })
    },

    formatPrice(Data) {
        let List = []
        let sum = 0
        // console.log('----Data----', Data);

        Data.forEach(e => {
            sum += Number(e.price)
            let index = List.findIndex(item => {
                return item.date_unix === e.date_unix
            })
            let info = {
                cdata: DAY_FROMAT(e.create_date, "MM-DD HH:mm:ss"),
                iconclass: e.classInfo[0].iconclass,
                iconname: e.classInfo[0].iconname,
                ...e
            }
            if (index === -1) {
                List.push({
                    date_unix: e.date_unix,
                    lumpSum: Number(e.price),
                    mdata: DAY_FROMAT(e.date_unix, "MM-DD"),
                    list: [info]
                })
            } else {
                List[index].lumpSum += Number(e.price)
                List[index].list.push(info)
            }
        })
        this.setData({
            sumPrice: sum.toFixed(2),
            avgSum: (sum.toFixed(2) / Data.length).toFixed(2)
        })
        return List
    },
    tobookkeeping() {
        wx.navigateTo({
            url: '../bookkeeping/bookkeeping',
        })
    },
    tostatistics() {
        // wx.navigateTo({
        //     url: '../statistics/statistics',
        // })
    },
    getNowDate() {
        let nowDate = new Date()
        let date = DAY_FROMAT(nowDate, 'YYYY-MM-DD')
        let hour = nowDate.getHours()
        let msg = ''
        if (hour > 0 && hour < 11) msg = "早上好"
        if (hour > 11 && hour < 13) msg = "中午好"
        if (hour > 12 && hour < 18) msg = "下午好"
        if (hour > 18 && hour < 24) msg = "晚上好"

        this.setData({
            nowDate: date,
            dateMsg: msg
        })
    }
})
