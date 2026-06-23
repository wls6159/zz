<template>
  <div class="guides-container">
    <!-- iOS风格导航栏 -->
    <div class="ios-navbar">
      <h1 class="ios-navbar-title">旅游攻略</h1>
      <button @click="showGuideForm = true" class="ios-navbar-button">
        <i class="icon-plus">+</i>
      </button>
    </div>

    <!-- 毛玻璃效果创建表单 -->
    <transition name="ios-modal">
      <div v-if="showGuideForm" class="ios-modal-backdrop" @click.self="showGuideForm = false">
        <div class="ios-modal-card">
          <div class="ios-modal-header">
            <h2>创建新攻略</h2>
            <button class="ios-close-button" @click="showGuideForm = false">
              <el-icon><CloseBold /></el-icon>
            </button>
          </div>

          <form @submit.prevent="createGuide">
            <div class="ios-form-group">
              <label>攻略标题</label>
              <input
                type="text"
                v-model="newGuide.title"
                class="ios-input"
                placeholder="输入攻略标题"
                required>
            </div>

            <div class="ios-form-group">
              <label>关联景点</label>
              <select v-model="newGuide.sceneryId" class="ios-select" required>
                <option
                  v-for="s in sceneryList"
                  :value="s.id"
                  :key="s.id"
                  class="ios-option">
                  {{ s.name }} - {{ s.location }}
                </option>
              </select>
            </div>

            <div class="ios-form-group">
              <label>攻略内容</label>
              <textarea
                v-model="newGuide.content"
                rows="6"
                class="ios-textarea"
                placeholder="分享你的旅行经验..."
                required></textarea>
            </div>

            <div class="ios-form-actions">
              <button
                type="button"
                class="ios-secondary-button"
                @click="showGuideForm = false">
                取消
              </button>
              <button
                type="submit"
                class="ios-primary-button">
                发布攻略
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- 攻略列表 - iOS卡片设计 -->
    <div class="ios-scroll-container">
      <div
        v-for="guide in sceneryGuides"
        :key="guide.id"
        class="ios-card guide-card"
        :class="{'current-user': guide.author === '当前用户'}">

        <div class="ios-card-header">
          <div class="guide-header">
            <h3 class="ios-card-title">{{ guide.title }}</h3>
            <div class="ios-card-subtitle">
              <span class="author">{{ guide.author }}</span>
              <span class="date">{{ formatDate(guide.createdAt) }}</span>
            </div>
          </div>

          <div class="ios-card-icon" v-if="guide.author === '当前用户'">
            <el-icon><User /></el-icon>
          </div>
        </div>

        <div class="ios-card-content">
          <p class="guide-content">{{ guide.content }}</p>
        </div>

        <div class="ios-card-footer">
          <button
            @click="toggleLikeGuide(guide.id)"
            class="ios-icon-button"
            :class="{'active': guide.isLiked}">
           <el-icon><StarFilled /></el-icon>
            <span>{{ guide.likes }}</span>
          </button>

          <div class="ios-card-actions" v-if="guide.author === '当前用户'">
            <button
              @click="editGuide(guide)"
              class="ios-text-button">
              编辑
            </button>
            <button
              @click="deleteGuide(guide.id)"
              class="ios-text-button delete">
              删除
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态提示 -->
      <div v-if="sceneryGuides.length === 0" class="ios-empty-state">
        <el-icon><Guide /></el-icon>
        <h3>暂无攻略</h3>
        <p>点击右上角"+"创建第一条攻略</p>
        <button
          @click="showGuideForm = true"
          class="ios-primary-button">
          创建攻略
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSceneryInfoStore } from '@/store/sceneryInfo'
import { storeToRefs } from 'pinia'
import { User, Guide, StarFilled, CloseBold } from '@element-plus/icons-vue'
const route = useRoute()
const store = useSceneryInfoStore()
const { getAllSceneries, getGuidesByScenery } = storeToRefs(store)
const { addGuide, updateGuide, deleteGuide } = store
console.log(updateGuide)

const sceneryId = computed(() => parseInt(route.params.sceneryId) || 0)
const sceneryList = getAllSceneries
const sceneryGuides = computed(() => getGuidesByScenery.value(sceneryId.value))

const showGuideForm = ref(false)
const newGuide = ref({
  title: '',
  sceneryId: sceneryId.value,
  content: '',
  author: '当前用户'
})

const createGuide = () => {
  addGuide(newGuide.value)
  showGuideForm.value = false
  resetGuideForm()
}

const resetGuideForm = () => {
  newGuide.value = {
    title: '',
    sceneryId: sceneryId.value,
    content: '',
    author: '当前用户'
  }
}

const editGuide = (guide) => {
  newGuide.value = { ...guide }
  showGuideForm.value = true
}

const toggleLikeGuide = (guideId) => {
  // 实现点赞功能
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
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

/* 基础容器 */
.guides-container {
  max-width: 800px;
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
  color: black;
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
  color: rgb(6, 6, 6);
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

/* 滚动容器 */
.ios-scroll-container {
  padding: 16px;
  display: grid;
  gap: 16px;
}

/* iOS卡片设计 */
.ios-card {
  background: var(--ios-card-bg);
  border-radius: var(--ios-radius);
  overflow: hidden;
  box-shadow: var(--ios-shadow);
  transition: var(--ios-transition);
}

.ios-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.ios-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 0.5px solid var(--ios-border);
}

.ios-card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #000;
}

.ios-card-subtitle {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: var(--ios-secondary);
}

.ios-card-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 122, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ios-primary);
}

.ios-card-content {
  padding: 16px;
}

.guide-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
}

.ios-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 0.5px solid var(--ios-border);
}

/* 当前用户卡片标识 */
.guide-card.current-user {
  border-left: 4px solid var(--ios-primary);
}

/* 按钮样式 */
.ios-icon-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--ios-secondary);
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 10px;
  transition: var(--ios-transition);
}

.ios-icon-button.active {
  color: #ff2d55;
}

.ios-icon-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.ios-text-button {
  background: none;
  border: none;
  color: var(--ios-primary);
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 10px;
  transition: var(--ios-transition);
}

.ios-text-button.delete {
  color: #ff3b30;
}

.ios-text-button:hover {
  background: rgba(0, 0, 0, 0.05);
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

.ios-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%238E8E93' d='M6 7L0.803848 0.25L11.1962 0.25L6 7Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
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
  background: #7f7f7f;
  border-top: 0.5px solid var(--ios-border);
}

.ios-primary-button {
  flex: 1;
  background: white;
  color: rgb(8, 8, 8);
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
