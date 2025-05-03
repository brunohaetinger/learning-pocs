<script setup>

const todos = ["Wake up", "Clean car"]
</script>

<template>
  <h1>To Do List</h1>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
    </ul>
</template>

<style scoped>
.list {
  color: #888;
}
</style>
