import { defineStore } from 'pinia'

export const useSceneryInfoStore = defineStore('sceneryInfo', {
  state: () => ({
    // 目的地数据
    sceneries: [
      {
        id: 1,
        name: '西湖',
        location: '浙江杭州',
        description: '中国著名的淡水湖泊，风景如画，四季皆宜游览',
        image: 'https://cdn.pixabay.com/photo/2017/12/21/07/40/west-lake-sunset-3031255_1280.jpg',
        isFavorite: false,
        favorites: 128,
        isLiked: false,
        likes: 356
      }
    ],

    // 行程规划
    travelPlans: [
      {
        id: 1,
        title: '杭州三日游',
        author: '旅行达人小王',
        sceneryIds: [1, 2],
        description: '涵盖西湖、灵隐寺等经典景点，体验江南风情',
        date: '2023-10-01',
        likes: 42
      }
    ],

    // 旅游攻略
    travelGuides: [
      {
        id: 1,
        sceneryId: 1,
        author: '旅游博主小李',
        title: '西湖最佳游览路线',
        content: '建议从断桥残雪开始，沿白堤游览...',
        likes: 89,
        createdAt: '2023-09-15'
      }
    ],

    // 旅行社区
    communityPosts: [
      {
        id: 1,
        author: '背包客小明',
        title: '杭州美食体验',
        content: '推荐尝试西湖醋鱼和东坡肉...',
        likes: 24,
        comments: 5,
        createdAt: '2023-09-20'
      }
    ]
  }),

  getters: {
    // 获取所有景点
    getAllSceneries: (state) => state.sceneries,

    // 获取用户收藏的景点
    getFavoriteSceneries: (state) => state.sceneries.filter(s => s.isFavorite),

    // 获取某个景点的攻略
    getGuidesByScenery: (state) => (sceneryId) => {
      return state.travelGuides.filter(g => g.sceneryId === sceneryId)
    },

    // 获取所有行程规划
    getAllTravelPlans: (state) => state.travelPlans,

    // 获取社区帖子
    getAllCommunityPosts: (state) => state.communityPosts
  },

  actions: {
    // 新增目的地
    addScenery (scenery) {
      // 生成唯一ID（实际项目中应使用更健壮的方式）
      const newId = Math.max(...this.sceneries.map(s => s.id), 0) + 1

      this.sceneries.push({
        ...scenery,
        id: newId
      })
    },
    // 收藏/取消收藏景点
    toggleFavorite (sceneryId) {
      const scenery = this.sceneries.find(s => s.id === sceneryId)
      if (scenery) {
        scenery.isFavorite = !scenery.isFavorite
        scenery.favorites += scenery.isFavorite ? 1 : -1
      }
    },

    // 点赞/取消点赞景点
    toggleLike (sceneryId) {
      const scenery = this.sceneries.find(s => s.id === sceneryId)
      if (scenery) {
        scenery.isLiked = !scenery.isLiked
        scenery.likes += scenery.isLiked ? 1 : -1
      }
    },

    // 添加行程规划
    addTravelPlan (plan) {
      this.travelPlans.push({
        ...plan,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0
      })
    },

    // 添加旅游攻略
    addGuide (guide) {
      this.travelGuides.push({
        ...guide,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0
      })
    },

    // 更新旅游攻略
    updateGuide (updatedGuide) {
      const index = this.travelGuides.findIndex(g => g.id === updatedGuide.id)
      if (index !== -1) {
        this.travelGuides[index] = updatedGuide
      }
    },

    // 删除旅游攻略
    deleteGuide (guideId) {
      this.travelGuides = this.travelGuides.filter(g => g.id !== guideId)
    },

    // 添加社区帖子
    addPost (post) {
      this.communityPosts.push({
        ...post,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      })
    },

    // 更新社区帖子
    updatePost (updatedPost) {
      const index = this.communityPosts.findIndex(p => p.id === updatedPost.id)
      if (index !== -1) {
        this.communityPosts[index] = updatedPost
      }
    },

    // 删除社区帖子
    deletePost (postId) {
      this.communityPosts = this.communityPosts.filter(p => p.id !== postId)
    }
  },

  persist: true
})
