<template>
  <div class="container">
    <h2 class="title-center">Департаменты</h2>
    <router-link v-if="roleId === 1" to="/department/new" class="btn-add">Добавить департамент</router-link>

    <TableWrapper :items="departments" empty-message="Нет департаментов">
      <template #thead>
        <tr>
          <th>Название</th>
          <th>Организация</th>
          <th>Родительский департамент</th>
          <th>Комментарий</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="dept in departments" :key="dept.DepartmentID">
          <td>
            <router-link :to="`/department/${dept.DepartmentID}`" class="link">
              {{ dept.name }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="organizations[dept.organization_ID]"
              :to="`/organization/${dept.organization_ID}`"
              class="link"
            >
              {{ organizations[dept.organization_ID] }}
            </router-link>
            <span v-else>—</span>
          </td>
          <td>
            <router-link
              v-if="dept.parent_ID && parentDepartments[dept.parent_ID]"
              :to="`/department/${dept.parent_ID}`"
              class="link"
            >
              {{ parentDepartments[dept.parent_ID] }}
            </router-link>
            <span v-else>—</span>
          </td>
          <td>{{ dept.comment }}</td>
          <td class="actions">
            <BaseButton v-if="roleId === 1" @click="remove(dept.DepartmentID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getDepartments, deleteDepartment } from '@/api/departmentsApi';
import { getOrganizations } from '@/api/organizationsApi';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';
import { getUserRole } from '@/components/ui/authRole.js';

export default {
  components: { TableWrapper, BaseButton },
  setup() {
    const departments = ref([]);
    const organizations = ref({});
    const parentDepartments = ref({});
    const roleId = getUserRole();

    onMounted(async () => {
      try {
        const [deptRes, orgRes] = await Promise.all([getDepartments(), getOrganizations()]);

        departments.value = deptRes.data;
        organizations.value = orgRes.data.reduce((acc, org) => {
          acc[org.OrganizationID] = org.name;
          return acc;
        }, {});

        parentDepartments.value = deptRes.data.reduce((acc, dept) => {
          if (dept.parent_ID) {
            const parent = deptRes.data.find((d) => d.DepartmentID === dept.parent_ID);
            acc[dept.parent_ID] = parent?.name || '—';
          }
          return acc;
        }, {});
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    });

    const removing = ref(false);

    const remove = async (id) => {
      if (removing.value) return;
      if (!confirm('Вы уверены, что хотите удалить департамент?')) return;

      removing.value = true;
      try {
        await deleteDepartment(id);
        departments.value = departments.value.filter((d) => d.DepartmentID !== id);
      } catch (e) {
        console.error(e);
      } finally {
        removing.value = false;
      }
    };

    return {
      departments,
      organizations,
      parentDepartments,
      remove,
      roleId,
    };
  },
};
</script>
