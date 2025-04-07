<template>
  <div class="home-container">
    <h1 class="title">Главное меню</h1>
    <div class="menu-container">
      <div class="menu">
        <router-link to="/organizations" class="menu-item">Организации</router-link>
        <router-link to="/departments" class="menu-item">Департаменты</router-link>
        <router-link to="/positions" class="menu-item">Должности</router-link>
        <router-link to="/workers" class="menu-item">Работники</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
}

.menu-container {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-item {
  font-size: 20px;
  padding: 15px 30px;
  border: 2px solid #2b5179;
  border-radius: 5px;
  text-decoration: none;
  color: #2b5179;
  font-weight: 600;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
  display: block;
  text-align: center;
  width: 100%;
}

.menu-item:hover {
  background: #2b5179;
  color: white;
  transform: scale(1.05);
}

.menu-item:active {
  transform: scale(1);
}
</style>
<script setup lang="ts">
</script>