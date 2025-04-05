<template>
  <div class="container">
    <h2 class="text-2xl font-bold mb-4 text-center">Позиции</h2>
    <router-link to="/position/new" class="btn-add">Создать позицию</router-link>

    <table class="table">
      <thead>
      <tr>
        <th>Название</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="position in positions" :key="position.PositionID">
        <td>
          <router-link :to="`/position/${position.PositionID}`" class="link">
            {{ position.name }}
          </router-link>
        </td>
        <td class="actions">
          <button @click="remove(position.PositionID)" class="btn btn-delete">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPositions, deletePosition } from '@/api/positionsApi';

export default {
  setup() {
    const positions = ref([]);

    onMounted(async () => {
      try {
        const response = await getPositions();
        positions.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке позиций:', error);
      }
    });

    const remove = async (id) => {
      if (confirm('Вы уверены, что хотите удалить эту позицию?')) {
        try {
          await deletePosition(id);
          positions.value = positions.value.filter(pos => pos.PositionID !== id);
        } catch (error) {
          console.error('Ошибка при удалении позиции:', error);
        }
      }
    };

    return {
      positions,
      remove
    };
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
