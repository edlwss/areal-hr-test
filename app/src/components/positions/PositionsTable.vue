<template>
  <div class="container">
    <h2 class="title-center">Должности</h2>
    <router-link v-if="roleId === 1" to="/position/new" class="btn-add">Создать должность</router-link>

    <TableWrapper :items="positions" empty-message="Нет должностей">
      <template #thead>
        <tr>
          <th>Название</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="position in positions" :key="position.PositionID">
          <td>
            <router-link :to="`/position/${position.PositionID}`" class="link">
              {{ position.name }}
            </router-link>
          </td>
          <td class="actions">
            <BaseButton v-if="roleId === 1" @click="remove(position.PositionID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPositions, deletePosition } from '@/api/positionsApi';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';
import { getSessionUser } from '@/api/authApi.js';

export default {
  components: { TableWrapper, BaseButton },
  setup() {
    const positions = ref([]);
    const roleId = ref(null);

    onMounted(async () => {
      const user = await getSessionUser();
      roleId.value = user.role_ID;

      const response = await getPositions();
      positions.value = response.data;
    });

    const remove = async (id) => {
      if (confirm('Вы уверены, что хотите удалить эту позицию?')) {
        await deletePosition(id);
        positions.value = positions.value.filter((p) => p.PositionID !== id);
      }
    };

    return { positions, remove, roleId };
  },
};
</script>
