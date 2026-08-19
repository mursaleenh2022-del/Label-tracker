import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import DashboardView from '../views/DashboardView.vue';
import AddEntryView from '../views/AddEntryView.vue';
import ReportsView from '../views/ReportsView.vue';
import LoginView from '../views/LoginView.vue';
import ProductsView from '../views/ProductsView.vue';
import ManageUsersView from '../views/ManageUsersView.vue';
import ManageRolesView from '../views/ManageRolesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/add',
      name: 'add-entry',
      component: AddEntryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings/users',
      name: 'manage-users',
      component: ManageUsersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings/roles',
      name: 'manage-roles',
      component: ManageRolesView,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Check if user is authenticated via localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // If route requires auth and user is not logged in, redirect to login
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    // If logged in user tries to go to login page, redirect to dashboard
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
