const cards = document.querySelectorAll('.player-card');
const panels = ['action-panel', 'role-panel', 'eylem-panel', 'decision-panel', 'gelen-eylem-panel'];
const selectedNameLabel = document.getElementById('selected-name');
const logList = document.getElementById('log-list');

let activePlayer = null;
let pendingAction = null; 
let turnCount = 1;

let flowData = {}; 
let multiSelectColors = [];

// ==========================================
// 1. GÜNCEL ROL VERİTABANI (Düzeltildi)
// ==========================================
const roleDB = {
  // Hem Masum hem Hain olabilen roller
  ortak: [
    {n:'Doktor'}, {n:'Polis'}, {n:'Gözcü'}, {n:'Dedektif'}, 
    {n:'İzci'}, {n:'Tuzakçı'}, {n:'İspiyoncu'}, {n:'Provakatör'}, {n:'Büyücü'}
  ],
  // Sadece Masum olanlar
  masum: [{n:'Deli'}],
  // Sadece Hain olanlar
  hain: [{n:'Temizlikçi'}, {n:'Suçlayıcı'}],
  // Tarafsız olanlar
  tarafsiz: [{n:'Survivor'}, {n:'Seri Katil'}, {n:'Bombacı'}, {n:'Hırsız'}, {n:'Hortlak'}]
};

// ==========================================
// 2. GÜNCEL RENK MANTIĞI (Düzeltildi)
// ==========================================
function getRoleColors(roleName) {
  // Masum veya Ortak roller için YEŞİL
  if (roleDB.masum.find(r => r.n === roleName) || roleDB.ortak.find(r => r.n === roleName)) 
    return { bg: '#0be881', text: 'black' };
  
  // Hain roller için KIRMIZI
  if (roleDB.hain.find(r => r.n === roleName)) 
    return { bg: '#ff5e57', text: 'white' };
  
  // Tarafsız roller için AÇIK MAVİ
  if (roleDB.tarafsiz.find(r => r.n === roleName)) 
    return { bg: '#0fbcf9', text: 'white' };

  return { bg: 'rgba(0,0,0,0.45)', text: 'white' };
}

// Diğer yardımcı renkler (Butonlar ve Panel için)
const UI_COLORS = {
  masum: '#0be881',   // Yeşil
  hain: '#ff5e57',    // Kırmızı
  tarafsiz: '#0fbcf9' // Açık Mavi
};

window.openPanel = function(panelId) {
  panels.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = "none";
  });
  if(panelId) document.getElementById(panelId).style.display = "block";
};

// --- DİNAMİK RENKLİ ETİKET (BADGE) SİSTEMİ ---
function addRoleBadge(playerName, text, bgColor = 'rgba(0,0,0,0.45)', textColor = 'white') {
  const card = document.getElementById(playerName);
  let container = card.querySelector('.roles-container');
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'roles-container';
    card.appendChild(container);
  }
  
  const badge = document.createElement('div');
  badge.className = 'role-badge';
  badge.innerText = text;
  badge.style.background = bgColor;
  badge.style.color = textColor;
  badge.style.border = "1px solid rgba(0,0,0,0.2)"; 
  
  container.appendChild(badge);

  return function() {
    badge.remove();
    if (container.children.length === 0) container.remove();
  };
}

// --- KART TIKLAMA MANTIĞI VE ZİNCİRLEME KARARLAR ---
cards.forEach(card => {
  card.addEventListener('click', () => {
    const clickedPlayer = card.id;

    if (pendingAction && activePlayer) {
      const selfTargetActions = ['went', 'doktor_target', 'polis_target', 'tuzakci_target', 'provokator_target', 'gozcu_target', 'izci_target', 'dedektif_target', 'ispiyoncu_target'];
      if (selfTargetActions.includes(pendingAction) && clickedPlayer === activePlayer) {
        alert("Oyuncu kendi evini hedef seçemez!");
        return;
      }

      if (pendingAction === 'gozcu_visitors') {
        const index = multiSelectColors.indexOf(clickedPlayer);
        if (index > -1) { multiSelectColors.splice(index, 1); card.style.border = "2px solid transparent"; } 
        else { multiSelectColors.push(clickedPlayer); card.style.border = "3px dashed #0fbcf9"; }
        return; 
      }

      if (pendingAction === 'izci_went_where') {
        directLog(`(İzci) <span style="color:${getColor(flowData.target)}">${flowData.target}</span>'in ➔ <span style="color:${getColor(clickedPlayer)}">${clickedPlayer}</span>'a gittiğini gördü.`);
        return;
      }

      if (pendingAction === 'went') {
        addLog(`<span style="color:${getColor(activePlayer)}">${activePlayer}</span> ➔ <span style="color:${getColor(clickedPlayer)}">${clickedPlayer}</span>'a gitti.`);
        resetSelection();
        return;
      }

      flowData.target = clickedPlayer;

      // Eylem Sonuçları ve Tuzağa Yakalanma Butonları
      if (pendingAction === 'doktor_target') {
        showDecision("Doktor Sonucu", "Doktor eylemi sonucu ne oldu?", `
          <button class="action-btn" onclick="directLog('Doktor olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti, BİR ŞEY OLMADI.')">Bir Şey Olmadı</button>
          <button class="action-btn safe-btn" onclick="directLog('Doktor olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti ve KURTARDI.')">Kurtardı</button>
          <button class="action-btn" onclick="directLog('Doktor olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      } 
      else if (pendingAction === 'polis_target') {
        showDecision("Polis Sonucu", "Polis eylemi sonucu ne oldu?", `
          <button class="action-btn" onclick="directLog('Polis olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti, ÇIKMAYA ÇALIŞTI.')">Çıkmaya Çalıştı</button>
          <button class="action-btn" onclick="directLog('Polis olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti, ÇIKMAYA ÇALIŞMADI.')">Çıkmaya Çalışmadı</button>
          <button class="action-btn" onclick="directLog('Polis olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'tuzakci_target') {
        showDecision("Tuzak Sonucu", "Kurulan tuzağa basıldı mı?", `
          <button class="action-btn" onclick="directLog('<span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a tuzak kurdu, BASILMADI.')">Basılmadı</button>
          <button class="action-btn sus-btn" onclick="directLog('<span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a tuzak kurdu, BASILDI.')">Basıldı</button>
          <button class="action-btn" onclick="directLog('<span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a tuzak kurmaya gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        showDecision(`${clickedPlayer}'a Gelenleri Seçin`, "Gelenleri tablodan tıklayarak çoklu seçin.", `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">Seçilenleri Kaydet</button>
          <button class="action-btn" onclick="saveGozcu(true)">Kimse Gelmedi</button>
          <button class="action-btn" onclick="directLog('Gözcü olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a giderken TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'dedektif_target') {
        flowData.dedektif = { target: clickedPlayer, t1: null, r1: null, t2: null, r2: null };
        showDedektifTeamSelection(1);
      }
      else if (pendingAction === 'ispiyoncu_target') {
        showDecision(`${clickedPlayer} İçin Ne Dedi?`, "Grubunu ve rolünü seçin veya bilgiyi sakladıysa alttaki butonu kullanın.", `
          <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap; max-width: 400px; margin: 0 auto;">
            <button class="action-btn role-masum" style="flex: 1; min-width: 100px;" onclick="renderIspiyoncuRoles('Masum')">Masum (Rol Seç)</button>
            <button class="action-btn role-hain" style="flex: 1; min-width: 100px;" onclick="renderIspiyoncuRoles('Şüpheli')">Şüpheli (Rol Seç)</button>
            <button class="action-btn role-tarafsiz" style="flex: 1; min-width: 100px;" onclick="renderIspiyoncuRoles('Tarafsız')">Tarafsız (Rol Seç)</button>
            <button class="action-btn" style="flex: 1; min-width: 100px;" onclick="directLog('İspiyoncu olarak <span style=\\'color:${getColor(clickedPlayer)}\\'>${clickedPlayer}</span>\\'a gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
          </div>
        `);
      }

      return; 
    }

    resetSelection();
    activePlayer = clickedPlayer;
    card.style.border = "3px solid #fff";
    selectedNameLabel.innerText = `${activePlayer} Seçildi`;
    selectedNameLabel.style.color = getColor(activePlayer);
    openPanel('action-panel');
  });
});

// --- YARDIMCI GÖRSEL FONKSİYONLAR ---
function showDecision(title, content, buttonsHTML) {
  openPanel('decision-panel');
  document.getElementById('decision-title').innerHTML = title;
  document.getElementById('decision-content').innerHTML = content;
  document.getElementById('decision-buttons').innerHTML = buttonsHTML;
}

window.startFlow = function(type) {
  pendingAction = type;
  showDecision("Hedef Bekleniyor", "Lütfen yukarıdaki tablodan hedef oyuncuyu (rengi) seçin.", "");
};

// --- DEDEKTİF MANTIĞI ---
window.showDedektifTeamSelection = function(step) {
  pendingAction = step === 1 ? 'dedektif_team_1' : 'dedektif_team_2';
  let trapBtn = step === 1 ? `<button class="action-btn" style="flex: 1; min-width: 100px;" onclick="directLog('Dedektif olarak <span style=\\'color:${getColor(flowData.dedektif.target)}\\'>${flowData.dedektif.target}</span>\\'a gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>` : '';

  showDecision(`Dedektif: ${step}. Rolün Grubu`, `${flowData.dedektif.target} için iddia edilen ${step}. rol HANGİ GRUPTA?`, `
    <div style="display: flex; gap: 5px; justify-content: center; flex-wrap: wrap;">
      <button class="action-btn role-masum" style="flex: 1; min-width: 80px;" onclick="selectDedektifTeam('Masum')">Masum</button>
      <button class="action-btn role-hain" style="flex: 1; min-width: 80px;" onclick="selectDedektifTeam('Şüpheli')">Şüpheli</button>
      <button class="action-btn role-tarafsiz" style="flex: 1; min-width: 80px;" onclick="selectDedektifTeam('Tarafsız')">Tarafsız</button>
      ${trapBtn}
    </div>
  `);
}

window.selectDedektifTeam = function(team) {
  if (pendingAction === 'dedektif_team_1') { flowData.dedektif.t1 = team; showDedektifRoleSelection(1); } 
  else { flowData.dedektif.t2 = team; showDedektifRoleSelection(2); }
}

window.showDedektifRoleSelection = function(step) {
  pendingAction = step === 1 ? 'dedektif_role_1' : 'dedektif_role_2';
  const currentTeam = step === 1 ? flowData.dedektif.t1 : flowData.dedektif.t2;
  let rolesToShow = []; let colorClass = '';

  if (currentTeam === 'Masum') { rolesToShow = [...roleDB.masum, ...roleDB.ortak].filter(r => r.n !== 'Deli'); colorClass = 'role-masum'; } 
  else if (currentTeam === 'Şüpheli') { rolesToShow = [...roleDB.hain, ...roleDB.ortak]; colorClass = 'role-hain'; } 
  else if (currentTeam === 'Tarafsız') { rolesToShow = [...roleDB.tarafsiz]; colorClass = 'role-tarafsiz'; }

  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => { html += `<button class="action-btn ${colorClass}" onclick="selectDedektifRole('${r.n}')">${r.n}</button>`; });
  html += `</div>`;
  showDecision(`Dedektif: ${step}. Rolü Seçin`, `Bu rol bir <b>${currentTeam}</b> olarak görünüyor.`, html);
}

window.selectDedektifRole = function(roleName) {
  if (pendingAction === 'dedektif_role_1') { flowData.dedektif.r1 = roleName; showDedektifTeamSelection(2); } 
  else {
    flowData.dedektif.r2 = roleName;
    const { target, t1, r1, t2, r2 } = flowData.dedektif;
    const c1 = (t1 === 'Masum') ? UI_COLORS.masum : (t1 === 'Şüpheli' ? UI_COLORS.hain : UI_COLORS.tarafsiz);
    const c2 = (t2 === 'Masum') ? UI_COLORS.masum : (t2 === 'Şüpheli' ? UI_COLORS.hain : UI_COLORS.tarafsiz);
    const rb1 = addRoleBadge(target, r1, c1, 'black');
    const rb2 = addRoleBadge(target, r2, c2, 'black');
    addLog(`(Dedektif) <span style="color:${getColor(target)}">${target}</span>'in <b style="color:${c1}">${t1} ${r1}</b> veya <b style="color:${c2}">${t2} ${r2}</b> olduğunu söyledi.`, false, () => { rb1(); rb2(); });
    resetSelection();
  }
}

// --- İSPİYONCU MANTIĞI ---
window.renderIspiyoncuRoles = function(team) {
  let rolesToShow = []; let colorClass = '';
  if (team === 'Masum') { rolesToShow = [...roleDB.masum, ...roleDB.ortak].filter(r => r.n !== 'Deli'); colorClass = 'role-masum'; } 
  else if (team === 'Şüpheli') { rolesToShow = [...roleDB.hain, ...roleDB.ortak]; colorClass = 'role-hain'; } 
  else if (team === 'Tarafsız') { rolesToShow = [...roleDB.tarafsiz]; colorClass = 'role-tarafsiz'; }

  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => { html += `<button class="action-btn ${colorClass}" onclick="selectIspiyoncuRole('${r.n}', '${team}')">${r.n}</button>`; });
  html += `</div>`;
  showDecision(`İspiyoncu: Rolü Seçin`, `İspiyonladığı net rolü seçin (${team}).`, html);
}

window.selectIspiyoncuRole = function(roleName, team) {
  const target = flowData.target;
  const bg = (team === 'Masum') ? UI_COLORS.masum : (team === 'Şüpheli' ? UI_COLORS.hain : UI_COLORS.tarafsiz);
  const removeBadge = addRoleBadge(target, roleName, bg, 'black');
  addLog(`(İspiyoncu) <span style="color:${getColor(target)}">${target}</span>'in <b style="color:${bg}">${team} ${roleName}</b> olduğunu söyledi.`, false, () => { removeBadge(); });
  resetSelection();
}

// --- ORTAK İŞLEMLER ---
window.directLog = function(msg) { addLog(`<span style="color:${getColor(activePlayer)}">${activePlayer}</span>: ${msg}`); resetSelection(); };

window.markPlayer = function(status) {
  const card = document.getElementById(activePlayer);
  const iconSpan = card.querySelector('.status-icon');
  const targetPlayer = activePlayer; 
  if (status === 'safe') { iconSpan.innerText = '✔'; iconSpan.style.color = UI_COLORS.masum; iconSpan.style.display = 'flex'; addLog(`<span style="color:${getColor(activePlayer)}">${activePlayer}</span> güvenli.`, false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; }); } 
  else if (status === 'sus') { iconSpan.innerText = '✘'; iconSpan.style.color = UI_COLORS.hain; iconSpan.style.display = 'flex'; addLog(`<span style="color:${getColor(activePlayer)}">${activePlayer}</span> şüpheli.`, false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; }); }
  resetSelection();
};

window.setRole = function(role) {
  const target = activePlayer; const c = getRoleColors(role); 
  const removeBadge = addRoleBadge(target, role, c.bg, c.text);
  addLog(`<span style="color:${getColor(target)}">${target}</span> rolünü <b>${role}</b> olarak açıkladı.`, false, () => { removeBadge(); });
  resetSelection();
};

window.resetSelection = function() {
  activePlayer = null; pendingAction = null; flowData = {}; multiSelectColors = [];
  cards.forEach(c => c.style.border = "2px solid transparent");
  openPanel(null);
};

document.getElementById('btn-new-turn').addEventListener('click', () => { turnCount++; addLog(`<b style="color: #ffd32a;">--- ${turnCount}. TUR BAŞLADI ---</b>`, true); });

document.getElementById('btn-reset-game').addEventListener('click', () => {
  if(confirm("Tüm kayıtlar silinecek. Emin misiniz?")) {
    logList.innerHTML = ''; turnCount = 1;
    if(document.getElementById('manual-notes')) document.getElementById('manual-notes').value = '';
    cards.forEach(card => { card.querySelector('.status-icon').style.display = 'none'; const rc = card.querySelector('.roles-container'); if(rc) rc.remove(); });
    resetSelection();
  }
});

function addLog(text, isSystemLog = false, onDeleteCallback = null) {
  const li = document.createElement('li'); const contentSpan = document.createElement('span');
  contentSpan.innerHTML = text; li.appendChild(contentSpan);
  if (!isSystemLog) {
    const delBtn = document.createElement('button'); delBtn.innerText = "X"; delBtn.className = "delete-log";
    delBtn.onclick = function() { li.remove(); if (onDeleteCallback) onDeleteCallback(); };
    li.appendChild(delBtn);
  }
  logList.prepend(li);
}

function getColor(colorName) {
  const colors = { 'Beyaz': '#F3F3F3', 'Turuncu': '#FA8A1C', 'Mor': '#b554e6', 'Koyu Yeşil': '#40a124', 'Mavi': '#6c8dec', 'Kırmızı': '#ff4d4d', 'Sarı': '#FCE14E', 'Açık Yeşil': '#7AFF48', 'Turkuaz': '#2BD8C8', 'Açık Pembe': '#FF95B7', 'Kahverengi': '#d18b5e', 'Koyu Pembe': '#EB00E4', 'Parlak Turuncu': '#F84000' };
  return colors[colorName] || '#ffffff';
}

// ==========================================
// ==========================================
// ARAMA (FİLTRELEME) FONKSİYONU
// ==========================================
document.getElementById('log-search').addEventListener('input', function() {
    let filter = this.value.toLocaleLowerCase('tr-TR');
    let logs = document.getElementById('log-list').children;
    for (let i = 0; i < logs.length; i++) {
        let logText = logs[i].textContent || logs[i].innerText;
        logs[i].style.display = logText.toLocaleLowerCase('tr-TR').indexOf(filter) > -1 ? "" : "none";
    }
});

document.getElementById('log-copy-btn').addEventListener('click', function() {
    let logs = document.getElementById('log-list').children;
    let textToCopy = "";
    for (let i = 0; i < logs.length; i++) {
        if (logs[i].style.display !== "none") textToCopy += (logs[i].textContent || logs[i].innerText) + "\n";
    }
    if (!textToCopy.trim()) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
        let originalText = this.innerText; this.innerText = "Kopyalandı!";
        this.style.backgroundColor = "#0be881";
        setTimeout(() => { this.innerText = originalText; this.style.backgroundColor = "#0fbcf9"; }, 2000);
    });
});
