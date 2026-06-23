<template>
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
</template>

<script setup>
const navItems = [
  { name: '首页', path: '/home', icon: 'icon-home' },
  { name: '目的地', path: '/destinations', icon: 'icon-location' },
  { name: '行程规划', path: '/itineraries', icon: 'icon-map' },
  { name: '旅游攻略', path: '/guides', icon: 'icon-book' },
  { name: '旅行社区', path: '/community', icon: 'icon-group' }
]
</script>

<style scoped>
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
</style>
