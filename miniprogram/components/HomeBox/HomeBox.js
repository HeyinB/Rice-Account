// components/HomeBox/HomeBox.js
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        toBudget() {
            console.log('-----6666----------6666');
            wx.navigateTo({
                url: `../../pages/budget/budget`
            })
        }
    }
})
