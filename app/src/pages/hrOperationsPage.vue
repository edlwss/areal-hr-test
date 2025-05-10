<template>
  <div>
    <Navbar />
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import HrOperationForm from '@/components/hrOperations/hrOperation.vue';
import WorkerHrHistory from '@/components/hrOperations/hrOperationsHistory.vue';

export default {
  components: {
    Navbar,
    HrOperationForm,
    WorkerHrHistory,
  },
  computed: {
    currentComponent() {
      return this.$route.meta.component || 'HrOperationForm';
    },
    pageTitle() {
      return this.$route.meta.title || 'Управление HR операциями';
    },
  },
};
</script>
