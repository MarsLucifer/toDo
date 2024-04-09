document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.ham-menu')
    const navMenu = document.querySelector('.nav-menu')

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active')
        navMenu.classList.toggle('active')
    })

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    }))
})