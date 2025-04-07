<template>
  <form @submit.prevent="submitForm">
    <input type="hidden" v-model="form.worker_ID" />

    <div>
      <label>Действие</label>
      <select v-model="form.actionID" required>
        <option v-for="action in actions" :key="action.ActionID" :value="action.ActionID">
          {{ action.name }}
        </option>
      </select>
    </div>

    <div>
      <label>Должность</label>
      <select v-model="form.position_ID">
        <option value="">-</option>
        <option v-for="position in positions" :key="position.PositionID" :value="position.PositionID">
          {{ position.name }}
        </option>
      </select>
    </div>

    <div>
      <label>Отдел</label>
      <select v-model="form.department_ID">
        <option value="">-</option>
        <option v-for="department in departments" :key="department.DepartmentID" :value="department.DepartmentID">
          {{ department.name }}
        </option>
      </select>
    </div>

    <div>
      <label>Зарплата</label>
      <input type="number" v-model="form.salary" step="0.01" placeholder="Например, 50000" />
    </div>

    <button type="submit">Сохранить</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getActions } from '@/api/actionApi';
import { getDepartments } from '@/api/departmentsApi';
import { getPositions } from '@/api/positionsApi';
import { createHrOperation } from '@/api/hrOperationsApi';

const route = useRoute();
const router = useRouter();

const form = ref({
  worker_ID: route.params.workerId,
  actionID: '',
  position_ID: null,
  department_ID: null,
  salary: null
});

const actions = ref([]);
const positions = ref([]);
const departments = ref([]);

onMounted(async () => {
  actions.value = (await getActions()).data;
  positions.value = (await getPositions()).data;
  departments.value = (await getDepartments()).data;
});

const submitForm = async () => {
  await createHrOperation(form.value);
  router.push(`/worker/${form.value.worker_ID}`);
};
</script>
