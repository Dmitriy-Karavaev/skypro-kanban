import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      // add выше :id — иначе «add» съестся как id
      {
        path: 'card/add',
        name: 'card-add',
        component: () => import('@/views/NewCardView.vue'),
      },
      {
        path: 'card/:id',
        name: 'card',
        component: () => import('@/views/CardView.vue'),
      },
      {
        path: 'exit',
        name: 'exit',
        component: () => import('@/views/ExitView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: SignInView,
  },
  {
    path: '/register',
    name: 'register',
    component: SignUpView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('userInfo')

  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }
})

export default router
