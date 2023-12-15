<script setup>
import { ref } from 'vue'
import bgImage from '@/assets/images/bg-2.jpg'
import { httpLogin } from '@/api/login'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

let form = ref({
    userName: '',
    userPassword: ''
})

function handleLogin() {
    console.log('click', form)
    httpLogin(form.value)
        .then(res => {
            // 保存 token
            const token = res.data.token || ''
            console.log("🚀 ~ file: Login.vue:22 ~ handleLogin ~ token:", token)
            localStorage.setItem('pro__token', token)


            // 保存 userInfo
            const userInfo = res.data.userInfo || {}
            console.log("🚀 ~ file: Login.vue:26 ~ handleLogin ~ userInfo:", userInfo)
            localStorage.setItem('pro__userInfo', JSON.stringify(userInfo))

            router.push({
                path: '/drugCatelogue'
                // name: 'drugCatelogue',
                // query: {
                //     ...route.query,
                //     ...query,
                // },
            })
        })
        .catch(err => {
            console.log("🚀 ~ file: Login.vue:21 ~ handleLogin ~ err:", err)
        })
}
</script>

<template>
    <el-image :src="bgImage" class="bg-image">
    </el-image>
    <div class="page">
        <div class="login-row">
            <h2>药品库存管理系统</h2>
            <el-form :model="form" label-suffix=":" label-width="70" class="form-row">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.userPassword"></el-input>
                </el-form-item>
                <el-row type="flex" justify="center">
                    <el-button type="primary" @click="handleLogin">登 录</el-button>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.bg-image {
    width: 100%;
    height: 100%;
    position: absolute;
}

.page {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-row {
    width: 380px;
    height: 248px;
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.6);

    h2 {
        text-align: center;
    }
}

.form-row {
    padding: 0 32px;
}
</style>