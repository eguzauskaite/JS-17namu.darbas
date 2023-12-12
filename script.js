const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const addBtn = document.getElementById("add-btn")

// Pridedame event listener'į mygtukui
addBtn.addEventListener("click", function() {
    addTask()
})

inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask()
    }
})

listContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") {
        deleteTask(event.target.parentNode.parentNode)
    }
})

function addTask() {
    if (inputBox.value === '') {
        alert("Write something!")
    } else {
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        
        let span = document.createElement("span")
        
        let trashcan = document.createElement("img")
        trashcan.src = "icons8-full-trash-48.png"
        trashcan.alt = "Delete"
        
        trashcan.onclick = function() {
            deleteTask(li)
        }
        
        span.appendChild(trashcan)
        li.appendChild(span)
        listContainer.appendChild(li)

        // Išsaugojame į localStorage
        saveToLocalStorage();

        inputBox.value = "";

        console.log("Pridėta užduotis:", inputBox.value)
    }
}

function deleteTask(task) {
    task.remove()

    // Ištrinam iš localStorage
    removeFromLocalStorage()

    console.log("Ištrinta užduotis:", task.innerText)
}

function saveToLocalStorage() {
    let tasks = [];
    const taskElements = listContainer.getElementsByTagName("li")

    for (let i = 0; i < taskElements.length; i++) {
        tasks.push(taskElements[i].innerText)
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))

    console.log("Išsaugota į localStorage:", tasks)
}

function removeFromLocalStorage() {
    saveToLocalStorage()

    // Spausdiname console
    console.log("Ištrinta iš localStorage")
}

// Paleidžiame funkciją iš localStorage, jei  yra
function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks')

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks)

        for (let i = 0; i < tasks.length; i++) {
            let li = document.createElement("li")
            li.innerHTML = tasks[i]
            
            let span = document.createElement("span")
            
            let trashcan = document.createElement("img")
            trashcan.src = "icons8-full-trash-48.png"
            trashcan.alt = "Delete"
            
            trashcan.onclick = function() {
                deleteTask(li)
            }
            
            span.appendChild(trashcan)
            li.appendChild(span)
            listContainer.appendChild(li)
        }

        // Spausda į console
        console.log("Užduotys įkeltos iš localStorage:", tasks)
    }
}

// užkrovimas iš localStorage
loadFromLocalStorage()