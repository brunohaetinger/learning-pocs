<script setup>
import { ref } from 'vue';

// Reactive data for columns and cards
const columns = ref([
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'card-1', title: 'Finish project proposal', description: 'Prepare the document for the new project.' },
      { id: 'card-2', title: 'Review code for feature X', description: 'Check pull requests for feature X.' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      { id: 'card-3', title: 'Implement user authentication', description: 'Develop login and registration modules.' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'card-4', title: 'Set up development environment', description: 'Install all necessary tools and dependencies.' },
    ],
  },
]);

// State to keep track of the dragged card and its source column
let draggedCardId = ref(null);
let draggedSourceColumnId = ref(null);

// Event handler for when a drag operation starts on a card
const onDragStart = (event, card, column) => {
  draggedCardId.value = card.id;
  draggedSourceColumnId.value = column.id;
  event.dataTransfer.setData('cardId', card.id);
  event.dataTransfer.setData('sourceColumnId', column.id);
  // Add a class for visual feedback, using setTimeout to ensure it applies after drag image is created
  setTimeout(() => {
    event.target.classList.add('dragging');
  }, 0);
};

// Event handler for when a drag operation ends on a card
const onDragEnd = (event) => {
  event.target.classList.remove('dragging');
  draggedCardId.value = null;
  draggedSourceColumnId.value = null;
};

// Event handler for when a dragged item is moved over a column's cards container
const onDragOver = (event, targetColumn) => {
  event.preventDefault(); // Crucial: Allows dropping by preventing default browser behavior
  // Add drag-over class to the column's cards container for visual feedback
  const cardsContainer = event.currentTarget.querySelector('.cards');
  if (cardsContainer) {
    cardsContainer.classList.add('drag-over');
  }
};

// Event handler for when a dragged item leaves a column's cards container
const onDragLeave = (event, targetColumn) => {
  // Remove drag-over class from the column's cards container
  const cardsContainer = event.currentTarget.querySelector('.cards');
  if (cardsContainer) {
    cardsContainer.classList.remove('drag-over');
  }
};

// Event handler for when a dragged item is dropped on a column's cards container
const onDrop = (event, targetColumn) => {
  event.preventDefault();
  // Remove drag-over class from the column's cards container
  const cardsContainer = event.currentTarget.querySelector('.cards');
  if (cardsContainer) {
    cardsContainer.classList.remove('drag-over');
  }

  const cardId = event.dataTransfer.getData('cardId');
  const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

  if (!cardId || !sourceColumnId) return; // Exit if no valid data

  const sourceColumn = columns.value.find(col => col.id === sourceColumnId);
  const targetColumnObj = columns.value.find(col => col.id === targetColumn.id);

  if (!sourceColumn || !targetColumnObj) return; // Exit if columns not found

  // Find and remove the dragged card from its source column
  const draggedCardIndex = sourceColumn.cards.findIndex(card => card.id === cardId);
  if (draggedCardIndex === -1) return; // Exit if card not found in source

  const draggedCard = sourceColumn.cards.splice(draggedCardIndex, 1)[0];

  // Determine the new index within the target column where the card should be inserted
  // This uses a helper function that queries the DOM to find the closest element
  const afterElement = getDragAfterElement(cardsContainer, event.clientY);
  const newIndex = afterElement ? Array.from(cardsContainer.children).indexOf(afterElement) : targetColumnObj.cards.length;

  // Insert the card into the target column's cards array at the determined index
  targetColumnObj.cards.splice(newIndex, 0, draggedCard);
};

// Helper function to determine where to drop the card for reordering within a column
// This function directly queries the DOM to get element positions.
const getDragAfterElement = (container, y) => {
  // Get all draggable elements within the container that are NOT currently being dragged
  const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    // Calculate the vertical center of the child element
    const offset = y - box.top - box.height / 2;

    // If the cursor is above the center of the child element and it's closer than the current closest
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: -Infinity }).element; // Initialize with -Infinity to find the smallest negative offset
};
</script>

<template>
  <!-- The main board container -->
  <div class="board">
    <!-- Loop through each column in the columns data -->
    <div
      v-for="column in columns"
      :key="column.id"
      class="column"
      @dragover="onDragOver($event, column)"
      @dragleave="onDragLeave($event, column)"
      @drop="onDrop($event, column)"
    >
      <h2>{{ column.title }}</h2>
      <div class="cards">
        <!-- Loop through each card within the current column -->
        <div
          v-for="card in column.cards"
          :key="card.id"
          class="card"
          draggable="true"
          :class="{ 'dragging': card.id === draggedCardId }"
          @dragstart="onDragStart($event, card, column)"
          @dragend="onDragEnd($event)"
        >
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  These styles are specific to App.vue's layout.
  The main Trello-like dashboard styles are expected to be in style.css.
*/
.board {
    justify-content: center; /* Center the board horizontally within #app */
    width: 100%; /* Ensure it takes full width of its container */
}
</style>
