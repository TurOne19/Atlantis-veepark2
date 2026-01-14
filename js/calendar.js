const grid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("calMonth");

const prev = document.getElementById("calPrev");
const next = document.getElementById("calNext");

let selectedDay = null;
let selectedType = null;

let date = new Date();

const months = [
  "Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni",
  "Juuli","August","September","Oktoober","November","Detsember"
];

let calendarData = JSON.parse(
  localStorage.getItem("calendarData") || "{}"
);

function key(y,m,d){ return `${y}-${m}-${d}`; }

function render(){
  grid.innerHTML = "";
  const y = date.getFullYear();
  const m = date.getMonth();

  monthLabel.textContent = `${months[m]} ${y}`;

  const firstDay = new Date(y,m,1).getDay() || 7;
  const days = new Date(y,m+1,0).getDate();

  for(let i=1;i<firstDay;i++){
    grid.innerHTML += `<div class="calendar-day empty"></div>`;
  }

  for(let d=1; d<=days; d++){
    const type = calendarData[key(y,m,d)] || "normal";
    const div = document.createElement("div");

    div.className = `calendar-day ${type}`;
    div.textContent = d;

    div.onclick = () => {
      document
        .querySelectorAll(".calendar-day")
        .forEach(el=>el.classList.remove("selected"));

      div.classList.add("selected");
      selectedDay = d;
    };

    grid.appendChild(div);
  }
}

document.querySelectorAll(".admin-buttons button").forEach(btn=>{
  btn.onclick = () => {
    selectedType = btn.dataset.type;

    if(selectedDay !== null){
      const y = date.getFullYear();
      const m = date.getMonth();
      calendarData[key(y,m,selectedDay)] = selectedType;
      render();
    }
  };
});

document.getElementById("saveCalendar").onclick = () => {
  localStorage.setItem("calendarData", JSON.stringify(calendarData));
  alert("Kalender salvestatud");
};

prev.onclick = () => { date.setMonth(date.getMonth()-1); render(); };
next.onclick = () => { date.setMonth(date.getMonth()+1); render(); };

render();
