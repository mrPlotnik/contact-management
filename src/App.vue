<template>
  <div id="app">
    <div class="container">
      <h1 class="my-3">
        Contact Management
      </h1>
      <SearchBar @search="searchContacts" />
      <ContactForm
        :contact="currentContact"
        @save="saveContact"
      />

      <h2>Contacts</h2>
      <ContactList
        :contacts="filteredContacts"
        @delete="deleteContact"
        @edit="editContact"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Contact } from '@/types/types';
import SearchBar from './components/SearchBar.vue';
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';

// Получаем данные о контактах из localStorage
const storedContacts = localStorage.getItem('contacts');

// Парсим данные из localStorage в массив объектов типа Contact
const localStorageContacts: Contact[] = storedContacts
  ? JSON.parse(storedContacts) as Contact[]
  : []; // Если данных нет, используем пустой массив

// Создаем реактивный массив контактов на основе данных из localStorage
const contacts = reactive<Contact[]>(localStorageContacts);

// Создаем реактивный объект для хранения поискового запроса
const searchQuery = reactive({ query: '' });

// Создаем реактивное состояние для текущего редактируемого контакта
const currentContact = ref<Contact | null>(null);

// СОХРАНЕНИЕ КОНТАКТА

const saveContact = (contact: Contact) => {
  // Находим индекс контакта в массиве contacts
  const index = contacts.findIndex((c) => c.id === contact.id);

  // Если контакт существует (имеет id), заменяем его в массиве
  if (index !== -1) {
    contacts.splice(index, 1, { ...contact, editTime: Date.now() });
  } else {
    // Если контакт новый (не имеет id), добавляем его в конец массива с новым id
    const newContact: Contact = { ...contact, id: Date.now() };
    contacts.push(newContact);
  }

  // Сохраняем обновленные контакты в localStorage
  localStorage.setItem('contacts', JSON.stringify(contacts));

  // Очистить текущий редактируемый контакт после сохранения
  currentContact.value = null;
};

// УДАЛЕНИЕ КОНТАКТА

const deleteContact = (id: number) => {
  // Находим индекс контакта в массиве contacts, который имеет переданный идентификатор
  const index = contacts.findIndex((c) => c.id === id);

  // Если контакт найден
  if (index !== -1) {
    // Удаляем контакт из массива contacts
    contacts.splice(index, 1);

    // Обновляем данные в localStorage, сохраняя текущий список контактов
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
};

// РЕДАКТИРОВАНИЕ КОНТАКТА

const editContact = (editedContact: Contact) => {
  // Устанавливаем текущий редактируемый контакт
  currentContact.value = { ...editedContact };
};

// ПОИСК КОНТАКТА

const searchContacts = (query: string) => {
  searchQuery.query = query;
};

const filteredContacts = computed(() => {
  const lowercaseQuery = searchQuery.query.toLowerCase();
  return contacts.filter((contact) => contact.name.toLowerCase().includes(lowercaseQuery));
});
</script>
