// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
let portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Get updated list of portfolio items (in case new ones were added)
        portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio Modal
const modal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');

// Function to initialize portfolio item events
function initializePortfolioItemEvents() {
    // Get updated list of portfolio items
    const items = document.querySelectorAll('.portfolio-item');
    
    // Open modal when clicking on portfolio item
    items.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const category = item.querySelector('p').textContent;
            
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            
            modal.classList.add('active');
        });
    });
}

// Initialize events for existing portfolio items
initializePortfolioItemEvents();

// Close modal when clicking close button
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside the content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'white';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent. I will get back to you soon.');
        contactForm.reset();
    });
}

// Function to load portfolio items from JSON
function loadPortfolioItems(jsonUrl) {
    // Fetch the JSON file
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the portfolio grid container
            const portfolioGrid = document.querySelector('.portfolio-grid');
            
            // Create and append new portfolio items
            data.forEach(item => {
                // Create portfolio item
                const portfolioItem = createPortfolioItem(item);
                
                // Add to grid
                portfolioGrid.appendChild(portfolioItem);
            });
            
            // Reinitialize click events for new items
            initializePortfolioItemEvents();
        })
        .catch(error => {
            console.error('Error loading portfolio items:', error);
        });
}

// Helper function to create a portfolio item element
function createPortfolioItem(item) {
    // Create portfolio item div
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.setAttribute('data-category', item.category);
    
    // Create image
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    
    // Create info div
    const infoDiv = document.createElement('div');
    infoDiv.className = 'portfolio-info';
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = item.title;
    
    // Create description
    const description = document.createElement('p');
    description.textContent = item.description;
    
    // Assemble the elements
    infoDiv.appendChild(title);
    infoDiv.appendChild(description);
    
    portfolioItem.appendChild(img);
    portfolioItem.appendChild(infoDiv);
    
    return portfolioItem;
}

// Call the function to load additional portfolio items when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load portfolio items from JSON
    loadPortfolioItems('data/portfolio-data.json');

});