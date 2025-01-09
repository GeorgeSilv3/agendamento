const dateLabel = document.querySelector(".date-wrapper label")
const dateText = document.querySelector("#date-text")
const inputDate = document.querySelector("#date")

// Calendar Elements
const calendar = document.querySelector(".calendar")
const monthYearDiv = document.querySelector("#month-year")
const datesDiv = document.querySelector("#dates")
const prevButton = document.querySelector("#prev-btn")
const nextButton = document.querySelector("#next-btn")

const dateChosen = inputDate.value

changeDateText(new Date())

dateLabel.onclick = (event) => {
    calendar.classList.remove("hidden")
}

inputDate.onchange = (event) => {
    const dateChosen = new Date(event.target.value)
    changeDateText(dateChosen)
}

function formatDate(date) {
    return date.toLocaleString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    })
}

function changeDateText(newDate) {
    dateText.textContent = formatDate(newDate)
}


//calendar script

let currentDate = new Date()

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const totalDays = lastDay.getDate()
    const firstDayIndex = firstDay.getDay()
    const lastDayIndex = lastDay.getDay()

    const monthYearString = currentDate.toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
    })

    monthYearDiv.textContent = monthYearString

    let datesHTML = ""

    // Define the previous date (in inactive mode)
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1)
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`
    }

    //Set the current date with active class
    for (let i = 1; i < totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i)
        const activeClass =
            date.toDateString() === new Date().toDateString() ? "active" : ""

        datesHTML += `<div class="date ${activeClass}">${i}</div>`
    }

    // Define next dates (in inactive mode)
    for (let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i)
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`
    }

    datesDiv.innerHTML = datesHTML
}

prevButton.onclick = (event) => {
        if (currentDate.getMonth() !== new Date().getMonth()){   
        currentDate.setMonth(currentDate.getMonth() - 1)
        updateCalendar()
    }
}

nextButton.addEventListener("click", (event) => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    updateCalendar()
})

updateCalendar()
