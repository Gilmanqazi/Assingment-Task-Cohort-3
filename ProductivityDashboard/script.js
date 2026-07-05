function openFeatures() {
  let allelem = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let allFullElemBackbtn = document.querySelectorAll(".fullElem .back");

  allelem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  allFullElemBackbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures()

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    localStorage.setItem("currentTask", currentTask);
  }


  function renderTask() {

    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
      <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
       <details>${elem.details}</details>
  
      <button id=${idx}>Delete</button>
    </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask))

    document.querySelectorAll(".task button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentTask.splice(btn.id, 1);
      renderTask();

    });
  });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(" .addTask form #task-input");
  let taskDetailesInput = document.querySelector(" .addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailesInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
 
    taskInput.value = "";
    taskDetailesInput.value = "";
    taskCheckbox.checked = false;
  });

  
}
todoList();


function DailyPlanner (){
  let dayPlanner =  document.querySelector(".day-planner")

let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {}

let hours = Array.from({length:18},(_,idx)=>`${6+idx}:00 - ${7+idx}:00`)



let wholeDaySum = ''

hours.forEach(function(elem,idx){

let savedData = dayPlanData[idx] || ''

wholeDaySum = wholeDaySum + `
  <div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value = ${savedData} >
  </div>`
})

dayPlanner.innerHTML = wholeDaySum

let dayPlannerInput = document.querySelectorAll(".day-planner input")

dayPlannerInput.forEach(function(elem){
elem.addEventListener("input",function(){
dayPlanData[elem.id] = elem.value

localStorage.setItem("dayPlanData",JSON.stringify(dayPlanData))

})
})

}

DailyPlanner()

function motivationalQuote(){
  let motivationQoute = document.querySelector(".motivation-2 h1")
let motivationAuther = document.querySelector(".motivation-3 h2")
let quoteBtn = document.querySelector("#quoteBtn")

async function fetchQuote (){
  let response = await fetch('https://thequoteshub.com/api/random')

  let data = await response.json()
motivationQoute.innerHTML = data.text;
motivationAuther.innerHTML =  data.author;
}
fetchQuote()
quoteBtn.addEventListener("click",fetchQuote)
}

motivationalQuote()


function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".start-timer");
  let pauseBtn = document.querySelector(".pause-timer");
  let resetBtn = document.querySelector(".reset-timer");
  let workSession = document.querySelector(".session");

  let timerInterval = null;
  let totalSeconds = 25 * 60;
  // FIX 1: Shuruat me user work session me hota hai, isliye isko true hona chahiye
  let isWorkSession = true; 

  function upDateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    // Purane chal rahe kisi bhi interval ko clear karein taaki speed double na ho
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        upDateTime();
      } else {
        // Jab timer 0 par pahunche tab toggle karein
        clearInterval(timerInterval);

        if (isWorkSession) {
          // Work session khatam -> Break shuru karo
          isWorkSession = false;
          totalSeconds = 5 * 60; // 5 minute break
          workSession.innerHTML = "Take a Break";
          workSession.style.backgroundColor = "var(--red)";
        } else {
          // Break khatam -> Work session dubara shuru karo
          isWorkSession = true;
          totalSeconds = 25 * 60; // 25 minute work
          workSession.innerHTML = "Work Session";
          workSession.style.backgroundColor = "var(--green)";
        }

        upDateTime();
        startTimer(); // FIX 2: Automatic agla session start karne ke liye recursion call
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isWorkSession = true;
    totalSeconds = 25 * 60;
    workSession.innerHTML = "Work Session";
    workSession.style.backgroundColor = "var(--green)";
    upDateTime();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}


pomodoroTimer();


function weatherFunctionality(){
  let apikey = "77e56232f2fb8d5fa149b6ebae22e8b5"
let city = "jalna"
let header1Time = document.querySelector(".header1 h1")
let header1Date = document.querySelector(".header1 h2")
let header1City = document.querySelector(".header1 h4")

let header2Temp = document.querySelector(".header2 h2")
let header2description= document.querySelector(".header2 h4")
let header2P = document.querySelector(".header2 .Pressure ");
let header2H = document.querySelector(".header2 .Humidity ");
let header2W = document.querySelector(".header2 .Wind ");
let header = document.querySelector("header")





let data = null
async function weatherAPICall(){
  let response  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
data = await response.json()
header1City.innerHTML = `${data.name} (MH)`

header2Temp.innerHTML = `${data.main.temp}°C`
header2description.innerHTML = `${data.weather[0].description}`
header2P.innerHTML = `Pressure: ${data.main.pressure}`
header2H.innerHTML = `Humidity: ${data.main.humidity}%`
header2W.innerHTML = `Wind: ${(data.wind.speed * 3.6).toFixed(1)}KpH `

}
 
weatherAPICall()


function timeDate(){

let totaldayOfWeek = ["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday",]
let totalmonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]


let date = new Date()
let dayOfWeek = totaldayOfWeek[date.getDay()]
let hours = date.getHours()
let minutes = date.getMinutes()
let seconds = date.getSeconds()
let tarik = date.getDate()
let months = totalmonths[date.getMonth()]
let year = date.getFullYear()

header1Date.innerHTML = `${tarik} ${months} ${year}`

let bgUrl = "";

if (hours >= 5 && hours < 12) {
  bgUrl = "https://images.unsplash.com/photo-1605158080227-fd61e78bdc8b?q=80&w=1600&auto=format&fit=crop"; // Morning
} else if (hours >= 12 && hours < 16) {
  bgUrl = "https://images.unsplash.com/photo-1535477904881-7dfea0fb80c9?q=80&w=1600&auto=format&fit=crop"; // Afternoon
} else if (hours >= 16 && hours < 20) {
  bgUrl = "https://images.unsplash.com/photo-1712663640135-f5fc71dca38e?q=80&w=1600&auto=format&fit=crop"; // Evening
} else {
  bgUrl = "https://images.unsplash.com/photo-1553032644-00232b785cac?q=80&w=1600&auto=format&fit=crop"; // Night
}

header.style.backgroundImage = `url("${bgUrl}")`;
header.style.backgroundPosition = "center center";
header.style.backgroundSize = "cover";
header.style.backgroundRepeat = "no-repeat";
header.style.backgroundAttachment = "scroll"; 

if(hours>12){
  header1Time.innerHTML = `${dayOfWeek},${String(hours).padStart("2","0")}:${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")} PM`
}else{
  header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(2,"0")}:${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")} AM`
}

}

setInterval(() => {
  timeDate()
}, 1000);




}
weatherFunctionality()

function themechange() {
  let themeButton = document.querySelector(".theme");
  let rootElement = document.documentElement;

  // Flag ko bahar rakha hai taaki state save rahe
  let flag = 0; 

  themeButton.addEventListener("click", function () {
    if (flag === 0) {
      // === THEME 1: DARK CYBER MODE ===
      rootElement.style.setProperty("--pri", "#121214");   /* Deep Slate/Black BG */
      rootElement.style.setProperty("--sec", "#22252a");   /* Dark Card Background */
      rootElement.style.setProperty("--tri1", "#b153d7");  /* Neon Violet Accents */
      rootElement.style.setProperty("--tri2", "#f4f4f6");  /* Crisp White Text */
      flag = 1;
      console.log("Switched to Dark Cyber Mode");

    } else if (flag === 1) {
      // === THEME 2: SUNSET FIRE MODE ===
      rootElement.style.setProperty("--pri", "#fffcf9");   /* Warm Cream BG */
      rootElement.style.setProperty("--sec", "#fce4e4");   /* Soft Rose Borders/Cards */
      rootElement.style.setProperty("--tri1", "#d92b43");  /* Vibrant Crimson Red Accents */
      rootElement.style.setProperty("--tri2", "#2b2223");  /* Dark Chocolate Text */
      flag = 2;
      console.log("Switched to Sunset Fire Mode");

    } else if (flag === 2) {
      // === THEME 3: LIGHT MODE (BACK TO DEFAULT) ===
      rootElement.style.setProperty("--pri", "#f9fdf0");   /* Original Light BG */
      rootElement.style.setProperty("--sec", "#e4e29b");   /* Original Yellow Cards */
      rootElement.style.setProperty("--tri1", "#9d39c3");  /* Original Deep Violet */
      rootElement.style.setProperty("--tri2", "#1a1a1e");  /* Original Off-Black Text */
      flag = 0;
      console.log("Switched to Light Mode");
    }
  });
}


themechange();


function DailyGoals() {

  const goalList = document.querySelector(".goal-list");
  const addBtn = document.querySelector(".add-goal");
  const progressText = document.querySelector(".progress span");
  const progressBar = document.querySelector(".progress progress");

  let goals = JSON.parse(localStorage.getItem("goals")) || [];

  // Save
  function saveGoals() {
      localStorage.setItem("goals", JSON.stringify(goals));
  }

  // Progress
  function updateProgress() {

      const total = goals.length;
      const completed = goals.filter(g => g.done).length;

      progressText.textContent = `${completed}/${total}`;
      progressBar.max = total;
      progressBar.value = completed;
  }

  // Render
  function renderGoals() {

      goalList.innerHTML = "";

      goals.forEach((goal, index) => {

          const div = document.createElement("div");
          div.className = "goal";

          div.innerHTML = `
              <input type="checkbox" ${goal.done ? "checked" : ""}>
              <label>${goal.text}</label>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
          `;

          // checkbox
          div.querySelector("input").addEventListener("change", function () {

              goals[index].done = this.checked;

              saveGoals();
              updateProgress();

          });

          // delete
          div.querySelector(".delete").addEventListener("click", function () {

              goals.splice(index,1);

              saveGoals();
              renderGoals();

          });

          // edit
          div.querySelector(".edit").addEventListener("click", function(){

              let newGoal = prompt("Edit Goal", goals[index].text);

              if(!newGoal) return;

              goals[index].text = newGoal;

              saveGoals();
              renderGoals();

          });

          goalList.appendChild(div);

      });

      updateProgress();

  }

  // Add Goal
  addBtn.addEventListener("click", function(){

      let goal = prompt("Enter Goal");

      if(!goal || goal.trim() === "") return;

      goals.push({
          text: goal,
          done: false
      });

      saveGoals();
      renderGoals();

  });

  renderGoals();

}

DailyGoals();