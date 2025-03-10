import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MissionView from '../views/MissionView.vue';
import NotFound from '@/views/404.vue';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import { useAuthStore } from '@/stores/authentication';
import Logout from '@/views/Logout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    { path: '/register', component: SignUpView },

    { path: '/login', component: LoginView },

    { path: '/:pathMatch(.*)*', component: NotFound },

    {
      path: '/missions',
      component: MissionView,
      meta: { requiresAuth: true },
    },

    { path: '/logout', component: Logout, meta: { requiresAuth: true } },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
