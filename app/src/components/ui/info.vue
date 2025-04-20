<template>
  <div class="info">
    <p v-for="(value, label) in info" :key="label">
      <strong>{{ label }}:</strong>
      <span v-if="typeof value !== 'object'">{{ value || '—' }}</span>
      <router-link
          v-else
          :to="value.to"
          class="link"
      >
        {{ value.label }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
};
</script>
