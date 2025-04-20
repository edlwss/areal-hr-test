<template>
  <div class="empty-state">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    message: {
      type: String,
      default: 'Данные отсутствуют'
    }
  }
}
</script>

<style scoped>
.empty-state {
  text-align: center;
  color: var(--text-color);
  padding: 20px;
  font-style: italic;
}
</style>
