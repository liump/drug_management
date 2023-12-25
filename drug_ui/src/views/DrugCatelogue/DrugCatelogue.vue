<script setup>
import { ref } from 'vue'
import { httpDrugCatelogueQuery } from '@/api/drugCatelogue.js'

let queryForm = ref({
    drugName: ''
})
let tableHeader = ref([
    { id: 1, label: '批准文号', prop: 'approvalNumber' },
    { id: 2, label: '产品名称', prop: 'drugName' },
    { id: 3, label: '剂型', prop: 'dosage' },
    { id: 4, label: '规格', prop: 'specifications' },
    { id: 5, label: '上市许可持有人', prop: 'holder' },
    { id: 6, label: '生产单位', prop: 'productionUnit' },
    { id: 7, label: '药品编码', prop: 'drugCode' },
    { id: 8, label: '备注', prop: 'remark' },
])

let tableData = ref([
    { id: 1, approvalNumber: '1', drugName: '2', dosage: '3', specifications: '4', holder: '5', productionUnit: '6', drugCode: '7', remark: '8' },
])
let total = ref(0)
let queryParams = ref({
    currentPage: 1,
    pageSize: 10
})
let tableLoading = ref(false)


function handleListInfo() {
    const params = Object.assign(queryForm.value, queryParams.value)
    tableLoading.value = true
    httpDrugCatelogueQuery(params)
        .then(res => {
            tableData.value = res.data.data || []
            total.value = res.data.total || 0
            tableLoading.value = false
        })
        .catch(err => {
            tableLoading.value = false
        })
}

handleListInfo()

function handleCurrentChange(params) {
    queryParams.value = Object.assign(queryParams.value, { currentPage: params })
    handleSearch()
}

function handleSearch() {
    handleListInfo()
}
function handleReset() {
    queryForm.value = {
        search: ''
    }
    queryParams.value = {
        currentPage: 1,
        pageSize: 10
    }
    total.value = 0
    handleSearch()
}
</script>

<template>
    <div class="page">
        <el-row justify="space-between">
            <el-form :model="queryForm" label-suffix=":" inline>
                <el-form-item label="产品名称">
                    <el-input v-model="queryForm.drugName" placehold="请输入产品名称关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
            <el-upload :show-file-list="false" action="/api/drugCatelogue/upload">
                <el-button type="primary">上传药品本位码</el-button>
            </el-upload>
        </el-row>
        <el-table :data="tableData" class="page-table" v-loading="tableLoading">
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column v-for="(item, index) in tableHeader" :key="index" :prop="item.prop" :label="item.label" />
        </el-table>

        <el-row type="flex" justify="end">
            <el-pagination class="page-pagination" v-model:current-page="queryParams.currentPage"
                layout="total, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
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