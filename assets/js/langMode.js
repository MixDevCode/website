/*!
 * Lang Switch
 * Copyright 2023 MixDev
 */

// Elementos HTML
const lang = document.getElementById("lang");
const elements = ["repos", "projects", "fire", "generateText", "generateBtn", "insta", "instaText", "instaBtn"];

// Elementos TypeIt
let resumeData;

let presentation = new TypeIt("#hello", {
    lifeLike: true, 
    speed: 25
});

// Evento de carga de la ventana
window.addEventListener("load", function () {
    if (lang) {
        initLang();
        lang.addEventListener("click", resetLang);
    }
});

// Inicialización del idioma
function initLang() {
    const langSelected = localStorage.getItem("lang") !== null && localStorage.getItem("lang") === "es";
    lang.innerText = langSelected ? "ES" : "EN";
    
    fetch(langSelected ? "./assets/json/es.json" : "./assets/json/en.json")
    .then(response => response.json())
    .then(data => {
        elements.forEach(element => {
            var elementObj = document.getElementById(element);
            if (elementObj) {
                elementObj.innerHTML = data[element];
            }
        });
        new TypeIt('#node', {
            speed: 25,
            afterComplete: function (instance) {
                instance.destroy();
                presentation.type(data["hello"]).break().break().type(data["resume"]).break().break().type(data["social"]).break().break().type("C:\\Users\\MixDev&gt;&nbsp;").go();
            }
        }).type("node hello.js").go();
    });
}

// Restablecer el idioma
function resetLang() {
    let langToSet = localStorage.getItem("lang") !== null && localStorage.getItem("lang") === "en" ? "es" : "en";
    lang.innerText = langToSet == "en" ? "EN" : "ES";

    fetch(langToSet == "en" ? "./assets/json/en.json" : "./assets/json/es.json")
    .then(response => response.json())
    .then(data => {
        elements.forEach(element => {
            var elementObj = document.getElementById(element);
            if (elementObj) {
                elementObj.innerHTML = data[element];
            }
        });
        presentation.reset();
        presentation = new TypeIt("#hello", {
            lifeLike: true, 
            speed: 25
        }).type(data["hello"]).break().break().type(data["resume"]).break().break().type(data["social"]).break().break().type("C:\\Users\\MixDev&gt;&nbsp;").go();
    });

    localStorage.setItem("lang", langToSet);
}