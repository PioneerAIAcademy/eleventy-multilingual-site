// Main JavaScript file for the multilingual site

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Handle search form submission
    const searchForm = document.querySelector('form[role="search"]');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = e.target.querySelector('input[type="search"]').value;
            // Implement search functionality here
            console.log('Search query:', searchQuery);
            alert('Search functionality would be implemented here. Query: ' + searchQuery);
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Store language preference
    const languageLinks = document.querySelectorAll('.dropdown-menu a[href^="/en/"], .dropdown-menu a[href^="/es/"]');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const lang = this.getAttribute('href').split('/')[1];
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-secondary copy-code-btn';
        button.innerHTML = '<i class="bi bi-clipboard"></i>';
        button.style.position = 'absolute';
        button.style.top = '0.5rem';
        button.style.right = '0.5rem';
        
        block.style.position = 'relative';
        block.appendChild(button);
        
        button.addEventListener('click', function() {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="bi bi-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 2000);
            });
        });
    });
});