document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'testimonial-card'
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    // Loop through each card and add a click event listener
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the URL from the data-url attribute
            const url = this.getAttribute('data-url');
            
            if (url) {
                // Open the URL in a new browser tab
                window.open(url, '_blank');
            }
        });
    });
});