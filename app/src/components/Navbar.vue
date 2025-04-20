<template>
  <nav class="navbar">
    <router-link to="/">Дом</router-link>
    <router-link to="/organizations">Организации</router-link>
    <router-link to="/positions">Должности</router-link>
    <router-link to="/departments">Отделы</router-link>
    <router-link to="/workers">Работники</router-link>
    <router-link to="/changes">История изменений</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 15px;
  background: #2b5179;
  padding: 10px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>
<script setup lang="ts">
</script>