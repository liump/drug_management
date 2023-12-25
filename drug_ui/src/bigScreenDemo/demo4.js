
let data = [];
let currentIndex = 0;
let oldIndex;
let barChartList = [{
              name: '普通终端1',
              value: 20
            },
              {
                name: '普通终端2',
                value: 10
              },
              {
                name: '普通终端3',
                value: 30
              },
              {
                name: '普通终端4',
                value: 40
              },
              {
                name: '普通终端5',
                value: 40
              }];
var color = ['#006EDF', '#00FF00', '#FFC30D', '#FF8400', '#00FFFF', '#fd5151', '#f071ff', '#85f67a'];
for (var i = 0; i < barChartList.length; i++) {
   data.push(
      {
         value: barChartList[i].value,
         name: barChartList[i].name,
         itemStyle: {
            normal: {
               borderWidth: 6,
               shadowBlur: 10,
               borderRadius: 10, // 圆角
               borderColor: color[i],
               shadowColor: color[i],
               color: color[i],
            }
         }
      },
      {
         value: 4,
         name: '',
         itemStyle: {
         normal: {
            label: {
               show: false
            },
            labelLine: {
               show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
         }
         }
      }
   );
   }
   var seriesOption = [
   {
      name: 'pie2',
      type: 'pie',
      radius: [78, 80],
      color: '#068898',
      label: {
         show: false
      },
      labelLine: {
         show: false
      },
      data: [1],
      silent: true
   },
   {
      name: 'pie1',
      type: 'pie',
      radius: [90, 100],
      grid: {
         containLabel: true
      },
      label: {
         show: false,
         position: 'center',
         formatter: '{c_style|{c}%}\n{b_style|{b}}',
         rich: {
         b_style: {
            fontSize: 16,
            fontWeight: 400,
            color: '#fff'
         },
         c_style: {
            padding: [0, 0, 10, 0],
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff'
         }
         }
      },
      emphasis: {
         label: {
         show: true,
         fontSize: '14',
         fontWeight: 'normal'
         }
      },
      labelLine: {
         show: false
      },
      data: data
   }
];
option = {
   backgroundColor:'#011234',
   color: color,
   tooltip: {
      show: false
   },
   series: seriesOption
};

myChart.on('mouseover', (params) => {
   oldIndex = currentIndex;
   currentIndex = params.dataIndex;
   highlightPie(currentIndex,oldIndex);
})
function highlightPie(currentIndex,oldIndex) {
   myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 1,
      dataIndex: oldIndex
   })
   myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 1,
      dataIndex: currentIndex
   })
}
setTimeout(()=>{
   highlightPie(0,1);
},50)