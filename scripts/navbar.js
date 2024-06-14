const navButton = document.querySelector('.mobile-button');
const navbar = document.querySelector('.navbar');

navButton.addEventListener('click', (e) => {
    e.preventDefault();
    navbar.classList.toggle('active');
});
