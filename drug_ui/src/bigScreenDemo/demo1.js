let arr = [
    { name: '计算机显示器', value: 208 },
    { name: '计算机台式主机', value: 205 },
    { name: '手机', value: 138 },
    { name: '笔记本电脑', value: 56 },
    { name: '计算机一体主机', value: 40 },
    { name: '键鼠', value: 26 },
    { name: '打印机', value: 8 },
    { name: '会议平板', value: 2 },
    { name: '视频分配器', value: 1 },
    { name: '投影幕布', value: 1 },
    { name: '移动硬盘', value: 1 },
    { name: '相机', value: 1 },
    { name: '私有云服务器', value: 1 }
 ]
 
 var option = {
    backgroundColor: '#0E1327',
    title: {
       text: '仓库资产排名',
       textStyle: {
          color: '#fff',
       },
    },
    dataZoom: [{
       type: 'slider',
       backgroundColor: 'rgba(245,245,245)',
       backgroundColor: 'transparent',
       brushSelect: false,
       width: 7,
       show: true, //flase直接隐藏图形
       yAxisIndex: [0],
       //left: 'center', //滚动条靠左侧的百分比
       //bottom: 13,
       startValue: 0, //滚动条的起始位置
       endValue: 6, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
 
       handleStyle: {
          color: '#fff',
          borderColor: '#E8E8E8',
       },
       fillerColor: '#E8E8E8',
       borderColor: 'transparent',
       showDetail: false,
 
       dataBackground: {
          areaStyle: {
             opacity: 0
          },
          lineStyle: {
             color: 'transparent'
          },
       },
 
    }],
    legend: {
       show: false,
    },
    grid: {
       left: "15%",
       right: "20%",
       bottom: "5%",
       top: "10%",
       containLabel: true,
    },
    tooltip: {
       trigger: "axis",
       axisPointer: {
          lineStyle: {
             color: "#86909C", //显示竖线颜色
             type: "dashed",
          },
       },
       backgroundColor: "none", //tooltip背景色
       borderColor: "rgba(204,204,204,0.1)", //tooltip边框颜色
       borderWidth: 1,
       borderRadius: 4,
       width: 300,
       formatter: function (params) {
          //自定义tooltip内容
          var text = "";
          arr.map(val => {
             params.map(v => {
                if (val.name == v.name) {
                   text += `<div style="background: rgba(204,204,204,0.1);border-radius:4px;padding:8px;backdrop-filter: blur(5px);box-shadow: 0px 0px 16px 0px rgba(29,48,92,0.15);"> 
                            <h2 style="color:#fff;font-size:12px;">${val.name} </h2> 
                            <div  style="background:#ffffff;border-radius:6px;margin:4px;padding:4px 8px;color:#000000;margint-bottom:30px"> 
                               <b style="display:inline-block;width:8px;height:8px;border-radius:6px;"></b>
                               <span style="color:#4E5969;">${v.seriesName} </span> 
                               <span style="float:right;color:#1D2129;font-size:12px;">${v.value}</span> 
                            </div>
                      </div>`;
                }
                return v
             })
             return val
          })
          return text;
       },
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
          axisTick: {
             show: false,
          },
          inverse: true, // 倒序
          boundaryGap: false, // 留白政策
          data: arr.map(v => v.name),
          axisLabel: {
             color: "#fff",
             align: 'left',
             padding: [-10, 0, 0, -250],
             verticalAlign: "top",
             formatter: (name, index) => {
                let i = arr.findIndex(v => v.name == name);
                if (i == 0) {
                   return [`{lg1|${i + 1}} ` + "{title|" + name + "} "].join("\n");
                } else if (i == 1) {
                   return [`{lg2|${i + 1}} ` + "{title|" + name + "} "].join("\n");
                } else if (i == 2) {
                   return [`{lg3|${i + 1}} ` + "{title|" + name + "} "].join("\n");
                } else {
                   return [`{lg|${i + 1}} ` + "{title|" + name + "} "].join("\n");
                }
             },
             rich: {
                lg1: {
                   backgroundColor: "#bb505d",
                   color: '#fff',
                   borderRadius: 5,
                   padding: 5,
                   align: "center",
                   width: 32,
                   height: 32,
                   lineHeight: 32,
                   fontSize: 19,
                   fontFamily: 'Source Han Sans CN-Regular',
                },
                lg2: {
                   backgroundColor: "#dec674",
                   color: '#fff',
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
                   backgroundColor: "#84bf96",
                   color: '#fff',
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
                   color: '#fff',
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
                   color: '#fff',
                   align: "right",
                   fontSize: 18,
                   fontFamily: 'Source Han Sans CN-Regular',
                   padding: [0, 0, 0, 21],
                }
             },
          },
       },
    ],
    series: [
       {
          name: "数量",
          type: "bar",
          barWidth: 15, // 柱子宽度
          showBackground: true,
          backgroundStyle: {
             color: 'rgba(57, 126, 240, 0)',
             borderColor: 'rgba(57, 126, 240, 0.04)',
             borderWidth: 20
          },
          label: {
             show: true,
             formatter: '数量：{c}',
             color: "#fff",
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
                   color: '#ffce7b' // 0% 处的颜色
                }, {
                   offset: 1,
                   color: '#ffe600' // 100% 处的颜色
                }],
             },
          },
          data: arr.map(v => v.value),
       },
    ],
 };