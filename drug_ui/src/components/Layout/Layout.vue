<script setup>
import { RouterView } from 'vue-router'
import LayoutMenu from './components/LayoutMenu.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="layout-page">
      <el-header class="layout-header">LOGO</el-header>
      <el-container class="layout-container">
        <el-aside width="200px">
          <LayoutMenu />
        </el-aside>
        <el-main class="layout-main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout,
.layout-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.layout-page {
  flex: 1;
  overflow: hidden;
}

.layout-container {
  display: flex;
}

.layout-header {
  background-color: #324057;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.layout-main {
  padding: 16px;
  background-color: #e5e9f2;
}
</style>
