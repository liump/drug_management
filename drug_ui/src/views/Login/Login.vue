<script setup>
import { ref } from 'vue'
import bgImage from '@/assets/images/bg-2.jpg'
import { httpLogin } from '@/api/login'

let form = ref({
    userName: '',
    userPassword: ''
})

function handleLogin() {
    console.log('click', form)
    httpLogin(form.value)
        .then(res => {
            console.log("🚀 ~ file: Login.vue:17 ~ handleLogin ~ res:", res)
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
}

.login-row {
    width: 400px;
    height: 270px;
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
    z-index: 100;
    margin-top: 15vh;
    background-color: rgba(255, 255, 255, 0.6);

    h2 {
        text-align: center;
    }
}
.form-row {
    padding: 0 32px;
}

</style>