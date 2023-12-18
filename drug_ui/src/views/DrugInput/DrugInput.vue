<script setup>
import { ref, reactive } from 'vue'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { Edit, View, Delete } from '@element-plus/icons-vue'

import {
    httpDrugInputQuery,
    httpDrugInputInsert,
    httpDrugInputUpdate,
    httpDrugInputDelete
} from '@/api/drugInput.js'

import { httpDrugCatelogueQuery } from '@/api/drugCatelogue.js'


let queryForm = ref({
    drugName: ''
})
let tableHeader = ref([
    { id: 1, label: '批准文号', prop: 'approvalNumber' },
    { id: 2, label: '产品名称', prop: 'drugName' },
    { id: 3, label: '剂型', prop: 'dosage' },
    { id: 4, label: '规格', prop: 'specifications' },
    // { id: 5, label: '上市许可持有人', prop: 'holder' },
    // { id: 6, label: '生产单位', prop: 'productionUnit' },
    { id: 7, label: '药品编码', prop: 'drugCode' },
    { id: 8, label: '入库数量', prop: 'total' },
    { id: 9, label: '货架位置', prop: 'location' },
    // { id: 10, label: '入库时间', prop: 'createTime' },
    // { id: 11, label: '备注', prop: 'remark' },
    { id: 12, label: '操作', prop: 'control' },

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
    drugCode: '', // 产品编码
    total: '', // 入库数量
    remark: '' // 备注
})
const rules = reactive({
    drugName: [{ required: true, message: '请输入产品名称' },],
    total: [{ required: true, message: '请输入入库数量' },],
    location: [{ required: true, message: '请输入货架位置' },],
})
const formRef = ref()

function handleListInfo() {
    const params = Object.assign(queryForm.value, queryParams.value)
    httpDrugInputQuery(params)
        .then(res => {
            tableData.value = res.data.data || []
            total.value = res.data.total || 0
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

function handleAdd(row) {
    row = row || {
        drugName: '', // 产品名称
        drugCode: '', // 产品编码
        total: '', // 入库数量
        location: '' // 货架位置
    }
    // httpDrugQuery
    handleDrugInfo()
    dialogTitle.value = '新增入库'

    form.value = Object.assign({
        drugName: '', // 产品名称
        drugCode: '', // 产品编码
        total: '', // 入库数量
        location: '' // 货架位置
    }, row)
    dialogVisible.value = true

}
function handleEdit(row) {
    dialogTitle.value = '编辑入库'
    handleAdd(row)
}

function handleDelete(row) {
    ElMessageBox.confirm(
        `确认删除 ${row.drugName} 数据吗?`,
        '警告',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消删除',
            type: 'warning',
        }
    )
        .then(() => {
            // success
            const loading = ElLoading.service({
                // lock: true,
                text: '请求中',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            httpDrugInputDelete(row)
                .then(res => {
                    loading.close()
                    handleSearch()
                })
                .catch(err => {
                    loading.close()
                })
        })
        .catch(() => {
            // Delete canceled
        })

}

function handleDialogConfirm() {
    formRef.value.validate((valid, fields) => {
        if (valid) {
            const loading = ElLoading.service({
                // lock: true,
                text: '请求中',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            delete form.value._vts
            delete form.value.isTrusted
            if (!form.value.id) {
                // 新增
                httpDrugInputInsert(form.value)
                    .then(res => {
                        loading.close()
                        handleDialogCancel()
                    })
                    .catch(err => {
                        console.log("🚀 ~ file: UserRole.vue:80 ~ handleDialogConfirm ~ err:", err)
                        loading.close()
                    })
            } else {
                // 编辑
                httpDrugInputUpdate(form.value)
                    .then(res => {
                        loading.close()
                        handleDialogCancel()
                    })
                    .catch(err => {
                        console.log("🚀 ~ file: UserRole.vue:80 ~ handleDialogConfirm ~ err:", err)
                        loading.close()
                    })
            }
        } else {
            ElMessage.warning('请检查必填项。')
        }
    })


}

function handleDialogCancel() {
    dialogVisible.value = false
    handleSearch()
}

let loading = ref(false)
let drugOptions = ref([])
function handleDrugInfo(drugName) {
    httpDrugCatelogueQuery({ drugName: drugName })
        .then(res => {
            let data = res.data || []
            data = data.data || []
            drugOptions.value = data
        })
        .catch(err => {
            console.log("🚀 ~ file: DrugInput.vue:195 ~ handleDrugInfo ~ err:", err)
        })
}
function handleDrugChange(drugCode) {
    let _obj = drugOptions.value.find(el => `${el.id}` === `${drugCode}`)
    _obj = { ..._obj } || {}

    delete _obj.id
    form.value = Object.assign(form.value, _obj)
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
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-row>
        <el-table :data="tableData" class="page-table">
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column v-for="(item, index) in tableHeader" :key="index" :prop="item.prop" :label="item.label">
                <template v-slot="{ row }">
                    <div v-if="item.prop !== 'control'">
                        {{ row[item.prop] }}
                    </div>
                    <el-row v-else>
                        <el-link class="mr-1" :icon="Edit" @click="handleEdit(row)">编辑</el-link>
                        <el-link :icon="Delete" type="danger" @click="handleDelete(row)">删除</el-link>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-row type="flex" justify="end">
            <el-pagination class="page-pagination" v-model:current-page="queryParams.currentPage"
                layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
        </el-row>

        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="660px">
            <el-row type="flex" justify="center">
                <el-form ref="formRef" :model="form" :rules="rules" label-width="100" label-suffix=":">
                    <el-form-item label="产品名称" prop="drugName">
                        <el-select v-model="form.drugName" clearable placeholder="请输入产品名称关键字" :loading="loading" filterable
                            remote reserve-keyword remote-show-suffix :remote-method="handleDrugInfo"
                            @change="handleDrugChange">
                            <el-option v-for="item in drugOptions" :key="item.id" :label="item.drugName" :value="item.id">
                                <span style="float: left">{{ item.drugName }}</span>
                                <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                                    {{ item.specifications }}
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入库数量" prop="total">
                        <el-input v-model="form.total"></el-input>
                    </el-form-item>
                    <el-form-item label="货架位置">
                        <el-input v-model="form.location"></el-input>
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