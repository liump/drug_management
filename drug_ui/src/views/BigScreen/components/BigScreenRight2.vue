<script setup>
import EchartsComponent from './EchartsComponent.vue'
import { ref, onMounted } from 'vue'
import { httpBigScreenAlert } from '@/api/bigScreen.js'

let option = ref({})


function _initEcharts(list1, list2, list3) {

  let data1 = list1 || [200, 85, 112, 275, 305, 415]
  let data2 = list2 || [80, 162, 91, 134, 144, 130]
  let xData = list3 || ["2018-11", "2018-12", "2019-01", "2019-02", "2019-03", "2019-04"]
  let data1Title = '库存数'
  let data2Title = '预警数'
  let yTitle1 = ''
  let yTitle2 = ''

  option.value = {
    backgroundColor: '#03050c',
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
      bottom: '20%',
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
      data: xData,
      type: "category"
    },
    yAxis: [
      {
        name: yTitle1,
        nameTextStyle: {
          color: '#fff',
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
        name: yTitle2,
        nameTextStyle: {
          color: '#fff',
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
        name: data1Title,
        data: data1,
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
        name: data2Title,
        data: data2,
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
      },
    ],
  };
}

onMounted(() => {
  httpBigScreenAlert()
    .then(response => {
      const data = response.data || []

      let list = data.map(el => {
        const obj = {
          ...el,
          total: parseInt(el.total)
        }
        return obj
      }).slice(0,5)
      let list1 = list.map(el => el.resultTotal)
      let list2 = list.map(el => el.total)
      let list3 = list.map(el => el.drugName)
      _initEcharts(list1, list2, list3)
    })
})




</script>

<template>
  <div class="chart-row">
    <EchartsComponent :option="option" />
  </div>
</template>

<style scoped>
.chart-row {
  position: absolute;
  width: 96%;
  height: calc(100% - 5vh);
  left: 2%;
  box-sizing: border-box;
}
</style>