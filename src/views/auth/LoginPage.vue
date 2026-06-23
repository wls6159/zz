<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="form-header">
        <h2>用户登录</h2>
        <p>欢迎回来，请登录您的账号</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input
            id="username"
            v-model.trim="form.username"
            type="text"
            autocomplete="off"
            required
          />
          <label for="username">用户名</label>
          <span class="highlight"></span>
        </div>
        <div class="input-group">
          <input
            id="password"
            v-model.trim="form.password"
            type="password"
            autocomplete="off"
            required
          />
          <label for="password">密码</label>
          <span class="highlight"></span>
        </div>
        <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
        <button type="submit" class="submit-btn" :disabled="!isFormValid">
          <span>登录</span>
          <i class="arrow-icon"></i>
        </button>
        <div class="form-footer">
          <span>还没有账号?</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/store/userInfo'

const router = useRouter()
const userStore = useUserInfoStore()

const form = reactive({
  username: '',
  password: ''
})

const errorMsg = ref('')
const isFormValid = computed(() => form.username && form.password)

const handleLogin = async () => {
  if (!isFormValid.value) return

  try {
    // 使用注册用户进行真实登录验证
    await userStore.login({
      username: form.username,
      password: form.password
    })

    // 登录成功后跳转到首页
    router.push('/')
  } catch (error) {
    errorMsg.value = error.message || '登录失败，请检查用户名和密码'
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 93.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 20px;
  padding: 40px;
  padding-right: 80px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
}

.form-header p {
  color: #95a5a6;
  font-size: 16px;
}

.input-group {
  position: relative;
  margin-bottom: 30px;
}

.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: transparent;
}

.input-group label {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  color: #95a5a6;
  font-size: 16px;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 12px;
  color: #0071e3;
  transform: translateY(-50%) scale(0.9);
}

.input-group input:focus {
  border-color: #0071e3;
  outline: none;
}

.highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #0071e3;
  transition: all 0.3s ease;
}

.input-group input:focus ~ .highlight {
  width: 100%;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #0071e3;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;
}

.submit-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background: #005bb5;
}

.arrow-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
}

.form-footer {
  margin-top: 20px;
  text-align: center;
  color: #95a5a6;
  font-size: 14px;
}

.form-footer a {
  color: #0071e3;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
