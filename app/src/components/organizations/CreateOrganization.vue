<template>
  <div class="form-container">
    <h2 class="form-title">Создание новой организации</h2>
    <form @submit.prevent="submit" class="form">
    <label class="form-label">Название</label>
      <input v-model="name" class="form-input">

      <label class="form-label">Комментарий</label>
      <input v-model="comment" class="form-input">

      <button type="submit" class="form-button">Создать</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createOrganization } from '@/api/organizationsApi';

export default {
  setup() {
    const name = ref('');
    const comment = ref('');
    const router = useRouter();

    const submit = async () => {
      try {
        await createOrganization({ name: name.value, comment: comment.value });
        await router.push('/organizations');
      } catch (error) {
        console.error('Ошибка создания:', error);
      }
    };

    return { name, comment, submit };
  }
};
</script>



<style scoped>
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
