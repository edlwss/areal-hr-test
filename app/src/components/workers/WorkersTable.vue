<template>
  <div class="container">
    <h2 class="title-center">Работники</h2>
    <router-link to="/worker/new" class="btn-add">Создать работника</router-link>

    <TableWrapper :items="filteredWorkers" empty-message="Нет работников">
      <template #thead>
        <tr>
          <th>ФИО</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="worker in filteredWorkers" :key="worker.WorkerID">
          <td>
            <router-link :to="`/worker/${worker.WorkerID}`" class="link">
              {{ worker.surname }} {{ worker.name }} {{ worker.middlename || '' }}
            </router-link>
          </td>
          <td class="actions">
            <BaseButton @click="deleteWorker(worker.WorkerID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';
import { getWorkers, deleteWorker as apiDeleteWorker } from '@/api/workersApi';

export default {
  components: { TableWrapper, BaseButton },
  data() {
    return { workers: [] };
  },
  computed: {
    filteredWorkers() {
      return this.workers.filter(w => !w.deleted_at);
    }
  },
  async mounted() {
    try {
      const response = await getWorkers();
      this.workers = response.data || response;
    } catch (error) {
      console.error('Ошибка при загрузке работников:', error);
    }
  },
  methods: {
    async deleteWorker(id) {
      if (confirm('Удалить работника?')) {
        try {
          await apiDeleteWorker(id);
          this.workers = this.workers.filter(w => w.WorkerID !== id);
        } catch (error) {
          console.error('Ошибка при удалении работника:', error);
        }
      }
    }
  }
};
</script>
