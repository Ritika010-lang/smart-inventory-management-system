// ===============================
// SALES LINE CHART
// ===============================

const salesCtx = document.getElementById("salesChart");

if (salesCtx) {

new Chart(salesCtx, {

type: "line",

data: {

labels: [

"Jan",

"Feb",

"Mar",

"Apr",

"May",

"Jun",

"Jul"

],

datasets: [

{

label: "Sales",

data: [

120,

190,

300,

250,

420,

380,

510

],

borderColor: "#4F46E5",

backgroundColor: "rgba(79,70,229,0.15)",

fill: true,

tension: .4,

borderWidth: 3,

pointRadius: 5,

pointBackgroundColor: "#4F46E5"

}

]

},

options: {

responsive: true,

plugins: {

legend: {

display: false

}

},

scales: {

y: {

beginAtZero: true,

grid: {

color: "#E5E7EB"

}

},

x: {

grid: {

display: false

}

}

}

}

});

}

// ===============================
// REVENUE DOUGHNUT CHART
// ===============================

const revenueCtx = document.getElementById("revenueChart");

if(revenueCtx){

new Chart(revenueCtx,{

type:"doughnut",

data:{

labels:[

"Products",

"Accessories",

"Services"

],

datasets:[{

data:[55,25,20],

backgroundColor:[

"#4F46E5",

"#10B981",

"#F59E0B"

],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

},

cutout:"70%"

}

});

}

// ===============================
// CARD HOVER EFFECT
// ===============================

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// ===============================
// ACTIVE SIDEBAR
// ===============================

const menu=document.querySelectorAll(".sidebar li");

menu.forEach(item=>{

item.addEventListener("click",()=>{

menu.forEach(li=>li.classList.remove("active"));

item.classList.add("active");

});

});

// ===============================
// SEARCH
// ===============================

const search=document.querySelector(".search input");

if(search){

search.addEventListener("keyup",(e)=>{

console.log("Searching:",e.target.value);

});

}

// ===============================
// NOTIFICATION
// ===============================

const bell=document.querySelector(".notification");

if(bell){

bell.addEventListener("click",()=>{

alert("No new notifications.");

});

}