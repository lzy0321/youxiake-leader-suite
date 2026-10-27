const IMG = {
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=84",
  camp: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=84",
  autumn: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=84",
  lake: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=900&q=84",
  snow: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=900&q=84",
  sea: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=84",
  road: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=84",
  forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=84",
  city: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=84",
  japan: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=84",
  desert: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=84",
  village: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=84"
};

const genericMaterials = [
  {id:"g1",title:"秋日徒步大片",type:"图片",image:IMG.autumn,label:"本周热门"},
  {id:"g2",title:"把周末交给山野",type:"视频",duration:"00:18",image:IMG.mountain,label:"今日上新"},
  {id:"g3",title:"露营松弛感",type:"图片",image:IMG.camp,label:"领队在用"},
  {id:"g4",title:"湖边治愈时刻",type:"视频",duration:"00:12",image:IMG.lake,label:"本周热门"},
  {id:"g5",title:"初雪氛围图",type:"图片",image:IMG.snow,label:"今日上新"},
  {id:"g6",title:"海边等一场日落",type:"图片",image:IMG.sea,label:"本周热门"},
  {id:"g7",title:"公路旅行随手拍",type:"视频",duration:"00:21",image:IMG.road,label:"领队在用"},
  {id:"g8",title:"森林里的光",type:"图片",image:IMG.forest,label:"本周热门"},
  {id:"g9",title:"城市漫游一日",type:"视频",duration:"00:15",image:IMG.city,label:"今日上新"},
  {id:"g10",title:"冬日温泉氛围",type:"图片",image:IMG.japan,label:"领队在用"}
];

const routeSeed = {
  nearby:[
    ["莫干山秋日徒步 1 日","杭州 · 徒步",286,34,IMG.forest],["徽杭古道轻徒步 2 日","临安 · 古道",241,28,IMG.mountain],["安吉云上草原 1 日","湖州 · 亲子",219,31,IMG.autumn],["四明山红枫之旅 1 日","宁波 · 摄影",198,22,IMG.road],["千岛湖骑行 2 日","淳安 · 骑行",176,25,IMG.lake],["括苍山云海露营 2 日","台州 · 露营",154,19,IMG.camp],["神仙居轻徒步 1 日","台州 · 山野",141,27,IMG.mountain],["舟山海岛漫游 2 日","舟山 · 海岛",128,23,IMG.sea],["皖南古村赏秋 2 日","安徽 · 古村",116,18,IMG.village],["大明山初雪之约 1 日","临安 · 赏雪",98,0,IMG.snow]
  ],
  domestic:[
    ["川西秘境环线 4 日","四川 · 雪山",386,42,IMG.mountain],["北疆喀纳斯秋色 8 日","新疆 · 摄影",351,38,IMG.lake],["云南雨崩徒步 6 日","云南 · 徒步",312,35,IMG.village],["海南万宁冲浪 5 日","海南 · 海岛",274,29,IMG.sea],["甘南小环线 7 日","甘肃 · 人文",249,33,IMG.road],["呼伦贝尔草原 6 日","内蒙古 · 亲子",228,26,IMG.autumn],["西北大环线 8 日","青甘 · 公路",207,31,IMG.desert],["贵州黔东南 6 日","贵州 · 人文",184,21,IMG.village],["长白山赏雪 5 日","吉林 · 冰雪",166,24,IMG.snow],["武功山穿越 3 日","江西 · 徒步",153,30,IMG.mountain]
  ],
  outbound:[
    ["日本关西赏枫 6 日","日本 · 赏枫",196,32,IMG.japan],["尼泊尔 ABC 徒步 12 日","尼泊尔 · 徒步",174,29,IMG.mountain],["土耳其全景 10 日","土耳其 · 人文",158,27,IMG.city],["新西兰南岛 12 日","新西兰 · 自然",143,34,IMG.lake],["摩洛哥撒哈拉 10 日","摩洛哥 · 沙漠",131,25,IMG.desert],["冰岛极光环岛 11 日","冰岛 · 极光",119,28,IMG.snow],["泰国清迈漫游 5 日","泰国 · 休闲",106,22,IMG.village],["瑞士雪山列车 9 日","瑞士 · 风光",94,24,IMG.mountain],["西班牙朝圣 9 日","西班牙 · 徒步",83,21,IMG.road],["印尼火山海岛 7 日","印尼 · 户外",76,20,IMG.sea]
  ]
};

const nearbyCities=["杭州","上海","北京","广州","深圳","郑州","西安","苏州","南京","无锡","宁波"];
const nearbyCitySeed={
  杭州:routeSeed.nearby,
  上海:[
    ["崇明岛湿地骑行 1 日","崇明 · 骑行",268,32,IMG.road],["苏州园林漫游 1 日","苏州 · 人文",247,29,IMG.village],["南浔古镇慢游 1 日","湖州 · 古镇",225,26,IMG.village],["佘山森林徒步 1 日","松江 · 徒步",203,24,IMG.forest],["无锡鼋头渚赏秋 1 日","无锡 · 摄影",186,30,IMG.autumn],["东极岛海风之旅 2 日","舟山 · 海岛",169,27,IMG.sea],["天目山森林轻徒步 2 日","临安 · 山野",151,22,IMG.mountain],["太湖露营看日落 2 日","苏州 · 露营",139,20,IMG.camp],["莫干山民宿度假 2 日","德清 · 度假",121,18,IMG.forest],["盐官观潮一日游","海宁 · 观潮",108,16,IMG.sea]
  ],
  北京:[
    ["古北水镇夜游 2 日","密云 · 古镇",301,35,IMG.village],["京西古道轻徒步 1 日","门头沟 · 徒步",276,31,IMG.mountain],["慕田峪长城赏秋 1 日","怀柔 · 摄影",252,28,IMG.autumn],["坝上草原越野 3 日","丰宁 · 草原",226,33,IMG.road],["承德避暑山庄 2 日","承德 · 人文",204,25,IMG.city],["野三坡山水之旅 2 日","保定 · 山野",183,23,IMG.lake],["北戴河海滨漫游 2 日","秦皇岛 · 海滨",165,26,IMG.sea],["百里山水画廊 1 日","延庆 · 自驾",148,21,IMG.road],["十渡峡谷漂流 1 日","房山 · 户外",132,19,IMG.lake],["海坨山谷露营 2 日","延庆 · 露营",117,17,IMG.camp]
  ],
  广州:[
    ["从化溪头村徒步 1 日","从化 · 徒步",289,34,IMG.forest],["惠州双月湾度假 2 日","惠州 · 海滨",263,31,IMG.sea],["清远古龙峡漂流 1 日","清远 · 户外",238,29,IMG.lake],["肇庆鼎湖山轻徒步 1 日","肇庆 · 山野",214,27,IMG.mountain],["珠海外伶仃岛 2 日","珠海 · 海岛",195,30,IMG.sea],["韶关丹霞山 2 日","韶关 · 摄影",176,24,IMG.autumn],["佛山岭南古村 1 日","佛山 · 人文",158,22,IMG.village],["江门开平碉楼 2 日","江门 · 人文",141,20,IMG.city],["汕尾红海湾 2 日","汕尾 · 海滨",126,18,IMG.sea],["东莞银瓶山徒步 1 日","东莞 · 徒步",109,16,IMG.mountain]
  ],
  深圳:[
    ["东西涌海岸线徒步 1 日","深圳 · 海岸",278,33,IMG.sea],["大鹏半岛海滨度假 2 日","大鹏 · 海滨",254,30,IMG.sea],["惠州罗浮山轻徒步 1 日","惠州 · 山野",231,28,IMG.mountain],["珠海桂山岛漫游 2 日","珠海 · 海岛",209,26,IMG.sea],["清远英西峰林 2 日","清远 · 徒步",188,24,IMG.forest],["东莞银瓶山穿越 1 日","东莞 · 徒步",171,23,IMG.mountain],["顺德美食寻味 1 日","佛山 · 美食",154,21,IMG.city],["汕尾红海湾露营 2 日","汕尾 · 露营",139,20,IMG.camp],["中山古镇漫游 1 日","中山 · 人文",122,18,IMG.village],["南昆山森林氧吧 2 日","惠州 · 度假",106,16,IMG.forest]
  ],
  郑州:[
    ["嵩山少林徒步 1 日","登封 · 徒步",265,31,IMG.mountain],["云台山峡谷之旅 2 日","焦作 · 山水",243,29,IMG.lake],["洛阳老君山 2 日","洛阳 · 山野",221,27,IMG.mountain],["开封古城寻味 1 日","开封 · 人文",199,25,IMG.village],["宝泉秘境戏水 1 日","新乡 · 山水",181,23,IMG.lake],["万仙山郭亮村 2 日","新乡 · 古村",164,22,IMG.village],["伏羲山峡谷徒步 1 日","新密 · 徒步",148,20,IMG.forest],["洛阳白云山 2 日","洛阳 · 避暑",132,19,IMG.mountain],["黄河三峡游船 1 日","济源 · 山水",117,17,IMG.lake],["尧山赏秋之旅 2 日","平顶山 · 摄影",102,16,IMG.autumn]
  ],
  西安:[
    ["华山经典徒步 2 日","渭南 · 徒步",292,34,IMG.mountain],["太白山高山穿越 2 日","宝鸡 · 山野",268,31,IMG.snow],["壶口瀑布壮游 2 日","延安 · 风光",245,29,IMG.lake],["秦岭终南山 1 日","西安 · 徒步",222,27,IMG.forest],["兵马俑历史之旅 1 日","临潼 · 人文",201,26,IMG.city],["翠华山赏秋 1 日","长安 · 摄影",183,24,IMG.autumn],["法门寺文化之旅 1 日","宝鸡 · 人文",166,22,IMG.village],["袁家村关中寻味 1 日","咸阳 · 美食",149,20,IMG.village],["汉中油菜花海 2 日","汉中 · 摄影",133,19,IMG.autumn],["延安红色之旅 2 日","延安 · 人文",118,17,IMG.road]
  ],
  苏州:[
    ["太湖西山环岛 1 日","苏州 · 骑行",274,32,IMG.lake],["同里古镇慢游 1 日","吴江 · 古镇",251,29,IMG.village],["周庄水乡漫游 1 日","昆山 · 古镇",229,27,IMG.village],["天平山红枫之旅 1 日","苏州 · 摄影",207,25,IMG.autumn],["穹窿山森林徒步 1 日","苏州 · 徒步",189,24,IMG.forest],["宜兴竹海轻徒步 1 日","无锡 · 山野",172,22,IMG.forest],["南浔古镇寻味 1 日","湖州 · 人文",155,21,IMG.village],["常熟虞山徒步 1 日","常熟 · 徒步",138,19,IMG.mountain],["太湖露营看日落 2 日","苏州 · 露营",123,18,IMG.camp],["千灯古镇漫游 1 日","昆山 · 古镇",107,16,IMG.village]
  ],
  南京:[
    ["牛首山文化之旅 1 日","南京 · 人文",281,33,IMG.city],["高淳国际慢城 1 日","高淳 · 田园",257,30,IMG.autumn],["扬州古城寻味 1 日","扬州 · 人文",234,28,IMG.village],["镇江西津渡 1 日","镇江 · 古镇",212,26,IMG.village],["茅山轻徒步 1 日","句容 · 徒步",193,24,IMG.mountain],["皖南川藏线 2 日","宣城 · 自驾",176,23,IMG.road],["溧阳南山竹海 1 日","常州 · 山野",159,21,IMG.forest],["无锡拈花湾夜游 1 日","无锡 · 休闲",142,20,IMG.city],["池杉湖湿地摄影 1 日","南京 · 摄影",126,18,IMG.lake],["黄山赏秋 2 日","黄山 · 摄影",111,17,IMG.mountain]
  ],
  无锡:[
    ["鼋头渚太湖风光 1 日","无锡 · 摄影",270,32,IMG.lake],["宜兴竹海轻徒步 1 日","宜兴 · 山野",248,29,IMG.forest],["拈花湾禅意夜游 1 日","无锡 · 休闲",226,27,IMG.city],["惠山古镇寻味 1 日","无锡 · 古镇",204,25,IMG.village],["苏州园林漫游 1 日","苏州 · 人文",186,24,IMG.village],["天目湖山水之旅 1 日","常州 · 山水",169,22,IMG.lake],["溧阳南山竹海 1 日","溧阳 · 徒步",152,21,IMG.forest],["南浔古镇慢游 1 日","湖州 · 古镇",136,19,IMG.village],["太湖露营看日落 2 日","无锡 · 露营",121,18,IMG.camp],["江阴滨江骑行 1 日","江阴 · 骑行",105,16,IMG.road]
  ],
  宁波:[
    ["四明山红枫之旅 1 日","宁波 · 摄影",283,33,IMG.autumn],["舟山普陀山 2 日","舟山 · 人文",260,30,IMG.sea],["象山石浦渔港 2 日","象山 · 海滨",237,28,IMG.sea],["东钱湖环湖骑行 1 日","宁波 · 骑行",215,26,IMG.lake],["奉化雪窦山 1 日","奉化 · 山野",196,25,IMG.mountain],["宁海古道徒步 1 日","宁海 · 徒步",178,23,IMG.forest],["绍兴古城漫游 1 日","绍兴 · 人文",161,21,IMG.village],["台州神仙居 2 日","台州 · 山野",144,20,IMG.mountain],["仙居公盂徒步 2 日","仙居 · 徒步",128,18,IMG.forest],["东极岛海风之旅 2 日","舟山 · 海岛",112,17,IMG.sea]
  ]
};

const categoryNames={nearby:"周边游",domestic:"国内游",outbound:"出境游"};
const routes=[
  ...Object.entries(nearbyCitySeed).flatMap(([city,items])=>items.map((r,index)=>({id:`nearby-${city}-${index}`,category:"nearby",city,rank:index+1,name:r[0],meta:r[1],signups:r[2],assets:r[3],image:r[4]}))),
  ...["domestic","outbound"].flatMap(category=>routeSeed[category].map((r,index)=>({id:`${category}-${index}`,category,rank:index+1,name:r[0],meta:r[1],signups:r[2],assets:r[3],image:r[4]})))
];
let activeCategory="nearby", activeNearbyCity="杭州", activeLibraryTab="ready", activeGenericTab="ready", currentRoute=null, selectionMode=false, selected=new Set(), previewItem=null, previewItems=[], previewIndex=0, previewTouchStart=0, readyBatchOffset=0, readyCaptionIndex=0, genericBatchOffset=0, genericCaptionIndex=0, toastTimer;

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const bg=url=>`style="background-image:url('${url}')"`;

$("#backToLeaderHome").addEventListener("click",()=>{window.location.href="../leader/my.html"});

function renderGeneric(){
  const grid=$("#genericGrid");
  const isReady=activeGenericTab==="ready";
  grid.classList.toggle("ready-mode",isReady);
  $("#selectToggle").hidden=isReady;
  if(isReady){
    const images=getHotReadyImages();
    const post=readyPosts[genericCaptionIndex];
    grid.innerHTML=`<section class="publish-kit hot-publish-kit"><div class="kit-head"><div><span class="kit-step">01</span><strong>发布配图</strong><small>已选 9 张</small></div><div class="kit-actions"><button data-hot-action="refresh-images">↻ 换一批</button><button class="kit-primary" data-hot-action="save-images">保存全部</button></div></div><div class="nine-grid">${images.map((item,index)=>`<button data-hot-ready-image="${index}" ${bg(item.image)} aria-label="预览第 ${index+1} 张配图"></button>`).join("")}</div><div class="kit-divider"></div><div class="kit-head copy-head"><div><span class="kit-step">02</span><strong>推荐文案</strong><small>文案和话题已搭配好</small></div><div class="kit-actions"><button data-hot-action="refresh-caption">↻ 换一条</button><button class="kit-primary" data-hot-action="copy-caption">复制文案</button></div></div><div class="post-copy"><p>${post.text}</p><div class="topic-list">${post.topics.map(topic=>`<span>${topic}</span>`).join("")}</div></div></section>`;
    return;
  }
  const type=activeGenericTab==="photos"?"图片":"视频";
  const items=genericMaterials.filter(item=>item.type===type);
  grid.innerHTML=items.map(item=>`<button class="material-card ${selected.has(item.id)?"selected":""}" data-generic="${item.id}" aria-label="预览${item.type}"><div class="material-thumb" ${bg(item.image)}><span class="material-type">${item.type}</span>${item.type==="视频"?'<span class="video-play">▶</span>':""}${selectionMode?'<span class="select-circle"></span>':""}</div></button>`).join("");
}

function routeMarkup(route,index=route.rank){return `<button class="route-card ${route.assets===0?"no-assets":""}" data-route="${route.id}"><span class="rank">${String(index).padStart(2,"0")}</span><span class="route-thumb" ${bg(route.image)}></span><span class="route-info"><h3>${route.name}</h3><p>${route.meta}</p><span class="route-stats"><span class="signup">上周 ${route.signups} 人报名</span><span class="asset-count">${route.assets} 份素材</span></span></span><span class="route-chevron">›</span></button>`}
function renderCityFilters(){const filters=$("#cityFilters");filters.hidden=activeCategory!=="nearby";const select=$("#citySelect");if(!select.options.length)select.innerHTML=nearbyCities.map(city=>`<option value="${city}">${city}站</option>`).join("");select.value=activeNearbyCity}
function renderRoutes(){renderCityFilters();const list=routes.filter(r=>r.category===activeCategory&&(activeCategory!=="nearby"||r.city===activeNearbyCity)).slice(0,10);$("#routeList").innerHTML=list.map(r=>routeMarkup(r)).join("")}

function setPage(id){$$('.page').forEach(p=>{p.hidden=p.id!==id;p.classList.toggle("page-active",p.id===id)});window.scrollTo({top:0,behavior:"instant"})}
function showToast(message){clearTimeout(toastTimer);const el=$("#toast");el.textContent=message;el.classList.add("show");toastTimer=setTimeout(()=>el.classList.remove("show"),2100)}
function openOverlay(id){$("#scrim").hidden=false;$(id).hidden=false;document.body.style.overflow="hidden"}
function closeOverlays(){$$(".bottom-sheet").forEach(x=>x.hidden=true);$("#previewSheet").classList.remove("generic-carousel");$("#scrim").hidden=true;document.body.style.overflow=""}

function renderPreviewSlide(){
  previewItem=previewItems[previewIndex];
  $("#previewMedia").style.backgroundImage=`url('${previewItem.image}')`;
  $("#previewLabel").textContent=previewItem.label||"原始素材";
  $("#previewTitle").textContent=previewItem.title||"线路素材";
  $("#previewMeta").innerHTML=previewItem.type==="视频"
    ? '<div><dt>素材类型</dt><dd>视频</dd></div><div><dt>上传人</dt><dd>九七/李阳</dd></div><div><dt>拍摄日期</dt><dd>2026-10-11</dd></div>'
    : '<div><dt>图片大小</dt><dd>4.2MB</dd></div><div><dt>上传人</dt><dd>九七/李阳</dd></div><div><dt>拍摄日期</dt><dd>2026-10-11</dd></div>';
  $("#previewCounter").textContent=`${previewIndex+1} / ${previewItems.length}`;
}

function movePreview(step){
  previewIndex=(previewIndex+step+previewItems.length)%previewItems.length;
  renderPreviewSlide();
}

function openPreview(item,items=null){
  previewItems=items||[item];
  previewIndex=Math.max(0,previewItems.findIndex(entry=>entry.id===item.id));
  const carousel=previewItems.length>1;
  $("#previewSheet").classList.toggle("generic-carousel",carousel);
  $("#previewCounter").hidden=!carousel;
  $("#previewPrev").hidden=!carousel;
  $("#previewNext").hidden=!carousel;
  renderPreviewSlide();
  openOverlay("#previewSheet");
}

function updateSelection(){const n=selected.size;$("#selectedCount").textContent=n;$("#saveSelected").disabled=!n;renderGeneric()}
function toggleSelectionMode(on){selectionMode=on;selected.clear();$("#selectionBar").hidden=!on;$("#selectToggle").textContent=on?"取消选择":"批量选择";updateSelection()}

function openLibrary(route){currentRoute=route;activeLibraryTab="ready";readyBatchOffset=0;readyCaptionIndex=0;$("#libraryCoverImage").style.backgroundImage=`url('${route.image}')`;$("#libraryBadge").textContent=`${categoryNames[route.category]} TOP ${route.rank}`;$("#libraryTitle").textContent=route.name;$("#libraryMeta").textContent=`上周 ${route.signups} 人报名 · ${route.assets} 份素材`;$("#readyCount").textContent=route.assets===0?"0":"1";$("#photoCount").textContent=route.assets===0?"0":"18";$("#videoCount").textContent=route.assets===0?"0":"10";$(".library-body").classList.toggle("empty-mode",route.assets===0);$$('.library-tab').forEach((t,i)=>t.classList.toggle("active",i===0));renderLibrary();setPage("libraryPage")}

const captions=["风吹过山野，也把烦恼带走了。","这一路的风景，值得慢慢收藏。","不用滤镜，这里的秋天已经足够浪漫。","短暂逃离城市，去山里好好呼吸。"];
const readyPosts=[
  {text:"秋天就该去山里走走，把风景和好心情一起带回来。",topics:["#周末去哪儿","#徒步旅行","#秋日出游"]},
  {text:"这一程没有赶路，只有风吹山野和一路好心情。",topics:["#旅行碎片","#户外生活","#治愈系风景"]},
  {text:"短暂离开城市，去看山、看云，也看看更松弛的自己。",topics:["#说走就走","#山野生活","#旅行推荐"]},
  {text:"好风景不必远求，周末出发，去收藏一路的秋色。",topics:["#周边游","#周末出逃计划","#发现宝藏旅行地"]}
];

function getHotReadyImages(){
  const images=[IMG.autumn,IMG.mountain,IMG.camp,IMG.lake,IMG.snow,IMG.sea,IMG.road,IMG.forest,IMG.city,IMG.japan];
  return Array.from({length:9},(_,index)=>({id:`hot-ready-${genericBatchOffset}-${index}`,image:images[(index+genericBatchOffset)%images.length],type:"图片",title:`热门配图 ${index+1}`,label:"直接发布配图"}));
}

function getReadyImages(){
  const images=[currentRoute.image,IMG.mountain,IMG.lake,IMG.road,IMG.autumn,IMG.camp,IMG.snow,IMG.forest,IMG.sea,IMG.village];
  return Array.from({length:9},(_,index)=>({id:`ready-${currentRoute.id}-${readyBatchOffset}-${index}`,image:images[(index+readyBatchOffset)%images.length],type:"图片",title:`${currentRoute.name} · 配图 ${index+1}`,label:"直接发布配图"}));
}
function getLibraryAssets(){
  const isVideo=activeLibraryTab==="videos";
  const images=[currentRoute.image,IMG.mountain,IMG.lake,IMG.road,IMG.autumn,IMG.camp,IMG.snow,IMG.forest,IMG.sea,IMG.village];
  return images.map((image,index)=>({
    id:`${currentRoute.id}-${activeLibraryTab}-${index}`,
    image,
    type:isVideo?"视频":"图片",
    duration:isVideo?`00:${12+index*3}`:null,
    title:`${currentRoute.name} · 素材 ${index+1}`,
    label:"官方素材"
  }));
}

function renderLibrary(){
  const c=$("#libraryContent");
  if(currentRoute.assets===0){
    c.innerHTML=`<div class="library-empty"><div class="empty-landscape" aria-hidden="true"><span class="empty-sun"></span><span class="empty-mountain mountain-back"></span><span class="empty-mountain mountain-front"></span><span class="empty-road"></span></div><h2>抱歉，素材正在来的路上</h2><p>工作人员正在快马加鞭准备中</p></div>`;
    return;
  }
  if(activeLibraryTab==="ready"){
    const images=getReadyImages();
    const post=readyPosts[readyCaptionIndex];
    c.innerHTML=`<section class="publish-kit"><div class="kit-head"><div><span class="kit-step">01</span><strong>发布配图</strong><small>已选 9 张</small></div><div class="kit-actions"><button data-ready-action="refresh-images">↻ 换一批</button><button class="kit-primary" data-ready-action="save-images">保存全部</button></div></div><div class="nine-grid">${images.map((item,index)=>`<button data-ready-image="${index}" ${bg(item.image)} aria-label="预览第 ${index+1} 张配图"></button>`).join("")}</div><div class="kit-divider"></div><div class="kit-head copy-head"><div><span class="kit-step">02</span><strong>推荐文案</strong><small>文案和话题已搭配好</small></div><div class="kit-actions"><button data-ready-action="refresh-caption">↻ 换一条</button><button class="kit-primary" data-ready-action="copy-caption">复制文案</button></div></div><div class="post-copy"><p>${post.text}</p><div class="topic-list">${post.topics.map(topic=>`<span>${topic}</span>`).join("")}</div></div></section>`;
  }else{
    const items=getLibraryAssets();
    c.innerHTML=`<div class="asset-grid">${items.map((item,index)=>`<button class="asset-card" data-asset="${index}" ${bg(item.image)} aria-label="预览${item.type}"><span class="asset-duration">${item.type}</span>${item.type==="视频"?'<span class="video-play">▶</span>':""}</button>`).join("")}</div>`;
  }
}

function openPackage(index){const image=[currentRoute.image,IMG.camp,IMG.road][index];const title=["这一程，风景比想象更自由","把快乐留在山野里","出发，去见更大的世界"][index];const caption=captions[index];$("#packageMedia").style.backgroundImage=`url('${image}')`;$("#packageTitle").textContent=title;$("#packageMediaMeta").textContent=index===1?"1 段视频":`${index+4} 张图片`;$("#captionInput").value=caption;$("#captionCount").textContent=caption.length;openOverlay("#packageSheet")}

function search(value){const q=value.trim().toLowerCase();$("#searchIntro").hidden=!!q;if(!q){$("#searchResults").innerHTML="";return}const found=routes.filter(r=>(r.name+r.meta).toLowerCase().includes(q));$("#searchResults").innerHTML=found.length?found.map((r,i)=>routeMarkup(r,i+1)).join(""):`<div class="empty"><strong>没有找到相关线路</strong>试试输入完整的线路名或目的地</div>`}

$("#genericGrid").addEventListener("click",async e=>{const hotAction=e.target.closest("[data-hot-action]");if(hotAction){const action=hotAction.dataset.hotAction;if(action==="refresh-images"){genericBatchOffset=(genericBatchOffset+1)%10;renderGeneric();showToast("已换一批热门配图")}if(action==="save-images")showToast("正在保存 9 张图片到相册…");if(action==="refresh-caption"){genericCaptionIndex=(genericCaptionIndex+1)%readyPosts.length;renderGeneric();showToast("已更换文案和话题")}if(action==="copy-caption"){const post=readyPosts[genericCaptionIndex];const text=`${post.text}\n${post.topics.join(" ")}`;try{await navigator.clipboard.writeText(text)}catch{}showToast("文案和话题已复制")}return}const readyImage=e.target.closest("[data-hot-ready-image]");if(readyImage){const items=getHotReadyImages();return openPreview(items[Number(readyImage.dataset.hotReadyImage)],items)}const card=e.target.closest("[data-generic]");if(!card)return;const item=genericMaterials.find(x=>x.id===card.dataset.generic);const visibleItems=genericMaterials.filter(entry=>entry.type===item.type);if(selectionMode){selected.has(item.id)?selected.delete(item.id):selected.add(item.id);updateSelection()}else openPreview(item,visibleItems)});
$$('.generic-tab').forEach(tab=>tab.addEventListener("click",()=>{if(selectionMode)toggleSelectionMode(false);activeGenericTab=tab.dataset.genericTab;$$('.generic-tab').forEach(item=>item.classList.toggle("active",item===tab));renderGeneric()}));
$("#selectToggle").addEventListener("click",()=>toggleSelectionMode(!selectionMode));
$("#cancelSelection").addEventListener("click",()=>toggleSelectionMode(false));
$("#saveSelected").addEventListener("click",()=>{const n=selected.size;showToast(`正在保存 ${n} 个素材到相册…`);setTimeout(()=>{toggleSelectionMode(false);showToast(`${n} 个素材已保存到相册`)},850)});
$("#saveSingle").addEventListener("click",()=>{closeOverlays();showToast(`${previewItem.type}已保存到相册`)});
$("#previewPrev").addEventListener("click",()=>movePreview(-1));
$("#previewNext").addEventListener("click",()=>movePreview(1));
$("#previewMedia").addEventListener("touchstart",e=>{previewTouchStart=e.changedTouches[0].clientX},{passive:true});
$("#previewMedia").addEventListener("touchend",e=>{const distance=e.changedTouches[0].clientX-previewTouchStart;if(previewItems.length>1&&Math.abs(distance)>45)movePreview(distance<0?1:-1)},{passive:true});
document.addEventListener("keydown",e=>{if($("#previewSheet").hidden||previewItems.length<2)return;if(e.key==="ArrowLeft")movePreview(-1);if(e.key==="ArrowRight")movePreview(1)});

$$('.route-tab').forEach(tab=>tab.addEventListener("click",()=>{activeCategory=tab.dataset.category;$$('.route-tab').forEach(t=>t.classList.toggle("active",t===tab));renderRoutes()}));
$("#citySelect").addEventListener("change",e=>{activeNearbyCity=e.target.value;renderRoutes()});
function routeClick(e){const card=e.target.closest("[data-route]");if(card)openLibrary(routes.find(r=>r.id===card.dataset.route))}
$("#routeList").addEventListener("click",routeClick);$("#searchResults").addEventListener("click",routeClick);
$("#openSearch").addEventListener("click",()=>{setPage("searchPage");setTimeout(()=>$("#searchInput").focus(),100)});
$$('[data-back]').forEach(button=>button.addEventListener("click",()=>setPage("homePage")));
$("#searchInput").addEventListener("input",e=>search(e.target.value));
$$('[data-keyword]').forEach(btn=>btn.addEventListener("click",()=>{$("#searchInput").value=btn.dataset.keyword;search(btn.dataset.keyword)}));

$$('.library-tab').forEach(tab=>tab.addEventListener("click",()=>{activeLibraryTab=tab.dataset.libraryTab;$$('.library-tab').forEach(t=>t.classList.toggle("active",t===tab));renderLibrary()}));
$("#libraryContent").addEventListener("click",async e=>{const readyAction=e.target.closest("[data-ready-action]");if(readyAction){const action=readyAction.dataset.readyAction;if(action==="refresh-images"){readyBatchOffset=(readyBatchOffset+1)%10;renderLibrary();showToast("已换一批配图")}if(action==="save-images")showToast("正在保存 9 张图片到相册…");if(action==="refresh-caption"){readyCaptionIndex=(readyCaptionIndex+1)%readyPosts.length;renderLibrary();showToast("已更换文案和话题")}if(action==="copy-caption"){const post=readyPosts[readyCaptionIndex];const text=`${post.text}\n${post.topics.join(" ")}`;try{await navigator.clipboard.writeText(text)}catch{}showToast("文案和话题已复制")}return}const readyImage=e.target.closest("[data-ready-image]");if(readyImage){const items=getReadyImages();return openPreview(items[Number(readyImage.dataset.readyImage)],items)}const asset=e.target.closest("[data-asset]");if(asset){const items=getLibraryAssets();const item=items[Number(asset.dataset.asset)];openPreview(item,items)}});
$("#captionInput").addEventListener("input",e=>$("#captionCount").textContent=e.target.value.length);
$("#saveAndCopy").addEventListener("click",async()=>{const text=$("#captionInput").value;try{await navigator.clipboard.writeText(text)}catch{}$("#packageSheet").hidden=true;$("#platformSheet").hidden=false});
$$('[data-platform]').forEach(btn=>btn.addEventListener("click",()=>{closeOverlays();showToast(`正在打开${btn.dataset.platform}…`)}));
$$('[data-close]').forEach(btn=>btn.addEventListener("click",closeOverlays));$("#scrim").addEventListener("click",closeOverlays);
$("#helpButton").addEventListener("click",()=>showToast("挑素材 → 保存到相册 → 去社交平台发布"));

renderGeneric();renderRoutes();
