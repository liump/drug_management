<script setup>
import pageBg from '@/assets/images/pageBg.png'
import pageBgTop from '@/assets/images/bgTop.png'
import dayjs from 'dayjs'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { BorderBox8, Decoration7 } from '@dataview/datav-vue3';

import BigScreenLeft1 from '@/views/BigScreen/components/BigScreenLeft1.vue'
import BigScreenLeft2 from '@/views/BigScreen/components/BigScreenLeft2.vue'
import BigScreenRight1 from '@/views/BigScreen/components/BigScreenRight1.vue'
import BigScreenRight2 from '@/views/BigScreen/components/BigScreenRight2.vue'
import BigScreenCenter from '@/views/BigScreen/components/BigScreenCenter.vue'

let nowTime = ref('')
const $router = useRouter()

function handleToHome() {
    $router.push({
        path: '/drugCatelogue'
    })
}

onMounted(() => {
    setInterval(() => {
        nowTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000);
})

</script>

<template>
    <div class="page-row">
        <el-image :src="pageBg" class="bg-image"></el-image>
        <div class="bg-top">
            <el-image :src="pageBgTop" class="bg-top-image"></el-image>
            <div class="bg-top-title">药品库存信息大屏</div>
            <div class="bg-top-time">
                <span>{{ nowTime }}</span>
                <!-- <el-icon class="bg-top-home" @click.native="handleToHome">
                    <HomeFilled />
                </el-icon> -->
            </div>
        </div>
        <BorderBox8 class="left-1 charts-box">
            <Decoration7 class="charts-box-title">
                &nbsp; 入库信息 &nbsp;
            </Decoration7>
            <BigScreenLeft1 />
        </BorderBox8>
        <BorderBox8 class="left-2 charts-box" :reverse="true">
            <Decoration7 class="charts-box-title">
                &nbsp; 库存类别 &nbsp;
            </Decoration7>
            <BigScreenLeft2 />
        </BorderBox8>

        <BorderBox8 class="center-border charts-box" :reverse="true">
            <Decoration7 class="charts-box-title">
                &nbsp; 出库Top10 &nbsp;
            </Decoration7>
            <BigScreenCenter />
        </BorderBox8>

        <BorderBox8 class="right-1 charts-box">
            <Decoration7 class="charts-box-title">
                &nbsp; 出库信息 &nbsp;
            </Decoration7>
            <BigScreenRight1 />
        </BorderBox8>
        <BorderBox8 class="right-2 charts-box" :reverse="true">
            <Decoration7 class="charts-box-title">
                &nbsp; 库存预警 &nbsp;
            </Decoration7>
            <BigScreenRight2 />
        </BorderBox8>

    </div>
</template>

<style scoped>
.page-row {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    color: #fff;
}

.bg-top {
    width: 98vw;
    height: 6vh;
    position: absolute;
    top: 2vh;
    left: 1vw;

    .bg-top-image {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .bg-top-title {
        text-align: center;
        font-weight: 700;
        font-size: 4vh;
    }

    .bg-top-time {
        position: absolute;
        right: 1vw;
        display: flex;
        align-items: center;

        span {
            margin-right: 8px;
        }
    }

    .bg-top-home {
        cursor: pointer;
    }

}

.bg-image {
    width: 100%;
    height: 100%;
    position: absolute;
}

.charts-box {
    width: 26vw;
    height: 36vh;
    position: absolute;

    .charts-box-title {
        width: 100%;
        height: 4vh;
    }
}

.left-1 {
    top: 20vh;
    left: 1vw;
}

.left-2 {
    top: 62vh;
    left: 1vw;
}

.right-1 {
    top: 20vh;
    right: 1vw;
}

.right-2 {
    top: 62vh;
    right: 1vw;
}

.center-border {
    width: 44vw;
    height: 62vh;
    position: absolute;
    top: 26vh;
    left: 28vw;
}
</style>