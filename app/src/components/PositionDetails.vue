<template>
  <div class="container">
    <h2 class="text-2xl font-bold mb-4 text-center">Просмотр позиции</h2>
    <p><strong>Название:</strong> {{ position.name }}</p>
    <router-link :to="`/position/${position.PositionID}/edit`" class="btn btn-edit">Редактировать</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      position: {}
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:3010/api/positions/${this.$route.params.id}`);
      this.position = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке позиции:', error);
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

.btn {
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

.btn-edit {
  background: #2b5179;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
