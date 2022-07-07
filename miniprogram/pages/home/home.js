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
        total: ''
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
    },
    async getBillData() {

        let { result } = await vxCloud('getBill')
        // console.log('result', result)
        let list = this.formatPrice(result.data)
        // console.log('----list----', list);

        this.setData({
            BillList: list,
            total: result.total,
        })
    },

    formatPrice(Data) {
        let List = []
        // console.log('----Data----', Data);

        Data.forEach(e => {

            let index = List.findIndex(item => {
                return item.date_unix === e.date_unix
            })
            let info = {
                cdata: DAY_FROMAT(e.date_unix, "MM-DD HH:mm:ss"),
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



            // for (let i = 0; i < List.length; i++) {
            //     if (e.date_unix === List[i].date_unix) {
            //         let info = {
            //             cdata: DAY_FROMAT(e.date_unix, "MM-DD HH:mm:ss"),
            //             iconclass: e.classInfo[0].iconclass,
            //             iconname: e.classInfo[0].iconname,
            //             ...e
            //         }
            //         List[i].lumpSum += Number(e.price)
            //         List[i].list.push(info)
            //         break;
            //     } else {
            //         let info = {
            //             cdata: DAY_FROMAT(e.date_unix, "MM-DD HH:mm:ss"),
            //             iconclass: e.classInfo[0].iconclass,
            //             iconname: e.classInfo[0].iconname,
            //             ...e
            //         }
            //         List.push({
            //             date_unix: e.date_unix,
            //             lumpSum: Number(e.price),
            //             list: [info]
            //         })
            //         break;
            //     }
            // }
        })
        console.log('--------', List);


        return List
    },
    tobookkeeping() {
        wx.navigateTo({
            url: '../bookkeeping/bookkeeping',
        })
    },
    tostatistics() {
        wx.navigateTo({
            url: '../statistics/statistics',
        })
    }
})
