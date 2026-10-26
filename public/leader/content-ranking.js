const people = [
  ["汽水", "郑州站"], ["JOJO", "深圳站"], ["子谦", "郑州站"], ["夏天", "北京站"], ["太阳花", "成都站"],
  ["西西", "西安站"], ["知与", "苏州站"], ["捉影", "郑州站"], ["考拉", "南京站"], ["长风", "上海站"]
];

const typeBase = { meet: 108, travel: 76, xhs: 64, douyin: 58 };
const timeScale = { year: 1, month: .18, lastMonth: .16 };
const myRanks = { meet: 96, travel: 121, xhs: 68, douyin: 83 };
let activeTime = "year";

function currentType() { return document.querySelector("#typeSelect").value; }

function metricValue(index) {
  const base = typeBase[currentType()] - index * (currentType() === "meet" ? 7 : 5);
  return Math.max(3, Math.round(base * timeScale[activeTime]));
}

function personMarkup(index, rankClass) {
  const [name, station] = people[index];
  const colors = [["#ff8b74","#c64f72"],["#538ee3","#4c59b8"],["#f0ad4e","#d86847"]][index % 3];
  return `<article class="podium-item ${rankClass}"><span class="podium-avatar" style="--a:${colors[0]};--b:${colors[1]}">${name.slice(0,1)}<i>${index + 1}</i></span><strong>${name}</strong><small>${station}</small><b>${metricValue(index)}篇</b></article>`;
}

function renderRanking() {
  document.querySelector("#podium").innerHTML = personMarkup(1, "second") + personMarkup(0, "first") + personMarkup(2, "third");
  document.querySelector("#rankingList").innerHTML = people.slice(3).map(([name, station], offset) => {
    const rank = offset + 4;
    return `<div class="rank-row"><b>${rank}</b><div class="rank-person"><span class="rank-avatar">${name.slice(0,1)}</span><span><strong>${name}</strong><small>${station}</small></span></div><em>${metricValue(rank - 1)}篇</em></div>`;
  }).join("");
  const type = currentType();
  const myValue = Math.max(1, Math.round((typeBase[type] * .12) * timeScale[activeTime]));
  document.querySelector("#myRank").textContent = myRanks[type];
  document.querySelector("#myScore").textContent = `${myValue}篇`;
}

document.querySelectorAll(".time-tab").forEach(button => {
  button.addEventListener("click", () => {
    activeTime = button.dataset.time;
    document.querySelectorAll(".time-tab").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderRanking();
  });
});

document.querySelector("#typeSelect").addEventListener("change", renderRanking);
document.querySelector("#backButton").addEventListener("click", () => { window.location.href = "./index.html"; });
document.querySelector(".close-button").addEventListener("click", () => { window.location.href = "./index.html"; });

renderRanking();
