const STORAGE_KEY="leader-xhs-account-v2";
const MONTHLY_LIMIT=2;
const $=selector=>document.querySelector(selector);
const state={month:"",account:"",used:0};
let toastTimer=null;

function monthKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;}
function nextResetLabel(){const date=new Date();date.setMonth(date.getMonth()+1,1);return `${date.getMonth()+1}月1日刷新`;}
function loadState(){
  try{Object.assign(state,JSON.parse(localStorage.getItem(STORAGE_KEY))||{});}catch(error){localStorage.removeItem(STORAGE_KEY);}
  const currentMonth=monthKey();
  if(state.month!==currentMonth){state.month=currentMonth;state.used=0;saveState();}
  state.used=Math.min(MONTHLY_LIMIT,Math.max(0,Number(state.used)||0));
  state.account=String(state.account||"");
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function remaining(){return MONTHLY_LIMIT-state.used;}
function showToast(message){clearTimeout(toastTimer);$("#toast").textContent=message;$("#toast").classList.add("show");toastTimer=setTimeout(()=>$("#toast").classList.remove("show"),2000);}
function render(){
  const rest=remaining();
  $("#accountValue").textContent=state.account||"未绑定";
  $("#quotaBadge").textContent=`本月剩余 ${rest} 次`;
  $("#quotaBadge").classList.toggle("empty",rest===0);
  $("#resetDate").textContent=nextResetLabel();
  $("#sheetQuota").textContent=`本月剩余 ${rest} 次 · ${nextResetLabel()}`;
  $("#bindButton").textContent=state.account?"修改账号":"立即绑定";
  $("#bindButton").disabled=rest===0;
}
function openSheet(){
  if(remaining()===0){showToast(`本月修改次数已用完，请于${nextResetLabel().replace("刷新","")}后再试`);return;}
  $("#sheetTitle").textContent=state.account?"修改小红书号":"绑定小红书号";
  $("#accountInput").value=state.account;
  $("#inputError").textContent="";
  $("#sheetMask").hidden=false;
  setTimeout(()=>$("#accountInput").focus(),50);
}
function closeSheet(){$("#sheetMask").hidden=true;}
function saveAccount(){
  const value=$("#accountInput").value.trim();
  if(!value){$("#inputError").textContent="请输入小红书号";return;}
  if(value.length<3){$("#inputError").textContent="小红书号至少需要 3 个字符";return;}
  if(value===state.account){closeSheet();showToast("账号没有变化，未消耗修改次数");return;}
  if(remaining()===0){closeSheet();render();showToast("本月修改次数已用完");return;}
  state.account=value;state.used+=1;saveState();render();closeSheet();showToast("小红书号已保存");
}

loadState();render();
$("#backButton").addEventListener("click",()=>{window.location.href="./my.html";});
$("#bindButton").addEventListener("click",openSheet);
$("#closeSheet").addEventListener("click",closeSheet);
$("#saveAccount").addEventListener("click",saveAccount);
$("#accountInput").addEventListener("input",()=>{$("#inputError").textContent="";});
$("#accountInput").addEventListener("keydown",event=>{if(event.key==="Enter")saveAccount();});
$("#sheetMask").addEventListener("click",event=>{if(event.target===$("#sheetMask"))closeSheet();});
