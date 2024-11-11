const navButton = document.querySelector('.mobile-button');
const navbar = document.querySelector('.navbar');
const navLinks = navbar.querySelectorAll('a');

navButton.addEventListener('click', (e) => {
    e.preventDefault();
    navbar.classList.toggle('active');
});

navLinks.forEach((navLink) =>
    navLink.addEventListener('click', (e) => {
        if (window.innerWidth < 1000 && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    })
);
