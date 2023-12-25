<script setup>
import EchartsComponent from './EchartsComponent.vue'

// 提取公共部分
const formatter = (params) => {
    let res = ''
    for (let i = 0; i < params.length; i++) {
        res += params[i].name + '<br />'
        res +=
            params[i].marker +
            params[i].seriesName +
            ':' +
            `<span style="color: #000; padding-left: 10px; font-weight: 600">
		${params[i].seriesName == 'CPU(%)' ? params[i].value + '%' : params[i].value}</span>`
    }
    return res
}

// 鼠标悬浮在折线图上面的提示语
const tooltip = {
    trigger: 'axis',
    formatter
}

const grid = {
    left: '5%',
    right: '5%',
    containLabel: true
}

const yAxis = {
    type: 'value'
}

const option = {
    // 设置标题
    title: {
        text: 'CPU(%)',
        padding: 15
    },
    tooltip, // 设置鼠标悬浮在折线图上的样式
    grid, // 设置网格
    xAxis: {
        type: 'category',
        boundaryGap: false, // 设置刻度从零开始，默认是true表示刻度作为分割线
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // 横坐标
    },
    yAxis, // 纵坐标
    series: [
        {
            name: 'CPU(%)',
            data: [15, 23, 24, 18, 35, 47, 60],
            type: 'line', // line是折线图,bar是直方图
            itemStyle: {
                color: '#4289fe' // 设置折线图小圆点颜色
            },
            areaStyle: {
                // 设置区域渐变色
                color: {
                    type: 'linear', // 渐变色线性变化
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(66, 137, 254, 1)' }, // 顶端颜色
                        { offset: 1, color: 'rgba(66, 137, 254, 0.11)' } // 低端颜色
                    ]
                }
            }
        }
    ]
}
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