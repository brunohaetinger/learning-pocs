import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoListStore = defineStore('todoList', () => {
  const items = ref(["Wake up", "Clean car"]);

  function getItems() {
    return items.value;
  }

  function addItem(newItem) {
    if (newItem && newItem.trim() !== "") {
      items.value.push(newItem.trim());
    }
  }

  return { items, getItems, addItem };
});
