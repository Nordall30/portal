document.addEventListener('DOMContentLoaded', () => {
    const guidanceOfficeLink = document.querySelector('.dropdown-content a[href="#"]');
    const guidanceOfficeSection = document.getElementById('guidance-office-section');

    guidanceOfficeLink.addEventListener('click', (event) => {
        event.preventDefault();
        guidanceOfficeSection.style.display = 'block';
    });
});
