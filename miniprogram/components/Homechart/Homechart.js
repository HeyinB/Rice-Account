import * as echarts from "../ec-canvas/echarts";

let chart = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    percen:Number
  },
  data: {
    ec: {
      onInit: function initChart(canvas, width, height, dpr) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr, // new
        });
        canvas.setChart(chart);
        return chart;
      },
    },
  },
  ready() {
    setTimeout(() => {
      this.setOption();
    }, 500);
  },
  methods: {
    setOption() {
      let {percen} = this.data
      let option = {
        backgroundColor: "transparent",
        title: [
          {
            text: `${percen}%剩余`,
            x: "45%",
            y: "43%",
            textAlign: "center",
            textStyle: {
              fontSize: 8,
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
            },
          },
        ],
        polar: {
          radius: ["40%", "50%"],
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          //里第二圈
          {
            name: "",
            type: "bar",
            roundCap: true, //圆角
            barWidth: 60,
            showBackground: true,
            backgroundStyle: {
              color: "#464451",
            },
            data: [percen],
            coordinateSystem: "polar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "#fff",
                  },
                  {
                    offset: 1,
                    color: "#fff",
                  },
                ]),
              },
            },
          },
          //齿轮
          {
            name: "大环",
            type: "gauge",
            splitNumber: 100,
            radius: "-15%",
            center: ["50%", "50%"],
            startAngle: 90,
            endAngle: -269.9999,
            axisLine: {
              show: false,
              lineStyle: {
                color: [
                  [percen/100, "#fff"],
                  [1, "#293041"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 10,
              lineStyle: {
                color: "auto",
                width: 0.7,
              },
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
          },
        ],
      };

      //这里一定要做个charts是否存在的判断，因为万一ec那里没有初始化，这里就会报错
      if (chart) {
        chart.setOption(option);
      }
    },
  },
});
