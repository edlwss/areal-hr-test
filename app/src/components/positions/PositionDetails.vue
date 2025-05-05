<template>
  <div class="container">
    <h2 class="title-center">Просмотр позиции</h2>
    <p><strong>Название:</strong> {{ position.name }}</p>
    <EditButton v-if="roleId === 1" :to="`/position/${position.PositionID}/edit`" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPositionById } from '@/api/positionsApi';
import EditButton from '@/components/ui/linkButton.vue';
import { getSessionUser } from '@/api/authApi.js';

export default {
  components: {
    EditButton,
  },
  setup() {
    const position = ref({});
    const route = useRoute();
    const roleId = ref(null);

    onMounted(async () => {
      try {
        const user = await getSessionUser();
        roleId.value = user.role_ID;

        const response = await getPositionById(route.params.id);
        position.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке позиции:', error);
      }
    });

    return {
      position,
      roleId
    };
  },
};
</script>
