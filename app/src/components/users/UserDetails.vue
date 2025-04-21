<template>
  <div v-if="user" class="container">
    <h2 class="title-center">Пользователь: {{ user.surname }} {{ user.name }}</h2>

    <EntityInfo :info="info" />

    <EditButton :to="`/user/${user.UserID}/edit`" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getUserById } from '@/api/userApi';

import EntityInfo from '@/components/ui/info.vue';
import EditButton from '@/components/ui/linkButton.vue';

export default {
  components: { EntityInfo, EditButton },
  setup() {
    const user = ref(null);
    const route = useRoute();

    onMounted(async () => {
      try {
        const response = await getUserById(route.params.id);
        user.value = response.data;
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
      }
    });

    const info = computed(() => ({
      ФИО: `${user.value?.surname} ${user.value?.name} ${user.value?.middlename || ''}`,
      Роль: user.value?.role_ID,
      Login: user.value?.login,
    }));

    return { user, info };
  },
};
</script>
