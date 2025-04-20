<template>
  <div>
    <table class="table" v-if="items && items.length">
      <thead>
      <slot name="thead" />
      </thead>
      <tbody>
      <slot name="tbody" />
      </tbody>
    </table>
    <EmptyState v-else :message="emptyMessage" />
  </div>
</template>

<script>
import EmptyState from './emptyState.vue';

export default {
  name: 'TableWrapper',
  props: {
    items: Array,
    emptyMessage: {
      type: String,
      default: 'Нет данных для отображения'
    }
  },
  components: {
    EmptyState
  }
}
</script>
