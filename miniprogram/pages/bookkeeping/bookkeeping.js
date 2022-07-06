// pages/bookkeeping/bookkeeping.js
import vxCloud from '../../utils/vxCloud'
Page({
    data: {
        iconList: [],
        keyyboardShow: false,
        isShow: 1,
        id: null
    },
    onLoad() {
        this.getIconfont()
    },
    showKeyboard(e) {
        const { id, name } = e.target.dataset

        if (id && name) {
            this.setData({
                keyyboardShow: true,
                isShow: 2,
                id
            })
        } else {
            this.closeKeyboard()
        }
    },
    async getIconfont() {
        console.log('-调用了-----调用了');

        let { result } = await vxCloud('geticonfont')
        this.setData({
            iconList: result
        })

    },
    closeKeyboard() {
        this.setData({
            isShow: 1
        })
        setTimeout(() => {
            this.setData({
                keyyboardShow: false,
                id: null
            })
        }, 1000)
    }
})