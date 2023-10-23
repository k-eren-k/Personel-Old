

window.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 768) {
        var infoRight = document.getElementById('info-right');
        if (infoRight) {
            infoRight.style.display = 'none';
        }
    }
});


document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    const messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');

    setTimeout(function () {
        messageBox.classList.add('hidden');
    }, 3000);
});