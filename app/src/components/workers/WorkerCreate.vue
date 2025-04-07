<template>
  <div class="container">
    <h2 class="text-xl font-bold mb-4">Создание работника</h2>
    <form @submit.prevent="submit">
      <div class="grid gap-4">
        <input v-model="form.surname" placeholder="Фамилия" required class="input" />
        <input v-model="form.name" placeholder="Имя" required class="input" />
        <input v-model="form.middlename" placeholder="Отчество" class="input" />
        <input v-model="form.birth_date" type="date" required class="input" />

        <h3 class="font-semibold mt-4">Паспортные данные</h3>
        <div>
          <input
              v-model="form.passport.passport_series"
              placeholder="Серия"
              required
              class="input"
              :class="{ 'invalid': form.passport.passport_series.length !== 4 }"
          />
          <p v-if="form.passport.passport_series.length !== 4" class="error">Серия должна содержать ровно 4 цифры</p>
        </div>
        <div>
          <input
              v-model="form.passport.passport_number"
              placeholder="Номер"
              required
              class="input"
              :class="{ 'invalid': form.passport.passport_number.length !== 6 }"
          />
          <p v-if="form.passport.passport_number.length !== 6" class="error">Номер должен содержать ровно 6 цифр</p>
        </div>
        <input v-model="form.passport.data_of_issue" type="date" placeholder="Дата выдачи" required class="input" />
        <input v-model="form.passport.unit_code" placeholder="Код подразделения" required class="input" />
        <input v-model="form.passport.issued_by_whom" placeholder="Кем выдано" required class="input" />

        <h3 class="font-semibold mt-4">Адрес</h3>
        <input v-model="form.address.regin" placeholder="Регион" required class="input" />
        <input v-model="form.address.localities" placeholder="Населённый пункт" required class="input" />
        <input v-model="form.address.street" placeholder="Улица" required class="input" />
        <input v-model="form.address.house" placeholder="Дом" required class="input" />
        <input v-model="form.address.building" placeholder="Корпус" class="input" />
        <input v-model="form.address.apartment" placeholder="Квартира" class="input" />
      </div>

      <button type="submit" class="btn btn-primary mt-4">Создать</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { createWorker } from '@/api/workersApi';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  surname: '',
  name: '',
  middlename: '',
  birth_date: '',
  passport: {
    passport_series: '',
    passport_number: '',
    data_of_issue: '',
    unit_code: '',
    issued_by_whom: ''
  },
  address: {
    regin: '',
    localities: '',
    street: '',
    house: '',
    building: '',
    apartment: ''
  }
});

const submit = async () => {
  if (
      form.passport.passport_series.length !== 4 ||
      form.passport.passport_number.length !== 6
  ) {
    alert('Проверьте корректность паспортных данных');
    return;
  }

  try {
    await createWorker(form);
    await router.push('/workers');
  } catch (error) {
    console.error('Ошибка при создании работника:', error);
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

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.input.invalid {
  border-color: red;
  background-color: #fff0f0;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 2px;
}

.btn {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

.btn-primary {
  background: #2b5179;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
