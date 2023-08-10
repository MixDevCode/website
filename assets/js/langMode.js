/*!
 * Lang Switch
 * Copyright 2023 MixDev
 */
var lang = document.getElementById("lang");

window.addEventListener("load", function () {
    if (lang) {
      initLang();
      lang.addEventListener("click", function () {
        resetLang();
      });
    }
});

function initLang() {
    var langSelected =
        localStorage.getItem("lang") !== null &&
        localStorage.getItem("lang") === "es";
    lang.innerText = langSelected ? "ES" : "EN";
    
    fetch(langSelected ? "./assets/json/es.json" : "./assets/json/en.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("hello").innerText = data.hello;
        document.getElementById("resume").innerHTML = data.resume;
        document.getElementById("repos").innerText = data.repos;
    });
}
function resetLang() {
if (localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", "en");
    lang.innerText = "EN";
    
    fetch("./assets/json/en.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("hello").innerText = data.hello;
        document.getElementById("resume").innerHTML = data.resume;
        document.getElementById("repos").innerText = data.repos;
    });
} else {
    localStorage.removeItem("lang");
    lang.innerText = "ES";
    
    fetch("./assets/json/es.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("hello").innerText = data.hello;
        document.getElementById("resume").innerHTML = data.resume;
        document.getElementById("repos").innerText = data.repos;
    });
}
}