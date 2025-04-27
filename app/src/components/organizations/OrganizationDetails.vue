<template>
  <div v-if="organization" class="container">
    <h2 class="title-center">Организация: {{ organization.name }}</h2>

    <EntityInfo :info="info" />

    <EditButton v-if="roleId === 1" :to="`/organization/${organization.OrganizationID}/edit`" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getOrganizationById } from '@/api/organizationsApi';

import EntityInfo from '@/components/ui/info.vue';
import EditButton from '@/components/ui/linkButton.vue';
import { getUserRole } from '@/components/ui/authRole.js';

export default {
  components: { EntityInfo, EditButton },
  setup() {
    const organization = ref(null);
    const route = useRoute();
    const roleId =getUserRole();

    onMounted(async () => {
      try {
        const response = await getOrganizationById(route.params.id);
        organization.value = response.data;
      } catch (error) {
        console.error('Ошибка загрузки организации:', error);
      }
    });

    const info = computed(() => ({
      Наименование: organization.value?.name,
      Комментарий: organization.value?.comment,
    }));

    return { organization, info, roleId };
  },
};
</script>
