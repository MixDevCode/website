/*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */
var darkSwitch = document.getElementById("darkSwitch");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("click", function () {
      resetTheme();
    });
  }
});
function initTheme() {
  var lightThemeSelected =
    localStorage.getItem("theme") !== null && localStorage.getItem("theme") === "light";
  darkSwitch.innerHTML = lightThemeSelected ? "<div class='bi bi-moon'></div>" : "<div class='bi bi-moon-fill'></div>";
  if(lightThemeSelected) document.body.removeAttribute("data-bs-theme");
}
function resetTheme() {
  if (localStorage.getItem("theme") !== null && localStorage.getItem("theme") === "light") {
    document.body.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkSwitch.innerHTML = "<div class='bi bi-moon-fill'></div>";
  } else {
    document.body.removeAttribute("data-bs-theme");
    localStorage.setItem("theme", "light");
    darkSwitch.innerHTML = "<div class='bi bi-moon'></div>";
  }
}
