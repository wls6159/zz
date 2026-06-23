<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Travel Guide" class="logo-img">
        <span>旅行指南</span>
      </router-link>
    </div>

    <NavMenu />

    <UserArea />
  </header>
</template>

<script setup>
import NavMenu from './NavMenu.vue'
import UserArea from './UserArea.vue'
</script>

<style scoped>
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
</style>
