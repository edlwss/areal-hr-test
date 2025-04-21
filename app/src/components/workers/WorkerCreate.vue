<template>
  <div class="container">
    <h2 class="text-xl font-bold mb-4">Создание работника</h2>
    <form @submit.prevent="submit">
      <div class="grid gap-4">
        <input v-model="form.surname" placeholder="Фамилия" required class="input" />
        <!--        <p class="error" v-if="errors.surname">{{ errors.surname }}</p>-->

        <input v-model="form.name" placeholder="Имя" required class="input" />
        <!--        <p class="error" v-if="errors.name">{{ errors.name }}</p>-->

        <input v-model="form.middlename" placeholder="Отчество" class="input" />
        <!--        <p class="error" v-if="errors.middlename">{{ errors.middlename }}</p>-->

        <input v-model="form.birth_date" type="date" required class="input" />
        <!--        <p class="error" v-if="errors.birth_date">{{ errors.birth_date }}</p>-->

        <h3 class="font-semibold mt-4">Паспортные данные</h3>
        <div>
          <input
            v-model="form.passport.passport_series"
            placeholder="Серия"
            required
            class="input"
          />
          <p class="error" v-if="errors['passport.passport_series']">
            {{ errors['passport.passport_series'] }}
          </p>
        </div>
        <div>
          <input
            v-model="form.passport.passport_number"
            placeholder="Номер"
            required
            class="input"
          />
          <p class="error" v-if="errors['passport.passport_number']">
            {{ errors['passport.passport_number'] }}
          </p>
        </div>
        <input
          v-model="form.passport.data_of_issue"
          type="date"
          placeholder="Дата выдачи"
          required
          class="input"
        />
        <p class="error" v-if="errors['passport.data_of_issue']">
          {{ errors['passport.data_of_issue'] }}
        </p>

        <input
          v-model="form.passport.unit_code"
          placeholder="Код подразделения"
          required
          class="input"
        />
        <p class="error" v-if="errors['passport.unit_code']">{{ errors['passport.unit_code'] }}</p>

        <input
          v-model="form.passport.issued_by_whom"
          placeholder="Кем выдано"
          required
          class="input"
        />
        <p class="error" v-if="errors['passport.issued_by_whom']">
          {{ errors['passport.issued_by_whom'] }}
        </p>

        <h3 class="font-semibold mt-4">Адрес</h3>
        <input v-model="form.address.regin" placeholder="Регион" required class="input" />
        <p class="error" v-if="errors['address.regin']">{{ errors['address.regin'] }}</p>

        <input
          v-model="form.address.localities"
          placeholder="Населённый пункт"
          required
          class="input"
        />
        <p class="error" v-if="errors['address.localities']">{{ errors['address.localities'] }}</p>

        <input v-model="form.address.street" placeholder="Улица" required class="input" />
        <p class="error" v-if="errors['address.street']">{{ errors['address.street'] }}</p>

        <input v-model="form.address.house" placeholder="Дом" required class="input" />
        <p class="error" v-if="errors['address.house']">{{ errors['address.house'] }}</p>

        <input v-model="form.address.building" placeholder="Корпус" class="input" />
        <p class="error" v-if="errors['address.building']">{{ errors['address.building'] }}</p>

        <input v-model="form.address.apartment" placeholder="Квартира" class="input" />
        <p class="error" v-if="errors['address.apartment']">{{ errors['address.apartment'] }}</p>
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
    issued_by_whom: '',
  },
  address: {
    regin: '',
    localities: '',
    street: '',
    house: '',
    building: '',
    apartment: '',
  },
});

const errors = reactive({});

const submit = async () => {
  Object.keys(errors).forEach((key) => delete errors[key]); // очистка ошибок

  try {
    await createWorker(form);
    await router.push('/workers');
  } catch (error) {
    console.error('Ошибка при создании работника:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      const flatErrors = flattenErrors(error.response.data.errors);
      Object.assign(errors, flatErrors);
    } else {
      alert('Произошла ошибка при создании работника');
    }
  }
  function flattenErrors(obj, prefix = '') {
    const res = {};
    for (const key in obj) {
      const value = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(res, flattenErrors(value, path));
      } else {
        res[path] = value;
      }
    }
    return res;
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
  margin-bottom: 2px;
}

.error {
  color: red;
  font-size: 12px;
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
