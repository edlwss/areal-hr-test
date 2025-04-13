<template>
  <div class="form-container">
    <h2 class="form-title">Редактирование департамента</h2>
    <form @submit.prevent="submit" class="form">
      <label class="form-label">Название:</label>
      <input v-model="name" type="text" class="form-input" />
      <p v-if="errors.name" class="error-text">{{ errors.name }}</p>

      <label class="form-label">Комментарий:</label>
      <input v-model="comment" type="text" class="form-input" />
      <p v-if="errors.comment" class="error-text">{{ errors.comment }}</p>

      <button type="submit" class="form-button">Сохранить</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDepartmentById, updateDepartment } from '@/api/departmentsApi';

export default {
  setup() {
    const name = ref('');
    const comment = ref('');
    const errors = ref({});
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await getDepartmentById(route.params.id);
        name.value = response.data.name;
        comment.value = response.data.comment;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    });

    const submit = async () => {
      errors.value = {};
      try {
        await updateDepartment(route.params.id, {
          name: name.value,
          comment: comment.value,
        });
        await router.push('/departments');
      } catch (error) {
        if (error.response?.status === 400 && Array.isArray(error.response.data.errors)) {
          for (const err of error.response.data.errors) {
            errors.value[err.field] = err.message;
          }
        } else {
          console.error('Ошибка при обновлении:', error);
        }
      }
    };

    return {
      name,
      comment,
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
  width: 100%;
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
