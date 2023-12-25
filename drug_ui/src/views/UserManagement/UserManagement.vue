<script setup>
import { ref, reactive } from 'vue'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { Edit, View, Delete } from '@element-plus/icons-vue'

import {
    httpUserQuery,
    httpUserInsert,
    httpUserUpdate,
    httpUserDelete
} from '@/api/user.js'

import { httpRoleQuery } from '@/api/role.js'

let queryForm = ref({
    userName: ''
})
let tableHeader = ref([
    { id: 1, label: '用户名', prop: 'userName' },
    { id: 2, label: '昵称', prop: 'nickName' },
    { id: 3, label: '权限', prop: 'role' },
    { id: 4, label: '创建时间', prop: 'createTime' },
    { id: 5, label: '最后登录时间', prop: 'lastLoginTime' },
    { id: 6, label: '备注', prop: 'remark' },
    { id: 100, label: '操作', prop: 'control' },
])

let tableData = ref([
    { id: 1, userName: '1', nickName: '2', role: '3', createTime: '4', lastLoginTime: '5', remark: '6' },
])
let total = ref(0)
let queryParams = ref({
    currentPage: 1,
    pageSize: 10
})

let dialogVisible = ref(false)
let dialogTitle = ref('')
let form = ref({})
const rules = reactive({
    userName: [{ required: true, message: '请输入用户名称' },],
    userPassword: [{ required: true, message: '请输入用户密码' },],
})
const formRef = ref()

function handleListInfo() {
    const params = Object.assign(queryForm.value, queryParams.value)
    httpUserQuery(params)
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
        userName: '', // 用户名称
        userPassword: '', // 密码
    }
    // httpDrugQuery
    handleDrugInfo()
    dialogTitle.value = '新增用户'

    form.value = Object.assign({
        userName: '', // 用户名称
        userPassword: '', // 密码
    }, row)
    dialogVisible.value = true

}
function handleEdit(row) {
    dialogTitle.value = '编辑用户'
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
            httpUserDelete(row)
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
            delete form.value.roleName
            if (!form.value.id) {
                // 新增
                httpUserInsert(form.value)
                    .then(res => {
                        loading.close()
                        handleDialogCancel()
                    })
                    .catch(err => {
                        loading.close()
                    })
            } else {
                // 编辑
                httpUserUpdate(form.value)
                    .then(res => {
                        loading.close()
                        handleDialogCancel()
                    })
                    .catch(err => {
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
function handleDrugInfo(roleName) {
    httpRoleQuery({ roleName: roleName })
        .then(res => {
            let data = res.data || []
            data = data.data || []
            drugOptions.value = data
        })
        .catch(err => {
            console.log("🚀 ~ file: User.vue:195 ~ handleDrugInfo ~ err:", err)
        })
}
function handleDrugChange(drugCode) {
    let _obj = drugOptions.value.find(el => `${el.id}` === `${drugCode}`)
    _obj = { ..._obj } || {}

    form.value = Object.assign(form.value, { role: _obj.roleName })
}

</script>

<template>
    <div class="page">
        <el-row type="flex" justify="space-between">
            <el-form :model="queryForm" label-suffix=":" inline>
                <el-form-item label="用户名称">
                    <el-input v-model="queryForm.userName" placehold="请输入用户名"></el-input>
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
                    <el-form-item label="用户名称" prop="userName">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="userPassword">
                        <el-input v-model="form.userPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-select v-model="form.roleName" clearable placeholder="请输入角色名称关键字" :loading="loading" filterable
                            remote reserve-keyword remote-show-suffix :remote-method="handleDrugInfo"
                            @change="handleDrugChange">
                            <el-option v-for="item in drugOptions" :key="item.id" :label="item.roleName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
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