<template>
  <div class="layout-container">
    <!-- 头部导航栏  -->
    <header class="app-header">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="Travel Guide" class="logo-img">
          <span>旅行指南</span>
        </router-link>
      </div>

      <!-- 功能导航菜单 -->
      <nav class="nav-menu">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          active-class="active"
        >
          <i :class="['icon', item.icon]"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- 用户区域 -->
      <div class="user-area">
        <el-dropdown v-if="userStore.isLoggedIn" trigger="click">
          <div class="user-info">
            <el-avatar :size="36" :src="userStore.avatar || defaultAvatar" />
            <span class="username">{{ userStore.username }}</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
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
    </header>

    <!-- 二级路由内容区域 -->
    <main class="content-area">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 底部信息 -->
    <footer class="app-footer">
      <p>© 2025 旅行指南 | 探索世界，发现美好</p>
      <div class="footer-links">
        <a @click="goToAbout">关于我们</a>
        <a @click="goToTerms">用户协议</a>
        <a @click="goToPrivacy">隐私政策</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/store/userInfo'
import defaultAvatar from '@/assets/1.jpg'

const router = useRouter()
const userStore = useUserInfoStore()

// 导航菜单项
const navItems = ref([
  { name: '首页', path: '/home', icon: 'icon-home' },
  { name: '目的地', path: '/destinations', icon: 'icon-location' },
  { name: '行程规划', path: '/itineraries', icon: 'icon-map' },
  { name: '旅游攻略', path: '/guides', icon: 'icon-book' },
  { name: '旅行社区', path: '/community', icon: 'icon-group' }
])

// 导航方法
const goToLogin = () => router.push('/login')
const goToRegister = () => router.push('/register')
// const goToBookmarks = () => router.push('/bookmarks')
const goToAbout = () => router.push('/about')
const goToTerms = () => router.push('/terms')
const goToPrivacy = () => router.push('/privacy')

// 退出登录
const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
/* 整体布局 - iOS风格 */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* 头部样式 */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 32px;
  margin-right: 8px;
}

.logo span {
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
}

.logo a {
  text-decoration: none;
  display: flex;
  align-items: center;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  gap: 28px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  text-decoration: none;
  color: #6e6e73;
  font-size: 14px;
  transition: all 0.2s ease;
}

.nav-item .icon {
  font-size: 18px;
  margin-bottom: 4px;
}

.nav-item.active {
  color: #0071e3;
}

.nav-item.active .icon {
  color: #0071e3;
}

.nav-item:hover {
  color: #0071e3;
}

/* 用户区域 */
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

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

/* 底部样式 */
.app-footer {
  padding: 20px 24px;
  background: #fff;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}

.app-footer p {
  color: #86868b;
  font-size: 12px;
  margin-bottom: 8px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  color: #424245;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
}

.footer-links a:hover {
  color: #0071e3;
  text-decoration: underline;
}

/* 路由切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
