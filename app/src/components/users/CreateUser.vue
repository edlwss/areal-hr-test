<template>
  <div class="form-container">
    <h2 class="form-title">Создание пользователя</h2>
    <form @submit.prevent="submit" class="form">
      <label class="form-label">Логин</label>
      <input v-model="login" class="form-input" />
      <p v-if="errors.login" class="error-text">{{ errors.login }}</p>

      <label class="form-label">Пароль</label>
      <input v-model="password" type="password" class="form-input" />
      <p v-if="errors.password" class="error-text">{{ errors.password }}</p>

      <label class="form-label">Фамилия</label>
      <input v-model="surname" class="form-input" />
      <p v-if="errors.surname" class="error-text">{{ errors.surname }}</p>

      <label class="form-label">Имя</label>
      <input v-model="name" class="form-input" />
      <p v-if="errors.name" class="error-text">{{ errors.name }}</p>

      <label class="form-label">Отчество</label>
      <input v-model="middlename" class="form-input" />
      <p v-if="errors.middlename" class="error-text">{{ errors.middlename }}</p>

      <label class="form-label">Роль</label>
      <select v-model="role_ID" class="form-input">
        <option disabled value="">Выберите роль</option>
        <option v-for="role in roles" :key="role.RoleID" :value="role.RoleID">
          {{ role.name }}
        </option>
      </select>
      <p v-if="errors.role_ID" class="error-text">{{ errors.role_ID }}</p>

      <button type="submit" class="form-button">Создать</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createUser } from '@/api/userApi.js';
import { getRoles } from '@/api/rolesApi.js';

export default {
  setup() {
    const login = ref('');
    const password = ref('');
    const surname = ref('');
    const name = ref('');
    const middlename = ref('');
    const role_ID = ref('');
    const roles = ref([]);
    const errors = ref({});
    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await getRoles();
        roles.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке ролей:', error);
      }
    });

    const submit = async () => {
      errors.value = {};
      try {
        await createUser({
          login: login.value,
          password: password.value,
          surname: surname.value,
          name: name.value,
          middlename: middlename.value,
          role_ID: parseInt(role_ID.value)
        });
        await router.push('/');
      } catch (error) {
        const response = error.response;
        if (response?.status === 400 && Array.isArray(response.data.errors)) {
          for (const err of response.data.errors) {
            errors.value[err.field] = err.message;
          }
        } else {
          console.error('Ошибка создания пользователя:', error);
        }
      }
    };

    return {
      login,
      password,
      surname,
      name,
      middlename,
      role_ID,
      roles,
      errors,
      submit
    };
  }
};
</script>

<style scoped>
.error-text {
  color: red;
  font-size: 0.9rem;
  margin-top: -12px;
}

.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-label {
  font-size: 1rem;
  color: #333;
}

.form-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 95%;
}

.form-button {
  padding: 12px 20px;
  background-color: #2b5179;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #1e3b5c;
}
</style>
