<template>
  <div class="form-container">
    <h2 class="form-title">Редактирование организации</h2>
    <form @submit.prevent="updateOrganization" class="form">
      <label class="form-label">Название</label>
      <input v-model="organization.name" class="form-input" />
      <p v-if="errors.name" class="error-text">{{ errors.name }}</p>

      <label class="form-label">Комментарий</label>
      <input v-model="organization.comment" class="form-input" />
      <p v-if="errors.comment" class="error-text">{{ errors.comment }}</p>

      <button type="submit" class="form-button">Сохранить</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  getOrganizationById,
  updateOrganization as apiUpdateOrganization,
} from '@/api/organizationsApi';

export default {
  setup() {
    const organization = ref({ name: '', comment: '' });
    const errors = ref({});
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await getOrganizationById(route.params.id);
        organization.value = response.data;
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    });

    const updateOrganization = async () => {
      errors.value = {};
      try {
        await apiUpdateOrganization(route.params.id, organization.value);
        await router.push('/organizations');
      } catch (error) {
        const response = error.response;
        if (response?.status === 400 && Array.isArray(response.data.errors)) {
          for (const err of response.data.errors) {
            errors.value[err.field] = err.message;
          }
        } else {
          console.error('Ошибка обновления:', error);
        }
      }
    };

    return {
      organization,
      errors,
      updateOrganization,
    };
  },
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
  background-color: #2b5179;
}
</style>
