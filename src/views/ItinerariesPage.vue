<template>
  <div class="itinerary-container">
    <div class="header">
      <h1>行程规划</h1>
      <button @click="showPlanForm = true" class="add-button">
        <i class="icon-plus"></i> 新建规划
      </button>
    </div>

    <div v-if="showPlanForm" class="plan-form">
      <h2>创建新行程</h2>
      <form @submit.prevent="createPlan">
        <div class="form-group">
          <label>行程名称</label>
          <input type="text" v-model="newPlan.title" required>
        </div>
        <div class="form-group">
          <label>选择目的地</label>
          <select v-model="newPlan.sceneryId" required>
            <option v-for="s in sceneryList" :value="s.id" :key="s.id">
              {{ s.name }} - {{ s.location }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>行程详情</label>
          <textarea v-model="newPlan.description" rows="4" required></textarea>
        </div>
        <div class="form-actions">
          <button type="button" @click="showPlanForm = false">取消</button>
          <button type="submit">创建行程</button>
        </div>
      </form>
    </div>

    <div class="plans-list">
      <div v-for="plan in travelPlans" :key="plan.id" class="plan-card">
        <h3>{{ plan.title }}</h3>
        <div class="plan-meta">
          <span class="date">{{ formatDate(plan.createdAt) }}</span>
          <span class="author">作者: {{ plan.author }}</span>
        </div>
        <p class="description">{{ plan.description }}</p>
        <div class="destinations">
          <div class="destination" v-for="id in plan.sceneries" :key="id">
            {{ getSceneryName(id) }}
          </div>
        </div>
        <div class="action-bar">
          <button class="like-button">
              <el-icon><GobletSquareFull /></el-icon>{{ plan.likes }}
          </button>
          <button class="favorite-button">
              <i class="icon-favorite"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSceneryInfoStore } from '@/store/sceneryInfo'
import { storeToRefs } from 'pinia'
import { GobletSquareFull } from '@element-plus/icons-vue'
const store = useSceneryInfoStore()
const { getAllSceneries, getAllTravelPlans } = storeToRefs(store)
const { addTravelPlan } = store

const showPlanForm = ref(false)
const newPlan = ref({
  title: '',
  sceneryId: null,
  description: '',
  author: '当前用户'
})

const sceneryList = getAllSceneries
const travelPlans = getAllTravelPlans

const createPlan = () => {
  addTravelPlan({
    ...newPlan.value,
    sceneries: [newPlan.value.sceneryId]
  })
  showPlanForm.value = false
  resetForm()
}

const resetForm = () => {
  newPlan.value = {
    title: '',
    sceneryId: null,
    description: '',
    author: '当前用户'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const getSceneryName = (id) => {
  const scenery = sceneryList.value.find(s => s.id === id)
  return scenery ? `${scenery.name} - ${scenery.location}` : '未知景点'
}
</script>

<style scoped>
.itinerary-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-button {
  background: #0071e3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.plan-form {
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-actions button {
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
}

.form-actions button:first-child {
  background: #f5f5f7;
  border: 1px solid #ddd;
}

.form-actions button:last-child {
  background: #0071e3;
  color: white;
  border: none;
}

.plans-list {
  display: grid;
  gap: 20px;
}

.plan-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.plan-meta {
  display: flex;
  gap: 15px;
  color: #86868b;
  font-size: 14px;
  margin-bottom: 15px;
}

.description {
  color: #424245;
  line-height: 1.6;
  margin-bottom: 20px;
}

.destinations {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.destination {
  background: #f5f5f7;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
}

.action-bar {
  display: flex;
  gap: 15px;
}

.like-button,
.favorite-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  color:#0071e3;
}

.like-button:hover,
.favorite-button:hover {
  background: rgba(0,113,227,0.1);
}
</style>
