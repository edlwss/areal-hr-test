<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import PositionsTable from '@/components/positions/PositionsTable.vue';
import PositionDetails from '@/components/positions/PositionDetails.vue';
import CreatePosition from '@/components/positions/CreatePosition.vue';
import EditPosition from '@/components/positions/EditPosition.vue';

export default {
  components: {
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
