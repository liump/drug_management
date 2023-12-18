<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

let menuList = ref([
  { id: 1, title: '药品分类', pageName: '/drugCatelogue' },
  { id: 2, title: '药品入库', pageName: '/drugInput' },
  { id: 3, title: '药品出库', pageName: '/drugOutput' },
  { id: 4, title: '库存预警', pageName: '/inventoryAlert' },
  { id: 5, title: '人员管理', pageName: '/userManagement' },
  { id: 6, title: '角色管理', pageName: '/userRole' },
])

const _useRoute = useRoute()
let defaultActive = ref(_useRoute.path)

function handleToPage(pageName) {
  console.log("🚀 ~ file: LayoutMenu.vue:14 ~ handleToPage ~ pageName:", pageName)
}
</script>

<template>
  <el-menu :default-active="defaultActive" class="layout-menu" router>
    <el-menu-item v-for="item of menuList" :key="item.id" :index="`${item.pageName}`"
      @click="handleToPage(item.pageName)">
      <el-icon>
        <Document />
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>