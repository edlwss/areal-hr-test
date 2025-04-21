<template>
  <div class="container">
    <h2 class="title-center">Организации</h2>
    <router-link to="/organization/new" class="btn-add">Создать организацию</router-link>

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
            <BaseButton @click="deleteOrganization(org.OrganizationID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import { getOrganizations, deleteOrganization } from '@/api/organizationsApi';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';

export default {
  components: { TableWrapper, BaseButton },
  data() {
    return {
      organizations: [],
    };
  },
  async mounted() {
    try {
      const response = await getOrganizations();
      this.organizations = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке организаций:', error);
    }
  },
  methods: {
    async deleteOrganization(id) {
      if (confirm('Вы уверены, что хотите удалить эту организацию?')) {
        try {
          await deleteOrganization(id);
          this.organizations = this.organizations.filter((org) => org.OrganizationID !== id);
        } catch (error) {
          console.error('Ошибка при удалении организации:', error);
        }
      }
    },
  },
};
</script>
