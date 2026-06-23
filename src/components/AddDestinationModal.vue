<template>
  <transition name="ios-modal">
    <div class="ios-modal-backdrop" @click.self="$emit('close')">
      <div class="ios-modal-card">
        <div class="ios-modal-header">
          <h2>添加新目的地</h2>
          <button class="ios-close-button" @click="$emit('close')">
            <i class="icon-close"></i>
          </button>
        </div>

        <form @submit.prevent="$emit('submit', newDestination)">
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
            <label><img src="/images/icons/image.svg" alt=""></label>
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
              @click="$emit('close')">
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
</template>

<script setup>
import { ref } from 'vue'

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
</script>

<style scoped>
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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  background: #fafafa;
  border-top: 0.5px solid var(--ios-border);
}

.ios-primary-button {
  flex: 1;
  background: var(--ios-primary);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ios-secondary-button:hover {
  background: #f0f0f0;
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
