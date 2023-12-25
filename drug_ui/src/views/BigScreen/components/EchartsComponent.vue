<template>
    <div ref="chart" class="chart" :style="style"></div>
</template>

<script setup >
import { ref, reactive, watch, nextTick, getCurrentInstance } from 'vue'
// import * as echarts from 'echarts' // 全局引用，这么写的话之前配置的按需加载文件就没作用了

// 接收值
const props = defineProps({
    option: {
        type: Object,
        default: () => { }
    }
})

// 定义值
const chart = ref()
const style = reactive({
    width: '100%',
    height: '100%',
    background: '#f8f8f8',
    borderRadius: '8px'
})
const instance = getCurrentInstance()
const echarts = instance.appContext.config.globalProperties.$echarts


// 定义加载函数
const initCharts = () => {
    let myChart = echarts.init(chart.value)
    myChart.setOption(props.option)
    // 当窗口大小改变时候，echarts重置大小
    window.addEventListener('resize', () => {
        myChart.resize()
    })

    return myChart
}

// 监听当配置项发生变化的时候，调用加载函数
watch(
    () => props.option,
    val => {
        if (Object.keys(val)) {
            nextTick(() => {
                initCharts()
            })
        }
    },
    { immediate: true, deep: true }
)

defineExpose({
    initCharts
})
</script>

<style scoped></style>
