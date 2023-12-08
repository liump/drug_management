<script setup>
import { ref } from 'vue'

let formData = ref({
    search: ''
})
let tableHeader = ref([
    { id: 1, label: '批准文号', prop: 'approvalNumber' },
    { id: 2, label: '产品名称', prop: 'drugName' },
    { id: 3, label: '剂型', prop: 'dosage' },
    { id: 4, label: '规格', prop: 'specifications' },
    { id: 5, label: '上市许可持有人', prop: 'holder' },
    { id: 6, label: '生产单位', prop: 'productionUnit' },
    { id: 7, label: '药品编码', prop: 'drugCode' },
    { id: 8, label: '出库数量', prop: 'total' },
    { id: 9, label: '货架位置', prop: 'location' },
    { id: 10, label: '出库时间', prop: 'createTime' },
    // { id: 11, label: '备注', prop: 'remark' },
])

let tableData = ref([
    { id: 1, approvalNumber: '1', drugName: '2', dosage: '3', specifications: '4', holder: '5', productionUnit: '6', drugCode: '7', total: '8', location: '9', createTime: '10', remark: '11' },
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