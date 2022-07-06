import * as echarts from '../ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        title: {
            text: '测试下面legend的红色区域不应被裁剪',
            left: 'center'
        },
        legend: {
            data: ['A'],
            top: 50,
            left: 'center',
            backgroundColor: 'red',
            z: 100
        },
        tooltip: {
            show: true,
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // show: false
        },
        yAxis: {
            // x: 'center',
            // type: 'value',
            // splitLine: {
            //     lineStyle: {
            //         type: 'dashed'
            //     }
            // }
            show: false
        },
        series: [{
            name: 'A',
            type: 'line',
            smooth: true,
            data: [18, 36, 65, 30, 78, 40, 33]
        }]
    };

    chart.setOption(option);
    return chart;
}

Page({
    data: {
        ec: {
            onInit: initChart
        }
    },

    onReady() {}
});