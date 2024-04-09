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

function isValidPassword(password) {
    let pwdLen = password.length >= 8
    const lowerCase = /[a-z]/.test(password)
    const upperCase = /[A-Z]/.test(password)
    const number = /\d/.test(password)
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!pwdLen) {
        alert("Password must be 8 characters long")
    }
    if (!lowerCase) {
        alert("Password must have at least 1 lowercase character.")
    }
    if (!upperCase) {
        alert("Password must have at least 1 uppercase character.")
    }
    if (!number) {
        alert("Password must have at least 1 number.")
    }
    if (!specialChar) {
        alert("Password must have at least 1 special character.")
    }

    return lowerCase && upperCase && number && specialChar && pwdLen
}

function doesUserExist(username) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    return !!users[username]
}

function register() {
    const username = document.getElementById('username').value;
    const na = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender-in').value;
    const dob = document.getElementById('dob').value;
    const pwd1 = document.getElementById('pwd1').value;
    const pwd2 = document.getElementById('pwd2').value;

    if (!username || !pwd1 || !pwd2 || !email || !na || !gender || !dob) {
        alert('Please fill in all the fields')
        return
    }

    if (pwd1 != pwd2) {
        alert("Passwords dont't match")
        return
    }

    if (!isValidPassword(pwd1)) {
        return
    }

    if (doesUserExist(username)) {
        alert('Username already exists');
    } else {
        let users = JSON.parse(localStorage.getItem('users')) || {}
        users[username] = {
            pwd: pwd1,
            gender: gender,
            dob: dob,
            emailID: email,
            na: na
        };
        localStorage.setItem('users', JSON.stringify(users))
        alert('Registration successful')
        window.location.href = 'login.html'
    }

}