

function toggleMobileMenu() {
    var menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('open');

    var icon = document.getElementById('menu-icon');
    if (menu.classList.contains('open')) {
        icon.classList.remove('fa-bars-sort');
        icon.classList.add('fa-bars-sort');
    } else {
        icon.classList.remove('fa-bars-sort');
        icon.classList.add('fa-bars');
    }
}


function openModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = 'block';
}


function closeModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}


var image = document.querySelector('.navbar img');
image.addEventListener('click', openModal);


function openModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = 'block';
}


function closeModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

