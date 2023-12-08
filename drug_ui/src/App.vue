<script setup>
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

</script>

<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
}
</style>
