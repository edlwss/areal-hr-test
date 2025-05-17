<template>
  <div class="form-wrapper">
    <h2 class="title">
      HR-операция для сотрудника
      <span v-if="worker">{{ worker.name }} {{ worker.surname }}</span>
    </h2>
    <form @submit.prevent="submitForm" class="form-grid">
      <input type="hidden" v-model="form.worker_ID" />

      <div class="form-group">
        <label>Действие</label>
        <select v-model="form.actionID" required>
          <option disabled value="">Выберите действие</option>
          <option
            v-for="action in availableActions"
            :key="action.ActionID"
            :value="action.ActionID"
          >
            {{ action.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="showPosition">
        <label>Должность</label>
        <select v-model="form.position_ID" :disabled="isPositionDisabled">
          <option value="">-</option>
          <option
            v-for="position in positions"
            :key="position.PositionID"
            :value="position.PositionID"
          >
            {{ position.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="showDepartment">
        <label>Отдел</label>
        <select v-model="form.department_ID" :disabled="isDeptDisabled">
          <option value="">-</option>
          <option
            v-for="department in departments"
            :key="department.DepartmentID"
            :value="department.DepartmentID"
          >
            {{ department.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="showSalary">
        <label>Зарплата</label>
        <input type="number" v-model="form.salary" step="0.01" :disabled="isSalaryDisabled" />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getActions } from '@/api/actionApi.js';
import { getDepartments } from '@/api/departmentsApi.js';
import { getPositions } from '@/api/positionsApi.js';
import { createHrOperation } from '@/api/hrOperationsApi.js';
import { getWorkerById } from '@/api/workersApi.js';

const route = useRoute();
const router = useRouter();

const workerId = route.params.workerId;

const form = ref({
  worker_ID: workerId,
  actionID: '',
  position_ID: null,
  department_ID: null,
  salary: null,
});

const actions = ref([]);
const positions = ref([]);
const departments = ref([]);
const worker = ref(null);

onMounted(async () => {
  const [actionsRes, positionsRes, departmentsRes, workerRes] = await Promise.all([
    getActions(),
    getPositions(),
    getDepartments(),
    getWorkerById(workerId),
  ]);

  actions.value = actionsRes.data;
  positions.value = positionsRes.data;
  departments.value = departmentsRes.data;
  worker.value = workerRes.data;
});

const getActionIdByName = (name) => {
  const action = actions.value.find(a => a.name === name);
  return action?.ActionID ?? null;
};

const actionIds = computed(() => ({
  hire: getActionIdByName('Взять в штат'),
  changeDept: getActionIdByName('Изменение отдела'),
  changeSalary: getActionIdByName('Изменение зарплаты'),
  fire: getActionIdByName('Увольнение с работы'),
}));

const availableActions = computed(() => {
  if (!worker.value || actions.value.length === 0) return [];

  const last = worker.value.last_hr_operation;
  const { hire, changeDept, changeSalary, fire } = actionIds.value;

  if (!last || last.actionID === fire) {
    return actions.value.filter(a => a.ActionID === hire);
  }

  return actions.value.filter(a =>
    [changeDept, changeSalary, fire].includes(a.ActionID)
  );
});

const showSalary = computed(() =>
  form.value.actionID === actionIds.value.changeSalary ||
  form.value.actionID === actionIds.value.hire
);

const showDepartment = computed(() =>
  form.value.actionID === actionIds.value.changeDept ||
  form.value.actionID === actionIds.value.hire
);

const showPosition = computed(() =>
  form.value.actionID === actionIds.value.changeDept ||
  form.value.actionID === actionIds.value.hire
);

const isSalaryDisabled = computed(() =>
  ![actionIds.value.changeSalary, actionIds.value.hire].includes(form.value.actionID)
);
const isDeptDisabled = computed(() =>
  ![actionIds.value.changeDept, actionIds.value.hire].includes(form.value.actionID)
);
const isPositionDisabled = computed(() =>
  ![actionIds.value.changeDept, actionIds.value.hire].includes(form.value.actionID)
);

const submitForm = async () => {
  try {
    await createHrOperation(form.value);
    router.push(`/worker/${form.value.worker_ID}`);
  } catch (error) {
    console.error('Ошибка при создании HR-операции:', error);
  }
};
</script>

<style scoped>
.form-wrapper {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f8f7f7;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #2c3e50;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #555;
}

input,
select {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background: #fff;
  transition: border 0.2s ease;
}

input:focus,
select:focus {
  border-color: #2b5179;
  outline: none;
}

.form-actions {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 20px;
}

.btn {
  background-color: #2b5179;
  color: #fff;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn:hover {
  background-color: #1e3b5b;
}
</style>
