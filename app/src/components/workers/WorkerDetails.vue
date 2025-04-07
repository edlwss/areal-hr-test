<template>
  <div class="container" v-if="worker">
    <h2 class="text-xl font-bold mb-4">Информация о работнике</h2>

    <p><strong>Фамилия:</strong> {{ worker.surname }}</p>
    <p><strong>Имя:</strong> {{ worker.name }}</p>
    <p><strong>Отчество:</strong> {{ worker.middlename || '-' }}</p>
    <p><strong>Дата рождения:</strong> {{ formatDate(worker.birth_date) }}</p>

    <h3 class="section-title">Паспортные данные</h3>
    <p><strong>Серия и номер:</strong> {{ worker.passport_series }} {{ worker.passport_number }}</p>
    <p><strong>Дата выдачи:</strong> {{ formatDate(worker.data_of_issue) }}</p>
    <p><strong>Код подразделения:</strong> {{ worker.unit_code }}</p>
    <p><strong>Кем выдан:</strong> {{ worker.issued_by_whom }}</p>

    <h3 class="section-title">Адрес</h3>
    <p><strong>Регион:</strong> {{ worker.regin }}</p>
    <p><strong>Населённый пункт:</strong> {{ worker.localities }}</p>
    <p><strong>Улица:</strong> {{ worker.street }}</p>
    <p><strong>Дом:</strong> {{ worker.house }}</p>
    <p><strong>Корпус:</strong> {{ worker.building || '-' }}</p>
    <p><strong>Квартира:</strong> {{ worker.apartment || '-' }}</p>

    <router-link to="/workers" class="btn btn-edit mt-4">Назад</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getWorkerById } from '@/api/workersApi';
import { useRoute } from 'vue-router';

const route = useRoute();
const worker = ref(null);

onMounted(async () => {
  const res = await getWorkerById(route.params.id);
  worker.value = res.data;
});

const formatDate = (isoString) => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU');
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

.section-title {
  margin-top: 20px;
  font-weight: bold;
  color: #2b5179;
}

p {
  margin: 6px 0;
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
