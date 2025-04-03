<template>
  <div class="form-container">
    <h2 class="form-title">Создать департамент</h2>
    <form @submit.prevent="createDepartment" class="form">
      <label class="form-label">Организация:</label>
      <select v-model="organization_ID" required class="form-input">
        <option v-for="org in organizations" :key="org.OrganizationID" :value="org.OrganizationID">
          {{ org.name }}
        </option>
      </select>

      <label class="form-label">Родительский департамент (необязательно):</label>
      <select v-model="parent_ID" class="form-input">
        <option :value="null">—</option>
        <option v-for="dept in departments" :key="dept.DepartmentID" :value="dept.DepartmentID">
          {{ dept.name }}
        </option>
      </select>

      <label class="form-label">Название:</label>
      <input v-model="name" type="text" required class="form-input">

      <label class="form-label">Комментарий:</label>
      <input v-model="comment" type="text" class="form-input">

      <button type="submit" class="form-button">Создать</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      organization_ID: null,
      parent_ID: null,
      name: '',
      comment: '',
      errorMessage: '',
      organizations: [],
      departments: []
    };
  },
  async mounted() {
    try {
      const [orgResponse, deptResponse] = await Promise.all([
        axios.get('http://localhost:3010/api/organizations'),
        axios.get('http://localhost:3010/api/departments')
      ]);

      this.organizations = orgResponse.data;
      this.departments = deptResponse.data;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      this.errorMessage = 'Ошибка загрузки списка организаций и департаментов.';
    }
  },
  methods: {
    async createDepartment() {
      try {
        const response = await axios.post('http://localhost:3010/api/departments', {
          organization_ID: this.organization_ID,
          parent_ID: this.parent_ID || null,
          name: this.name,
          comment: this.comment,
        });

        if (response.data) {
          this.$router.push('/departments');
        }
      } catch (error) {
        console.error('Ошибка при создании департамента:', error);
        this.errorMessage = 'Не удалось создать департамент. Проверьте данные.';
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-label {
  font-size: 1rem;
  color: #333;
}

.form-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

.form-button {
  padding: 12px 20px;
  background-color: #2b5179;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #2b5179;
}
</style>
