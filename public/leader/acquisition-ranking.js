const people = [
  { name:"汽水", station:"郑州站", newUsers:1509, converted:782 },
  { name:"JOJO", station:"深圳站", newUsers:1257, converted:716 },
  { name:"子谦", station:"郑州站", newUsers:1160, converted:544 },
  { name:"夏天", station:"北京站", newUsers:1062, converted:616 },
  { name:"太阳花", station:"成都站", newUsers:955, converted:487 },
  { name:"西西", station:"西安站", newUsers:787, converted:449 },
  { name:"知与", station:"苏州站", newUsers:751, converted:428 },
  { name:"捉影", station:"郑州站", newUsers:711, converted:327 },
  { name:"考拉", station:"南京站", newUsers:645, converted:374 },
  { name:"长风", station:"上海站", newUsers:542, converted:298 }
];

const myData = { name:"易涟", station:"杭州站", newUsers:7, converted:3 };
const timeScale = { year:1, month:.11, lastMonth:.09 };
const myRanks = {
  year:{ newUsers:215, conversion:128 },
  month:{ newUsers:187, conversion:96 },
  lastMonth:{ newUsers:203, conversion:114 }
};
let activeTime = "year";
let activeMetric = "newUsers";

function scaled(person) {
  const scale = timeScale[activeTime];
  const newUsers = Math.max(1, Math.round(person.newUsers * scale));
  const converted = Math.min(newUsers, Math.max(0, Math.round(person.converted * scale)));
  return { ...person, newUsers, converted, conversion:newUsers ? converted / newUsers * 100 : 0 };
}

function scoreText(person) {
  return activeMetric === "newUsers" ? `${person.newUsers}人` : `${person.conversion.toFixed(1)}%`;
}

function podiumMarkup(person, rank, rankClass) {
  const colors = [["#ff8b74","#c64f72"],["#538ee3","#4c59b8"],["#f0ad4e","#d86847"]][(rank - 1) % 3];
  return `<article class="podium-item ${rankClass}"><span class="podium-avatar" style="--a:${colors[0]};--b:${colors[1]}">${person.name.slice(0,1)}<i>${rank}</i></span><strong>${person.name}</strong><small>${person.station}</small><b>${scoreText(person)}</b></article>`;
}

function renderRanking() {
  const ranked = people.map(scaled).sort((a,b) => b[activeMetric] - a[activeMetric]);
  document.querySelector("#podium").innerHTML = podiumMarkup(ranked[1],2,"second") + podiumMarkup(ranked[0],1,"first") + podiumMarkup(ranked[2],3,"third");
  document.querySelector("#rankingList").innerHTML = ranked.slice(3).map((person,index) => `<div class="rank-row"><b>${index + 4}</b><div class="rank-person"><span class="rank-avatar">${person.name.slice(0,1)}</span><span><strong>${person.name}</strong><small>${person.station}</small></span></div><em>${scoreText(person)}</em></div>`).join("");
  const mine = scaled(myData);
  document.querySelector("#metricLabel").textContent = activeMetric === "newUsers" ? "拉新人数" : "拉新转化率";
  document.querySelector("#rankingNote").textContent = activeMetric === "newUsers" ? "按成功注册的新用户人数排名" : "拉新转化率 = 已消费拉新用户数 ÷ 拉新人数";
  document.querySelector("#myRank").textContent = myRanks[activeTime][activeMetric];
  document.querySelector("#myScore").textContent = scoreText(mine);
}

document.querySelectorAll(".time-tab").forEach(button => button.addEventListener("click", () => {
  activeTime = button.dataset.time;
  document.querySelectorAll(".time-tab").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderRanking();
}));

document.querySelectorAll(".metric-tab").forEach(button => button.addEventListener("click", () => {
  activeMetric = button.dataset.metric;
  document.querySelectorAll(".metric-tab").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderRanking();
}));

document.querySelector("#backButton").addEventListener("click", () => { window.location.href = "./index.html"; });
document.querySelector(".close-button").addEventListener("click", () => { window.location.href = "./index.html"; });
renderRanking();
