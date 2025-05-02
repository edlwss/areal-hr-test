<template>
  <div class="login-container">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Логин</label>
        <input v-model="login" class="input" type="text" />
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input v-model="password" class="input" type="password" />
      </div>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <button type="submit" class="btn">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login as loginRequest, getSessionUser } from '../api/authApi.js';

const login = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    await loginRequest({ login: login.value, password: password.value });
    const user = await getSessionUser();
    if (user?.UserID !== undefined) {
      await router.push('/home');
    } else {
      errorMessage.value = 'Ошибка авторизации';
    }
  } catch (error) {
    if (error.response?.data?.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = 'Ошибка входа';
    }
  }
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}
.form-group {
  margin-bottom: 15px;
}
.input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}
.btn {
  width: 100%;
  padding: 10px;
  background-color: #2b5179;
  color: white;
  border: none;
  border-radius: 5px;
}
.error {
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
}
</style>
