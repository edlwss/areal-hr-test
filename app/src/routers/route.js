import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import DepartmentsPage from '@/pages/DepartmentsPage.vue';
import OrganizationsPage from "@/pages/OrganizationsPage.vue";
import PositionsPage from "@/pages/PositionsPage.vue";
import WorkersPage from "@/pages/WorkersPage.vue";
import HrOperation from "@/pages/hrOperationsPage.vue";

const routes = [
    { path: '/', component: Home },

    { path: '/organizations', component: OrganizationsPage, name: 'organizations', meta: { title: 'Список организаций', component: 'OrganizationsTable' } },
    { path: '/organization/:id', component: OrganizationsPage, name: 'organization-details', meta: { title: 'Детали организации', component: 'OrganizationDetails' } },
    { path: '/organization/new', component: OrganizationsPage, name: 'organization-create', meta: { title: 'Создание организации', component: 'CreateOrganization' } },
    { path: '/organization/:id/edit', component: OrganizationsPage, name: 'organization-edit', meta: { title: 'Редактирование организации', component: 'EditOrganization' } },

    { path: '/positions', component: PositionsPage, name: 'positions', meta: { title: 'Список должностей', component: 'PositionsTable' } },
    { path: '/position/:id', component: PositionsPage, name: 'position-details', meta: { title: 'Детали должности', component: 'PositionDetails' } },
    { path: '/position/new', component: PositionsPage, name: 'position-create', meta: { title: 'Создание должности', component: 'CreatePosition' } },
    { path: '/position/:id/edit', component: PositionsPage, name: 'position-edit', meta: { title: 'Редактирование должности', component: 'EditPosition' }},

    { path: '/departments', component: DepartmentsPage, name: 'departments', meta: { component: 'DepartmentsTable', title: 'Список департаментов' } },
    { path: '/department/:id', component: DepartmentsPage, name: 'department-details', meta: { component: 'DepartmentDetails', title: 'Детали департамента' } },
    { path: '/department/new', component: DepartmentsPage, name: 'department-create', meta: { component: 'CreateDepartment', title: 'Создание департамента' } },
    { path: '/department/:id/edit', component: DepartmentsPage, name: 'department-edit', meta: { component: 'EditDepartment', title: 'Редактирование департамента' } },

    { path: '/workers', component: WorkersPage, name: 'workers', meta: { component: 'WorkersTable', title: 'Список работников' }},
    { path: '/worker/:id', component: WorkersPage, name: 'worker-details', meta: { component: 'WorkerDetails', title: 'Детали работника' }},
    { path: '/worker/new', component: WorkersPage, name: 'worker-create', meta: { component: 'CreateWorker', title: 'Создание работника' }},
    { path: '/worker/:id/edit', component: WorkersPage, name: 'worker-edit', meta: { component: 'EditWorker', title: 'Редактирование работника' }},

    { path: '/worker/:workerId/hr-operation/create', component: HrOperation, meta: {component: 'HrOperationForm', title: 'Создание HR-операции'}},
    {path: '/worker/:workerId/hr-history', component: HrOperation, meta: {component: 'WorkerHrHistory', title: 'История HR-операции'}}

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
