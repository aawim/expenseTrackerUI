import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'


import HomeView from '@/views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import Login from '@/views/Login.vue'
import RegisterView from '@/views/Register.vue'
import UserView from '@/views/UserView.vue'
import UserProfile from '@/views/UserProfile.vue'
import ExpenseView from '@/views/ExpenseView.vue'
import AdminView from '@/views/AdminView.vue'
import RoleView from '@/views/RolesView.vue'
import PermissionsView from '@/views/PermissionsView.vue'
import UserPermissionsView from '@/views/UserPermissionsView.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'home',
      component: WelcomeView,
      meta: {
        title: 'Chart Page',
        requiresAuth: true,
      }
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpenseView,
      meta: {
        title: 'Expenses Page',
        requiresAuth: true,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        title: 'Admin Page',
        requiresAuth: true,
        requiresAdmin: true
      }
    },

    {
      path: '/users',
      name: 'users',
      component: UserView,
      meta: {
        title: 'Home Page',
        requiresAuth: true
      }
    },
    {
      path: '/users/:id',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        title: 'User Profile Page',
        requiresAuth: true
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleView,
      meta: {
        title: 'Role Page',
        requiresAuth: true
      }
    },
    {
      path: '/permissions',
      name: 'permissions',
      component: PermissionsView,
      meta: {
        title: 'Permissions Page',
        requiresAuth: true
      }
    },
    {
      path: '/user-permissions/:id',
      name: 'user-permissions',
      component: UserPermissionsView,
      meta: {
        title: 'User Permissions',
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
      {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    props: route => ({ token: route.query.token, email: route.query.email })
  },

  ]
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login'); // Redirect to login if not authenticated
  }
  else {
    next(); // Allow navigation
  }
});


export default router
