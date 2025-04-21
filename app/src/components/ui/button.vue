<template>
  <button :class="['btn', type]" :style="{ backgroundColor: color, fontSize: size }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    color: {
      type: String,
      default: '#2b5179',
    },
    size: {
      type: String,
      default: '14px',
    },
  },
};
</script>

<style>
.btn {
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

.btn:hover {
  opacity: 0.8;
}

.btn.primary {
  background-color: #2b5179;
  color: white;
}

.btn.secondary {
  background-color: #ddd;
  color: #333;
}
</style>
