

setInterval(changeJobTitle, 2000);


document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    const messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');


    setTimeout(function () {
        messageBox.classList.add('hidden');
    }, 3000);
});


var metinler = ["High School One", "Purpose Numerical Department"];
var indeks = 0;


function degistirMetin() {
    document.getElementById("edu").textContent = metinler[indeks];

    indeks = (indeks + 1) % metinler.length;
}


setInterval(degistirMetin, 2000);
var metinlerr = ["Other Language Reading 50%", "Other Language Writing 27%", "Other Language Speaking 15%"];
var indekss = 0;


function degistirMetin() {
    document.getElementById("lang").textContent = metinlerr[indekss];

    indekss = (indekss + 1) % metinlerr.length;
}


setInterval(degistirMetin, 2000);


const jobTitles = ["Bot Developer", "App Developer", "Web Developer", "Npm Developer"];
let currentIndex = 0;

// Metni değiştiren fonksiyon
function changeJobTitle() {
    const jobTitleElement = document.getElementById("jobTitle");
    jobTitleElement.textContent = jobTitles[currentIndex];
    currentIndex = (currentIndex + 1) % jobTitles.length;
}


setInterval(changeJobTitle, 2000);
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    const messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');

    setTimeout(function () {
        messageBox.classList.add('hidden');
    }, 3000);
});


var yeniMetinler = ["Css", "Js", "Node", "React", "Arduıno"];
var indeks = 0;


setInterval(function () {
    document.getElementById("tech").textContent = yeniMetinler[indeks];

    indeks = (indeks + 1) % yeniMetinler.length;
}, 2000);