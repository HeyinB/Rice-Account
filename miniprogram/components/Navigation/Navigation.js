// components/Navigation/Navigation.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        show: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        ShowOrHide() {
            console.log(this.data.show)
            this.setData({
                show: this.data.show === 1 ? 0 : 1
            })
        },
        tobookkeeping() {
            wx.navigateTo({
                url: '../bookkeeping/bookkeeping',
            })
            this.ShowOrHide()
        },
    }
})
