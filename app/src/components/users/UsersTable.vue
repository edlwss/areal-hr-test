<template>
  <div class="container">
    <h2 class="title-center">Пользователи</h2>
    <router-link to="/user/new" class="btn-add">Создать пользователя</router-link>

    <TableWrapper :items="users" empty-message="Нет пользователей">
      <template #thead>
        <tr>
          <th>Логин</th>
          <th>ФИО</th>
          <th>Роль</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="user in users" :key="user.UserID">
          <td>
            <router-link :to="`/user/${user.UserID}`" class="link">
              {{ user.login }}
            </router-link>
          </td>
          <td>{{ formatFIO(user) }}</td>
          <td>{{ user.role_name || `ID ${user.role_ID}` }}</td>
          <td class="actions">
            <BaseButton @click="deleteUser(user.UserID)">Удалить</BaseButton>
          </td>
        </tr>
      </template>
    </TableWrapper>
  </div>
</template>

<script>
import { getUsers, deleteUser } from '@/api/userApi';
import TableWrapper from '@/components/ui/table.vue';
import BaseButton from '@/components/ui/button.vue';
import '@/assets/styles/table.css';

export default {
  components: { TableWrapper, BaseButton },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    try {
      const response = await getUsers();
      this.users = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
  },
  methods: {
    async deleteUser(id) {
      if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        try {
          await deleteUser(id);
          this.users = this.users.filter((u) => u.UserID !== id);
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
        }
      }
    },
    formatFIO(user) {
      return [user.surname, user.name, user.middlename].filter(Boolean).join(' ');
    },
  },
};
</script>
