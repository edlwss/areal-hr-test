import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import DepartmentsTable from '../components/DepartmentsTable.vue';
import DepartmentDetails from '../components/DepartmentDetails.vue';
import EditDepartment from '../components/EditDepartment.vue';
import CreateDepartment from '../components/CreateDepartment.vue';
import OrganizationsTable from '../components/OrganizationsTable.vue';
import OrganizationDetails from '../components/OrganizationDetails.vue';
import EditOrganization from '../components/EditOrganization.vue';
import CreateOrganization from '../components/CreateOrganization.vue';
import PositionsTable from "../components/PositionsTable.vue";
import PositionDetails from "../components/PositionDetails.vue";
import CreatePosition from "../components/CreatePosition.vue";
import EditPosition from "../components/EditPosition.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/organizations', component: OrganizationsTable },
    { path: '/organization/:id', component: OrganizationDetails },
    { path: '/organization/:id/edit', component: EditOrganization },
    { path: '/organization/new', component: CreateOrganization },
    { path: '/departments', component: DepartmentsTable },
    { path: '/department/:id', component: DepartmentDetails },
    { path: '/department/:id/edit', component: EditDepartment },
    { path: '/department/new', component: CreateDepartment },
    { path: '/positions', component: PositionsTable },
    { path: '/position/:id', component: PositionDetails },
    { path: '/position/:id/edit', component: EditPosition },
    { path: '/position/new', component: CreatePosition }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
