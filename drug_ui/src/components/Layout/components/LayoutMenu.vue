<script setup>
import { ref } from 'vue'

let menuList = ref([
  {id: 1, title: '药品分类',},
  {id: 2, title: '药品入库',},
  {id: 3, title: '药品出库',},
  {id: 4, title: '库存预警',},
  {id: 5, title: '人员管理',},
  {id: 6, title: '角色管理',},
])
</script>

<template>
  <el-menu default-active="1" class="layout-menu">
    <el-menu-item v-for="item of menuList" :key="item.id" :index="`${item.id}`">
      <el-icon>
        <Document />
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>