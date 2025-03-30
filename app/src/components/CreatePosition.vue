<template>
  <div class="container">
    <h2 class="text-2xl font-bold mb-4 text-center">Создание новой позиции</h2>
    <form @submit.prevent="createPosition">
      <label>Название:</label>
      <input v-model="position.name" required />
      <button type="submit" class="btn btn-save">Создать</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      position: { name: '' }
    };
  },
  methods: {
    async createPosition() {
      try {
        await axios.post('http://localhost:3010/api/positions', this.position);
        this.$router.push('/positions');
      } catch (error) {
        console.error('Ошибка при создании позиции:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  padding: 10px 15px;
  background: #2b5179;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save {
  background: #2b5179;
}

.btn:hover {
  opacity: 0.8;
}
</style>
