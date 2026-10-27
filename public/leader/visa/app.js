const TYPES = {
  japan: { name: '日本签证', flag: '🇯🇵', countries: ['日本'] },
  schengen: { name: '申根签证', flag: '🇪🇺', countries: ['西班牙', '匈牙利', '法国', '意大利', '冰岛', '其他'] },
  uk: { name: '英国签证', flag: '🇬🇧', countries: ['英国'] },
  usa: { name: '美国签证', flag: '🇺🇸', countries: ['美国'] },
  korea: { name: '韩国签证', flag: '🇰🇷', countries: ['韩国'] },
  iceland: { name: '冰岛签证', flag: '🇮🇸', countries: ['冰岛'] },
  hkmo: { name: '港澳通行证', short: '港澳通行证', flag: '🇭🇰', countries: ['中国香港 / 澳门'] }
};
const SELECTABLE_TYPES = ['japan', 'korea', 'uk', 'usa', 'schengen', 'hkmo'];

const DEFAULT_VISAS = [
  { id: 1, type: 'japan', country: '日本', number: 'JP4826', start: '2026-08-12', end: '2027-08-11', reviewStatus: 'approved', image: '' },
  { id: 2, type: 'schengen', country: '法国', number: 'FR7319', start: '2026-04-02', end: '2027-04-01', reviewStatus: 'pending', image: '' },
  { id: 3, type: 'usa', country: '美国', number: 'US9051', start: '2015-01-18', end: '2025-01-17', reviewStatus: 'approved', image: '' },
  { id: 4, type: 'hkmo', country: '中国香港 / 澳门', number: 'C8803127', start: '2024-10-08', end: '2034-10-07', reviewStatus: 'rejected', image: '' }
];

let visas = JSON.parse(localStorage.getItem('visa-demo') || 'null') || DEFAULT_VISAS;
visas = visas.map(visa => visa.type === 'iceland' ? { ...visa, type: 'schengen', country: '冰岛' } : visa);
if (!visas.some(v => v.type === 'hkmo')) visas.push(DEFAULT_VISAS[3]);
const demoJapan = visas.find(v => v.type === 'japan');
const demoSchengen = visas.find(v => v.type === 'schengen');
const demoUsa = visas.find(v => v.type === 'usa');
const demoHkmo = visas.find(v => v.type === 'hkmo');
if (demoJapan) demoJapan.reviewStatus = 'approved';
if (demoSchengen) demoSchengen.reviewStatus = 'pending';
if (demoUsa) { demoUsa.reviewStatus = 'approved'; demoUsa.start = '2015-01-18'; demoUsa.end = '2025-01-17'; }
if (demoHkmo) demoHkmo.reviewStatus = 'rejected';
let activeTab = 'documents';
let pendingImage = '';
const app = document.querySelector('#app');
const save = () => localStorage.setItem('visa-demo', JSON.stringify(visas));
save();

const fmt = value => new Date(value + 'T00:00:00').toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '.');
const days = visa => Math.max(0, Math.ceil((new Date(visa.end) - new Date()) / 86400000));
const status = visa => visa.reviewStatus === 'pending' ? ['待审核', 'pending'] : visa.reviewStatus === 'rejected' ? ['已驳回', 'rejected'] : days(visa) > 0 ? ['有效', ''] : ['已过期', 'expired'];

function mainHeader() {
  return `<header class="manager-header"><button class="manager-back" aria-label="返回我的页面" onclick="window.location.href='../my.html'">‹</button><h1>证件管理</h1><span class="header-spacer"></span></header>
    <nav class="module-tabs" aria-label="证件信息板块">
      <button class="module-tab ${activeTab === 'documents' ? 'active' : ''}" onclick="switchTab('documents')">证件信息</button>
      <button class="module-tab ${activeTab === 'travel' ? 'active' : ''}" onclick="switchTab('travel')">出入境信息</button>
    </nav>`;
}

function subHeader(title) {
  return `<header class="topbar"><button class="icon-btn" aria-label="返回" onclick="renderTravel()">‹</button><h1>${title}</h1><span class="header-spacer"></span></header>`;
}

function switchTab(tab) {
  activeTab = tab;
  tab === 'documents' ? renderDocuments() : renderTravel();
}

function renderDocuments() {
  activeTab = 'documents';
  const documents = [
    { name: '身份证', number: '41070*********019', state: '生效中', style: 'identity' },
    { name: '导游证', number: 'YDW8466X', state: '生效中', style: 'guide' },
    { name: '急救证', style: 'first-aid' },
    { name: '户外指导员证', style: 'outdoor' },
    { name: '护照', style: 'passport' }
  ];
  app.innerHTML = `${mainHeader()}<section class="module-screen document-list" aria-label="证件信息">
    ${documents.map(documentCard).join('')}
  </section>`;
}

function documentCard(doc) {
  return `<article class="credential-card ${doc.style}">
    <h2>${doc.name}</h2>
    <div class="credential-meta">${doc.number ? `<span class="credential-number">${doc.number}</span><span class="credential-state">${doc.state}</span>` : '<span class="add-document">+ 添加证件</span>'}</div>
  </article>`;
}

function renderTravel() {
  activeTab = 'travel';
  app.innerHTML = `${mainHeader()}<section class="module-screen travel-screen">
    <div class="section travel-section">
      ${visas.map(card).join('') || '<div class="empty">还没有出入境证件</div>'}
      <button class="add-visa-button" onclick="edit()">＋ 新增证件</button>
    </div>
  </section>`;
}

function card(visa) {
  const type = TYPES[visa.type] || TYPES.japan;
  const currentStatus = status(visa);
  return `<button class="visa-card" onclick="detail(${visa.id})"><div class="card-top"><span class="visa-title"><strong>${type.name}</strong><small>${visa.country}签发</small></span><span class="badge ${currentStatus[1]}">${currentStatus[0]}</span></div><div class="card-foot"><span>${fmt(visa.start)} — ${fmt(visa.end)}</span></div></button>`;
}

function detail(id) {
  const visa = visas.find(v => v.id === id);
  const type = TYPES[visa.type];
  const currentStatus = status(visa);
  app.innerHTML = `${subHeader('证件详情')}<section class="screen detail-screen"><div class="detail-hero"><div class="detail-heading"><div><h2>${type.name}</h2><p>${visa.country}签发</p></div><span class="badge ${currentStatus[1]}">${currentStatus[0]}</span></div><div class="hero-info"><div class="hero-row"><span>证件号码</span><strong id="num">•••• ${visa.number.slice(-4)} <button class="hero-eye" onclick="toggleNum('${visa.number}')" aria-label="显示证件号码">◉</button></strong></div><div class="hero-dates"><div><span>生效日期</span><strong>${fmt(visa.start)}</strong></div><div><span>有效期至</span><strong>${fmt(visa.end)}</strong></div></div></div></div><div class="document"><div class="section-title"><h3>证件照片</h3><span>⌗</span></div><div class="doc-image">${visa.image ? `<img src="${visa.image}" alt="已上传的证件照片">` : `<div class="doc-mark"><b>${type.flag} VISA</b><span>证件页安全预览</span></div>`}</div></div><button class="detail-delete" onclick="removeVisa(${visa.id})">删除当前证件</button></section>`;
}

function toggleNum(number) {
  document.querySelector('#num').innerHTML = `${number} <button class="hero-eye" onclick="toggleNum('${number}')">隐藏</button>`;
}

function edit(id) {
  const visa = id ? visas.find(v => v.id === id) : { type: 'japan', country: '日本', number: '', start: '', end: '', image: '' };
  pendingImage = visa.image || '';
  app.innerHTML = `${subHeader(id ? '编辑出入境证件' : '新增出入境证件')}<section class="edit-screen"><form class="form" onsubmit="submitForm(event,${id || 0})"><label class="upload"><input hidden type="file" accept="image/jpeg,image/png" onchange="photo(event)"><div class="upload-preview" id="preview">${pendingImage ? `<img src="${pendingImage}" alt="证件照片预览">` : '<div class="upload-empty"><span class="upload-icon">＋</span><b>添加证件页照片</b><small>请确保信息完整、画面清晰</small></div>'}</div><div class="upload-copy"><b>${pendingImage ? '点击更换照片' : '从相册选择照片'}</b><small>JPG 或 PNG，最大 10MB</small></div></label><div class="field"><label>证件类型 <i class="req">*</i></label><select class="input" id="type" onchange="syncCountries()">${SELECTABLE_TYPES.map(key => `<option value="${key}" ${visa.type === key ? 'selected' : ''}>${TYPES[key].name}</option>`).join('')}</select></div><div class="field"><label>签发国家/地区 <i class="req">*</i></label><select class="input" id="country" data-value="${visa.country}"></select><div class="hint" id="schengenHint"></div></div><div class="field"><label>证件号码 <i class="req">*</i></label><input class="input" id="number" required value="${visa.number}" placeholder="请输入证件号码"></div><div class="grid"><div class="field"><label>生效日期 <i class="req">*</i></label><input class="input" id="start" type="date" required value="${visa.start}"></div><div class="field"><label>有效期至 <i class="req">*</i></label><input class="input" id="end" type="date" required value="${visa.end}"></div></div><div class="hint">🔒 证件信息仅保存在当前设备</div>${id ? `<button type="button" class="secondary danger" style="margin-top:20px" onclick="removeVisa(${id})">删除该证件</button>` : ''}<div class="bottom-actions"><button class="primary" type="submit">保存证件信息</button></div></form></section>`;
  syncCountries();
}

function syncCountries() {
  const select = document.querySelector('#type');
  const country = document.querySelector('#country');
  if (!select || !country) return;
  const previous = country.dataset.value || country.value;
  country.innerHTML = TYPES[select.value].countries.map(item => `<option ${item === previous ? 'selected' : ''}>${item}</option>`).join('');
  country.disabled = select.value !== 'schengen';
  country.classList.toggle('readonly-select', country.disabled);
  document.querySelector('#schengenHint').textContent = select.value === 'schengen' ? '请选择实际签发该申根签证的国家/地区' : '已根据证件类型自动匹配';
  country.dataset.value = '';
}

function photo(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) return toast('图片不能超过 10MB');
  const reader = new FileReader();
  reader.onload = () => { pendingImage = reader.result; document.querySelector('#preview').innerHTML = `<img src="${pendingImage}" alt="证件照片预览">`; };
  reader.readAsDataURL(file);
}

function submitForm(event, id) {
  event.preventDefault();
  const type = document.querySelector('#type').value;
  const data = { id: id || Date.now(), type, country: document.querySelector('#country').value, number: document.querySelector('#number').value.trim(), start: document.querySelector('#start').value, end: document.querySelector('#end').value, reviewStatus: id ? (visas.find(v => v.id === id).reviewStatus || 'approved') : 'pending', image: pendingImage };
  if (data.end < data.start) return toast('有效期不能早于生效日期');
  if (id) visas = visas.map(v => v.id === id ? data : v); else visas.unshift(data);
  save(); detail(data.id); toast('证件信息已保存');
}

function removeVisa(id) {
  if (confirm('确认删除这份证件信息吗？')) { visas = visas.filter(v => v.id !== id); save(); renderTravel(); toast('已删除'); }
}

function showTypeSheet() {
  alert('支持的出入境证件\n\n🇯🇵 日本签证\n🇰🇷 韩国签证\n🇬🇧 英国签证\n🇺🇸 美国签证\n🇪🇺 申根签证\n🇭🇰 港澳通行证');
}

function toast(message) {
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 1800);
}

renderDocuments();
