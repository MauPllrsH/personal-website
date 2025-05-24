// Store current filter states
let currentFilters = {
    search: '',
    difficulty: 'all',
    os: 'all'
};

searchInput = document.getElementById('search-input');
filterButtons = document.querySelectorAll('.filter-btn');

function applyAllFilters() {
    const walkthroughs = document.querySelectorAll('.walkthrough-card');
    
    walkthroughs.forEach(card => {
        // Check if card passes ALL current filters
        const passesSearch = currentFilters.search === '' || 
                    card.getAttribute('data-machine').toLowerCase().includes(currentFilters.search) ||
                    card.getAttribute('data-techniques').toLowerCase().includes(currentFilters.search);
        const passesDifficulty = currentFilters.difficulty === 'all' || card.getAttribute('data-difficulty') === currentFilters.difficulty;
        const passesOS = currentFilters.os === 'all' || card.getAttribute('data-os') === currentFilters.os;
        
        // Only show if it passes ALL filters
        if (passesSearch && passesDifficulty && passesOS) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// When search changes, update the filter state and reapply
searchInput.addEventListener('input', function() {
    currentFilters.search = searchInput.value.toLowerCase().trim();
    applyAllFilters();
});

// When button clicked, update the filter state and reapply
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterType = button.getAttribute('data-filter');
        const filterValue = button.getAttribute('data-value');
        
        currentFilters[filterType] = filterValue;

        // Remove active class from all buttons in this group
        document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to clicked button
        button.classList.add('active');

        applyAllFilters();
    });
});
