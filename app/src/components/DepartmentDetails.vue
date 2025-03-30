<template>
  <div v-if="department" class="container">
    <h2 class="title">Отдел: {{ department.name }}</h2>
    <div class="info">
      <p><strong>Организация:</strong>
        <router-link
            v-if="organization"
            :to="'/organization/' + department.organization_ID"
            class="link"
        >
          {{ organization.name }}
        </router-link>
      </p>

      <p><strong>Родительский департамент:</strong>
        <router-link
            v-if="parentDepartment"
            :to="'/department/' + department.parent_ID"
            class="link"
        >
          {{ parentDepartment.name }}
        </router-link>
        <span v-else>—</span>
      </p>

      <p><strong>Название:</strong> {{ department.name }}</p>
      <p><strong>Комментарий:</strong> {{ department.comment }}</p>
    </div>

    <router-link
        :to="'/department/' + department.DepartmentID + '/edit'"
        class="button"
    >
      Редактировать
    </router-link>
  </div>
  <div v-else class="loading">Загрузка...</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      department: null,
      organization: null,
      parentDepartment: null,
    };
  },
  async mounted() {
    try {
      const { id } = this.$route.params;

      const departmentResponse = await axios.get(`http://localhost:3010/api/departments/${id}`);
      this.department = departmentResponse.data;

      if (this.department.organization_ID) {
        const organizationResponse = await axios.get(`http://localhost:3010/api/organizations/${this.department.organization_ID}`);
        this.organization = organizationResponse.data;
      }

      if (this.department.parent_ID) {
        const parentResponse = await axios.get(`http://localhost:3010/api/departments/${this.department.parent_ID}`);
        this.parentDepartment = parentResponse.data;
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.info {
  margin-top: 20px;
  font-size: 16px;
  color: #555;
  text-align: left;
}

.info p {
  margin-bottom: 10px;
}

strong {
  color: #2b5179;
}

.link {
  color: #2b5179;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.button {
  display: inline-block;
  background: #2b5179;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 20px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.button:hover {
  background: #2b5179;
}

.loading {
  text-align: center;
  color: #888;
  font-size: 18px;
  margin-top: 20px;
}
</style>