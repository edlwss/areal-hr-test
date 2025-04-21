<template>
  <div class="container" v-if="worker">
    <h2 class="title-center">Информация о работнике</h2>

    <router-link :to="`/worker/${worker.WorkerID}/hr-operation/create`" class="btn btn-edit mt-4">
      Создать HR Операцию
    </router-link>
    <router-link :to="`/worker/${worker.WorkerID}/hr-history`" class="btn btn-edit mt-4">
      История HR
    </router-link>

    <Info :info="workerInfo" />

    <h3 class="section-title">Паспортные данные</h3>
    <Info :info="passportInfo" />

    <h3 class="section-title">Адрес</h3>
    <Info :info="addressInfo" />

    <router-link to="/workers" class="btn btn-edit mt-4">Назад</router-link>
    <EditButton :to="`/worker/${worker.WorkerID}/edit`" />

    <h3 class="section-title">Документы</h3>
    <ul v-if="documents.length">
      <li v-for="doc in documents" :key="doc.DocumentID" class="doc-item">
        {{ doc.name }}
        <a
          :href="`http://localhost:3010/api/document/download/${doc.file}`"
          target="_blank"
          class="btn btn-edit ml-2"
          >Скачать</a
        >
        <button @click="onDelete(doc.DocumentID)" class="btn btn-delete ml-2">✕</button>
      </li>
    </ul>
    <p v-else>Документов пока нет.</p>

    <form @submit.prevent="onUpload" class="upload-form">
      <input type="text" v-model="name" placeholder="Название документа" required />
      <input type="file" @change="onFileChange" required />
      <button type="submit" class="btn btn-edit mt-2">Загрузить</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getWorkerById } from '@/api/workersApi';
import { getDocumentsByWorkerId, deleteDocument, uploadDocument } from '@/api/documentApi';
import Info from '@/components/ui/info.vue';
import EditButton from '@/components/ui/linkButton.vue';

const route = useRoute();
const worker = ref(null);
const documents = ref([]);
const name = ref('');
const file = ref(null);

const workerInfo = ref({});
const passportInfo = ref({});
const addressInfo = ref({});

onMounted(async () => {
  const res = await getWorkerById(route.params.id);
  worker.value = res.data;
  workerInfo.value = {
    Фамилия: worker.value.surname,
    Имя: worker.value.name,
    Отчество: worker.value.middlename || '—',
    'Дата рождения': formatDate(worker.value.birth_date),
  };
  passportInfo.value = {
    'Серия и номер': `${worker.value.passport_series} ${worker.value.passport_number}`,
    'Дата выдачи': formatDate(worker.value.data_of_issue),
    'Код подразделения': worker.value.unit_code,
    'Кем выдан': worker.value.issued_by_whom,
  };
  addressInfo.value = {
    Регион: worker.value.regin,
    'Населённый пункт': worker.value.localities,
    Улица: worker.value.street,
    Дом: worker.value.house,
    Корпус: worker.value.building || '—',
    Квартира: worker.value.apartment || '—',
  };
  await loadDocuments();
});

const loadDocuments = async () => {
  const res = await getDocumentsByWorkerId(route.params.id);
  documents.value = res.data || [];
};

const onFileChange = (e) => {
  file.value = e.target.files[0];
};

const onUpload = async () => {
  if (!file.value || !name.value) return;
  const formData = new FormData();
  formData.append('worker_ID', route.params.id);
  formData.append('name', name.value);
  formData.append('file', file.value);
  try {
    await uploadDocument(formData);
    await loadDocuments();
    name.value = '';
    file.value = null;
  } catch (err) {
    console.error('Ошибка при загрузке документа:', err);
  }
};

const onDelete = async (id) => {
  if (confirm('Удалить документ?')) {
    try {
      await deleteDocument(id);
      await loadDocuments();
    } catch (err) {
      console.error('Ошибка при удалении документа:', err);
    }
  }
};

const formatDate = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU');
};
</script>

<style scoped>
.doc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}

.upload-form {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  margin-top: 20px;
  font-weight: bold;
  color: #2b5179;
}

p {
  margin: 6px 0;
}

.btn {
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

.btn-edit {
  background: #2b5179;
  color: white;
}

.btn-delete {
  background: #2b5179;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
