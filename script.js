const dateLabel = document.querySelector(".date-wrapper label")
const dateText = document.querySelector("#date-text")
const inputDate = document.querySelector("#date")

const dateChosen = inputDate.value

changeDateText(new Date())

dateLabel.onclick = (event) => {
    inputDate.showPicker()
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

function changeDateText(newDate){
    dateText.textContent = formatDate(newDate)
}