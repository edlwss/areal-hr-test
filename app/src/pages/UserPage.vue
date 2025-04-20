<template>
  <div>
    <Navbar />
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import UsersTable from '@/components/users/UsersTable.vue';
import CreateUser from '@/components/users/CreateUser.vue';
import EditUser from '@/components/users/EditUser.vue';
import UserDetails from '@/components/users/UserDetails.vue';

export default {
  components: {
    Navbar,
    UsersTable,
    CreateUser,
    EditUser,
    UserDetails
  },
  computed: {
    currentComponent() {
      return this.$route.meta.component || 'UsersTable';
    },
    pageTitle() {
      return this.$route.meta.title || 'Список пользователей';
    }
  }
};
</script>
