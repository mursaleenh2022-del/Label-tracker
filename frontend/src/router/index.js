import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import DashboardView from '../views/DashboardView.vue';
import AddEntryView from '../views/AddEntryView.vue';
import ReportsView from '../views/ReportsView.vue';
import LoginView from '../views/LoginView.vue';
import SetPasswordView from '../views/SetPasswordView.vue';
import ProductsView from '../views/ProductsView.vue';
import ManageUsersView from '../views/ManageUsersView.vue';
import ManageRolesView from '../views/ManageRolesView.vue';
import { hasPermission } from '../utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/accept-invite',
      name: 'accept-invite',
      component: SetPasswordView
    },
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
      meta: { requiresAuth: true, requiresPermission: 'manage_users' }
    },
    {
      path: '/settings/roles',
      name: 'manage-roles',
      component: ManageRolesView,
      meta: { requiresAuth: true, requiresPermission: 'manage_users' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (to.name === 'accept-invite') {
    next();
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' });
  } else if (to.meta.requiresPermission && !hasPermission(to.meta.requiresPermission)) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
