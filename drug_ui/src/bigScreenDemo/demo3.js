/* 数据 */
let nameList = ["广东", "湖南", "江西", "广西", "浙江", "福建", "湖北", "重庆", "云南", "河南"];// 教职工岗位
let valueList = [100, 99, 98, 97, 96, 95, 94, 93, 92, 91];// 对应数值

// 需要展示几条
const showNum = 7;

/* 函数 */
// 获取当前数据
let currentIndex = showNum; // 当前添加数据下标
let currentValueList = valueList.slice(0, showNum); // 当前数值列表
let currentNameList = nameList.slice(0, showNum); // 当前类型列表
// 改变当前数据
const getCurrentData = () => {
   // 添加数据
   currentValueList.push(valueList[currentIndex]);
   currentNameList.push(nameList[currentIndex]);
   // 重新切割
   currentValueList = currentValueList.slice(1, showNum + 1);
   currentNameList = currentNameList.slice(1, showNum + 1);
   // 判断当前下标是否超过最大值
   if (currentIndex < nameList.length - 1) {
      currentIndex++;
   } else {
      currentIndex = 0;
   }
}
// 调用设置默认
//getCurrentData()

option = {
   legend: {
      show: false,
   },
   grid: {
      left: "100",
      right: "64",
      bottom: "24",
      top: "24",
      containLabel: true,
   },
   xAxis: [
      {
         splitLine: {
            show: false,
         },
         type: "value",
         show: false,
      },
   ],
   yAxis: [
      {
         splitLine: {
            show: false,
         },
         axisLine: {//y轴
            show: false,
         },
         type: "category",
         id: "yAxis1",
         axisTick: {
            show: false,
         },
         inverse: true, // 倒序
         boundaryGap: false, // 留白政策
         data: currentNameList,
         axisLabel: {
            color: "rgba(0, 0, 0, 0.65)",
            align: 'left',
            padding: [-10, 0, 0, -180],
            verticalAlign: "top",
            formatter: (value, index) => {
               let i = nameList.indexOf(value);
               if (i == 0) {
                  return [`{lg1|${i + 1}} ` + "{title|" + value + "} "].join("\n");
               } else if (i == 1) {
                  return [`{lg2|${i + 1}} ` + "{title|" + value + "} "].join("\n");
               } else if (i == 2) {
                  return [`{lg3|${i + 1}} ` + "{title|" + value + "} "].join("\n");
               } else {
                  return [`{lg|${i + 1}} ` + "{title|" + value + "} "].join("\n");
               }
            },
            rich: {
               lg1: {
                  backgroundColor: "rgba(240, 106, 57, 0.1)",
                  color: 'rgba(240, 106, 57, 1)',
                  borderRadius: [5, 5, 0, 0],
                  padding: 5,
                  align: "center",
                  width: 32,
                  height: 32,
                  lineHeight: 32,
                  fontSize: 19,
                  fontFamily: 'Source Han Sans CN-Regular',
               },
               lg2: {
                  backgroundColor: "rgba(255, 176, 38, 0.1)",
                  color: 'rgba(255, 176, 38, 1)',
                  borderRadius: 5,
                  padding: 5,
                  align: "center",
                  width: 32,
                  height: 32,
                  lineHeight: 32,
                  fontSize: 19,
                  fontFamily: 'Source Han Sans CN-Regular',
               },
               lg3: {
                  backgroundColor: "rgba(51, 207, 201, 0.1)",
                  color: 'rgba(51, 207, 201, 1)',
                  borderRadius: 5,
                  padding: 5,
                  align: "center",
                  width: 32,
                  height: 32,
                  lineHeight: 32,
                  fontSize: 19,
                  fontFamily: 'Source Han Sans CN-Regular',
               },
               lg: {
                  backgroundColor: "rgba(57, 126, 240, 0.1)",
                  color: 'rgba(57, 126, 240, 1)',
                  borderRadius: 5,
                  padding: 5,
                  align: "center",
                  width: 32,
                  height: 32,
                  lineHeight: 32,
                  fontSize: 19,
                  fontFamily: 'Source Han Sans CN-Regular',
               },
               title: {
                  color: 'rgba(0,0,0,0.65)',
                  align: "right",
                  fontSize: 18,
                  fontFamily: 'Source Han Sans CN-Regular',
                  padding: [0, 0, 0, 21],
               },
            },
         },
      },
   ],
   series: [
      {
         name: "人数",
         type: "bar",
         id: "bar",
         barWidth: 13, // 柱子宽度
         showBackground: true,
         backgroundStyle: {
            color: 'rgba(57, 126, 240, 0)',
            borderColor: 'rgba(57, 126, 240, 0.04)',
            borderWidth: 20
         },
         label: {
            show: true,
            formatter: '{c}人',
            color: "rgba(0, 0, 0, 0.85)",
            fontFamily: "HarmonyOS Sans-Medium",
            fontSize: 14,
            position: 'right'
         },
         itemStyle: {
            barBorderRadius: [0, 3, 3, 0], // 圆角（左上、右上、右下、左下）
            color: {
               x: 0,
               y: 1,
               x2: 1,
               y2: 0,
               colorStops: [{
                  offset: 0,
                  color: 'rgba(57, 126, 240, 1)' // 0% 处的颜色
               }, {
                  offset: 1,
                  color: 'rgba(51, 207, 201, 1)' // 100% 处的颜色
               }],
            },
         },
         data: currentValueList,
      },
   ],
};

// 循环更新数据
setInterval(() => {
   getCurrentData();
   myChart.setOption({
      yAxis: [{
         id: "yAxis1",
         data: currentNameList,
      }],
      series: [{
         id: 'bar',
         data: currentValueList,
      }],
   });
}, 5000)