<template>
  <router-link :to="to" class="btn" style="background-color: var(--primary-color); color: white">
    Редактировать
  </router-link>
</template>

<script>
export default {
  props: {
    to: String,
  },
};
</script>
