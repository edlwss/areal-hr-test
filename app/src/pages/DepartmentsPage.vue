<template>
  <div>
    <Navbar />
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import DepartmentsTable from '@/components/departments/DepartmentsTable.vue';
import DepartmentDetails from '@/components/departments/DepartmentDetails.vue';
import CreateDepartment from '@/components/departments/CreateDepartment.vue';
import EditDepartment from '@/components/departments/EditDepartment.vue';

export default {
  components: {
    Navbar,
    DepartmentsTable,
    DepartmentDetails,
    CreateDepartment,
    EditDepartment,
  },
  computed: {
    currentComponent() {
      return this.$route.meta.component || 'DepartmentsTable';
    },
    pageTitle() {
      return this.$route.meta.title || 'Список департаментов';
    },
  },
};
</script>
