import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/User'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const storedToken = localStorage.getItem("token");  

  console.log("Token en beforeEach desde localStorage:", storedToken);
  console.log("Token en beforeEach desde store:", userStore.token);

  if (to.meta.requiresAuth && !storedToken) {
    next("/login");
  } else {
    next();
  }
});


export default router