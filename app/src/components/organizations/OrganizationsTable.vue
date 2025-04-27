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
import { getOrganizations, deleteOrganization as deleteOrganizationApi } from '@/api/organizationsApi';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';
import { getUserRole } from '@/components/ui/authRole.js';

export default {
  components: { TableWrapper, BaseButton },
  data() {
    return {
      organizations: [],
      roleId: null, 
    };
  },
  async mounted() {
    this.roleId = getUserRole();
    try {
      const response = await getOrganizations();
      this.organizations = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке организаций:', error);
    }
  },
  methods: {
    async deleteOrganization(id) {
      if (this.roleId !== 1) { // проверка роли
        alert('У вас нет прав на удаление организаций.');
        return;
      }
      if (confirm('Вы уверены, что хотите удалить эту организацию?')) {
        try {
          await deleteOrganizationApi(id);
          this.organizations = this.organizations.filter((org) => org.OrganizationID !== id);
        } catch (error) {
          console.error('Ошибка при удалении организации:', error);
        }
      }
    },
  },
};
</script>
