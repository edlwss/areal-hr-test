<template>
  <div class="container">
    <h2 class="title">Департаменты</h2>
    <router-link to="/department/new" class="btn btn-add">Добавить департамент</router-link>
    <table class="table">
      <thead>
      <tr>
        <th>Название</th>
        <th>Организация</th>
        <th>Родительский департамент</th>
        <th>Комментарий</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dept in departments" :key="dept.DepartmentID">
        <td>
          <router-link :to="`/department/${dept.DepartmentID}`" class="link">
            {{ dept.name }}
          </router-link>
        </td>
        <td>
          <router-link v-if="organizations[dept.organization_ID]" :to="'/organization/' + dept.organization_ID" class="link">
            {{ organizations[dept.organization_ID] }}
          </router-link>
          <span v-else>—</span>
        </td>
        <td>
          <router-link v-if="dept.parent_ID && parentDepartments[dept.parent_ID]" :to="'/department/' + dept.parent_ID" class="link">
            {{ parentDepartments[dept.parent_ID] }}
          </router-link>
          <span v-else>—</span>
        </td>

        <td>{{ dept.comment }}</td>
        <td class="actions">
          <button @click="remove(dept.DepartmentID)" class="btn btn-delete">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getDepartments, deleteDepartment } from '@/api/departmentsApi';
import { getOrganizations } from '@/api/organizationsApi';

export default {
  setup() {
    const departments = ref([]);
    const organizations = ref({});
    const parentDepartments = ref({});

    onMounted(async () => {
      try {
        const [deptRes, orgRes] = await Promise.all([
          getDepartments(),
          getOrganizations()
        ]);

        departments.value = deptRes.data;
        organizations.value = orgRes.data.reduce((acc, org) => {
          acc[org.OrganizationID] = org.name;
          return acc;
        }, {});

        parentDepartments.value = deptRes.data.reduce((acc, dept) => {
          if (dept.parent_ID) {
            const parent = deptRes.data.find(d => d.DepartmentID === dept.parent_ID);
            acc[dept.parent_ID] = parent?.name || '—';
          }
          return acc;
        }, {});
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    });

    const remove = async (id) => {
      if (confirm('Вы уверены, что хотите удалить департамент?')) {
        await deleteDepartment(id);
        departments.value = departments.value.filter(d => d.DepartmentID !== id);
      }
    };

    return {
      departments,
      organizations,
      parentDepartments,
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

.title {
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
  background: #1d3a5f;
}

.link {
  color: #2b5179;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>