<script setup>
import EchartsComponent from './EchartsComponent.vue'
import { ref, onMounted } from 'vue'
import { httpBigScreenOutput } from '@/api/bigScreen.js'

let option = ref({})

function _initEcharts(list) {
    let data = list || [
        {
            name: 'A栋',
            value: 50,
        },
        {
            name: 'B栋',
            value: 25,
        },
        {
            name: 'C栋',
            value: 15,
        },
        {
            name: 'D栋',
            value: 10,
        },
        {
            name: 'E栋',
            value: 10,
        },
    ]

    // 根据 value 值大小进行排序
    data.sort((a, b) => b.value - a.value);

    // 给每个数据项按照排序后的顺序添加编号
    data = data.map((item, index) => {
        // 获取当前数据项在排序后数组中的索引位置
        const idx = data.indexOf(item);

        // 根据索引位置添加对应编号
        return {
            name: `NO.${idx + 1} ${item.name}`,
            value: item.value,
        };
    });


    let getArrByKey = (data, k) => {
        let key = k || 'value'
        let res = []
        if (data) {
            data.forEach(function (t) {
                res.push(t[key])
            })
        }
        return res
    }
    let opt = {
        index: 0,
    }
    let color = ['#FC619D', '#FF904D', '#48BFE3']
    data = data.sort((a, b) => {
        return b.value - a.value
    })
    let totalValue = 0
    data.forEach(function (t) {
        totalValue += t.value
    })
    data.forEach(function (t) {
        t.sum = totalValue
    })
    option.value = {
        backgroundColor: '#030710',
        grid: {
            top: '2%',
            bottom: -15,
            right: 30,
            left: 30,
            containLabel: true,
        },
        xAxis: {
            show: false,
        },
        yAxis: [
            {
                triggerEvent: true,
                show: true,
                inverse: true,
                data: getArrByKey(data, 'name'),
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    interval: 0,
                    color: '#666',
                    align: 'left',
                    margin: 80,
                    fontSize: 13,
                    formatter: function (value, index) {
                        if (opt.index === 0 && index < 3) {
                            return '{idx' + index + '|' + (1 + index) + '} {title|' + value + '}'
                        } else if (opt.index !== 0 && index + opt.index < 9) {
                            return '{idx|0' + (1 + index + opt.index) + '} {title|' + value + '}'
                        } else {
                            return '{idx|' + (1 + index + opt.index) + '} {title|' + value + '}'
                        }
                    },
                    rich: {
                        idx0: {
                            color: '#FB375E',
                            backgroundColor: '#FFE8EC',
                            borderRadius: 100,
                            padding: [5, 8],
                        },
                        idx1: {
                            color: '#FF9023',
                            backgroundColor: '#FFEACF',
                            borderRadius: 100,
                            padding: [5, 8],
                        },
                        idx2: {
                            color: '#01B599',
                            backgroundColor: '#E1F7F3',
                            borderRadius: 100,
                            padding: [5, 8],
                        },
                        idx: {
                            color: '#333',
                            borderRadius: 100,
                            padding: [5, 8],
                        },
                        title: {
                            width: 165,
                        },
                    },
                },
            },
            {
                triggerEvent: true,
                show: true,
                inverse: true,
                data: getArrByKey(data, 'name'),

                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    shadowOffsetX: '-20px',
                    // color: ['#FF9023', 'red'],
                    color: '#cbd8ea',
                    align: 'left',
                    verticalAlign: 'middle',
                    lineHeight: 30,
                    fontSize: 13,
                    formatter: function (value, index) {
                        // return ((data[index].value / data[index].sum) * 100).toFixed(2) + '%'
                        return data[index].value
                    },
                },
            },
        ],
        series: [
            {
                name: '条',
                type: 'bar',
                barBorderRadius: 30,
                yAxisIndex: 0,
                data: data,
                barWidth: 10,
                // align: left,
                itemStyle: {
                    color: (val) => {
                        if (val.dataIndex < 3 && opt.index === 0) {
                            return color[val.dataIndex]
                        } else {
                            return '#1990FF'
                        }
                    },
                    barBorderRadius: 30,
                },
                label: {
                    normal: {
                        color: 'pink',
                        show: true,
                        position: [0, '-12px'],
                        textStyle: {
                            fontSize: 10,
                        },
                        formatter: function (a, b) {
                            return a.name
                        },
                    },
                },
            },
            {
                name: '背景',
                type: 'bar',
                showBackground: true,
                barBorderRadius: 30,
                yAxisIndex: 0,
                data: data,
                barWidth: 10,
                // align: left,
                itemStyle: {
                    color: 'transparent',
                    barBorderRadius: 30,
                },
                barGap: '-100%',
                data: [100, 100, 100, 100],
                label: {
                    normal: {
                        color: 'pink',
                        show: true,
                        position: [0, '-12px'],
                        textStyle: {
                            fontSize: 10,
                        },
                        formatter: function (a, b) {
                            return a.name
                        },
                    },
                },
            },
        ],
    }
}

onMounted(() => {
    httpBigScreenOutput()
        .then(response => {
            const data = response.data || []

            let list = data.map(el => {
                let obj = {
                    name: el.drugName,
                    value: el.total
                }
                return obj
            })

            _initEcharts(list)
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