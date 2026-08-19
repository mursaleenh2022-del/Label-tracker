import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import AddEntryView from '../views/AddEntryView.vue';
import ReportsView from '../views/ReportsView.vue';
import LoginView from '../views/LoginView.vue';
import ProductsView from '../views/ProductsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/add',
      name: 'add-entry',
      component: AddEntryView
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    }
  ]
});

// Basic navigation guard (stubbed until Pinia auth is active)
router.beforeEach((to, from, next) => {
  const isAuthenticated = true; // Replace with authStore.isAuthenticated
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
