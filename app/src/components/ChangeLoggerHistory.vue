<template>
  <Navbar />
  <div class="container">
    <h2 class="title-center">История изменений</h2>

    <TableWrapper :items="changes" empty-message="Изменений пока нет">
      <template #thead>
        <tr>
          <th>Дата</th>
          <th>Время</th>
          <th>ID пользователя</th>
          <th>Объект</th>
          <th>Изменения</th>
        </tr>
      </template>

      <template #tbody>
        <tr v-for="change in changes" :key="change.id">
          <td>{{ formatDate(change.date_operation) }}</td>
          <td>{{ change.time_operation }}</td>
          <td>{{ change.user_ID ?? '—' }}</td>
          <td>{{ change.object_operation }}</td>
          <td>
            <div v-if="change.changed_field">
              <div v-for="(value, key) in parseChanges(change.changed_field)" :key="key">
                <strong>{{ key }}:</strong>
                <pre class="json-preview">{{ formatChange(value) }}</pre>
              </div>
            </div>
            <pre v-else>Нет изменений</pre>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from './Navbar.vue';
import TableWrapper from '@/components/ui/table.vue';
import '@/assets/styles/table.css';
import { getChangeHistory } from '@/api/changeLoggerApi.js';

export default {
  components: { Navbar, TableWrapper },
  setup() {
    const changes = ref([]);

    onMounted(async () => {
      const response = await getChangeHistory();
      changes.value = response.data;
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    };

    const parseChanges = (changedField) => {
      if (typeof changedField === 'string') {
        try {
          return JSON.parse(changedField);
        } catch (e) {
          console.error('Ошибка при парсинге JSON:', e);
          return {};
        }
      } else if (typeof changedField === 'object') {
        return changedField;
      }
      return {};
    };

    const formatChange = (value) => {
      if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
      }
      return value;
    };

    return { changes, formatDate, parseChanges, formatChange };
  },
};
</script>

<style scoped>
.json-preview {
  text-align: left;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
