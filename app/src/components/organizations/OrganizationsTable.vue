<template>
  <div class="container">
    <h2 class="text-2xl font-bold mb-4 text-center">Организации</h2>
    <router-link to="/organization/new" class="btn-add">Создать организацию</router-link>

    <table class="table">
      <thead>
      <tr>
        <th>Название</th>
        <th>Комментарий</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="org in organizations" :key="org.OrganizationID">
        <td>
          <router-link :to="`/organization/${org.OrganizationID}`" class="link">
            {{ org.name }}
          </router-link>
        </td>
        <td>{{ org.comment }}</td>
        <td class="actions">
          <button @click="deleteOrganization(org.OrganizationID)" class="btn btn-delete">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      organizations: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3010/api/organizations');
      this.organizations = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке организаций:', error);
    }
  },
  methods: {
    async deleteOrganization(id) {
      if (confirm('Вы уверены, что хотите удалить эту организацию?')) {
        try {
          await axios.delete(`http://localhost:3010/api/organizations/${id}`);
          this.organizations = this.organizations.filter(org => org.OrganizationID !== id);
        } catch (error) {
          console.error('Ошибка при удалении организации:', error);
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

.btn-view {
  background: #2b5179;
  color: white;
}

.btn-edit {
  background: #2b5179;
  color: white;
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
  background: #2b5179;
}

.link {
  color: #2b5179;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
