let draggedItem = null;

// Make all cards draggable
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
        draggedItem = card;
        // Use setTimeout to ensure the class is added after the browser takes a snapshot for dragging
        setTimeout(() => {
            card.classList.add('dragging');
        }, 0);
        // Set data to be transferred (e.g., card ID)
        e.dataTransfer.setData('text/plain', card.id);
        e.dataTransfer.effectAllowed = 'move'; // Visual feedback for allowed operation
    });

    card.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }
    });
});

// Make all columns drop targets
document.querySelectorAll('.column').forEach(column => {
    const cardsContainer = column.querySelector('.cards');

    column.addEventListener('dragover', (e) => {
        e.preventDefault(); // Crucial: Allows dropping by preventing default browser behavior
        column.classList.add('drag-over'); // Visual feedback for the column

        if (draggedItem) {
            const afterElement = getDragAfterElement(cardsContainer, e.clientY);
            const currentDraggingParent = draggedItem.parentNode;

            // Only append/insert if the dragged item is not already in the correct position
            // and if it's not being dragged over its own current position
            if (afterElement == null) {
                // If no element is found after the mouse, append to the end
                if (cardsContainer.lastElementChild !== draggedItem) {
                    cardsContainer.appendChild(draggedItem);
                }
            } else {
                // Insert before the determined element
                if (afterElement.previousElementSibling !== draggedItem) {
                    cardsContainer.insertBefore(draggedItem, afterElement);
                }
            }
        }
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('drag-over');
        // The card's position is already updated in dragover for real-time feedback.
        // This `drop` event can be used for final state updates (e.g., sending to a server).
        // For this pure JS example, the DOM is already manipulated.
    });
});

/**
 * Determines which element the dragged item should be placed after.
 * This is key for reordering within a column.
 * @param {HTMLElement} container The parent container (e.g., .cards div)
 * @param {number} y The vertical position of the mouse pointer
 * @returns {HTMLElement|null} The element to insert the dragged item before, or null if it should be appended.
 */
function getDragAfterElement(container, y) {
    // Get all draggable elements within the container that are NOT the currently dragging item
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // Calculate the offset from the center of the child element
        const offset = y - box.top - box.height / 2;

        // If the offset is negative (mouse is above the center of the child)
        // and it's closer to 0 than the current closest offset, this is our new closest.
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: -Infinity, element: null }).element; // Initialize with -Infinity to find the closest negative offset
}
