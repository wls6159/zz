<template>
  <div class="community-container">
    <!-- iOS风格导航栏 -->
    <div class="ios-navbar">
      <h1 class="ios-navbar-title">旅行社区</h1>
      <button @click="showPostForm = true" class="ios-navbar-button">
        <i class="icon-plus">+</i>
      </button>
    </div>

    <!-- 毛玻璃效果分享表单 -->
    <transition name="ios-modal">
      <div v-if="showPostForm" class="ios-modal-backdrop" @click.self="showPostForm = false">
        <div class="ios-modal-card">
          <div class="ios-modal-header">
            <h2>分享旅行心得</h2>
            <button class="ios-close-button" @click="showPostForm = false">
              <el-icon><CloseBold /></el-icon>
            </button>
          </div>

          <form @submit.prevent="createPost">
            <div class="ios-form-group">
              <label>心得标题</label>
              <input
                type="text"
                v-model="newPost.title"
                class="ios-input"
                placeholder="输入吸引人的标题"
                required>
            </div>

            <div class="ios-form-group">
              <label>内容</label>
              <textarea
                v-model="newPost.content"
                rows="6"
                class="ios-textarea"
                placeholder="分享您的旅行故事、实用建议或难忘体验..."
                required></textarea>
            </div>

            <div class="ios-form-actions">
              <button
                type="button"
                class="ios-secondary-button"
                @click="showPostForm = false">
                取消
              </button>
              <button
                type="submit"
                class="ios-primary-button">
                发布心得
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- 社区动态流 - iOS卡片设计 -->
    <div class="ios-scroll-container">
      <div
        v-for="post in communityPosts"
        :key="post.id"
        class="ios-card post-card"
        :class="{'current-user': post.author === '当前用户'}">

        <div class="ios-card-header">
          <div class="post-header">
            <h3 class="ios-card-title">{{ post.title }}</h3>
            <div class="ios-card-subtitle">
              <span class="author">{{ post.author }}</span>
              <span class="date">{{ formatDate(post.createdAt) }}</span>
            </div>
          </div>

          <div class="ios-card-icon" v-if="post.author === '当前用户'">
            <el-icon><User /></el-icon>
          </div>
        </div>

        <div class="ios-card-content">
          <p class="post-content">{{ post.content }}</p>
        </div>

        <div class="ios-card-footer">
          <div class="ios-interaction-buttons">
            <button
              @click="toggleLike(post.id)"
              class="ios-icon-button"
              :class="{'active': post.isLiked}">
             <el-icon><Sugar /></el-icon>
              <span>{{ post.likes }}</span>
            </button>

            <button
              @click="focusCommentInput(post.id)"
              class="ios-icon-button">
              <i class="icon-comment"></i>
              <el-icon><Orange /></el-icon>
              <span>{{ post.comments }}</span>
            </button>

            <button
              @click="toggleBookmark(post.id)"
              class="ios-icon-button"
              :class="{'active': post.isBookmarked}">
              <el-icon><Lollipop /></el-icon>
            </button>
          </div>

          <div class="ios-card-actions" v-if="post.author === '当前用户'">
            <button
              @click="editPost(post)"
              class="ios-text-button">
              编辑
            </button>
            <button
              @click="deletePost(post.id)"
              class="ios-text-button delete">
              删除
            </button>
          </div>
        </div>

        <!-- 评论区 -->
        <div class="comment-section">
          <div v-for="comment in post.commentsList" :key="comment.id" class="comment">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.date) }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
          </div>

          <div class="add-comment">
            <input
              type="text"
              placeholder="添加评论..."
              class="ios-input comment-input"
              v-model="post.newComment">
            <button
              @click="addComment(post.id)"
              class="ios-icon-button">
              <el-icon><PriceTag /></el-icon>发送
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态提示 -->
      <div v-if="communityPosts.length === 0" class="ios-empty-state">
        <i class="icon-community"></i>
        <h3>暂无分享</h3>
        <p>点击右上角"+"分享第一条旅行心得</p>
        <button
          @click="showPostForm = true"
          class="ios-primary-button">
          立即分享
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSceneryInfoStore } from '@/store/sceneryInfo'
import { storeToRefs } from 'pinia'
import { PriceTag, Orange, Lollipop, Sugar, User, CloseBold } from '@element-plus/icons-vue'
const store = useSceneryInfoStore()
const { getAllCommunityPosts } = storeToRefs(store)
const { addPost, updatePost, deletePost } = store
console.log(updatePost)

const communityPosts = ref(getAllCommunityPosts.value.map(post => ({
  ...post,
  isLiked: false,
  isBookmarked: false,
  commentsList: [],
  newComment: ''
})))

const showPostForm = ref(false)
const newPost = ref({
  title: '',
  content: '',
  author: '当前用户'
})

const createPost = () => {
  const postData = {
    ...newPost.value,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    isLiked: false,
    isBookmarked: false,
    commentsList: []
  }

  addPost(postData)
  showPostForm.value = false
  resetPostForm()
}

const resetPostForm = () => {
  newPost.value = {
    title: '',
    content: '',
    author: '当前用户'
  }
}

const editPost = (post) => {
  newPost.value = { ...post }
  showPostForm.value = true
}

const toggleLike = (postId) => {
  const post = communityPosts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
}

const toggleBookmark = (postId) => {
  const post = communityPosts.value.find(p => p.id === postId)
  if (post) {
    post.isBookmarked = !post.isBookmarked
  }
}

const addComment = (postId) => {
  const post = communityPosts.value.find(p => p.id === postId)
  if (post && post.newComment.trim()) {
    post.commentsList.push({
      id: Date.now(),
      author: '当前用户',
      date: new Date().toISOString(),
      content: post.newComment
    })
    post.comments += 1
    post.newComment = ''
  }
}

const focusCommentInput = (postId) => {
  const input = document.querySelector(`.post-card[data-id="${postId}"] .comment-input`)
  if (input) input.focus()
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
/* iOS设计系统变量 */
:root {
  --ios-bg: #f5f7fa;
  --ios-card-bg: #ffffff;
  --ios-primary: #007aff;
  --ios-secondary: #8e8e93;
  --ios-border: #d1d1d6;
  --ios-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --ios-radius: 14px;
  --ios-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --ios-light-text: #ffffff;
  --ios-dark-text: #1d1d1f;
  --ios-like-red: #ff2d55;
  --ios-bookmark-yellow: #ffcc00;
}

.community-container {
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
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 0.5px solid var(--ios-border);
}

.ios-navbar-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--ios-dark-text);
  margin: 0;
}

.ios-navbar-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--ios-primary);
  color: rgb(0, 0, 0);
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
  color: var(--ios-dark-text);
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

.post-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
}

/* 当前用户卡片标识 */
.post-card.current-user {
  border-left: 4px solid var(--ios-primary);
}

/* 卡片底部 */
.ios-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 0.5px solid var(--ios-border);
}

.ios-interaction-buttons {
  display: flex;
  gap: 16px;
}

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
  color: var(--ios-like-red);
}

.ios-icon-button.active .icon-bookmark {
  color: var(--ios-bookmark-yellow);
}

.ios-icon-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.ios-card-actions {
  display: flex;
  gap: 12px;
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

/* 评论区 */
.comment-section {
  border-top: 0.5px solid var(--ios-border);
  padding: 16px;
  background: #fafafa;
}

.comment {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 0.5px solid var(--ios-border);
}

.comment:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.comment-header {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 600;
  color: var(--ios-dark-text);
}

.comment-date {
  font-size: 12px;
  color: var(--ios-secondary);
}

.comment-content {
  font-size: 14px;
  line-height: 1.5;
  color: #424245;
  margin: 0;
}

.add-comment {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.comment-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 20px;
  background: #f0f0f0;
  border: none;
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
  color: var(--ios-dark-text);
}

.ios-input, .ios-textarea {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--ios-border);
  background: #fff;
  font-size: 16px;
  font-family: inherit;
  transition: var(--ios-transition);
}

.ios-input:focus, .ios-textarea:focus {
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
  background: #7c7c7d;
  border-top: 0.5px solid var(--ios-border);
}

.ios-primary-button {
  flex: 1;
  background:white;
  color: rgb(0, 0, 0);
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
  color: var(--ios-dark-text);
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

/* 点赞动画 */
@keyframes likeAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.ios-icon-button.active .icon-like {
  animation: likeAnimation 0.5s ease;
}
</style>
