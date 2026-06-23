<template>
  <div class="ios-empty-state">
    <i :class="icon"></i>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button
      @click="$emit('add')"
      class="ios-primary-button">
      添加目的地
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  icon: {
    type: String,
    default: 'icon-location'
  },
  title: {
    type: String,
    default: '暂无目的地'
  },
  description: {
    type: String,
    default: '点击右上角"+"添加第一个目的地'
  }
})
</script>

<style scoped>
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

.ios-primary-button {
  background: var(--ios-primary);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ios-primary-button:hover {
  background: #0062cc;
}
</style>
