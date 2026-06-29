// ============================
// LOADER
// ============================

document.addEventListener("DOMContentLoaded",()=>{
    const counterElement = document.getElementById("loadingCounter");
    const overlayElement = document.getElementById("loadingOverlay");


    let count = 0
    const totalDuration = 2000
    const stepTime = totalDuration/100

    const interval = setInterval(() => {
        count ++
        counterElement.innerHTML = `${count}`

        if(count>=100){
            clearInterval(interval)

            overlayElement.classList.add('opacity-0', 'pointer-events-none');

            setInterval(() => {
                overlayElement.style.display = "none"
            }, 300);
        }


        
        
    }, stepTime);
}) 

// ============================
// SIDEBAR TOGGLE
// ============================

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");


const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click", logout);

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){

document.getElementById("userName").innerText =
"Welcome, " + currentUser.name ;

}

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
    });
}

if (overlay) {
    overlay.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    });
}

// ============================
// ADD TRANSACTION MODAL
// ============================

const modal = document.getElementById("transactionModal");

const openModal = document.getElementById("openModal");
const openModal2 = document.getElementById("openModal2");

const closeModal = document.getElementById("closeModal");

function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function hideModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

if (openModal) {
    openModal.addEventListener("click", showModal);
}

if (openModal2) {
    openModal2.addEventListener("click", showModal);
}

if (closeModal) {
    closeModal.addEventListener("click", hideModal);
}

if (modal) {
    modal.addEventListener("click", function (e) {

        if (e.target === modal) {
            hideModal();
        }

    });
}

// ESC key closes modal

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        hideModal();

    }

});

// ============================
// DASHBOARD ↔ SETTINGS
// ============================

const dashboardBtn = document.getElementById("dashboardBtn");
const settingsBtn = document.getElementById("settingsBtn");

const dashboardPage = document.querySelector("#dashboardPage");
const settingsPage = document.querySelector("#settingsPage");



function openDashboard() {
  dashboardPage.classList.remove("hidden");
  settingsPage.classList.add("hidden");

  dashboardBtn.classList.add("bg-blue-100", "text-blue-700");
  settingsBtn.classList.remove("bg-blue-100", "text-blue-700");
}

function openSettings() {
  dashboardPage.classList.add("hidden");
  settingsPage.classList.remove("hidden");

  settingsBtn.classList.add("bg-blue-100", "text-blue-700");
  dashboardBtn.classList.remove("bg-blue-100", "text-blue-700");
}

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", openDashboard);

}

if (settingsBtn) {



    settingsBtn.addEventListener("click", openSettings);

}

// ============================
// DARK MODE
// ============================

const darkToggle = document.getElementById("darkToggle");

// Load saved theme

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.documentElement.classList.add("dark");

    if (darkToggle) {

        darkToggle.checked = true;

    }

}

if (darkToggle) {

    darkToggle.addEventListener("change", function () {

        if (this.checked) {

            document.documentElement.classList.add("dark");

            localStorage.setItem("theme", "dark");

        } else {

            document.documentElement.classList.remove("dark");

            localStorage.setItem("theme", "light");

        }

    });

}

// ============================
// AUTO CLOSE SIDEBAR ON MOBILE
// ============================

function closeSidebar() {

    if (window.innerWidth < 1024) {

        sidebar.classList.add("-translate-x-full");

        overlay.classList.add("hidden");

    }

}

dashboardBtn?.addEventListener("click", closeSidebar);

settingsBtn?.addEventListener("click", closeSidebar);







// ==========================
// TRANSACTIONS ARRAY
// ==========================

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];


// ==========================
// ELEMENTS
// ==========================

const form = document.getElementById("transactionForm");

const table = document.getElementById("transactionTable");

const balance = document.getElementById("balance");

const income = document.getElementById("income");

const expense = document.getElementById("expense");

const totalTransactions =
document.getElementById("totalTransactions");

const currencySelect =
document.getElementById("currency");

let currency = "$";


// ==========================
// ADD TRANSACTION
// ==========================

form?.addEventListener("submit", function(e){

e.preventDefault();

const type =
document.getElementById("type").value;

const description =
document.getElementById("description").value;

const amount =
Number(document.getElementById("amount").value);

const date =
document.getElementById("date").value;

const category =
document.getElementById("category").value;

if(description==="" || amount<=0){

alert("Please fill all fields");

return;

}

const transaction={

id:Date.now(),

type,

description,

amount,

date,

category

};

transactions.push(transaction);

saveTransactions();

renderTransactions();

updateSummary();

form.reset();

hideModal();

});


// ==========================
// SAVE
// ==========================

function saveTransactions(){

localStorage.setItem(

"transactions",

JSON.stringify(transactions)

);

}


// ==========================
// DELETE
// ==========================

function deleteTransaction(id){

transactions=

transactions.filter(

item=>item.id!==id

);

saveTransactions();

renderTransactions();

updateSummary();

}


// ==========================
// RENDER TABLE
// ==========================

function renderTransactions(){

table.innerHTML="";

transactions.forEach(item=>{

table.innerHTML+=`

<tr class="border-b hover:bg-gray-50">

<td class="py-4">

${item.date}

</td>

<td>

${item.description}

</td>

<td>

${item.category}

</td>

<td class="${
item.type==="income"
?
"text-green-600"
:
"text-red-600"
} font-bold">

${item.type==="income"?"+":"-"}

${currency}${item.amount}

</td>

<td>

<button

onclick="deleteTransaction(${item.id})"

class="text-red-500 hover:text-red-700">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

});

}


// ==========================
// SUMMARY
// ==========================

function updateSummary(){

let totalIncome=0;

let totalExpense=0;

transactions.forEach(item=>{

if(item.type==="income"){

totalIncome+=item.amount;

}

else{

totalExpense+=item.amount;

}

});

income.textContent=

currency+totalIncome.toFixed(2);

expense.textContent=

currency+totalExpense.toFixed(2);

balance.textContent=

currency+

(totalIncome-totalExpense).toFixed(2);

totalTransactions.textContent=

transactions.length;

}


// ==========================
// CURRENCY
// ==========================

currencySelect?.addEventListener(

"change",

function(){

switch(this.value){

case "USD":

currency="$";

break;

case "INR":

currency="₹";

break;

case "EUR":

currency="€";

break;

case "GBP":

currency="£";

break;

case "JPY":

currency="¥";

break;

}

renderTransactions();

updateSummary();

}

);


// ==========================
// INITIAL LOAD
// ==========================

renderTransactions();

updateSummary();






// =====================================
// CHART.JS + SEARCH + FILTER
// =====================================

let chart;

// ==============================
// CREATE / UPDATE CHART
// ==============================

function updateChart() {

    const incomeTotal = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenseTotal = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const ctx = document
        .getElementById("financeChart")
        .getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                data: [incomeTotal, expenseTotal],

                backgroundColor: [

                    "#22c55e",
                    "#ef4444"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

// ==============================
// SEARCH
// ==============================

const searchInput =
document.getElementById("search");

searchInput?.addEventListener("keyup", function () {

    const keyword =
    this.value.toLowerCase();

    const rows =
    table.querySelectorAll("tr");

    rows.forEach(row => {

        if (
            row.innerText
            .toLowerCase()
            .includes(keyword)
        ) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

// ==============================
// FILTER
// ==============================

const filter =
document.getElementById("filterType");

filter?.addEventListener("change", function () {

    const value = this.value;

    table.innerHTML = "";

    let data = transactions;

    if (value !== "all") {

        data =

        transactions.filter(

            item => item.type === value

        );

    }

    data.forEach(item => {

        table.innerHTML += `

<tr class="border-b hover:bg-gray-50">

<td class="py-4">

${item.date}

</td>

<td>

${item.description}

</td>

<td>

${item.category}

</td>

<td class="${
item.type==="income"
?
"text-green-600"
:
"text-red-600"
} font-bold">

${item.type==="income"?"+":"-"}

${currency}${item.amount}

</td>

<td>

<button

onclick="deleteTransaction(${item.id})"

class="text-red-500">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

    });

});

// ==============================
// UPDATE EXISTING FUNCTIONS
// ==============================

const oldRender = renderTransactions;

renderTransactions = function () {

    oldRender();

    updateChart();

};

const oldSummary = updateSummary;

updateSummary = function () {

    oldSummary();

    updateChart();

};

// Initial chart
updateChart();







// ========================================
// Profile + Currency + Reset + Toast
// ========================================

// ---------- Elements ----------

const usernameInput = document.getElementById("username");
const saveSettingsBtn = document.querySelector("#settingsPage #stBtn");
const resetBtn = document.getElementById("resetBtn");

// ---------- Toast ----------

function showToast(message, color = "green") {

    const toast = document.createElement("div");

    toast.className =
        `fixed top-5 right-5 z-[9999]
        px-5 py-3 rounded-xl
        text-white shadow-xl
        bg-${color}-600`;

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("opacity-0");

    }, 2500);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ---------- Save Profile ----------

if (saveSettingsBtn) {

  saveSettingsBtn.addEventListener("click", function () {

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) return;

      // Update current user
      currentUser.name = usernameInput.value;
      currentUser.currency = currencySelect.value;
      currentUser.theme = darkToggle.checked;

      localStorage.setItem(
          "currentUser",
          JSON.stringify(currentUser)
      );

      // Update users array
      let users = JSON.parse(localStorage.getItem("users")) || [];

      users = users.map(user => {

          if (user.email === currentUser.email) {

              user.name = currentUser.name;
              user.currency = currentUser.currency;
              user.theme = currentUser.theme;

          }

          return user;

      });

      localStorage.setItem(
          "users",
          JSON.stringify(users)
      );

      showToast("Settings Saved");

  });

}

// ---------- Load Profile ----------

function loadProfile() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) return;

  usernameInput.value = currentUser.name || "";

  currencySelect.value = currentUser.currency || "USD";

  currencySelect.dispatchEvent(new Event("change"));

  if (currentUser.theme) {

      darkToggle.checked = true;

      document.documentElement.classList.add("dark");

  }

}

loadProfile();



// ---------- Reset ----------

if (resetBtn) {

    resetBtn.addEventListener("click", function () {

        const ok = confirm(

            "Delete all transactions?"

        );

        if (!ok) return;

        transactions = [];

        localStorage.removeItem("transactions");

        saveTransactions();

        renderTransactions();

        updateSummary();

        updateChart();

        showToast("All Data Deleted", "red");

    });

}

// ---------- Better Dark Mode ----------

darkToggle?.addEventListener("change", function () {

    document.documentElement.classList.toggle(

        "light"

    );

});

// ---------- Dashboard Greeting ----------

const heading = document.querySelector("main h1");

const profileData =

JSON.parse(

localStorage.getItem("profile")

);

if (

profileData &&

profileData.name &&

heading

) {

heading.innerHTML =

`Welcome, ${profileData.name}`;

}

// ---------- Add Success Toast ----------

const oldSave = saveTransactions;

saveTransactions = function () {

oldSave();

showToast("Transaction Saved");

};

// ---------- Delete Success Toast ----------

const oldDelete = deleteTransaction;

deleteTransaction = function (id) {

oldDelete(id);

showToast("Transaction Deleted", "red");

};

// ---------- Initial ----------

renderTransactions();

updateSummary();

updateChart();

