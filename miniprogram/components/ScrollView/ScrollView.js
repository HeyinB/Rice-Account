// components/ScrollView/ScrollView.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        BillList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        istrigger: false
    },
    /**
     * 组件的方法列表
     */
    methods: {

        // 自定义下拉刷新控件被下拉
        onPulling(e) {
            console.log("==onPulling==", e)
            setTimeout(() => {
                console.log('ssss')
                this.setData({
                    istrigger: false
                })
            }, 2000);
        },
        tolower() {
            console.log('到底了')
        }
    }
})