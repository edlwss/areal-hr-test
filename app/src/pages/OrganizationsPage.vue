<template>
  <div>
    <Navbar />
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import OrganizationsTable from '@/components/organizations/OrganizationsTable.vue';
import OrganizationDetails from '@/components/organizations/OrganizationDetails.vue';
import EditOrganization from '@/components/organizations/EditOrganization.vue';
import CreateOrganization from '@/components/organizations/CreateOrganization.vue';

export default {
  components: {
    Navbar,
    OrganizationsTable,
    OrganizationDetails,
    EditOrganization,
    CreateOrganization
  },
  computed: {
    currentComponent() {
      return this.$route.meta.component || 'OrganizationsTable';
    },
    pageTitle() {
      return this.$route.meta.title || 'Список организаций';
    }
  }
};
</script>
