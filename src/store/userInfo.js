import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)
  const registeredUsers = ref(JSON.parse(localStorage.getItem('registeredUsers')) || [])

  // Getter
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => currentUser.value?.username || '')
  const avatar = computed(() => currentUser.value?.avatar || '')

  // Actions
  const register = (userData) => {
    // 检查用户是否已存在
    const userExists = registeredUsers.value.some(user => user.username === userData.username)

    if (userExists) {
      throw new Error('用户名已被使用')
    }

    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || '',
      bookmarks: []
    }

    // 添加到注册用户列表
    registeredUsers.value.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value))

    return newUser
  }

  const login = (credentials) => {
    // 在注册用户中查找匹配的用户
    const user = registeredUsers.value.find(user =>
      user.username === credentials.username &&
      user.password === credentials.password
    )

    if (!user) {
      throw new Error('用户名或密码不正确')
    }

    // 设置当前用户和token
    token.value = `token_${Date.now()}`
    currentUser.value = user
    localStorage.setItem('token', token.value)
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))

    return user
  }

  const logout = () => {
    token.value = ''
    currentUser.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }

  const updateProfile = (updatedInfo) => {
    if (!currentUser.value) return

    // 更新当前用户信息
    currentUser.value = { ...currentUser.value, ...updatedInfo }
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))

    // 更新注册用户列表中的信息
    const userIndex = registeredUsers.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      registeredUsers.value[userIndex] = { ...currentUser.value }
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value))
    }
  }

  return {
    token,
    currentUser,
    registeredUsers,
    isLoggedIn,
    username,
    avatar,
    register,
    login,
    logout,
    updateProfile
  }
}, {
  persist: true
})
