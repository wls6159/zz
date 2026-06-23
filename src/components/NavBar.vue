<template>
  <div class="ios-navbar">
    <h1 class="ios-navbar-title">{{ title }}</h1>
    <button @click="$emit('add')" class="ios-navbar-button">
      <i class="icon-plus"></i>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    default: '探索目的地'
  }
})
</script>

<style scoped>
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
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ios-navbar-button:hover {
  transform: scale(1.08);
}
</style>
