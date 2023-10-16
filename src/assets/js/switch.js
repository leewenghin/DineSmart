const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toogle = body.querySelector(".toogle"),
    searchBtn = body.querySelector(".searchBtn"),
    modeSwitch = body.querySelector(".toogle-switch"),
    modeText = body.querySelector(".mode-text")

toogle.addEventListener("click", () => {
    sidebar.classList.toogle("close")
})

modeSwitch.addEventListener("click", () => {
    body.classList.toogle("dark");
})