const entries = [
  { id:1, selected:true, date:"2020-10-01 15:25", text:"遇见内容遇见内容遇见内容遇见内容遇见内容遇见内容遇见内容…", url:"https://xhslink.cn/o/MRh2Gp1rgZ", platform:"小红书" },
  { id:2, selected:false, date:"2020-10-01 15:25", text:"遇见内容遇见内容遇见内容遇见内容遇见内容遇见内容遇见内容…", url:"https://v.douyin.com/C9DZmzRwP-k/", platform:"抖音" },
  { id:3, selected:false, date:"2020-10-02 09:10", text:"清晨从古道出发，沿途的风景和故事都值得记录。", url:"", platform:"" }
];

let editingId = null;
let toastTimer = null;
const $ = selector => document.querySelector(selector);

function escapeHtml(value){return value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));}
function compactUrl(url){return url.replace(/^https?:\/\//,"");}
function detectPlatform(url){
  try{
    const host=new URL(url).hostname.toLowerCase().replace(/^www\./,"");
    if(host==="xhslink.cn"||host.endsWith(".xhslink.cn")||host==="xiaohongshu.com"||host.endsWith(".xiaohongshu.com"))return "小红书";
    if(host==="douyin.com"||host.endsWith(".douyin.com")||host==="iesdouyin.com"||host.endsWith(".iesdouyin.com"))return "抖音";
  }catch{}
  return "";
}
function extractUrl(value){
  const matches=value.match(/https?:\/\/[^\s<>\]）)】]+/gi)||[];
  for(const raw of matches){
    const cleaned=raw.replace(/[，。！？、；：,.!?;:'"”’]+$/g,"");
    if(detectPlatform(cleaned))return cleaned;
  }
  return matches[0]?.replace(/[，。！？、；：,.!?;:'"”’]+$/g,"")||"";
}
function showToast(message){clearTimeout(toastTimer);$("#submitToast").textContent=message;$("#submitToast").classList.add("show");toastTimer=setTimeout(()=>$("#submitToast").classList.remove("show"),2100);}

function render(){
  $("#contentList").innerHTML=entries.map(entry=>`<article class="content-card ${entry.selected?"selected":""}" data-id="${entry.id}">
    <div class="content-main"><button class="select-box" aria-label="${entry.selected?"取消选择":"选择"}"></button><div class="content-thumb"></div><div class="content-copy"><time>${entry.date}</time><p>${escapeHtml(entry.text)}</p></div></div>
    ${entry.url?`<div class="external-row"><span class="platform-badge ${entry.platform==="抖音"?"douyin":""}">${entry.platform}</span><span class="external-url">${escapeHtml(compactUrl(entry.url))}</span><button class="edit-link">✎ 修改</button><button class="remove-link" aria-label="删除外部链接">⊗</button></div>`:`<button class="add-external"><span>＋ 外部链接</span><b>›</b></button>`}
  </article>`).join("");
}

function openSheet(id){
  editingId=id;
  const entry=entries.find(item=>item.id===id);
  $("#sheetTitle").textContent=entry.url?"修改外部链接":"添加外部链接";
  $("#shareInput").value=entry.url||"";
  updateParseHint();
  $("#sheetScrim").hidden=false;$("#linkSheet").hidden=false;document.body.style.overflow="hidden";
}
function closeSheet(){$("#sheetScrim").hidden=true;$("#linkSheet").hidden=true;$("#invalidDialog").hidden=true;document.body.style.overflow="";}
function updateParseHint(){
  const url=extractUrl($("#shareInput").value);
  const platform=detectPlatform(url);
  $("#parseHint").textContent=platform?`已识别：${platform} · ${compactUrl(url)}`:"支持自动识别分享文案中的链接";
  $("#parseHint").classList.toggle("parsed",Boolean(platform));
}

$("#contentList").addEventListener("click",event=>{
  const card=event.target.closest(".content-card");if(!card)return;
  const id=Number(card.dataset.id);const entry=entries.find(item=>item.id===id);
  if(event.target.closest(".select-box")){entry.selected=!entry.selected;return render();}
  if(event.target.closest(".add-external")||event.target.closest(".edit-link"))return openSheet(id);
  if(event.target.closest(".remove-link")){entry.url="";entry.platform="";render();showToast("外部链接已删除");}
});
$("#shareInput").addEventListener("input",updateParseHint);
$("#pasteShare").addEventListener("click",async()=>{try{$("#shareInput").value=await navigator.clipboard.readText();updateParseHint();showToast("已粘贴并自动解析");}catch{showToast("请长按输入框粘贴分享内容");}});
$("#saveLink").addEventListener("click",()=>{
  const url=extractUrl($("#shareInput").value);const platform=detectPlatform(url);
  if(!platform){$("#invalidDialog").hidden=false;return;}
  const entry=entries.find(item=>item.id===editingId);entry.url=url;entry.platform=platform;closeSheet();render();showToast(`已识别并保存${platform}链接`);
});
$("#closeSheet").addEventListener("click",closeSheet);$("#sheetScrim").addEventListener("click",closeSheet);
$("#closeInvalid").addEventListener("click",()=>$("#invalidDialog").hidden=true);
$("#openTutorial").addEventListener("click",()=>{showToast("正在打开获取链接教程");$("#invalidDialog").hidden=true;});
$("#submitBack").addEventListener("click",()=>{window.location.href="./index.html";});
$("#submitSelected").addEventListener("click",()=>showToast(`已选择 ${entries.filter(item=>item.selected).length} 篇内容`));
document.addEventListener("click",event=>{const action=event.target.closest("[data-toast]");if(action)showToast(action.dataset.toast);});
render();
