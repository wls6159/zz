<template>
  <footer class="app-footer">
    <p>© 2025 旅行指南 | 探索世界，发现美好</p>
    <div class="footer-links">
      <a @click="goToAbout">关于我们</a>
      <a @click="goToTerms">用户协议</a>
      <a @click="goToPrivacy">隐私政策</a>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => router.push('/about')
const goToTerms = () => router.push('/terms')
const goToPrivacy = () => router.push('/privacy')
</script>

<style scoped>
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
</style>
