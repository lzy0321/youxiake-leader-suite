const myToast=document.querySelector("#myToast");
let myToastTimer=null;
function showMyToast(message){clearTimeout(myToastTimer);myToast.textContent=message;myToast.classList.add("show");myToastTimer=setTimeout(()=>myToast.classList.remove("show"),2000);}
document.querySelector("#myBack").addEventListener("click",()=>{window.location.href="./index.html";});
document.addEventListener("click",event=>{
  const link=event.target.closest("[data-href]");if(link){window.location.href=link.dataset.href;return;}
  const feature=event.target.closest("[data-feature]");if(feature){showMyToast(`${feature.dataset.feature}功能将在这里继续扩展`);return;}
  const action=event.target.closest("[data-toast]");if(action)showMyToast(action.dataset.toast);
});
