const page = document.querySelector("#page")
const dateLabel = document.querySelector(".date-wrapper > label")
const dateText = document.querySelector("#date-text")
const inputDate = document.querySelector("#date")
const form = document.querySelector("form")
const submitBtn = document.querySelector("button[type='submit']")

let dateValue;

// Calendar Elements
const calendar = document.querySelector(".calendar")
const monthYearDiv = document.querySelector("#month-year")
const datesDiv = document.querySelector("#dates")
const prevButton = document.querySelector("#prev-btn")
const nextButton = document.querySelector("#next-btn")

const dateChosen = inputDate.value


changeDateText(new Date())

dateLabel.onclick = (event) => {
    event.stopPropagation()
    calendar.classList.toggle("hidden")
}

page.onclick = (event) => {
    if (!calendar.classList.contains("hidden")){
        calendar.classList.add("hidden")
    }
} 

calendar.onclick = (event) => {
    event.stopPropagation()
    //Need to refactor this code
    const activeDate = document.querySelector(".active")
    try{ 
        
        if (event.target.classList.contains("date")){
            if (!event.target.classList.contains("inactive")){

                let dateSelected = new Date(new Date(currentDate.getFullYear(), currentDate.getMonth(),event.target.innerText))

                changeDateText(dateSelected)
                event.target.classList.add("active")
                activeDate.classList.remove("active")
                dateSelected = formatDate(dateSelected)
                console.log(dateSelected)
            }
            
        }
    }catch(error){
        console.log(error)
    }
}

inputDate.onclick = (event) =>{
    event.stopPropagation()
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
        const activeClass = date.toDateString() === new Date().toDateString() ? "active" : ""
        if (date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()){
            const inactive = date.getDate() < new Date().getDate() ? "inactive" : ""
            datesHTML += `<div class="date ${activeClass} ${inactive}">${i}</div>`
        } else{
            datesHTML += `<div class="date ${activeClass}">${i}</div>`
        }
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

// Form Script
form.onsubmit = (event) => {
    event.preventDefault()
    console.log(inputDate.value)
}

updateCalendar()