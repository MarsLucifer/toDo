async function weather() {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
    const apiKey = '1d534f012371e137651f74a277b7c985'
    const city = 'Ahmedabad'
    const weatherIcon = document.querySelector('.weather-icon')

    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`)

    var data = await response.json()

    document.querySelector('.TEMP').innerHTML = Math.round(data.main.temp) + `${'°C'}`
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + ` km/h`

    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'assets/clouds.png';
    } else if (data.weather[0].main == 'Scattered Clouds') {
        weatherIcon.src = 'assets/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'assets/clear.png';
    } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'assets/drizzle.png';
    } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'assets/drizzle.png';
    } else if (data.weather[0].main == 'Snow') {
        weatherIcon.src = 'assets/snow.png';
    } else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = 'assets/snow.png';
    }

}

const curTime = setInterval(() => {
    const date = new Date()
    let hour = date.getHours()
    hour = hour > 12 ? hour - 12 : hour
    const mins = date.getMinutes().toString().padStart(2, '0')
    const secs = date.getSeconds().toString().padStart(2, '0')
    document.querySelector('.time').innerText = `${hour}:${mins}:${secs}`
}, 1000)

async function gifs() {
    const apiKey = 'EUGkTyL4mJG1ZM0cm9sHGEjH2Kev2R37'
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            alert('API endpoint broken')
        }
        const data = await response.json()
        console.log(data)
        const gifURL = data.data.images.original.url

        const gifContainer = document.querySelector('.gif')
        gifContainer.innerHTML = `<img src="${gifURL}" alt="GIFS" />`
    } catch (error) {
        alert(`Error finding the GIFS ${error}`)
    }
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.className == 'removeTask') {
        let removeTaskBtn = e.target
        if (removeTaskBtn) {
            e.preventDefault()
            let removeIndex = e.target.getAttribute('data-key')
            let taskList = JSON.parse(localStorage.getItem('userTasks'))
            let removeTaskList = taskList.splice(removeIndex, 1)

            localStorage.setItem('userTasks', JSON.stringify(taskList))
            renderListData()
        }
    } else if (e.target && e.target.className === 'editTask') {
        e.preventDefault()
        const taskIndex = e.target.getAttribute('data-key')
        loadTaskForEditing(taskIndex)
    }
})

function loadTaskForEditing(index) {
    const tasks = JSON.parse(localStorage.getItem('userTasks')) || [];
    if (tasks[index]) {
        const task = tasks[index];
        const taskNameInput = document.querySelector('#name-inputs');
        const taskDesInput = document.querySelector('#des-inputs');
        taskNameInput.value = task.taskName;
        taskDesInput.value = task.taskDescription;

        localStorage.setItem('editingIndex', index);
    }
}

document.querySelector('form#task-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const editingIndex = localStorage.getItem('editingIndex')
    let tasklist = JSON.parse(localStorage.getItem('userTasks')) || []
    let taskName = document.querySelector('#name-inputs')
    let taskDes = document.querySelector('#des-inputs')

    if (editingIndex !== null) {
        tasklist[editingIndex] = {
            'taskName': taskName.value,
            'taskDescription': taskDes.value
        }
        localStorage.removeItem('editingIndex')
    } else {
        let newTask = {
            'taskName': taskName.value,
            'taskDescription': taskDes.value
        }
        tasklist.push(newTask)
    }

    localStorage.setItem('userTasks', JSON.stringify(tasklist))
    taskName.value = ""
    taskDes.value = ""
    renderListData()
})

function renderListData() {
    const tasks = JSON.parse(localStorage.getItem('userTasks'))
    let taskList = ''

    const taskULEL = document.querySelector('#taskList')
    taskULEL.innerHTML = ''
    tasks.forEach(function (task, index) {
        taskULEL.innerHTML += '<li data-key="' + index + '"><h2> Task Name: ' + task.taskName +
            '</h2>Task Description: <p>' + task.taskDescription + '</p> <a class="editTask" href="#" data-key="' +
            index + '">Edit</a> <p></p><a class="removeTask" href="#" data-key="' +
            index + '">Remove</a> </li>'
    })
}

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

    weather()
    gifs()
    setInterval(gifs, 120000)
    renderListData()

})