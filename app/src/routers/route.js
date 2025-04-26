import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import DepartmentsPage from '@/pages/DepartmentsPage.vue';
import OrganizationsPage from '@/pages/OrganizationsPage.vue';
import PositionsPage from '@/pages/PositionsPage.vue';
import WorkersPage from '@/pages/WorkersPage.vue';
import HrOperation from '@/pages/hrOperationsPage.vue';
import UsersPage from '@/pages/UserPage.vue';
import ChangeLoggerPage from '@/components/ChangeLoggerHistory.vue';
import LoginPage from '@/pages/LoginPage.vue';

const routes = [
  { path: '/home', component: Home, meta: { requiresAuth: true } },

  { path: '/', component: LoginPage },

  {
    path: '/organizations',
    component: OrganizationsPage,
    name: 'organizations',
    meta: { title: 'Список организаций', component: 'OrganizationsTable', requiresAuth: true },
  },
  {
    path: '/organization/:id',
    component: OrganizationsPage,
    name: 'organization-details',
    meta: { title: 'Детали организации', component: 'OrganizationDetails', requiresAuth: true },
  },
  {
    path: '/organization/new',
    component: OrganizationsPage,
    name: 'organization-create',
    meta: { title: 'Создание организации', component: 'CreateOrganization', requiresAuth: true },
  },
  {
    path: '/organization/:id/edit',
    component: OrganizationsPage,
    name: 'organization-edit',
    meta: {
      title: 'Редактирование организации',
      component: 'EditOrganization',
      requiresAuth: true,
    },
  },

  {
    path: '/positions',
    component: PositionsPage,
    name: 'positions',
    meta: { title: 'Список должностей', component: 'PositionsTable', requiresAuth: true },
  },
  {
    path: '/position/:id',
    component: PositionsPage,
    name: 'position-details',
    meta: { title: 'Детали должности', component: 'PositionDetails', requiresAuth: true },
  },
  {
    path: '/position/new',
    component: PositionsPage,
    name: 'position-create',
    meta: { title: 'Создание должности', component: 'CreatePosition', requiresAuth: true },
  },
  {
    path: '/position/:id/edit',
    component: PositionsPage,
    name: 'position-edit',
    meta: { title: 'Редактирование должности', component: 'EditPosition', requiresAuth: true },
  },

  {
    path: '/departments',
    component: DepartmentsPage,
    name: 'departments',
    meta: { component: 'DepartmentsTable', title: 'Список департаментов', requiresAuth: true },
  },
  {
    path: '/department/:id',
    component: DepartmentsPage,
    name: 'department-details',
    meta: { component: 'DepartmentDetails', title: 'Детали департамента', requiresAuth: true },
  },
  {
    path: '/department/new',
    component: DepartmentsPage,
    name: 'department-create',
    meta: { component: 'CreateDepartment', title: 'Создание департамента', requiresAuth: true },
  },
  {
    path: '/department/:id/edit',
    component: DepartmentsPage,
    name: 'department-edit',
    meta: { component: 'EditDepartment', title: 'Редактирование департамента', requiresAuth: true },
  },

  {
    path: '/workers',
    component: WorkersPage,
    name: 'workers',
    meta: { component: 'WorkersTable', title: 'Список работников', requiresAuth: true },
  },
  {
    path: '/worker/:id',
    component: WorkersPage,
    name: 'worker-details',
    meta: { component: 'WorkerDetails', title: 'Детали работника', requiresAuth: true },
  },
  {
    path: '/worker/new',
    component: WorkersPage,
    name: 'worker-create',
    meta: { component: 'CreateWorker', title: 'Создание работника', requiresAuth: true },
  },
  {
    path: '/worker/:id/edit',
    component: WorkersPage,
    name: 'worker-edit',
    meta: { component: 'EditWorker', title: 'Редактирование работника', requiresAuth: true },
  },

  {
    path: '/worker/:workerId/hr-operation/create',
    component: HrOperation,
    meta: { component: 'HrOperationForm', title: 'Создание HR-операции', requiresAuth: true },
  },
  {
    path: '/worker/:workerId/hr-history',
    component: HrOperation,
    meta: { component: 'WorkerHrHistory', title: 'История HR-операции', requiresAuth: true },
  },

  {
    path: '/changes',
    component: ChangeLoggerPage,
    name: 'change-log',
    meta: { title: 'История изменений', component: 'ChangeLoggerPage', requiresAuth: true },
  },

  {
    path: '/user/new',
    component: UsersPage,
    name: 'user-create',
    meta: { title: 'Создание пользователя', component: 'CreateUser', requiresAuth: true },
  },
  {
    path: '/users',
    component: UsersPage,
    name: 'users',
    meta: { title: 'Список пользователей', component: 'UsersTable', requiresAuth: true },
  },
  {
    path: '/user/:id',
    component: UsersPage,
    name: 'user-details',
    meta: { title: 'Детали пользователя', component: 'UserDetails', requiresAuth: true },
  },
  {
    path: '/user/:id/edit',
    component: UsersPage,
    name: 'user-edit',
    meta: { title: 'Изменения данных пользователя', component: 'EditUser', requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');

  if (!token && to.path !== '/') {
    next('/');
  } else if (token && to.path === '/') {
    next('/home');
  } else {
    next();
  }
});

export default router;
