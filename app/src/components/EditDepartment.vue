<template>
  <div class="form-container">
    <h2 class="form-title">Редактирование департамента</h2>
    <form @submit.prevent="updateDepartment" class="form">
      <label class="form-label">Название:</label>
      <input v-model="name" type="text" required class="form-input">

      <label class="form-label">Комментарий:</label>
      <input v-model="comment" type="text" class="form-input">

      <button type="submit" class="form-button">Сохранить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      comment: '',
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:3010/api/departments/${this.$route.params.id}`);
      this.name = response.data.name;
      this.comment = response.data.comment;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  },
  methods: {
    async updateDepartment() {
      await axios.put(`http://localhost:3010/api/departments/${this.$route.params.id}`, {
        name: this.name,
        comment: this.comment,
      });
      this.$router.push('/departments');
    }
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
