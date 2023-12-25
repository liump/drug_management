option = {
    // backgroundColor: '#000',
    legend: {
      top: "0%",
      left: '50%',
      itemWidth: 20,
      itemHeight: 8,
      itemStyle: {
        color: "#18A4FF"
      },
      textStyle: {
        "color": "#c0c3cd",
        fontSize: 13,
        "padding": [2, 0, 0, 0]
      }
    },
    grid: {
      top: '23%',
      left: '14%',
      bottom: '25%',
      right: '10%'
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#2E3033' //坐标轴字颜色
        },
        margin: 15
      },
      axisTick: {
        show: false //隐藏X轴刻度
      },
      splitLine: {     //网格线
        "show": false
      },
      data: ["2018-11", "2018-12", "2019-01", "2019-02", "2019-03", "2019-04"],
      type: "category"
    },
    yAxis: [
      {
        name: '贸易额（百万元）',
        nameTextStyle: {
          color: '#2E3033',
          fontSize: 14,
        },
        axisLine: {
          show: false, //隐藏X轴轴线
  
        },
        axisTick: {
          show: false //隐藏X轴刻度
        },
        axisLabel: {
          show: true
        },
        splitLine: {     //网格线
          "show": false
        }
      },
      {
        name: '同比（%）',
        nameTextStyle: {
          color: '#2E3033',
          fontSize: 14,
        },
        axisLine: {
          show: false, //隐藏X轴轴线
  
        },
        axisTick: {
          show: false //隐藏X轴刻度
        },
        axisLabel: {
          show: true
        },
        splitLine: {     //网格线
          "show": false
        }
      },
    ],
    series: [
  
      {
        name: '市场份额',
        data: [200, 85, 112, 275, 305, 415],
        "type": "bar",
        yAxisIndex: 0,
        "barMaxWidth": "auto",
        // "barWidth": 7,
        "barWidth": 17,
        "itemStyle": {
          barBorderRadius: [7, 7, 0, 0], // 圆角（左上、右上、右下、左下）
          "color": {
            "x": 0,
            "y": 0,
            "x2": 0,
            "y2": 1,
            "type": "linear",
            "global": false,
            "colorStops": [{
              "offset": 0,
              "color": "#0667B2"
            }, {
              "offset": 1,
              "color": "#31DEFF"
            }]
          }
        },
        "label": {
          "show": false,
        }
      },
      {
        name: '市场排名',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        smooth: true,
        symbolSize: 7,
        itemStyle: {
          color: '#ffffff',
          borderColor: '#E7863E',
          borderWidth: 1
        },
        lineStyle: {
          width: 2,
          color: "#E7863E",
        },
        label: {
          show: false,
        },
        data: [80, 162, 91, 134, 144, 130]
      },
    ],
  };
  
  
