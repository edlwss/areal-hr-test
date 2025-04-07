<template>
  <div class="container" v-if="worker">
    <h2 class="text-xl font-bold mb-4">Информация о работнике</h2>

    <router-link :to="`/worker/${worker.WorkerID}/hr-operation/create`" class="btn btn-edit mt-4">
      Создать HR Операцию
    </router-link>

    <p><strong>Фамилия:</strong> {{ worker.surname }}</p>
    <p><strong>Имя:</strong> {{ worker.name }}</p>
    <p><strong>Отчество:</strong> {{ worker.middlename || '-' }}</p>
    <p><strong>Дата рождения:</strong> {{ formatDate(worker.birth_date) }}</p>

    <h3 class="section-title">Паспортные данные</h3>
    <p><strong>Серия и номер:</strong> {{ worker.passport_series }} {{ worker.passport_number }}</p>
    <p><strong>Дата выдачи:</strong> {{ formatDate(worker.data_of_issue) }}</p>
    <p><strong>Код подразделения:</strong> {{ worker.unit_code }}</p>
    <p><strong>Кем выдан:</strong> {{ worker.issued_by_whom }}</p>

    <h3 class="section-title">Адрес</h3>
    <p><strong>Регион:</strong> {{ worker.regin }}</p>
    <p><strong>Населённый пункт:</strong> {{ worker.localities }}</p>
    <p><strong>Улица:</strong> {{ worker.street }}</p>
    <p><strong>Дом:</strong> {{ worker.house }}</p>
    <p><strong>Корпус:</strong> {{ worker.building || '-' }}</p>
    <p><strong>Квартира:</strong> {{ worker.apartment || '-' }}</p>

    <router-link to="/workers" class="btn btn-edit mt-4">Назад</router-link>
    <router-link :to="`/worker/${worker.WorkerID}/edit`" class="btn btn-edit mt-4">Изменить</router-link>

    <h3 class="section-title">Документы</h3>
    <ul v-if="documents.length">
      <li v-for="doc in documents" :key="doc.DocumentID" class="doc-item">
        {{ doc.name }}
        <a :href="`http://localhost:3010/api/document/download/${doc.file}`" target="_blank" class="btn btn-edit ml-2">Скачать</a>
        <button @click="onDelete(doc.DocumentID)" class="btn btn-delete ml-2">✕</button>
      </li>
    </ul>
    <p v-else>Документов пока нет.</p>

    <form @submit.prevent="onUpload" class="upload-form">
      <input type="text" v-model="newDocName" placeholder="Название документа" required />
      <input type="file" @change="onFileChange" required />
      <button type="submit" class="btn btn-edit mt-2">Загрузить</button>
    </form>
  </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute} from 'vue-router';
    import {getWorkerById} from '@/api/workersApi';
    import {getDocumentsByWorkerId, deleteDocument, uploadDocument} from '@/api/documentApi';

    const route = useRoute();
    const worker = ref(null);
    const documents = ref([]);
    const newDocName = ref('');
    const file = ref(null);

    onMounted(async () => {
      const res = await getWorkerById(route.params.id);
      worker.value = res.data;
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
      if (!file.value || !newDocName.value) return;
      const formData = new FormData();
      formData.append('worker_ID', route.params.id);
      formData.append('name', newDocName.value);
      formData.append('file', file.value);
      try {
        await uploadDocument(formData);
        await loadDocuments();
        newDocName.value = '';
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
      if (!isoString) return '-';
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
