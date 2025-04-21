<template>
  <div class="input-wrapper">
    <label :for="id" class="input-label">{{ label }}</label>
    <input :id="id" v-bind="$attrs" v-model="modelValue" class="input-field" :type="type" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    id: String,
    modelValue: [String, Number],
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue(newValue) {
      this.$emit('update:modelValue', newValue);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 20px;
}

.input-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #2b5179;
}
</style>
