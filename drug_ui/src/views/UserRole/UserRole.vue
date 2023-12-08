<script setup>
import { ref } from 'vue'

let formData = ref({
    search: ''
})
let tableHeader = ref([
    { id: 1, label: '权限名称', prop: 'roleName' },
    { id: 2, label: '权限码', prop: 'roleCode' },
    { id: 3, label: '创建时间', prop: 'createTime' },
    { id: 4, label: '备注', prop: 'remark' },
])

let tableData = ref([
    { id: 1, roleName: '1', roleCode: '2', createTime: '3', remark: '4' },
])
let total = ref(0)
let queryParams = ref({
    currentPage: 1,
    pageSize: 10
})


function handleSizeChange(params) {

}
function handleCurrentChange(params) {

}
</script>

<template>
    <div class="page">
        <el-row>
            <el-form :model="formData" label-suffix=":">
                <el-form-item label="关键字">
                    <el-input v-model="formData.search"></el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table :data="tableData" class="page-table">
            <el-table-column v-for="(item, index) in tableHeader" :key="index" :prop="item.prop" :label="item.label" />
        </el-table>

        <el-row type="flex" justify="end">
            <el-pagination class="page-pagination" v-model:current-page="queryParams.currentPage"
                v-model:page-size="queryParams.pageSize" layout="total, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>

    </div>
</template>

<style scoped>
.page {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.page-table {
    width: 100%;
    flex: 1;
}

.page-pagination {
    margin-top: 16px;
}
</style>