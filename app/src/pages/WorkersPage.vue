<template>
  <div>
    <Navbar />
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import WorkersTable from '@/components/workers/WorkersTable.vue';
import WorkerDetails from '@/components/workers/WorkerDetails.vue';
// import EditWorker from '@/components/workers/EditWorker.vue';
import CreateWorker from '@/components/workers/WorkerCreate.vue';

export default {
  components: {
    Navbar,
    WorkersTable,
    WorkerDetails,
    // EditWorker,
    CreateWorker
  },
  computed: {
    currentComponent() {
      return this.$route.meta.component || 'WorkersTable';
    },
    pageTitle() {
      return this.$route.meta.title || 'Список работников';
    }
  }
};
</script>
