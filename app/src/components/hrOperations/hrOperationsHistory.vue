<template>
  <div class="container">
    <h2 class="title">История HR-операций: {{ workerName }}</h2>

    <table class="hr-table" v-if="operations.length">
      <thead>
      <tr>
        <th>Действие</th>
        <th>Значение</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="op in operations" :key="op.HrOperationID">
        <td>{{ op.action_name }}</td>
        <td>
          <span v-if="op.position_name">Должность: {{ op.position_name }} </span> <br>
          <span v-if="op.department_name">Отдел: {{ op.department_name }} </span> <br>
          <span v-if="op.salary">Зарплата: {{ op.salary }} </span>
        </td>
        <td>
          <button class="btn-delete" @click="deleteOperation(op.HrOperationID)">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-else>Нет операций.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getWorkerHrOperations, deleteHrOperation } from '@/api/hrOperationsApi';
import { getWorkerById } from '@/api/workersApi';

const route = useRoute();
const workerId = route.params.workerId;

const operations = ref([]);
const workerName = ref('');

const fetchData = async () => {
  const [opRes, workerRes] = await Promise.all([
    getWorkerHrOperations(workerId),
    getWorkerById(workerId)
  ]);

  operations.value = opRes.data;
  workerName.value = `${workerRes.data.surname} ${workerRes.data.name}`;
};

const deleteOperation = async (id) => {
  if (confirm('Удалить эту операцию?')) {
    await deleteHrOperation(id);
    operations.value = operations.value.filter(op => op.HrOperationID !== id);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #00000010;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hr-table {
  width: 100%;
  border-collapse: collapse;
}

.hr-table th,
.hr-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.hr-table th {
  background-color: #f4f4f4;
  text-align: left;
}

.btn-delete {
  padding: 6px 12px;
  background: #2b5179;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  opacity: 0.8;
}
</style>
