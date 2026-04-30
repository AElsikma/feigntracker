// ==========================================
// 1. DİL (i18n) VE ÇEVİRİ SÖZLÜĞÜ
// ==========================================
const translations = {
  tr: {
    newTurn: "Yeni Tura Geç", resetGame: "Oyunu Sıfırla", safe: "✔ Güvenli", sus: "✘ Şüpheli",
    setRole: "Rol Belirt", wentTo: "Şuraya Gitti ➔", actionSpecial: "⚡ Eylem (Rol Özel)",
    incomingActions: "📥 Gelen Eylemler", stayedHome: "Evde Kaldı", wentOut: "Dışarı Çıktı (Belirsiz)",
    cancel: "İptal", chooseRole: "Rol Seçin", back: "Geri", whoseAction: "Hangi Rolün Eylemi?",
    cancelSelection: "İptali Seç", whatHappened: "Bu Oyuncuya Ne Yapıldı?", actionHistory: "Aksiyon Geçmişi",
    searchPlaceholder: "Geçmişte ara...", freeNotes: "Serbest Notlar", notesPlaceholder: "Şüphelerinizi, zamanlamaları veya çelişkileri buraya yazabilirsiniz...",
    feedbackTitle: "Bize Ulaşın", send: "Gönder", feedbackBtn: "💬 Geri Bildirim",
    historyBtn: "📜 Oyun Geçmişi", pastGames: "Geçmiş Oyunlar", clearHistory: "Tümünü Sil",
    roles: {
      "Doktor": "Doktor", "Deli": "Deli", "Polis": "Polis", "Gözcü": "Gözcü", "Dedektif": "Dedektif",
      "Tuzakçı": "Tuzakçı", "İspiyoncu": "İspiyoncu", "Provakatör": "Provakatör", "İzci": "İzci",
      "Temizlikçi": "Temizlikçi", "Suçlayıcı": "Suçlayıcı", "Survivor": "Survivor", "Seri Katil": "Seri Katil",
      "Bombacı": "Bombacı", "Hırsız": "Hırsız", "Büyücü": "Büyücü", "Hortlak": "Hortlak"
    },
    ui: {
      docSaved: "DOKTOR geldi ve KURTARDI.", docCame: "DOKTOR geldi ama kurtarmadı.", polCaught: "POLİS geldi ve TUTTU.",
      trapHit: "TUZAĞA BASTI.", provCame: "PROVOKATÖR geldi.",
      targetWait: "Hedef Bekleniyor", targetSelect: "Lütfen yukarıdaki tablodan hedef oyuncuyu seçin.",
      confirmReset: "Tüm kayıtlar silinip GEÇMİŞ OYUNLAR'a kaydedilecek. Emin misiniz?",
      noHistory: "Henüz kaydedilmiş bir oyun geçmişi bulunmuyor."
    }
  },
  en: {
    newTurn: "Next Turn", resetGame: "Reset Game", safe: "✔ Safe", sus: "✘ Sus",
    setRole: "Set Role", wentTo: "Went To ➔", actionSpecial: "⚡ Action (Role Specific)",
    incomingActions: "📥 Incoming Actions", stayedHome: "Stayed Home", wentOut: "Went Out (Unknown)",
    cancel: "Cancel", chooseRole: "Choose Role", back: "Back", whoseAction: "Whose Action?",
    cancelSelection: "Cancel Selection", whatHappened: "What happened to this player?", actionHistory: "Action History",
    searchPlaceholder: "Search logs...", freeNotes: "Free Notes", notesPlaceholder: "Write your suspicions, timings, or contradictions here...",
    feedbackTitle: "Contact Us", send: "Send", feedbackBtn: "💬 Feedback",
    historyBtn: "📜 Game History", pastGames: "Past Games", clearHistory: "Clear All",
    roles: {
      "Doktor": "Doctor", "Deli": "Insane", "Polis": "Police", "Gözcü": "Lookout", "Dedektif": "Investigator",
      "Tuzakçı": "Trapper", "İspiyoncu": "Snitch", "Provakatör": "Provocateur", "İzci": "Tracker",
      "Temizlikçi": "Cleaner", "Suçlayıcı": "Blamer", "Survivor": "Survivor", "Seri Katil": "Serial Killer",
      "Bombacı": "Bomber", "Hırsız": "Thief", "Büyücü": "Magician", "Hortlak": "Ghost"
    },
    ui: {
      docSaved: "DOCTOR came and SAVED.", docCame: "DOCTOR came (Did not save).", polCaught: "POLICE came and CAUGHT.",
      trapHit: "STEPPED on TRAP.", provCame: "PROVOCATEUR came.",
      targetWait: "Waiting for Target", targetSelect: "Please select target player from the grid above.",
      confirmReset: "Current logs will be saved to PAST GAMES and cleared. Are you sure?",
      noHistory: "No saved game history found yet."
    }
  }
};

let currentLang = 'tr';
function t(key, subCategory = null) {
  if (subCategory) return translations[currentLang][subCategory][key] || key;
  return translations[currentLang][key] || key;
}

// ==========================================
// 2. ARAYÜZ (DOM) ELEMENTLERİ
// ==========================================
const cards = document.querySelectorAll('.player-card');
const panels = ['action-panel', 'role-panel', 'eylem-panel', 'decision-panel', 'gelen-eylem-panel'];
const selectedNameLabel = document.getElementById('selected-name');
const logList = document.getElementById('log-list');

let activePlayer = null; let pendingAction = null; let turnCount = 1;
let flowData = {}; let multiSelectColors = [];

const roleDB = {
  masum: [{n:'Doktor'}, {n:'Deli'}],
  gri: [{n:'Polis'}, {n:'Gözcü'}, {n:'Dedektif'}, {n:'Tuzakçı'}, {n:'İspiyoncu'}, {n:'Provakatör'}, {n:'İzci'}],
  hain: [{n:'Temizlikçi'}, {n:'Suçlayıcı'}],
  tarafsiz: [{n:'Survivor'}, {n:'Seri Katil'}, {n:'Bombacı'}, {n:'Hırsız'}, {n:'Büyücü'}, {n:'Hortlak'}]
};

// ==========================================
// 3. TEMA VE DİL DEĞİŞTİRİCİ FONKSİYONLAR
// ==========================================
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  document.getElementById('theme-toggle').innerText = isLight ? "🌙 Mode" : "☀️ Mode";
});

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  document.getElementById('lang-toggle').innerText = currentLang === 'tr' ? "🌐 EN" : "🌐 TR";
  applyTranslations();
});

document.getElementById('feedback-btn').addEventListener('click', () => {
  const panel = document.getElementById('feedback-panel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
});

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.getAttribute('data-i18n')); });
  document.getElementById('log-search').placeholder = t('searchPlaceholder');
  document.getElementById('manual-notes').placeholder = t('notesPlaceholder');
  
  // Kart isimlerini güncelle
  cards.forEach(card => {
    const rawName = card.id; 
    const enName = card.getAttribute('data-color');
    const displayText = currentLang === 'en' ? enName.replace(' ', '<br>') : rawName.replace(' ', '<br>');
    card.innerHTML = `${displayText}<span class="status-icon" style="display:${card.querySelector('.status-icon').style.display}"></span>`;
    
    // Varolan rozetleri tekrar ekle (metin değişimi için karmaşıktır, sayfayı yenilemek daha iyi olabilir ama ismi koruduk)
  });
  
  renderDynamicPanels();
}

function renderDynamicPanels() {
  // Rol Paneli Çizimi
  const roleGrid = document.getElementById('role-grid-container');
  roleGrid.innerHTML = '';
  Object.keys(roleDB).forEach(category => {
    const colorClass = category === 'masum' ? 'role-masum' : (category === 'gri' ? 'role-gri' : (category === 'hain' ? 'role-hain' : 'role-tarafsiz'));
    roleDB[category].forEach(role => {
      roleGrid.innerHTML += `<button class="action-btn ${colorClass}" onclick="setRole('${role.n}')">${t(role.n, 'roles')}</button>`;
    });
  });

  // Eylem Paneli Çizimi
  const actionGrid = document.getElementById('action-grid-container');
  actionGrid.innerHTML = `
    <button class="action-btn role-masum" onclick="startFlow('doktor_target')">${t('Doktor','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('polis_target')">${t('Polis','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('gozcu_target')">${t('Gözcü','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('dedektif_target')">${t('Dedektif','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('tuzakci_target')">${t('Tuzakçı','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('ispiyoncu_target')">${t('İspiyoncu','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('provokator_target')">${t('Provakatör','roles')}</button>
    <button class="action-btn role-gri" onclick="startFlow('izci_target')">${t('İzci','roles')}</button>
    <button class="action-btn role-tarafsiz" onclick="showSurvivorDecision()">${t('Survivor','roles')}</button>
  `;

  // Gelen Eylem Paneli
  const incomingGrid = document.getElementById('incoming-action-container');
  incomingGrid.innerHTML = `
    <button class="action-btn role-masum" onclick="directLog('${t('docSaved','ui')}')">${t('Doktor','roles')} (+)</button>
    <button class="action-btn role-masum" onclick="directLog('${t('docCame','ui')}')">${t('Doktor','roles')} (-)</button>
    <button class="action-btn role-gri" onclick="directLog('${t('polCaught','ui')}')">${t('Polis','roles')} (+)</button>
    <button class="action-btn role-hain" onclick="directLog('${t('trapHit','ui')}')">${t('Tuzakçı','roles')} (+)</button>
    <button class="action-btn role-hain" onclick="directLog('${t('provCame','ui')}')">${t('Provakatör','roles')} (+)</button>
  `;
}
// İlk yüklemede panelleri çiz
renderDynamicPanels();

// ==========================================
// 4. MANTIK VE OYUN MOTORU
// ==========================================
window.openPanel = function(panelId) {
  panels.forEach(id => { const el = document.getElementById(id); if(el) el.style.display = "none"; });
  if(panelId) document.getElementById(panelId).style.display = "block";
};

function addRoleBadge(playerName, text, bgColor = 'rgba(0,0,0,0.45)', textColor = 'white') {
  const card = document.getElementById(playerName);
  let container = card.querySelector('.roles-container');
  if (!container) { container = document.createElement('div'); container.className = 'roles-container'; card.appendChild(container); }
  const badge = document.createElement('div'); badge.className = 'role-badge'; badge.innerText = t(text, 'roles');
  badge.style.background = bgColor; badge.style.color = textColor; badge.style.border = "1px solid rgba(0,0,0,0.2)"; 
  container.appendChild(badge);
  return function() { badge.remove(); if (container.children.length === 0) container.remove(); };
}

function getRoleColors(roleName) {
  if (roleDB.masum.find(r => r.n === roleName)) return { bg: '#0be881', text: 'black' };
  if (roleDB.gri.find(r => r.n === roleName)) return { bg: '#808e9b', text: 'white' };
  if (roleDB.hain.find(r => r.n === roleName)) return { bg: '#ff3f34', text: 'white' };
  if (roleDB.tarafsiz.find(r => r.n === roleName)) return { bg: '#4bcffa', text: 'black' };
  return { bg: 'rgba(0,0,0,0.45)', text: 'white' };
}

function getTranslatedCardName(id) {
  const card = document.getElementById(id);
  return currentLang === 'en' ? card.getAttribute('data-color') : id;
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    const clickedPlayer = card.id;
    const clickedNameDisplay = getTranslatedCardName(clickedPlayer);
    const activeNameDisplay = activePlayer ? getTranslatedCardName(activePlayer) : '';

    if (pendingAction && activePlayer) {
      const selfTargetActions = ['went', 'doktor_target', 'polis_target', 'tuzakci_target', 'provokator_target', 'gozcu_target', 'izci_target', 'dedektif_target', 'ispiyoncu_target'];
      if (selfTargetActions.includes(pendingAction) && clickedPlayer === activePlayer) { alert("Invalid Self Target"); return; }
      if (pendingAction === 'gozcu_visitors' || pendingAction === 'izci_went_where') {
         // Orijinal filtreleme kuralları geçerli
         if (pendingAction === 'gozcu_visitors' && clickedPlayer === activePlayer) return;
         if (pendingAction === 'gozcu_visitors') {
            const index = multiSelectColors.indexOf(clickedPlayer);
            if (index > -1) { multiSelectColors.splice(index, 1); card.style.border = "2px solid var(--card-border)"; } 
            else { multiSelectColors.push(clickedPlayer); card.style.border = "3px dashed #0fbcf9"; }
            return; 
         }
         if (pendingAction === 'izci_went_where') {
            directLog(`(Tracker) <b style="color:${getColor(flowData.target)}">${getTranslatedCardName(flowData.target)}</b> ➔ <b style="color:${getColor(clickedPlayer)}">${clickedNameDisplay}</b>`);
            return;
         }
      }

      if (pendingAction === 'went') {
        const bg = 'rgba(0,0,0,0.45)';
        addLog(`<b style="color:${getColor(activePlayer)}; background:${bg}; padding:2px 5px; border-radius:4px;">${activeNameDisplay}</b> ➔ <b style="color:${getColor(clickedPlayer)}; background:${bg}; padding:2px 5px; border-radius:4px;">${clickedNameDisplay}</b>`);
        resetSelection(); return;
      }

      flowData.target = clickedPlayer;

      // Tüm aksiyon düğmeleri basitleştirildi, çeviriye uygun formata getirildi
      if (pendingAction === 'doktor_target') {
        showDecision(t('Doktor','roles'), "?", `
          <button class="action-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Normal)')">Normal</button>
          <button class="action-btn safe-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Saved/Kurtardı)')">Saved</button>
          <button class="action-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Trapped/Tuzak)')">Trapped</button>
        `);
      } 
      else if (pendingAction === 'polis_target') {
         showDecision(t('Polis','roles'), "?", `
          <button class="action-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Tried to exit)')">Tried Exit</button>
          <button class="action-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Stayed)')">Stayed</button>
          <button class="action-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Trapped)')">Trapped</button>
        `);
      }
      // Geri kalan roller de benzer şekilde daraltıldı. Arayüzün şişmemesi için loglar sade tutuldu.
      else if (pendingAction === 'tuzakci_target') {
         showDecision(t('Tuzakçı','roles'), "?", `
          <button class="action-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (No trigger)')">No Trigger</button>
          <button class="action-btn sus-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Triggered/Bastı)')">Triggered</button>
        `);
      }
      else if (pendingAction === 'provokator_target') {
         showDecision(t('Provakatör','roles'), "?", `
          <button class="action-btn safe-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedNameDisplay}</b> (Provoked)')">Provoked</button>
        `);
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        showDecision(clickedNameDisplay, "Select visitors", `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">Save Selected</button>
          <button class="action-btn" onclick="saveGozcu(true)">Nobody</button>
        `);
      }
      else if (pendingAction === 'izci_target') {
        pendingAction = 'izci_went_where';
        showDecision(clickedNameDisplay, "Where did they go?", `
          <button class="action-btn eylem-btn" onclick="directLog('➔ <b style=&quot;color:${getColor(flowData.target)}&quot;>${getTranslatedCardName(flowData.target)}</b> (Stayed Home)')">Stayed</button>
        `);
      }
      else if (pendingAction === 'dedektif_target') {
        flowData.dedektif = { target: clickedPlayer, t1: null, r1: null, t2: null, r2: null };
        showDedektifTeamSelection(1);
      }
      else if (pendingAction === 'ispiyoncu_target') {
        showDecision(clickedNameDisplay, "?", `
          <div style="display: flex; gap: 5px;">
            <button class="action-btn role-masum" onclick="renderIspiyoncuRoles('Masum')">Masum/Safe</button>
            <button class="action-btn role-hain" onclick="renderIspiyoncuRoles('Şüpheli')">Şüpheli/Sus</button>
            <button class="action-btn role-tarafsiz" onclick="renderIspiyoncuRoles('Tarafsız')">Tarafsız/Neutral</button>
          </div>
        `);
      }
      return; 
    }

    resetSelection(); activePlayer = clickedPlayer; card.style.border = "3px solid #fff";
    selectedNameLabel.innerText = clickedNameDisplay; selectedNameLabel.style.color = getColor(activePlayer);
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
  pendingAction = type; showDecision(t('targetWait','ui'), t('targetSelect','ui'), "");
};

window.showSurvivorDecision = function() {
  showDecision(t('Survivor','roles'), "?", `
    <button class="action-btn safe-btn" onclick="directLog('Shield Used (Kurtuldu)')">Shield Used</button>
    <button class="action-btn" onclick="directLog('No Shield')">No Shield</button>
  `);
}

// --- DEDEKTİF MANTIĞI ---
window.showDedektifTeamSelection = function(step) {
  pendingAction = step === 1 ? 'dedektif_team_1' : 'dedektif_team_2';
  showDecision(`Investigator - Step ${step}`, `Group?`, `
    <div style="display: flex; gap: 5px;">
      <button class="action-btn role-masum" onclick="selectDedektifTeam('Masum')">Masum/Safe</button>
      <button class="action-btn role-hain" onclick="selectDedektifTeam('Şüpheli')">Şüpheli/Sus</button>
      <button class="action-btn role-tarafsiz" onclick="selectDedektifTeam('Tarafsız')">Tarafsız/Neutral</button>
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
  if (currentTeam === 'Masum') { rolesToShow = [...roleDB.masum, ...roleDB.gri].filter(r => r.n !== 'Deli'); colorClass = 'role-masum'; } 
  else if (currentTeam === 'Şüpheli') { rolesToShow = [...roleDB.hain, ...roleDB.gri]; colorClass = 'role-hain'; } 
  else if (currentTeam === 'Tarafsız') { rolesToShow = [...roleDB.tarafsiz]; colorClass = 'role-tarafsiz'; }
  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => { html += `<button class="action-btn ${colorClass}" onclick="selectDedektifRole('${r.n}')">${t(r.n,'roles')}</button>`; });
  html += `</div>`;
  showDecision(`Investigator - Step ${step}`, `Role?`, html);
}

window.selectDedektifRole = function(roleName) {
  if (pendingAction === 'dedektif_role_1') { flowData.dedektif.r1 = roleName; showDedektifTeamSelection(2); } 
  else {
    flowData.dedektif.r2 = roleName; const { target, t1, r1, t2, r2 } = flowData.dedektif;
    const c1_bg = t1 === 'Masum' ? '#0be881' : (t1 === 'Şüpheli' ? '#ff3f34' : '#4bcffa'); const c1_txt = t1 === 'Şüpheli' ? 'white' : 'black';
    const c2_bg = t2 === 'Masum' ? '#0be881' : (t2 === 'Şüpheli' ? '#ff3f34' : '#4bcffa'); const c2_txt = t2 === 'Şüpheli' ? 'white' : 'black';
    const rb1 = addRoleBadge(target, r1, c1_bg, c1_txt); const rb2 = addRoleBadge(target, r2, c2_bg, c2_txt);
    addLog(`(Investigator) <b style="color:${getColor(target)}">${getTranslatedCardName(target)}</b> ➔ <b style="color:${c1_bg}">${t1} ${t(r1,'roles')}</b> OR <b style="color:${c2_bg}">${t2} ${t(r2,'roles')}</b>`, false, () => { rb1(); rb2(); });
    resetSelection();
  }
}

// --- İSPİYONCU MANTIĞI ---
window.renderIspiyoncuRoles = function(team) {
  let rolesToShow = []; let colorClass = '';
  if (team === 'Masum') { rolesToShow = [...roleDB.masum, ...roleDB.gri].filter(r => r.n !== 'Deli'); colorClass = 'role-masum'; } 
  else if (team === 'Şüpheli') { rolesToShow = [...roleDB.hain, ...roleDB.gri]; colorClass = 'role-hain'; } 
  else if (team === 'Tarafsız') { rolesToShow = [...roleDB.tarafsiz]; colorClass = 'role-tarafsiz'; }
  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => { html += `<button class="action-btn ${colorClass}" onclick="selectIspiyoncuRole('${r.n}', '${team}')">${t(r.n,'roles')}</button>`; });
  html += `</div>`;
  showDecision(`Snitch`, `Role?`, html);
}

window.selectIspiyoncuRole = function(roleName, team) {
  const target = flowData.target;
  const bg = team === 'Masum' ? '#0be881' : (team === 'Şüpheli' ? '#ff3f34' : '#4bcffa'); const txt = team === 'Şüpheli' ? 'white' : 'black';
  const removeBadge = addRoleBadge(target, roleName, bg, txt);
  addLog(`(Snitch) <b style="color:${getColor(target)}">${getTranslatedCardName(target)}</b> ➔ <b style="color:${bg}">${team} ${t(roleName,'roles')}</b>`, false, () => { removeBadge(); });
  resetSelection();
}

// --- GÖZCÜ KAYIT ---
window.saveGozcu = function(kimseGelmedi) {
  if (kimseGelmedi) { directLog(`(Lookout) ➔ <b style="color:${getColor(flowData.target)}">${getTranslatedCardName(flowData.target)}</b> (Nobody came)`); } 
  else {
    if (multiSelectColors.length === 0) return;
    const coloredVisitors = multiSelectColors.map(c => `<b style="color:${getColor(c)}">${getTranslatedCardName(c)}</b>`).join(", ");
    directLog(`(Lookout) ➔ <b style="color:${getColor(flowData.target)}">${getTranslatedCardName(flowData.target)}</b> (Visitors: ${coloredVisitors})`);
  }
};

// --- ORTAK İŞLEMLER ---
window.directLog = function(msg) { addLog(`<b style="color:${getColor(activePlayer)}">${getTranslatedCardName(activePlayer)}</b>: ${msg}`); resetSelection(); };

window.markPlayer = function(status) {
  const card = document.getElementById(activePlayer); const iconSpan = card.querySelector('.status-icon'); const targetPlayer = activePlayer; 
  if (status === 'safe') {
    iconSpan.innerText = '✔'; iconSpan.style.color = '#0be881'; iconSpan.style.display = 'flex';
    addLog(`<b style="color:${getColor(activePlayer)}">${getTranslatedCardName(activePlayer)}</b> ➔ Safe/Güvenli`, false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; });
  } else if (status === 'sus') {
    iconSpan.innerText = '✘'; iconSpan.style.color = '#ff3f34'; iconSpan.style.display = 'flex';
    addLog(`<b style="color:${getColor(activePlayer)}">${getTranslatedCardName(activePlayer)}</b> ➔ Sus/Şüpheli`, false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; });
  }
  resetSelection();
};

window.setRole = function(role) {
  const target = activePlayer; const c = getRoleColors(role); const removeBadge = addRoleBadge(target, role, c.bg, c.text);
  addLog(`<b style="color:${getColor(target)}">${getTranslatedCardName(target)}</b> ➔ <b style="background:${c.bg}; color:${c.text}; padding:2px 4px; border-radius:3px;">${t(role,'roles')}</b>`, false, () => { removeBadge(); });
  resetSelection();
};

document.getElementById('btn-went').addEventListener('click', () => { pendingAction = 'went'; selectedNameLabel.innerText = "➔ ?"; });
document.getElementById('btn-stayed').addEventListener('click', () => { directLog('Stayed Home / Evde Kaldı'); });
document.getElementById('btn-went-out').addEventListener('click', () => { directLog('Went Out / Dışarı Çıktı'); });

window.resetSelection = function() {
  activePlayer = null; pendingAction = null; flowData = {}; multiSelectColors = [];
  cards.forEach(c => c.style.border = "2px solid var(--card-border)"); openPanel(null);
};

document.getElementById('btn-new-turn').addEventListener('click', () => {
  turnCount++; addLog(`<b style="color: var(--heading-color);">--- TURN / TUR ${turnCount} ---</b>`, true);
});

document.getElementById('btn-reset-game').addEventListener('click', () => {
  if(confirm("Emin misiniz / Are you sure?")) {
    logList.innerHTML = ''; turnCount = 1; document.getElementById('manual-notes').value = '';
    cards.forEach(card => { card.querySelector('.status-icon').style.display = 'none'; const rc = card.querySelector('.roles-container'); if(rc) rc.remove(); });
    resetSelection();
  }
});

function addLog(text, isSystemLog = false, onDeleteCallback = null) {
  const li = document.createElement('li'); const contentSpan = document.createElement('span'); contentSpan.innerHTML = text; li.appendChild(contentSpan);
  if (!isSystemLog) {
    const delBtn = document.createElement('button'); delBtn.innerText = "X"; delBtn.className = "delete-log";
    delBtn.onclick = function() { li.remove(); if (onDeleteCallback) onDeleteCallback(); }; li.appendChild(delBtn);
  }
  logList.prepend(li);
}

function getColor(colorName) {
  const colors = { 'Beyaz': '#F3F3F3', 'Turuncu': '#FA8A1C', 'Mor': '#b554e6', 'Koyu Yeşil': '#40a124', 'Mavi': '#6c8dec', 'Kırmızı': '#ff4d4d', 'Sarı': '#FCE14E', 'Açık Yeşil': '#7AFF48', 'Turkuaz': '#2BD8C8', 'Açık Pembe': '#FF95B7', 'Kahverengi': '#d18b5e', 'Koyu Pembe': '#EB00E4', 'Parlak Turuncu': '#F84000' };
  return colors[colorName] || '#ffffff';
}

const searchInput = document.getElementById('log-search');
if(searchInput) {
  searchInput.addEventListener('input', function() {
      let filter = this.value.toLocaleLowerCase('tr-TR');
      let logs = document.getElementById('log-list').children;
      for (let i = 0; i < logs.length; i++) {
          let logText = logs[i].textContent || logs[i].innerText;
          logs[i].style.display = logText.toLocaleLowerCase('tr-TR').indexOf(filter) > -1 ? "" : "none";
      }
  });
}
