<template>
  <div class="search-bar">
    <input
      id="search"
      v-model.trim="searchQuery.value"
      type="text"
      class="form-control"
      placeholder="Search by name..."
      aria-label="Search by name"
      aria-describedby="basic-addon2"
      @input="liveSearch"
    >
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits } from 'vue';

const emit = defineEmits(['search']);

const searchQuery = reactive({
  value: '',
});

const liveSearch = () => {
  emit('search', searchQuery.value);
};
</script>

<style scoped lang="scss">
.search-bar {
  margin-bottom: 1em;
}
</style>
