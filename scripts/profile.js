function loadProfile() {
    const currUser = localStorage.getItem('currentUser')
    const users = JSON.parse(localStorage.getItem('users')) || {}
    const user = users[currUser]

    if (user) {
        document.getElementById('userName-input').value = currUser
        document.getElementById('Name-input').value = user.na
        document.getElementById('Gender-input').value = user.gender
        document.getElementById("dob-input").value = user.dob
        document.getElementById('Email-input').value = user.emailID
    }
}

document.querySelector('form.profile').addEventListener('submit', function (event) {
    event.preventDefault()

    const username = document.getElementById('userName-input').value
    const name = document.getElementById('Name-input').value
    const gender = document.getElementById('Gender-input').value
    const dob = document.getElementById("dob-input").value
    const email = document.getElementById('Email-input').value

    const users = JSON.parse(localStorage.getItem('users')) || {}
    if (users[username]) {
        users[username] = {
            ...users[username],
            na: name,
            gender: gender,
            dob: dob,
            emailID: email
        }
        localStorage.setItem('users', JSON.stringify(users))
        alert('Profile Updated successfully')
    }
})

document.addEventListener('click', function (e) {
    if (e.target && e.target.className.includes('logout')) {
        e.preventDefault()
        localStorage.removeItem('currentUser')
        localStorage.removeItem('userTasks')
        alert('User logged out')
        window.location.href = 'index.html'
    }
})

document.addEventListener('DOMContentLoaded', () => {
    loadProfile()
})