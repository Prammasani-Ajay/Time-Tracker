//Selection Elements Using DOM...
localStorage.clear()
const totalTimeDisplay = document.querySelector('span')
const addTask = document.querySelector(".addButton")
const popup = document.querySelector(".taskDiv")
const inputTaskName = document.querySelector("#inputTaskName")
const taskSavebutton = document.querySelector(".taskSave")
const instructions = document.querySelector(".instructions")

const listOfTasks = document.querySelector("#listOfCards")

const dialog = document.querySelector("dialog")

//Variable Belongs To the Save button of a Dialog Box.
let addTaskSave = 0;
let totalTimeSec = 0;
let totalTimeMin = 0;
let totalTimeHr = 0;

function creatingContent(tittleOfTask) {
    let identyt = tittleOfTask;
    const card = document.createElement("section")
    card.setAttribute('class', 'contentCard')
    listOfTasks.appendChild(card)

    const contentRow1 = document.createElement('section');
    contentRow1.setAttribute('class', 'card1Row1')
    card.appendChild(contentRow1)

    //Task Tittle 
    const taskTittle = document.createElement('h2')
    taskTittle.innerHTML = tittleOfTask
    contentRow1.appendChild(taskTittle)

    //Creating Timmer 
    const displayingTimmer = document.createElement("div")
    displayingTimmer.setAttribute("class", "timeDisplay")
    displayingTimmer.innerHTML = "00 : 00 : 00"
    contentRow1.appendChild(displayingTimmer)

    //Start & Stop Buttons 
    startButton = document.createElement('button')
    startButton.setAttribute('class', 'startButton')
    startButton.innerHTML = 'Start'
    contentRow1.appendChild(startButton)

    closeButton = document.createElement('button')
    closeButton.innerHTML = 'X'
    closeButton.setAttribute('class', 'closeButton')
    contentRow1.appendChild(closeButton)

    //History Of the Data 
    const contentRow2 = document.createElement('section');
    contentRow2.setAttribute('class', 'card1Row2')
    card.appendChild(contentRow2)

    const history = document.createElement("h4");
    history.innerHTML = "History"
    contentRow2.appendChild(history)

    //para Tag For Storing Data;
    const activeTextData = document.createElement('p');
    // activeTextData.setAttribute('class', 'savingTimes')
    activeTextData.innerHTML = 'No History Found, Click on the start button to track the timer'
    contentRow2.appendChild(activeTextData)

    //Creating History Data Tag.
    const saveTextData = document.createElement('p')
    contentRow2.appendChild(saveTextData)

    ////Ends the Function of Content Creation.

    let startButtonWorking = document.getElementsByClassName('startButton')
    let deletingContent = document.getElementsByClassName('closeButton')
    let cardOfContent = document.getElementsByClassName('contentCard')
    let saveTextDataClass = document.getElementsByClassName('.saveTextData')

    //Calling Multiple Classes with respective count of saved task Name.
    for (let i = 0; i < addTaskSave; i++) {
        startButtonWorking = document.getElementsByClassName('startButton')[i]
        deletingContent = document.getElementsByClassName('closeButton')[i]
        cardOfContent = document.getElementsByClassName('contentCard')[i]
    }

    //These Below Variables Will resets the value For each Exicution of a Function.

    //endClick belongs to Stopping Timmer; For each individual clicks it will increse
    //(Every New Button value sets initially Zero)//
    
    let endClick = 0;
    let starterBotton;
    let startingTimmer;
    let stoppingTimmer;
    let holdTotalTime;
    
    //Constructor Fuction For storing data in Local storage
    //with Restive Key(Task Name as a key Val) and Data.
    function StoringData(task_Name, data, endClick, str) {
        this.key = task_Name;
        this.data = data;
        this.endClick = endClick;
        this.str = str;
        // this.task_Name = task_Name;
    }
    StoringData.prototype.insertingLocal = function () {
        localStorage.setItem(`${this.key + endClick}`, `${this.data}`)
    }
    StoringData.prototype.displayingLocal = function () {
        for (let i = 1; i <= this.endClick; i++) {
            this.str += `<p> ${localStorage.getItem(`${this.key + i}`)} </p>`
        }
        return this.str;
    }
    
    //Constructure Funtion Ends Here.......

    function totalTimeCal(){
        totalTimeSec++
        if(totalTimeSec === 60){
            totalTimeSec = 0;
            totalTimeMin++
        }
        if(totalTimeMin === 60){
            totalTimeMin = 0;
            totalTimeHr++
        }
        if(totalTimeHr<1){
            totalTimeDisplay.innerHTML = `Total Time Spent : <b>${totalTimeMin} m</b>`
        }else{
            totalTimeDisplay.innerHTML = `Total Time Spent : <b>${totalTimeHr} hr</b>`
        }
          // console.log(totalTimeSec)
    }

    // Starting of task for start button
    startButtonWorking.addEventListener('click', () => {
        //newData Variable Belogns to Create New Object using Class(Constructur Function).
        let newData;
        if (startButtonWorking.innerHTML === 'Start') {
            startingTimmer = new Date();
            startButtonWorking.setAttribute('style', 'background-color:#ED5050')
            startButtonWorking.innerHTML = 'Stop'
            //console.log("hello")
            let hours = 0;
            let minutes = 0;
            let seconds = 0;
            displayingTimmer.innerHTML = `00 : 00 : 00`
            starterBotton = setInterval(() => {
                seconds++
                if (seconds == 60) {
                    seconds = 0;
                    minutes++
                }
                if (minutes == 60) {
                    minutes = 0
                    hours++
                }
                if (seconds < 10 && minutes < 10 && hours < 10) {
                    displayingTimmer.innerHTML = `0${hours} : 0${minutes} : 0${seconds}`
                } else if (minutes < 10 && hours < 10) {
                    displayingTimmer.innerHTML = `0${hours} : 0${minutes} : ${seconds}`
                } else if (hours < 10) {
                    displayingTimmer.innerHTML = `0${hours} : ${minutes} : ${seconds}`
                } else {
                    displayingTimmer.innerHTML = `${hours} : ${minutes} : ${seconds}`
                }

                activeTextData.innerHTML = `Started the timer at ${startingTimmer.toLocaleDateString()} ${startingTimmer.toLocaleTimeString()} (Active)`

            }, 1000)

            holdTotalTime = setInterval(totalTimeCal,1000)

        } else {
            clearInterval(starterBotton);
            clearInterval(holdTotalTime)
            startButtonWorking.innerHTML = 'Start'
            startButtonWorking.setAttribute('style', 'background-color:#5056ED')
            activeTextData.innerHTML = ""

            stoppingTimmer = new Date();

            endClick++

            newData = new StoringData(tittleOfTask, `Started the timer at ${startingTimmer.toLocaleDateString()} ${startingTimmer.toLocaleTimeString()} & Stopped at ${stoppingTimmer.toLocaleDateString()} ${stoppingTimmer.toLocaleTimeString()}`, endClick, "")
            newData.insertingLocal()
            saveTextData.innerHTML = newData.displayingLocal()
        }
    })
    deletingContent.addEventListener('click', () => {
        cardOfContent.setAttribute('style','display:none')

        // deletingContent.closest('.contentCard').innerHTML = ""

        for(let i=0;i<=endClick;i++){
            localStorage.removeItem(tittleOfTask + i) //By using Title Task as key we are removing local storage.
        }
    })
}

//Event for the Add button.
addTask.addEventListener('click', () => {
    popup.setAttribute('style', 'display:block');
    dialog.showModal()
    instructions.setAttribute('style','display:none')
})

taskSavebutton.addEventListener('click', (event) => {
    addTaskSave++
    dialog.close()
    event.preventDefault()
    let taskName = inputTaskName.value;
    popup.setAttribute('style', 'display:none')
    creatingContent(taskName)
    
})