document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Dark Mode Logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
    } else {
        // Default to light theme if no preference is stored
        body.setAttribute('data-theme', 'light');
    }

    themeToggleButton.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Drag and Drop Logic ---
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.column');

    let draggedCard = null;

    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            draggedCard = card;
            setTimeout(() => {
                card.classList.add('dragging');
            }, 0); // Add 'dragging' class after a tiny delay to allow drag image to be captured
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', card.id); // Set data for Firefox compatibility
        });

        card.addEventListener('dragend', () => {
            draggedCard.classList.remove('dragging');
            draggedCard = null;
        });
    });

    columns.forEach(column => {
        const cardsContainer = column.querySelector('.cards');

        cardsContainer.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            const afterElement = getDragAfterElement(cardsContainer, e.clientY);
            const currentDraggingCard = document.querySelector('.card.dragging');

            if (currentDraggingCard && currentDraggingCard.parentNode !== cardsContainer) {
                column.classList.add('drag-over'); // Highlight column when a card is dragged over it
            }

            if (afterElement == null) {
                cardsContainer.appendChild(currentDraggingCard);
            } else {
                cardsContainer.insertBefore(currentDraggingCard, afterElement);
            }
        });

        cardsContainer.addEventListener('dragleave', () => {
            // Remove highlight if dragging leaves the column's card container
            columns.forEach(col => col.classList.remove('drag-over'));
        });

        cardsContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            columns.forEach(col => col.classList.remove('drag-over')); // Remove highlight on drop

            // The card is already moved in dragover, so just clean up
            // If you want to move only on drop, you'd move the append/insertBefore logic here
        });
    });

    function getDragAfterElement(container, y) {
        const draggableCards = [...container.querySelectorAll('.card:not(.dragging)')];

        return draggableCards.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: -Infinity }).element;
    }
});
