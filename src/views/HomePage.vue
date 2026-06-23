<template>
  <div class="home-container">
    <!-- 顶部滚动图区域 -->
    <section class="hero-section">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="swiper-slide"
          >
            <img
              :src="slide.image"
              :alt="slide.title"
              class="slide-image"
            >
            <div class="slide-content">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section>

    <!-- 旅游意义介绍 -->
    <section class="meaning-section">
      <div class="section-header">
        <h2>为何旅行？</h2>
        <p>探索旅行的深层意义</p>
      </div>

      <div class="meaning-cards">
        <div v-for="(card, index) in meaningCards" :key="index" class="meaning-card">
          <div class="card-icon">
            <el-icon >
              {{card.icon}}
            </el-icon>
          </div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </section>

    <!-- 旅行语录 -->
    <section class="quote-section">
      <div class="quote-container">
        <blockquote>
          "旅行不是到达目的地，而是学会以新的眼光看世界"
        </blockquote>
        <cite>—— 圣奥古斯丁</cite>
      </div>
    </section>

    <!-- 行动号召 -->
    <section class="cta-section">
      <h2>开启你的旅程</h2>
      <p>探索未知，发现自我</p>
      <router-link to="/destinations" class="cta-button">探索目的地</router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import 'swiper/css'

// 轮播图数据
const slides = ref([
  {
    image: new URL('@/assets/banner1.jpg', import.meta.url).href,
    title: '探索自然奇迹',
    description: '在壮丽山景中寻找内心的平静'
  },
  {
    image: new URL('@/assets/banner2.jpg', import.meta.url).href,
    title: '海滨天堂',
    description: '让海浪声带走所有烦恼'
  },
  {
    image: new URL('@/assets/banner3.jpg', import.meta.url).href,
    title: '文化之旅',
    description: '穿越时空感受历史脉搏'
  }
])

// 旅游意义卡片数据
const meaningCards = ref([
  {
    icon: 'View',
    title: '开阔视野',
    description: '旅行让我们接触不同文化，打破固有思维模式，学会从多角度看待问题。'
  },
  {
    icon: 'userFind',
    title: '自我发现',
    description: '在陌生环境中，我们更容易发现自己的潜能和未知的一面。'
  },
  {
    icon: 'heart',
    title: '心灵治愈',
    description: '自然景观和人文体验能有效缓解压力，带来内心的平静与治愈。'
  },
  {
    icon: 'people',
    title: '建立连接',
    description: '旅行中建立的人际关系往往更纯粹深刻，跨越文化背景的友谊尤为珍贵。'
  }
])

// 初始化轮播图
onMounted(() => {
  // 修改后
  const swiperInstance = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  })
  console.log(swiperInstance)
})
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 轮播图样式 - iOS风格 */
.hero-section {
  border-radius: 20px;
  overflow: hidden;
  margin: 20px 0 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.swiper {
  height: 500px;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  padding: 30px;
}

.slide-content h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.slide-content p {
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
}

.swiper-pagination {
  position: absolute;
  bottom: 20px !important;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,0.5);
  opacity: 1;
  margin: 0 8px !important;
}

.swiper-pagination-bullet-active {
  background: white;
}

/* 旅游意义区域 */
.meaning-section {
  margin: 50px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 36px;
  color: #1d1d1f;
  margin-bottom: 10px;
}

.section-header p {
  font-size: 18px;
  color: #86868b;
}

.meaning-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.meaning-card {
  background: white;
  border-radius: 18px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.meaning-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.card-icon {
  width: 70px;
  height: 70px;
  background: rgba(0, 113, 227, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 30px;
  color: #0071e3;
}

.meaning-card h3 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #1d1d1f;
}

.meaning-card p {
  font-size: 16px;
  line-height: 1.6;
  color: #424245;
}

/* 语录区域 */
.quote-section {
  background: #f5f7fa;
  border-radius: 20px;
  padding: 60px 40px;
  margin: 60px 0;
  text-align: center;
}

.quote-container blockquote {
  font-size: 28px;
  font-style: italic;
  color: #1d1d1f;
  line-height: 1.4;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.quote-container blockquote:before,
.quote-container blockquote:after {
  content: '"';
  font-size: 60px;
  color: rgba(0, 113, 227, 0.2);
  position: absolute;
}

.quote-container blockquote:before {
  top: -20px;
  left: -40px;
}

.quote-container blockquote:after {
  bottom: -50px;
  right: -40px;
}

.quote-container cite {
  display: block;
  margin-top: 30px;
  font-size: 18px;
  color: #86868b;
  font-style: normal;
}

/* 行动号召区域 */
.cta-section {
  text-align: center;
  padding: 70px 20px;
  background: linear-gradient(135deg, #0071e3 0%, #004e9e 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 50px;
}

.cta-section h2 {
  font-size: 42px;
  margin-bottom: 15px;
}

.cta-section p {
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto 30px;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #0071e3;
  padding: 16px 45px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .swiper {
    height: 350px;
  }

  .slide-content h2 {
    font-size: 24px;
  }

  .slide-content p {
    font-size: 16px;
  }

  .quote-container blockquote {
    font-size: 22px;
  }

  .cta-section h2 {
    font-size: 32px;
  }

  .cta-section p {
    font-size: 18px;
  }
}
</style>
