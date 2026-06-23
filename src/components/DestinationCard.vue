<template>
  <div class="scenery-card">
    <img :src="scenery.image" :alt="scenery.name" class="scenery-image">
    <div class="scenery-info">
      <h3>{{ scenery.name }}</h3>
      <p class="location">{{ scenery.location }}</p>
      <p class="description">{{ scenery.description }}</p>

      <div class="stats">
        <span class="favorites">
          <i class="icon-favorite"></i> {{ scenery.favorites }}
        </span>
        <span class="likes">
          <i class="icon-like"></i> {{ scenery.likes }}
        </span>
      </div>
    </div>

    <div class="action-bar">
      <button
        @click="$emit('toggle-favorite', scenery.id)"
        :class="['icon-button', { active: scenery.isFavorite }]"
      >
        <i class="icon-favorite"></i>
        <span>{{ scenery.isFavorite ? '已收藏' : '收藏' }}</span>
      </button>
      <button
        @click="$emit('toggle-like', scenery.id)"
        :class="['icon-button', { active: scenery.isLiked }]"
      >
        <i class="icon-like"></i>
        <span>{{ scenery.isLiked ? '已点赞' : '点赞' }}</span>
      </button>
      <router-link
        :to="`/guides/${scenery.id}`"
        class="icon-button"
      >
        <i class="icon-guide"></i>
        <span>查看攻略</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  scenery: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.scenery-card {
  background: var(--ios-card-bg);
  border-radius: var(--ios-radius);
  overflow: hidden;
  box-shadow: var(--ios-shadow);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
</style>
