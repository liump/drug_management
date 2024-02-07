<script setup>
import { ref, reactive } from 'vue'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { Edit, View, Delete } from '@element-plus/icons-vue'

import {
    httpDrugPriceQuery,
    httpDrugPriceEdit
} from '@/api/drugPrice.js'

let queryForm = ref({
    drugName: ''
})
let tableHeader = ref([
    // { id: 1, label: '批准文号', prop: 'approvalNumber' },
    { id: 2, label: '产品名称', prop: 'drugName' },
    { id: 3, label: '剂型', prop: 'dosage' },
    { id: 4, label: '规格', prop: 'specifications' },
    { id: 5, label: '价格(¥)', prop: 'price' },
    // { id: 6, label: '生产单位', prop: 'productionUnit' },
    { id: 7, label: '药品编码', prop: 'drugCode' },
    // { id: 11, label: '备注', prop: 'remark' },
    { id: 112, label: '操作', prop: 'control' },
])

let tableData = ref([
    { id: 1, approvalNumber: '1', drugName: '2', dosage: '3', specifications: '4', holder: '5', productionUnit: '6', drugCode: '7', total: '8', location: '9', createTime: '10', remark: '11' },
])
let total = ref(0)
let queryParams = ref({
    currentPage: 1,
    pageSize: 10
})

let dialogVisible = ref(false)
let dialogTitle = ref('')
let form = ref({
    drugName: '', // 产品名称
    price: '', // 价格
})
const rules = reactive({
    price: [{ required: true, message: '请输入价格' },],
})
const formRef = ref()

function handleListInfo() {
    const params = Object.assign(queryForm.value, queryParams.value)
    httpDrugPriceQuery(params)
        .then(res => {
            tableData.value = res.data || []
        })
        .catch(err => {
            console.log("🚀 ~ file: UserRole.vue:41 ~ handleListInfo ~ err:", err)
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

function handleEdit(row) {
    row = row || {
        drugName: '', // 产品名称
        drugCode: '', // 产品编码
        price: '', // 价格
    }
    dialogTitle.value = '编辑价格'

    form.value = Object.assign({
        drugName: '', // 产品名称
        drugCode: '', // 产品编码
        price: '', // 价格
    }, row)
    dialogVisible.value = true

}

function handleDialogConfirm() {
    formRef.value.validate((valid, fields) => {
        if (valid) {

            const loading = ElLoading.service({
                // lock: true,
                text: '请求中',
                background: 'rgba(0, 0, 0, 0.7)',
            })

            httpDrugPriceEdit(form.value)
                .then(res => {
                    ElMessage.success(res.msg)
                    loading.close()
                    handleDialogCancel()
                })
                .catch(err => {
                    loading.close()
                })
        } else {
            ElMessage.warning('请检查必填项。')
        }
    })


}

function handleDialogCancel() {
    dialogVisible.value = false
    handleSearch()
}


</script>

<template>
    <div class="page">
        <el-row type="flex" justify="space-between">
            <el-form :model="queryForm" label-suffix=":" inline>
                <el-form-item label="产品名称">
                    <el-input v-model="queryForm.drugName" placehold="请输入产品关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table :data="tableData" class="page-table">
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column v-for="(item, index) in tableHeader" :key="index" :prop="item.prop" :label="item.label">
                <template v-slot="{ row }">
                    <div v-if="item.prop !== 'control'">
                        {{ row[item.prop] }}
                    </div>
                    <el-row v-else>
                        <el-link class="mr-1" :icon="Edit" @click="handleEdit(row)">
                            编辑价格
                        </el-link>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-row type="flex" justify="end">
            <el-pagination class="page-pagination" v-model:current-page="queryParams.currentPage"
                layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
        </el-row> -->

        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="660px">
            <el-row type="flex" justify="center">
                <el-form ref="formRef" :model="form" :rules="rules" label-width="100" label-suffix=":">
                    <el-form-item label="产品名称" prop="drugName">
                        {{ form.drugName }}
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <!-- <el-input v-model="form.price"></el-input> -->
                        <el-input-number v-model="form.price" :precision="2"  />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>

                </el-form>
            </el-row>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleDialogCancel">取消</el-button>
                    <el-button type="primary" @click="handleDialogConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

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

.mr-1 {
    margin-right: 16px;
}
</style>