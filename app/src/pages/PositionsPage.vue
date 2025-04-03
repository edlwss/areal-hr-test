<template>
  <div>
    <Navbar />
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import PositionsTable from '@/components/positions/PositionsTable.vue';
import PositionDetails from '@/components/positions/PositionDetails.vue';
import CreatePosition from '@/components/positions/CreatePosition.vue';
import EditPosition from '@/components/positions/EditPosition.vue';

export default {
  components: {
    Navbar,
    PositionsTable,
    PositionDetails,
    CreatePosition,
    EditPosition
  },
  computed: {
    currentComponent() {
      return this.$route.meta.component || 'PositionsTable';
    },
    pageTitle() {
      return this.$route.meta.title || 'Список должностей';
    }
  }
};
</script>
