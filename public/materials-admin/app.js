const imageUrls=[
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=82&sat=-15",
  "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=700&q=82"
];
const names=["易涟","九七","李阳","阿牧","小北","陈野","木棉"];
const routes=["莫干山秋日徒步","徽杭古道轻徒步","安吉云上草原","舟山海岛漫游"];
const photos=Array.from({length:48},(_,index)=>{
  const day=28-Math.floor(index/5), hour=17-(index%8), minute=String((index*7)%60).padStart(2,"0");
  return {id:`YXK-${String(2026103001+index)}`,image:imageUrls[index%imageUrls.length],route:index<34?routes[0]:routes[((index-34)%3)+1],uploader:names[index%names.length],uploadedAt:`2026-10-${String(day).padStart(2,"0")} ${String(hour).padStart(2,"0")}:${minute}`,shotAt:`2026-10-${String(Math.max(1,day-2)).padStart(2,"0")} ${String(Math.max(8,hour-2)).padStart(2,"0")}:${minute}`,size:`${(2.8+(index%7)*.47).toFixed(1)} MB`,dimensions:index%2?"4032 × 3024":"3024 × 4032",views:126+index*37};
});
let uploadedImages = photos.slice(0, 10).map((photo, index) => ({
  ...photo,
  id: `image-${index}`,
  name: `秋日山野_${String(index + 1).padStart(2, "0")}.jpg`,
  preview: photo.image
}));
let uploadedVideos=imageUrls.slice(3,9).map((preview,index)=>({id:`video-${index}`,name:`山野随拍_${String(index+1).padStart(2,"0")}.mp4`,preview}));
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
let currentPage="library",sortDirection="desc",toastTimer;
const routeRemovedStorageKey = "materials-admin.removed-route-photos";
const removedRoutePhotoIds = new Set();
try {
  const savedIds = JSON.parse(localStorage.getItem(routeRemovedStorageKey) ?? "[]");
  if (Array.isArray(savedIds)) savedIds.forEach(id => removedRoutePhotoIds.add(id));
} catch {
  // The gallery can still work for this session if browser storage is unavailable.
}
const selectedRoutePhotoIds = new Set();
let selectingRoutePhotos = false;
const escapeHtml=value=>String(value).replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]);

function showToast(message){clearTimeout(toastTimer);const toast=$("#toast");toast.textContent=message;toast.classList.add("show");toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function switchPage(page){currentPage=page;$$('.nav-item').forEach(button=>button.classList.toggle('active',button.dataset.page===page));$$('.page').forEach(section=>section.classList.toggle('active',section.id===`${page}Page`));$("#topbarTitle").textContent=page==="library"?"线路素材库":"素材上传";window.scrollTo({top:0,behavior:"instant"})}
function getLibraryPhotos() {
  const query = $("#librarySearch").value.trim().toLowerCase();
  const direction = sortDirection === "desc" ? -1 : 1;
  return photos.filter(photo => photo.route === routes[0]
    && !removedRoutePhotoIds.has(photo.id)
    && photo.uploader.toLowerCase().includes(query))
    .sort((a, b) => direction * a.uploadedAt.localeCompare(b.uploadedAt));
}

function updateRouteSelection() {
  const count = selectedRoutePhotoIds.size;
  $("#routeSelectionCount").textContent = `已选 ${count} 张`;
  $("#removeRouteSelected").disabled = count === 0;
}

function setRouteSelectionMode(active) {
  selectingRoutePhotos = active;
  selectedRoutePhotoIds.clear();
  const toggle = $("#toggleRouteSelection");
  toggle.textContent = active ? "退出多选" : "多选";
  toggle.setAttribute("aria-pressed", String(active));
  $("#routeSelectionBar").hidden = !active;
  updateRouteSelection();
  renderLibrary();
}

function renderLibrary() {
  const list = getLibraryPhotos();
  $("#resultCount").textContent = `共 ${list.length} 张`;
  $("#routePhotoGrid").innerHTML = list.length
    ? list.map(photo => uploadedMediaTile(photo, "image",
      selectingRoutePhotos ? selectedRoutePhotoIds.has(photo.id) : null)).join("")
    : '<div class="upload-empty">没有找到对应上传人的照片</div>';
}

function uploadedMediaTile(asset, type, selected = null) {
  const name = escapeHtml(asset.name ?? asset.id);
  const media = asset.src
    ? `<video src="${escapeHtml(asset.src)}#t=0.001" muted playsinline preload="metadata" aria-hidden="true"></video>`
    : `<img src="${escapeHtml(asset.preview ?? asset.image)}" alt="" loading="lazy" />`;
  const selecting = selected !== null;
  return `<article class="uploaded-photo-tile" data-uploaded-id="${asset.id}" data-uploaded-type="${type}">
    <button class="open-uploaded-photo" type="button" aria-label="${selecting ? "选择" : "查看"} ${name}"${selecting ? ` aria-pressed="${selected}"` : ""}>
      ${media}
      ${type === "video" ? '<span class="video-play" aria-hidden="true">▶</span>' : ""}
      ${selecting ? '<span class="route-photo-check" aria-hidden="true">✓</span>' : ""}
    </button>
  </article>`;
}

function renderUploadedAssets() {
  $("#uploadedImageCount").textContent = `共 ${uploadedImages.length} 张`;
  $("#uploadedVideoCount").textContent = `共 ${uploadedVideos.length} 个`;
  $("#uploadedImageGrid").innerHTML = uploadedImages.length
    ? uploadedImages.map(asset => uploadedMediaTile(asset, "image")).join("")
    : '<div class="upload-empty">暂无已上传图片</div>';
  $("#uploadedVideoGrid").innerHTML = uploadedVideos.length
    ? uploadedVideos.map(asset => uploadedMediaTile(asset, "video")).join("")
    : '<div class="upload-empty">暂无已上传视频</div>';
}

function addUploadedFiles(files, type) {
  const isImage = type === "image";
  const uploadedAt = new Date().toLocaleString("zh-CN", { hour12: false });
  const assets = Array.from(files, (file, index) => {
    const objectUrl = URL.createObjectURL(file);
    return {
      id: `${type}-${Date.now()}-${index}`,
      name: file.name,
      preview: isImage ? objectUrl : "",
      src: isImage ? "" : objectUrl,
      objectUrl: true,
      downloads: 0,
      uploadedAt,
      size: file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    };
  });
  if (isImage) uploadedImages = [...assets, ...uploadedImages];
  else uploadedVideos = [...assets, ...uploadedVideos];
  renderUploadedAssets();
  showToast(`已上传 ${assets.length} ${isImage ? "张图片" : "个视频"}`);
}

const photoViewer = $("#uploadedPhotoViewer");
const viewerStage = $("#uploadedViewerStage");
const fullPhoto = $("#uploadedFullPhoto");
const fullVideo = $("#uploadedFullVideo");
const photoInfo = $("#uploadedPhotoInfo");
const infoToggle = $("#toggleUploadedPhotoInfo");
const deleteMediaButton = $("#deleteUploadedMedia");
let photoAngle = 0;
let removableMedia = null;

function setPhotoAngle(angle) {
  photoAngle = angle;
  viewerStage.style.setProperty("--photo-angle", `${angle}deg`);
  viewerStage.classList.toggle("quarter-turn", angle % 180 !== 0);
}

function setPhotoInfoVisible(visible) {
  photoInfo.hidden = !visible;
  infoToggle.setAttribute("aria-expanded", String(visible));
}

function openUploadedMedia(asset, type, { fromUploadPage = false } = {}) {
  const label = type === "video" ? "视频" : "照片";
  const infoLabel = fromUploadPage ? "素材" : label;
  const isUploadedPhoto = fromUploadPage && type === "image";
  const name = asset.name ?? asset.id;
  const fields = [
    [`${infoLabel}名称`, name],
    ["上传时间", asset.uploadedAt],
    ["拍摄时间", asset.shotAt],
    [`${infoLabel}大小`, asset.size],
    ...(asset.dimensions && !isUploadedPhoto ? [["图片尺寸", asset.dimensions]] : []),
    ["浏览次数", asset.views],
    [isUploadedPhoto ? "下载次数" : "下载量", asset.downloads == null ? null : `${asset.downloads} 次`]
  ];
  photoInfo.innerHTML = fields.map(([label, value]) =>
    `<div><dt>${label}</dt><dd>${escapeHtml(value ?? "—")}</dd></div>`
  ).join("");
  setPhotoAngle(0);
  setPhotoInfoVisible(false);
  infoToggle.textContent = `${infoLabel}信息`;
  photoViewer.setAttribute("aria-label", `${label}预览`);
  removableMedia = fromUploadPage ? { asset, type } : null;
  deleteMediaButton.hidden = !fromUploadPage;
  fullPhoto.hidden = Boolean(asset.src);
  fullVideo.hidden = !asset.src;
  if (asset.src) {
    fullVideo.src = asset.src;
    fullVideo.setAttribute("aria-label", name);
  } else {
    fullPhoto.alt = name;
    fullPhoto.src = asset.preview ?? asset.image;
  }
  photoViewer.showModal();
}
function deletePreviewedMedia() {
  if (!photoViewer.open || !removableMedia) return;
  const { asset, type } = removableMedia;
  const isImage = type === "image";
  photoViewer.close();

  if (asset.objectUrl) URL.revokeObjectURL(asset.src || asset.preview);
  if (isImage) uploadedImages = uploadedImages.filter(item => item !== asset);
  else uploadedVideos = uploadedVideos.filter(item => item !== asset);

  renderUploadedAssets();
  $(isImage ? "#uploadImages" : "#uploadVideos").focus();
  showToast("素材已删除");
}

$$('.nav-item').forEach(button=>button.addEventListener('click',()=>switchPage(button.dataset.page)));
$("#librarySearch").addEventListener("input", () => {
  selectedRoutePhotoIds.clear();
  updateRouteSelection();
  renderLibrary();
});
$("#timeSort").addEventListener("change",event=>{sortDirection=event.target.value;renderLibrary()});
const routeRemoveDialog = $("#routeRemoveDialog");
$("#toggleRouteSelection").addEventListener("click", () => setRouteSelectionMode(!selectingRoutePhotos));
$("#removeRouteSelected").addEventListener("click", () => {
  if (!selectedRoutePhotoIds.size) return;
  $("#routeRemoveMessage").textContent = `确认从线路素材库移除这 ${selectedRoutePhotoIds.size} 张照片？`;
  routeRemoveDialog.showModal();
});
$("#confirmRouteRemove").addEventListener("click", () => {
  if (!routeRemoveDialog.open || !selectedRoutePhotoIds.size) return;
  const count = selectedRoutePhotoIds.size;
  selectedRoutePhotoIds.forEach(id => removedRoutePhotoIds.add(id));
  try {
    localStorage.setItem(routeRemovedStorageKey, JSON.stringify([...removedRoutePhotoIds]));
  } catch {
    // Keep the removal applied in the current session.
  }
  routeRemoveDialog.close();
  setRouteSelectionMode(false);
  $("#toggleRouteSelection").focus();
  showToast(`已移除 ${count} 张照片`);
});
$("#routePhotoGrid").addEventListener("click", event => {
  const button = event.target.closest(".open-uploaded-photo");
  if (!button) return;
  const card = event.target.closest("[data-uploaded-id]");
  const id = card.dataset.uploadedId;
  if (selectingRoutePhotos) {
    if (selectedRoutePhotoIds.has(id)) selectedRoutePhotoIds.delete(id);
    else selectedRoutePhotoIds.add(id);
    button.setAttribute("aria-pressed", String(selectedRoutePhotoIds.has(id)));
    updateRouteSelection();
    return;
  }
  const photo = photos.find(item => item.id === id);
  if (photo) openUploadedMedia(photo, "image");
});
$("#uploadButton").addEventListener("click",()=>showToast("Demo：上传入口已准备好"));
$("#uploadImages").addEventListener("click",()=>$("#imageFileInput").click());
$("#uploadVideos").addEventListener("click",()=>$("#videoFileInput").click());
$("#imageFileInput").addEventListener("change",event=>{if(event.target.files.length)addUploadedFiles(event.target.files,"image");event.target.value=""});
$("#videoFileInput").addEventListener("change",event=>{if(event.target.files.length)addUploadedFiles(event.target.files,"video");event.target.value=""});
$("#hotspotPage").addEventListener("click", event => {
  if (!event.target.closest(".open-uploaded-photo")) return;
  const card = event.target.closest("[data-uploaded-id]");
  if (!card) return;
  const type = card.dataset.uploadedType;
  const collection = type === "video" ? uploadedVideos : uploadedImages;
  const asset = collection.find(item => item.id === card.dataset.uploadedId);
  if (asset) openUploadedMedia(asset, type, { fromUploadPage: true });
});
deleteMediaButton.addEventListener("click", deletePreviewedMedia);
$("#closeUploadedPhoto").addEventListener("click", () => photoViewer.close());
$("#rotateUploadedPhoto").addEventListener("click", () => setPhotoAngle((photoAngle + 90) % 360));
infoToggle.addEventListener("click", () => setPhotoInfoVisible(photoInfo.hidden));
photoViewer.addEventListener("close", () => {
  if (photoViewer.open) return;
  removableMedia = null;
  fullPhoto.removeAttribute("src");
  if (fullVideo.hasAttribute("src")) {
    fullVideo.pause();
    fullVideo.removeAttribute("src");
    fullVideo.load();
  }
});

renderLibrary();renderUploadedAssets();
