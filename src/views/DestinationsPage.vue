<template>
  <div class="destinations-container">
    <!-- 顶部操作栏 -->
    <div class="ios-navbar">
      <h1 class="ios-navbar-title">探索目的地</h1>
      <button @click="showAddForm = true" class="ios-navbar-button">
        <i class="icon-plus">+</i>
      </button>
    </div>

    <!-- 新增目的地表单 -->
    <transition name="ios-modal">
      <div v-if="showAddForm" class="ios-modal-backdrop" @click.self="showAddForm = false">
        <div class="ios-modal-card">
          <div class="ios-modal-header">
            <h2>添加新目的地</h2>
            <button class="ios-close-button" @click="showAddForm = false">
             <el-icon><CloseBold /></el-icon>
            </button>
          </div>

          <form @submit.prevent="addNewDestination">
            <div class="ios-form-group">
              <label>目的地名称</label>
              <input
                type="text"
                v-model="newDestination.name"
                class="ios-input"
                placeholder="输入目的地名称"
                required>
            </div>

            <div class="ios-form-group">
              <label>所在位置</label>
              <input
                type="text"
                v-model="newDestination.location"
                class="ios-input"
                placeholder="输入具体位置（城市/地区）"
                required>
            </div>

            <div class="ios-form-group">
              <label>图片URL</label>
              <input
                type="url"
                v-model="newDestination.image"
                class="ios-input"
                placeholder="https://example.com/image.jpg"
                required>
            </div>

            <div class="ios-form-group">
              <label>目的地描述</label>
              <textarea
                v-model="newDestination.description"
                rows="4"
                class="ios-textarea"
                placeholder="描述目的地的特色和亮点"
                required></textarea>
            </div>

            <div class="ios-form-actions">
              <button
                type="button"
                class="ios-secondary-button"
                @click="showAddForm = false">
                取消
              </button>
              <button
                type="submit"
                class="ios-primary-button">
                添加目的地
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- 目的地列表 -->
    <div class="scenery-grid">
      <div
        v-for="scenery in sceneryList"
        :key="scenery.id"
        class="scenery-card"
      >
        <img :src="scenery.image" :alt="scenery.name" class="scenery-image">
        <div class="scenery-info">
          <h3>{{ scenery.name }}</h3>
          <p class="location">{{ scenery.location }}</p>
          <p class="description">{{ scenery.description }}</p>

          <div class="stats">
            <span class="favorites">
              <el-icon><Sugar /></el-icon> {{ scenery.favorites }}
            </span>
            <span class="likes">
               <el-icon><Lollipop /></el-icon> {{ scenery.likes }}
            </span>
          </div>
        </div>

        <div class="action-bar">
          <button
            @click="toggleFavorite(scenery.id)"
            :class="['icon-button', { active: scenery.isFavorite }]"
          >
            <el-icon><Discount /></el-icon>
            <span>{{ scenery.isFavorite ? '已收藏' : '收藏' }}</span>
          </button>
          <button
            @click="toggleLike(scenery.id)"
            :class="['icon-button', { active: scenery.isLiked }]"
          >
            <el-icon><Star /></el-icon>
            <span>{{ scenery.isLiked ? '已点赞' : '点赞' }}</span>
          </button>
          <router-link
            :to="`/guides/${scenery.id}`"
            class="icon-button"
          >
            <el-icon><Guide /></el-icon>
            <span>查看攻略</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-if="sceneryList.length === 0" class="ios-empty-state">
      <el-icon><CloseBold /></el-icon>
      <h3>暂无目的地</h3>
      <p>点击右上角"+"添加第一个目的地</p>
      <button
        @click="showAddForm = true"
        class="ios-primary-button">
        添加目的地
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSceneryInfoStore } from '@/store/sceneryInfo'
import { storeToRefs } from 'pinia'
import { Lollipop, Sugar, CloseBold, Star, Guide, Discount } from '@element-plus/icons-vue'
const store = useSceneryInfoStore()
const { getAllSceneries } = storeToRefs(store)
const { toggleFavorite, toggleLike, addScenery } = store

const sceneryList = getAllSceneries
const showAddForm = ref(false)

// 新增目的地表单数据
const newDestination = ref({
  name: '',
  location: '',
  description: '',
  image: '',
  isFavorite: false,
  favorites: 0,
  isLiked: false,
  likes: 0
})

// 添加新目的地
const addNewDestination = () => {
  addScenery({
    ...newDestination.value,
    // 生成唯一ID（实际项目中应使用更健壮的方式）
    id: Date.now()
  })

  // 重置表单并关闭
  resetForm()
  showAddForm.value = false
}

// 重置表单
const resetForm = () => {
  newDestination.value = {
    name: '',
    location: '',
    description: '',
    image: '',
    isFavorite: false,
    favorites: 0,
    isLiked: false,
    likes: 0
  }
}
</script>

<style scoped>
/* iOS设计系统变量 */
:root {
  --ios-bg: #f5f5f7;
  --ios-card-bg: #ffffff;
  --ios-primary: #007aff;
  --ios-secondary: #8e8e93;
  --ios-border: #d1d1d6;
  --ios-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --ios-radius: 14px;
  --ios-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.destinations-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--ios-bg);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
}

/* iOS导航栏 */
.ios-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 0.5px solid var(--ios-border);
}

.ios-navbar-title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.ios-navbar-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--ios-primary);
  color: rgb(0, 0, 0);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
  transition: var(--ios-transition);
}

.ios-navbar-button:hover {
  transform: scale(1.08);
}

/* 目的地网格 */
.scenery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
  padding: 16px;
}

/* 目的地卡片 */
.scenery-card {
  background: var(--ios-card-bg);
  border-radius: var(--ios-radius);
  overflow: hidden;
  box-shadow: var(--ios-shadow);
  transition: var(--ios-transition);
}

.scenery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.scenery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.scenery-info {
  padding: 20px;
}

.scenery-info h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #1d1d1f;
}

.location {
  color: var(--ios-primary);
  font-size: 15px;
  margin-bottom: 12px;
}

.description {
  color: #424245;
  line-height: 1.6;
  margin-bottom: 15px;
}

.stats {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: var(--ios-secondary);
}

.stats i {
  margin-right: 5px;
}

.action-bar {
  display: flex;
  padding: 15px 20px;
  border-top: 0.5px solid var(--ios-border);
  gap: 10px;
}

.icon-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-button:hover {
  background: rgba(0, 113, 227, 0.1);
}

.icon-button.active {
  color: var(--ios-primary);
}

.icon-button i {
  margin-right: 6px;
  font-size: 16px;
}

/* 模态框样式 */
.ios-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.ios-modal-card {
  width: 90%;
  max-width: 500px;
  background: var(--ios-card-bg);
  border-radius: var(--ios-radius);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.ios-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 0.5px solid var(--ios-border);
}

.ios-close-button {
  background: none;
  border: none;
  font-size: 22px;
  color: var(--ios-secondary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--ios-transition);
}

.ios-close-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* 表单组 */
.ios-form-group {
  margin-bottom: 20px;
  padding: 0 20px;
}

.ios-form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #000;
}

.ios-input, .ios-select, .ios-textarea {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--ios-border);
  background: #fff;
  font-size: 16px;
  font-family: inherit;
  transition: var(--ios-transition);
}

.ios-input:focus, .ios-select:focus, .ios-textarea:focus {
  border-color: var(--ios-primary);
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
}

.ios-textarea {
  min-height: 150px;
  resize: vertical;
}

/* 表单操作 */
.ios-form-actions {
  display: flex;
  gap: 12px;
  padding: 20px;
  background: #7c7c7d;
  border-top: 0.5px solid var(--ios-border);
}

.ios-primary-button {
  flex: 1;
  background: white;
  color: rgb(0, 0, 0);
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--ios-transition);
}

.ios-primary-button:hover {
  background: #0062cc;
}

.ios-secondary-button {
  flex: 1;
  background: #fff;
  color: var(--ios-primary);
  border: 1px solid var(--ios-border);
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--ios-transition);
}

.ios-secondary-button:hover {
  background: #f0f0f0;
}

/* 空状态 */
.ios-empty-state {
  text-align: center;
  padding: 40px 20px;
  background: var(--ios-card-bg);
  border-radius: var(--ios-radius);
  box-shadow: var(--ios-shadow);
  margin: 40px 20px;
}

.ios-empty-state i {
  font-size: 64px;
  color: var(--ios-secondary);
  margin-bottom: 20px;
  opacity: 0.6;
}

.ios-empty-state h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #000;
}

.ios-empty-state p {
  color: var(--ios-secondary);
  margin-bottom: 20px;
}

/* 动画效果 */
.ios-modal-enter-active, .ios-modal-leave-active {
  transition: opacity 0.3s ease;
}

.ios-modal-enter-from, .ios-modal-leave-to {
  opacity: 0;
}

.ios-modal-enter-active .ios-modal-card,
.ios-modal-leave-active .ios-modal-card {
  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);
}

.ios-modal-enter-from .ios-modal-card,
.ios-modal-leave-to .ios-modal-card {
  transform: translateY(20px);
}
</style>
