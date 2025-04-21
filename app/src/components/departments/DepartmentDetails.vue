<template>
  <div v-if="department" class="container">
    <h2 class="title-center">Отдел: {{ department.name }}</h2>

    <EntityInfo :info="info" />

    <EditButton :to="`/department/${department.DepartmentID}/edit`" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getDepartmentById } from '@/api/departmentsApi';
import { getOrganizationById } from '@/api/organizationsApi';

import EntityInfo from '@/components/ui/info.vue';
import EditButton from '@/components/ui/linkButton.vue';

export default {
  components: { EntityInfo, EditButton },
  setup() {
    const department = ref(null);
    const organization = ref(null);
    const parentDepartment = ref(null);
    const route = useRoute();

    onMounted(async () => {
      try {
        const { id } = route.params;
        const deptRes = await getDepartmentById(id);
        department.value = deptRes.data;

        if (department.value.organization_ID) {
          const orgRes = await getOrganizationById(department.value.organization_ID);
          organization.value = orgRes.data;
        }

        if (department.value.parent_ID) {
          const parentRes = await getDepartmentById(department.value.parent_ID);
          parentDepartment.value = parentRes.data;
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    });

    const info = computed(() => ({
      Организация: organization.value
        ? {
            label: organization.value.name,
            to: `/organization/${organization.value.OrganizationID}`,
          }
        : '—',
      'Родительский департамент': parentDepartment.value
        ? {
            label: parentDepartment.value.name,
            to: `/department/${parentDepartment.value.DepartmentID}`,
          }
        : '—',
      Название: department.value?.name,
      Комментарий: department.value?.comment,
    }));

    return { department, info };
  },
};
</script>
