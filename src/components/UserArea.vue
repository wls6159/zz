<template>
  <div class="user-area">
    <el-dropdown v-if="userStore.isLoggedIn" trigger="click">
      <div class="user-info">
        <el-avatar :size="36" :src="userStore.avatar || defaultAvatar" />
        <span class="username">{{ userStore.username }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToBookmarks">
            <i class="icon-bookmark"></i>我的收藏
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <i class="icon-logout"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div v-else class="auth-buttons">
      <el-button type="primary" plain round @click="goToLogin">
        登录
      </el-button>
      <el-button type="success" plain round @click="goToRegister">
        注册
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/store/userInfo'
import defaultAvatar from '@/assets/1.jpg'

const router = useRouter()
const userStore = useUserInfoStore()

const goToLogin = () => router.push('/login')
const goToRegister = () => router.push('/register')
const goToBookmarks = () => router.push('/bookmarks')

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.user-area {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 20px;
  transition: background 0.2s;
}

.user-info:hover {
  background: rgba(0, 0, 0, 0.05);
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: #1d1d1f;
  font-weight: 500;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.el-button {
  font-weight: 500;
  letter-spacing: -0.2px;
}
</style>
