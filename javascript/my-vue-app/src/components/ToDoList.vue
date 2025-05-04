<script setup>
import { ref } from 'vue';
import { useTodoListStore } from '../stores/todoList';

const todoListStore = useTodoListStore();
const newItem = ref("");

function addItem() {
  if (newItem.value.trim() !== "") {
    todoListStore.addItem(newItem.value.trim());
    newItem.value = "";
  }
}
</script>

<template>
  <h1>To Do List</h1>
    <input v-model="newItem"/>
    <button @click="addItem">Add item</button>

    <ul>
      <li v-for="(todo, index) in todoListStore.getItems()" :key="index">{{ todo }}</li>
    </ul>

</template>

<style scoped>
.list {
  color: #888;
}
</style>
