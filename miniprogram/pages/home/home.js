// pages/home/home.js
import request from '../../utils/request'
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
        total: "",
        modalName: null
    },
    onShow() {
        wx.hideHomeButton()
        // this.setData({
        //     BillList: [],
        //     total: 0,
        // })
        this.getBillData()
        this.getUser()

    },
    onLoad: function (options) {
        wx.hideHomeButton()
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
    tostatistics() {
        // wx.navigateTo({
        //     url: '../statistics/statistics',
        // })
    },
    showModal(e) {
        console.log('-------showModal--------', e.currentTarget.dataset.target);

        this.setData({
            modalName: e.currentTarget.dataset.target
        })
        console.log('-------this,---------', this.data.modalName);
    },
    hideModal(e) {
        console.log('-------hideModal--------');
        this.setData({
            modalName: null
        })
    },
    tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    async getUser(){
        let res = await request('http://localhost:5000/v1/user/findUserData')
        console.log(res)
    }
})
