<template>
  <div v-if="organization" class="container">
    <h2 class="text-2xl font-bold mb-4 text-center">Организация: {{ organization.name }}</h2>

    <div class="info">
      <p><strong>Наименование:</strong> {{ organization.name }}</p>
      <p><strong>Комментарий:</strong> {{ organization.comment }}</p>
    </div>

    <router-link :to="`/organization/${organization.OrganizationID}/edit`" class="btn-edit">
      Редактировать
    </router-link>
  </div>

  <div v-else class="loading">Загрузка...</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOrganizationById } from '@/api/organizationsApi';

export default {
  setup() {
    const organization = ref(null);
    const route = useRoute();

    onMounted(async () => {
      try {
        const response = await getOrganizationById(route.params.id);
        organization.value = response.data;
      } catch (error) {
        console.error('Ошибка загрузки организации:', error);
      }
    });

    return { organization };
  }
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.info {
  margin-top: 20px;
  font-size: 16px;
  color: #555;
}

.info p {
  margin-bottom: 10px;
}

strong {
  color: #2b5179;
}

.btn-edit {
  display: inline-block;
  background-color: #2b5179;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-edit:hover {
  background-color: #2b5179;
}

.loading {
  text-align: center;
  color: #888;
  font-size: 18px;
}
</style>
