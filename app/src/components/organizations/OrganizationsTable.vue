<template>
  <div class="container">
    <h2 class="title-center">Организации</h2>
    <router-link v-if="roleId === 1" to="/organization/new" class="btn-add">Создать организацию</router-link>

    <TableWrapper :items="organizations" empty-message="Нет организаций">
      <template #thead>
        <tr>
          <th>Название</th>
          <th>Комментарий</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="org in organizations" :key="org.OrganizationID">
          <td>
            <router-link :to="`/organization/${org.OrganizationID}`" class="link">
              {{ org.name }}
            </router-link>
          </td>
          <td>{{ org.comment }}</td>
          <td class="actions">
            <BaseButton v-if="roleId === 1" @click="deleteOrganization(org.OrganizationID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getOrganizations, deleteOrganization as deleteOrganizationApi } from '@/api/organizationsApi';
import { getSessionUser } from '@/api/authApi.js';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';

export default {
  components: { TableWrapper, BaseButton },
  setup() {
    const organizations = ref([]);
    const roleId = ref(null);


    const loadData = async () => {
      try {
        const user = await getSessionUser();
        roleId.value = user.role_ID;

        const response = await getOrganizations();
        organizations.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      }
    };

    const deleteOrganization = async (id) => {
      if (roleId.value !== 1) {
        alert('У вас нет прав на удаление организаций.');
        return;
      }
      if (confirm('Вы уверены, что хотите удалить эту организацию?')) {
        try {
          await deleteOrganizationApi(id);
          organizations.value = organizations.value.filter((org) => org.OrganizationID !== id);
        } catch (error) {
          console.error('Ошибка при удалении организации:', error);
        }
      }
    };

    onMounted(loadData);

    return {
      organizations,
      roleId,
      deleteOrganization,
    };
  },
};
</script>

