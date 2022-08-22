// components/HomeBox/HomeBox.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        budgerInfo:Object
    },

    /**
     * 组件的初始数据
     */
    data: {
    },
    methods: {
        toBudget() {
            wx.navigateTo({
                url: `../../pages/budget/budget`
            })
        }
    }
})
