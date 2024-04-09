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

function login() {
    const userName = document.getElementById('username').value
    const pwd = document.getElementById('pwd').value

    let users = JSON.parse(localStorage.getItem('users')) || {}
    let user = users[userName]

    if (!user || user.pwd !== pwd) {
        alert('Invalid login credentials')
    } else {
        localStorage.setItem('currentUser', userName)
        alert('Login Successful')
        window.location.href = 'dashboard.html'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', login)
})