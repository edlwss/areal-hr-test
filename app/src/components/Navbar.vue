<template>
  <nav class="navbar">
    <div class="links">
      <router-link to="/home">Дом</router-link>
      <router-link to="/organizations">Организации</router-link>
      <router-link to="/positions">Должности</router-link>
      <router-link to="/departments">Отделы</router-link>
      <router-link to="/workers">Работники</router-link>
      <router-link to="/changes">История изменений</router-link>
      <router-link v-if="roleId === 1" to="/users">Пользователи</router-link>
    </div>

    <button class="logout-btn" @click="logout">Выйти</button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getUserRole } from './ui/authRole';

const router = useRouter();
const roleId = getUserRole();

function logout() {
  localStorage.clear();
  router.push('/');
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2b5179;
  padding: 10px 20px;
}

.links {
  display: flex;
  gap: 15px;
}

.links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.links a:hover {
  text-decoration: underline;
}

.logout-btn {
  background: #2b5179;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.logout-btn:hover {
  background: rgba(43, 81, 121, 0.86);
}
</style>
