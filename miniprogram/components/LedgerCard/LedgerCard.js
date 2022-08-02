// components/LedgerCard/LedgerCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: Object
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
        toDetailPage({currentTarget}) {
            let id = currentTarget.dataset.id;
            // console.log(currentTarget.dataset)
            wx.navigateTo({
                url: `../../pages/details/details?id=${id}`
            })
        }
    }
})
