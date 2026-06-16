<script setup>
document.title = '管理面板'

import { Refresh, Plus, DArrowRight } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)
const subNames = ref([])
const router = useRouter()

const doLogout = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/auth/logout')

        ElMessage.success(res.data)
        router.push({ name: 'login' })
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const fetchSubNames = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/source/list')
        subNames.value = res.data
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

onMounted(fetchSubNames)
</script>

<template>
    <div class="container">
        <div class="flex-center">
            <el-button type="primary" :loading="loading" @click="fetchSubNames" :icon="Refresh" />
            <el-button type="primary" :loading="loading" :icon="Plus" />
            <div class="flex-1"></div>
            <el-button type="warning" :loading="loading" @click="doLogout" :icon="DArrowRight" />
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 20px;
}
</style>
