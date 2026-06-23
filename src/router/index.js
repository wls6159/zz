import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/indexPage.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: '/destinations',
        component: () => import('@/views/DestinationsPage.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/itineraries',
        component: () => import('@/views/ItinerariesPage.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/guides/:sceneryId?',
        component: () => import('@/views/GuidesPage.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/community',
        component: () => import('@/views/CommunityPage.vue'),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/auth/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/auth/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
