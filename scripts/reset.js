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

document.querySelector('form#reset-passwd').addEventListener('submit', function (event) {
    event.preventDefault()

    const pwd1 = document.getElementById('newPWD').value
    const pwd2 = document.getElementById('newPWDC').value

    if (pwd1 != pwd2) {
        alert("Passwords dont't match")
        return
    }

    if (!isValidPassword(pwd1)) {
        return
    }

    const currUser = localStorage.getItem('currentUser')
    const users = JSON.parse(localStorage.getItem('users')) || {}

    if (users[currUser]) {
        users[currUser].pwd = pwd1
        localStorage.setItem('users', JSON.stringify(users))
        alert('Password changed successfully!!')
        window.location.href = 'dashboard.html'
    }
})