<template>
  <div class="container">
    <h2 class="title-center">История HR-операций: {{ workerName }}</h2>

    <TableWrapper :items="operations" empty-message="Нет операций.">
      <template #thead>
        <tr>
          <th>Действие</th>
          <th>Значение</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="op in operations" :key="op.HrOperationID">
          <td>{{ op.action_name }}</td>
          <td>
            <span v-if="op.position_name">Должность: {{ op.position_name }} <br /></span>
            <span v-if="op.department_name">Отдел: {{ op.department_name }} <br /></span>
            <span v-if="op.salary">Зарплата: {{ op.salary }}</span>
          </td>
          <td class="actions">
            <BaseButton @click="deleteOperation(op.HrOperationID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getWorkerHrOperations, deleteHrOperation } from '@/api/hrOperationsApi';
import { getWorkerById } from '@/api/workersApi';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';

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