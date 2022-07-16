
import * as echarts from '../ec-canvas/echarts';


let chart = null;
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    data: {
        ec: {
            onInit: function initChart(canvas, width, height, dpr) {

                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                });
                canvas.setChart(chart);
                return chart;
            }
        },
    },
    ready() {
        setTimeout(() => {
            this.setOption()
        }, 2000)
    },
    methods: {
        setOption() {
            let option = {
                backgroundColor: "#ffffff",
                series: [{
                    label: {
                        normal: {
                            fontSize: 14
                        }
                    },
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['20%', '40%'],
                    data: [{
                        value: 55,
                        name: '北京'
                    }, {
                        value: 20,
                        name: '武汉'
                    }, {
                        value: 10,
                        name: '杭州'
                    }, {
                        value: 20,
                        name: '广州'
                    }, {
                        value: 38,
                        name: '上海'
                    }]
                }]
            };
            //这里一定要做个charts是否存在的判断，因为万一ec那里没有初始化，这里就会报错
            if (chart) {
                chart.setOption(option);
            }
        }
    }
})