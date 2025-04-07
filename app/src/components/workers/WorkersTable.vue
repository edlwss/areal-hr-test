<template>
  <div class="container">
    <h2 class="text-2xl font-bold mb-4 text-center">Работники</h2>
    <router-link to="/worker/new" class="btn-add">Создать работника</router-link>

    <table class="table">
      <thead>
      <tr>
        <th>ФИО</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="worker in filteredWorkers"
          :key="worker.WorkerID"
      >
        <td>
          <router-link :to="`/worker/${worker.WorkerID}`" class="link">
            {{ worker.surname }} {{ worker.name }} {{ worker.middlename || '' }}
          </router-link>
        </td>
        <td class="actions">
          <button @click="deleteWorker(worker.WorkerID)" class="btn btn-delete">
            Удалить
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getWorkers, deleteWorker as apiDeleteWorker } from '@/api/workersApi';

export default {
  data() {
    return {
      workers: [],
    };
  },
  computed: {
    filteredWorkers() {
      // Фильтруем только тех, у кого deleted_at === null
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

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.table th {
  background: #f4f4f4;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 8px;
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

.btn-delete {
  background: #2b5179;
  color: white;
  border: none;
}

.btn:hover {
  opacity: 0.8;
}

.btn-add {
  display: block;
  background: #2b5179;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
}

.btn-add:hover {
  background: #1d3b5a;
}

.link {
  color: #2b5179;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
