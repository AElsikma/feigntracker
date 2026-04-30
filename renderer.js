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
    log: {
      wentTo: "➔ {target}'a gitti.",
      stayedHome: "Evde kaldığını söyledi.",
      wentOut: "Dışarı çıktığını (belirsiz) söyledi.",
      docNormal: "Doktor olarak {target}'a gitti, BİR ŞEY OLMADI.",
      docSaved: "Doktor olarak {target}'a gitti ve KURTARDI.",
      docTrapped: "Doktor olarak {target}'a gitti, TUZAĞA YAKALANDI.",
      polTriedExit: "Polis olarak {target}'a gitti, ÇIKMAYA ÇALIŞTI.",
      polStayed: "Polis olarak {target}'a gitti, ÇIKMAYA ÇALIŞMADI.",
      polTrapped: "Polis olarak {target}'a gitti, TUZAĞA YAKALANDI.",
      trapNoTrigger: "{target}'a tuzak kurdu, BASILMADI.",
      trapTriggered: "{target}'a tuzak kurdu, BASILDI.",
      trapTrapped: "{target}'a tuzak kurmaya gitti, TUZAĞA YAKALANDI.",
      provProvoked: "{target}'ı provoke ettiğini söyledi.",
      provTrapped: "{target}'ı provoke etmeye gitti, TUZAĞA YAKALANDI.",
      lookoutNobody: "(Gözcü) {target}'a kimsenin gelmediğini söyledi.",
      lookoutSaw: "(Gözcü) {target}'a şunların geldiğini gördü: {visitors}.",
      lookoutTrapped: "Gözcü olarak {target}'a giderken TUZAĞA YAKALANDI.",
      trackerSawStayed: "(İzci) {target}'in EVDEN ÇIKMADIĞINI gördü.",
      trackerTrapped: "İzci olarak {target}'i izlemeye gitti, TUZAĞA YAKALANDI.",
      trackerSawWent: "(İzci) {target}'in ➔ {visited}'a gittiğini gördü.",
      detTrapped: "Dedektif olarak {target}'a gitti, TUZAĞA YAKALANDI.",
      detSaidRoles: "(Dedektif) {target}'in <b style=\"color:{c1}\">{t1} {r1}</b> veya <b style=\"color:{c2}\">{t2} {r2}</b> olduğunu söyledi.",
      snitchTrapped: "İspiyoncu olarak {target}'a gitti, TUZAĞA YAKALANDI.",
      snitchSaidRole: "(İspiyoncu) {target}'in <b style=\"color:{c1}\">{team} {role}</b> olduğunu söyledi.",
      snitchHiddenRole: "(İspiyoncu) {target}'in <b style=\"color:{c1}\">{team}</b> olduğunu söyledi ama net rolünü gizledi.",
      snitchNoInfo: "{target}'e gittiğini ama hiçbir bilgi vermeyeceğini söyledi.",
      survShield: "Kalkan Kullandı ve KURTULDU.",
      survNoShield: "Kalkan kullanmadı.",
      incDocSaved: "DOKTOR geldi ve KURTARDI.",
      incDocCame: "DOKTOR geldi ama kurtarmadı.",
      incPolCaught: "POLİS geldi ve TUTTU.",
      incTrapHit: "TUZAĞA BASTI.",
      incProvCame: "PROVOKATÖR geldi.",
      markSafe: "{target} güvenli.",
      markSus: "{target} şüpheli.",
      setRole: "{target} rolünü <b>{role}</b> olarak açıkladı."
    },
    ui: {
      targetWait: "Hedef Bekleniyor", targetSelect: "Lütfen yukarıdaki tablodan hedef oyuncuyu seçin.",
      confirmReset: "Tüm kayıtlar silinip GEÇMİŞ OYUNLAR'a kaydedilecek. Emin misiniz?",
      noHistory: "Henüz kaydedilmiş bir oyun geçmişi bulunmuyor.",
      or: "VEYA", chooseGroup: "Grubunu Seçin", hiddenInfo: "Bilgiyi Gizledi (Söylemedi)",
      trappedBtn: "Tuzağa Yakalandı",
      saidMasum: "Masum Dedi", saidSus: "Şüpheli Dedi", saidNeutral: "Tarafsız Dedi", saidNothing: "Hiçbir Şey Söylemedi (Belirsiz)",
      snitchHidden: "İspiyoncu Bilgiyi Sakladı", whatDidTheySay: "Hedef oyuncunun hangi grupta olduğunu belirtti mi?",
      nobodyCame: "Kimse Gelmedi", saveSelected: "Seçilenleri Kaydet", stayedHomeBtn: "Evden Çıkmadı",
      Masum: "Masum", Şüpheli: "Şüpheli", Tarafsız: "Tarafsız",
      btnNormal: "Bir Şey Olmadı", btnSaved: "Kurtardı", btnTriedExit: "Çıkmaya Çalıştı", btnStayed: "Çıkmaya Çalışmadı",
      btnNoTrigger: "Basılmadı", btnTriggered: "Basıldı", btnProvoked: "Provoke Etti",
      btnShield: "Kalkan Kullandı", btnNoShield: "Kalkan Kullanmadı", selfTargetAlert: "Hata: Kendini seçemezsin!",
      confirmClearHistory: "Tüm oyun geçmişiniz kalıcı olarak silinecektir. Emin misiniz?"
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
    log: {
      wentTo: "➔ went to {target}.",
      stayedHome: "Said they stayed home.",
      wentOut: "Said they went out (unknown).",
      docNormal: "Went to {target} as Doctor, NOTHING HAPPENED.",
      docSaved: "Went to {target} as Doctor and SAVED.",
      docTrapped: "Went to {target} as Doctor, TRAPPED.",
      polTriedExit: "Went to {target} as Police, TRIED TO EXIT.",
      polStayed: "Went to {target} as Police, DID NOT TRY TO EXIT.",
      polTrapped: "Went to {target} as Police, TRAPPED.",
      trapNoTrigger: "Set trap for {target}, NOT TRIGGERED.",
      trapTriggered: "Set trap for {target}, TRIGGERED.",
      trapTrapped: "Went to set trap for {target}, TRAPPED.",
      provProvoked: "Said they provoked {target}.",
      provTrapped: "Went to provoke {target}, TRAPPED.",
      lookoutNobody: "(Lookout) Said nobody visited {target}.",
      lookoutSaw: "(Lookout) Saw these visiting {target}: {visitors}.",
      lookoutTrapped: "Went to {target} as Lookout, TRAPPED.",
      trackerSawStayed: "(Tracker) Saw that {target} DID NOT LEAVE HOME.",
      trackerTrapped: "Went to track {target} as Tracker, TRAPPED.",
      trackerSawWent: "(Tracker) Saw {target} go to ➔ {visited}.",
      detTrapped: "Went to {target} as Investigator, TRAPPED.",
      detSaidRoles: "(Investigator) Said {target} is <b style=\"color:{c1}\">{t1} {r1}</b> or <b style=\"color:{c2}\">{t2} {r2}</b>.",
      snitchTrapped: "Went to {target} as Snitch, TRAPPED.",
      snitchSaidRole: "(Snitch) Said {target} is <b style=\"color:{c1}\">{team} {role}</b>.",
      snitchHiddenRole: "(Snitch) Said {target} is <b style=\"color:{c1}\">{team}</b> but hid exact role.",
      snitchNoInfo: "Said they went to {target} but won't share any info.",
      survShield: "Used Shield and SURVIVED.",
      survNoShield: "Did not use Shield.",
      incDocSaved: "DOCTOR came and SAVED.",
      incDocCame: "DOCTOR came (Did not save).",
      incPolCaught: "POLICE came and CAUGHT.",
      incTrapHit: "STEPPED on TRAP.",
      incProvCame: "PROVOCATEUR came.",
      markSafe: "{target} is safe.",
      markSus: "{target} is suspicious.",
      setRole: "{target} revealed role as <b>{role}</b>."
    },
    ui: {
      targetWait: "Waiting for Target", targetSelect: "Please select target player from the grid above.",
      confirmReset: "Current logs will be saved to PAST GAMES and cleared. Are you sure?",
      noHistory: "No saved game history found yet.",
      or: "OR", chooseGroup: "Choose Group", hiddenInfo: "Hid Info (Didn't Say)",
      trappedBtn: "Trapped",
      saidMasum: "Said Safe", saidSus: "Said Sus", saidNeutral: "Said Neutral", saidNothing: "Said Nothing (Unknown)",
      snitchHidden: "Snitch Hid Info", whatDidTheySay: "Did they specify the group of the target?",
      nobodyCame: "Nobody", saveSelected: "Save Selected", stayedHomeBtn: "Stayed Home",
      Masum: "Safe", Şüpheli: "Sus", Tarafsız: "Neutral",
      btnNormal: "Nothing Happened", btnSaved: "Saved", btnTriedExit: "Tried to Exit", btnStayed: "Didn't Try Exit",
      btnNoTrigger: "Not Triggered", btnTriggered: "Triggered", btnProvoked: "Provoked",
      btnShield: "Shield Used", btnNoShield: "No Shield", selfTargetAlert: "Error: Cannot select yourself!",
      confirmClearHistory: "All past game history will be permanently deleted. Are you sure?"
    }
  }
};

let currentLang = 'tr';
function t(key, subCategory = null) {
  if (subCategory) return translations[currentLang][subCategory][key] || key;
  return translations[currentLang][key] || key;
}

function tLog(key, params = {}) {
  let str = t(key, 'log');
  for (let k in params) {
    str = str.replace(`{${k}}`, params[k]);
  }
  return str;
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
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.innerText = isLight ? "🌙 Mode" : "☀️ Mode";
  });
}

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    langToggle.innerText = currentLang === 'tr' ? "🌐 EN" : "🌐 TR";
    applyTranslations();
  });
}

const feedbackBtn = document.getElementById('feedback-btn');
if (feedbackBtn) {
  feedbackBtn.addEventListener('click', () => {
    const fPanel = document.getElementById('feedback-panel');
    const hPanel = document.getElementById('history-panel');
    if (hPanel) hPanel.style.display = 'none';
    fPanel.style.display = fPanel.style.display === 'flex' ? 'none' : 'flex';
  });
}

const historyBtn = document.getElementById('history-btn');
if (historyBtn) {
  historyBtn.addEventListener('click', () => {
    const fPanel = document.getElementById('feedback-panel');
    const hPanel = document.getElementById('history-panel');
    if (fPanel) fPanel.style.display = 'none';
    hPanel.style.display = hPanel.style.display === 'flex' ? 'none' : 'flex';
    if (hPanel.style.display === 'flex') renderHistoryPanel();
  });
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.getAttribute('data-i18n')); });
  const searchEl = document.getElementById('log-search');
  if (searchEl) searchEl.placeholder = t('searchPlaceholder');
  const notesEl = document.getElementById('manual-notes');
  if (notesEl) notesEl.placeholder = t('notesPlaceholder');
  
  cards.forEach(card => {
    const rawName = card.id; 
    const enName = card.getAttribute('data-color');
    const displayText = currentLang === 'en' ? enName.replace(' ', '<br>') : rawName.replace(' ', '<br>');
    
    const statusIcon = card.querySelector('.status-icon');
    const rolesContainer = card.querySelector('.roles-container');
    
    card.innerHTML = `${displayText}`;
    if (statusIcon) card.appendChild(statusIcon);
    if (rolesContainer) card.appendChild(rolesContainer);
  });

  document.querySelectorAll('.role-badge').forEach(badge => {
    const roleKey = badge.getAttribute('data-role');
    if (roleKey) {
      if (roleKey.includes(' (?)')) {
        const base = roleKey.split(' ')[0];
        badge.innerText = t(base, 'ui') + ' (?)';
      } else {
        badge.innerText = t(roleKey, 'roles');
      }
    }
  });
  
  renderDynamicPanels();
}

function renderDynamicPanels() {
  const roleGrid = document.getElementById('role-grid-container');
  if (roleGrid) {
    roleGrid.innerHTML = '';
    Object.keys(roleDB).forEach(category => {
      const colorClass = category === 'masum' ? 'role-masum' : (category === 'gri' ? 'role-gri' : (category === 'hain' ? 'role-hain' : 'role-tarafsiz'));
      roleDB[category].forEach(role => {
        roleGrid.innerHTML += `<button class="action-btn ${colorClass}" onclick="setRole('${role.n}')">${t(role.n, 'roles')}</button>`;
      });
    });
  }

  const actionGrid = document.getElementById('action-grid-container');
  if (actionGrid) {
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
  }

  const incomingGrid = document.getElementById('incoming-action-container');
  if (incomingGrid) {
    incomingGrid.innerHTML = `
      <button class="action-btn role-masum" onclick="directLog(tLog('incDocSaved'))">${t('Doktor','roles')} (+)</button>
      <button class="action-btn role-masum" onclick="directLog(tLog('incDocCame'))">${t('Doktor','roles')} (-)</button>
      <button class="action-btn role-gri" onclick="directLog(tLog('incPolCaught'))">${t('Polis','roles')} (+)</button>
      <button class="action-btn role-hain" onclick="directLog(tLog('incTrapHit'))">${t('Tuzakçı','roles')} (+)</button>
      <button class="action-btn role-hain" onclick="directLog(tLog('incProvCame'))">${t('Provakatör','roles')} (+)</button>
    `;
  }
}
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
  const badge = document.createElement('div'); badge.className = 'role-badge'; 
  badge.setAttribute('data-role', text); 
  
  if (text.includes(' (?)')) {
    const base = text.split(' ')[0];
    badge.innerText = t(base, 'ui') + ' (?)';
  } else {
    badge.innerText = t(text, 'roles');
  }
  
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
      if (selfTargetActions.includes(pendingAction) && clickedPlayer === activePlayer) { alert(t('selfTargetAlert', 'ui')); return; }
      
      const targetSpanHtml = `<span style="color:${getColor(clickedPlayer)}">${clickedNameDisplay}</span>`;

      if (pendingAction === 'gozcu_visitors' || pendingAction === 'izci_went_where') {
         if (pendingAction === 'gozcu_visitors' && clickedPlayer === activePlayer) return;
         if (pendingAction === 'gozcu_visitors') {
            const index = multiSelectColors.indexOf(clickedPlayer);
            if (index > -1) { multiSelectColors.splice(index, 1); card.style.border = "2px solid var(--card-border)"; } 
            else { multiSelectColors.push(clickedPlayer); card.style.border = "3px dashed #0fbcf9"; }
            return; 
         }
         if (pendingAction === 'izci_went_where') {
            const trackedSpan = `<span style="color:${getColor(flowData.target)}">${getTranslatedCardName(flowData.target)}</span>`;
            const msg = tLog('trackerSawWent', {target: trackedSpan, visited: targetSpanHtml});
            directLog(msg);
            return;
         }
      }

      if (pendingAction === 'went') {
        const actorSpan = `<span style="color:${getColor(activePlayer)}">${activeNameDisplay}</span>`;
        const msg = tLog('wentTo', {target: targetSpanHtml});
        addLog(`${actorSpan} ${msg}`);
        resetSelection(); return;
      }

      flowData.target = clickedPlayer;

      if (pendingAction === 'doktor_target') {
        const msg1 = tLog('docNormal', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg2 = tLog('docSaved', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg3 = tLog('docTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(t('Doktor','roles'), "?", `
          <button class="action-btn" onclick="directLog('${msg1}')">${t('btnNormal','ui')}</button>
          <button class="action-btn safe-btn" onclick="directLog('${msg2}')">${t('btnSaved','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg3}')">${t('trappedBtn','ui')}</button>
        `);
      } 
      else if (pendingAction === 'polis_target') {
        const msg1 = tLog('polTriedExit', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg2 = tLog('polStayed', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg3 = tLog('polTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(t('Polis','roles'), "?", `
          <button class="action-btn" onclick="directLog('${msg1}')">${t('btnTriedExit','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg2}')">${t('btnStayed','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg3}')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'tuzakci_target') {
        const msg1 = tLog('trapNoTrigger', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg2 = tLog('trapTriggered', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg3 = tLog('trapTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(t('Tuzakçı','roles'), "?", `
          <button class="action-btn" onclick="directLog('${msg1}')">${t('btnNoTrigger','ui')}</button>
          <button class="action-btn sus-btn" onclick="directLog('${msg2}')">${t('btnTriggered','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg3}')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'provokator_target') {
        const msg1 = tLog('provProvoked', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg2 = tLog('provTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(t('Provakatör','roles'), "?", `
          <button class="action-btn safe-btn" onclick="directLog('${msg1}')">${t('btnProvoked','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg2}')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        const msg1 = tLog('lookoutTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(clickedNameDisplay, t('saveSelected','ui'), `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">${t('saveSelected','ui')}</button>
          <button class="action-btn" onclick="saveGozcu(true)">${t('nobodyCame','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg1}')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'izci_target') {
        pendingAction = 'izci_went_where';
        const msg1 = tLog('trackerSawStayed', {target: targetSpanHtml}).replace(/'/g, "\\'");
        const msg2 = tLog('trackerTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(clickedNameDisplay, "?", `
          <button class="action-btn eylem-btn" onclick="directLog('${msg1}')">${t('stayedHomeBtn','ui')}</button>
          <button class="action-btn" onclick="directLog('${msg2}')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'dedektif_target') {
        flowData.dedektif = { target: clickedPlayer, t1: null, r1: null, t2: null, r2: null };
        showDedektifTeamSelection(1);
      }
      else if (pendingAction === 'ispiyoncu_target') {
        const msg1 = tLog('snitchTrapped', {target: targetSpanHtml}).replace(/'/g, "\\'");
        showDecision(clickedNameDisplay, t('chooseGroup','ui'), `
          <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap; max-width: 400px; margin: 0 auto;">
            <button class="action-btn role-masum" style="flex: 1; min-width: 100px;" onclick="renderIspiyoncuRoles('Masum')">${t('Masum','ui')}</button>
            <button class="action-btn role-hain" style="flex: 1; min-width: 100px;" onclick="renderIspiyoncuRoles('Şüpheli')">${t('Şüpheli','ui')}</button>
            <button class="action-btn role-tarafsiz" style="flex: 1; min-width: 100px;" onclick="renderIspiyoncuRoles('Tarafsız')">${t('Tarafsız','ui')}</button>
            <button class="action-btn eylem-btn" style="flex: 1; min-width: 100px;" onclick="showIspiyoncuSoylemedi()">${t('hiddenInfo','ui')}</button>
            <button class="action-btn" style="flex: 1; min-width: 100px;" onclick="directLog('${msg1}')">${t('trappedBtn','ui')}</button>
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
    <button class="action-btn safe-btn" onclick="directLog(tLog('survShield'))">${t('btnShield','ui')}</button>
    <button class="action-btn" onclick="directLog(tLog('survNoShield'))">${t('btnNoShield','ui')}</button>
  `);
}

// --- DEDEKTİF MANTIĞI ---
window.showDedektifTeamSelection = function(step) {
  pendingAction = step === 1 ? 'dedektif_team_1' : 'dedektif_team_2';
  
  const targetSpan = `<span style="color:${getColor(flowData.dedektif.target)}">${getTranslatedCardName(flowData.dedektif.target)}</span>`;
  const msgTrapped = tLog('detTrapped', {target: targetSpan}).replace(/'/g, "\\'");

  let trapBtn = step === 1 ? `<button class="action-btn" style="flex: 1; min-width: 100px;" onclick="directLog('${msgTrapped}')">${t('trappedBtn','ui')}</button>` : '';

  showDecision(`${t('Dedektif','roles')} - Step ${step}`, t('chooseGroup','ui'), `
    <div style="display: flex; gap: 5px; justify-content: center; flex-wrap: wrap;">
      <button class="action-btn role-masum" style="flex: 1; min-width: 80px;" onclick="selectDedektifTeam('Masum')">${t('Masum','ui')}</button>
      <button class="action-btn role-hain" style="flex: 1; min-width: 80px;" onclick="selectDedektifTeam('Şüpheli')">${t('Şüpheli','ui')}</button>
      <button class="action-btn role-tarafsiz" style="flex: 1; min-width: 80px;" onclick="selectDedektifTeam('Tarafsız')">${t('Tarafsız','ui')}</button>
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
  if (currentTeam === 'Masum') { rolesToShow = [...roleDB.masum, ...roleDB.gri].filter(r => r.n !== 'Deli'); colorClass = 'role-masum'; } 
  else if (currentTeam === 'Şüpheli') { rolesToShow = [...roleDB.hain, ...roleDB.gri]; colorClass = 'role-hain'; } 
  else if (currentTeam === 'Tarafsız') { rolesToShow = [...roleDB.tarafsiz]; colorClass = 'role-tarafsiz'; }
  
  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => { html += `<button class="action-btn ${colorClass}" onclick="selectDedektifRole('${r.n}')">${t(r.n,'roles')}</button>`; });
  html += `</div>`;
  showDecision(`${t('Dedektif','roles')} - Step ${step}`, t('chooseRole', 'ui') || "?", html);
}

window.selectDedektifRole = function(roleName) {
  if (pendingAction === 'dedektif_role_1') { flowData.dedektif.r1 = roleName; showDedektifTeamSelection(2); } 
  else {
    flowData.dedektif.r2 = roleName; const { target, t1, r1, t2, r2 } = flowData.dedektif;
    const c1_bg = t1 === 'Masum' ? '#0be881' : (t1 === 'Şüpheli' ? '#ff3f34' : '#4bcffa'); const c1_txt = t1 === 'Şüpheli' ? 'white' : 'black';
    const c2_bg = t2 === 'Masum' ? '#0be881' : (t2 === 'Şüpheli' ? '#ff3f34' : '#4bcffa'); const c2_txt = t2 === 'Şüpheli' ? 'white' : 'black';
    const rb1 = addRoleBadge(target, r1, c1_bg, c1_txt); const rb2 = addRoleBadge(target, r2, c2_bg, c2_txt);
    
    const targetSpan = `<span style="color:${getColor(target)}">${getTranslatedCardName(target)}</span>`;
    const msg = tLog('detSaidRoles', {
      target: targetSpan,
      c1: c1_bg, t1: t(t1,'ui'), r1: t(r1,'roles'),
      c2: c2_bg, t2: t(t2,'ui'), r2: t(r2,'roles')
    });

    addLog(msg, false, () => { rb1(); rb2(); });
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
  showDecision(t('İspiyoncu','roles'), t('chooseRole', 'ui') || "?", html);
}

window.selectIspiyoncuRole = function(roleName, team) {
  const target = flowData.target;
  const bg = team === 'Masum' ? '#0be881' : (team === 'Şüpheli' ? '#ff3f34' : '#4bcffa'); const txt = team === 'Şüpheli' ? 'white' : 'black';
  const removeBadge = addRoleBadge(target, roleName, bg, txt);
  
  const targetSpan = `<span style="color:${getColor(target)}">${getTranslatedCardName(target)}</span>`;
  const msg = tLog('snitchSaidRole', {
    target: targetSpan, c1: bg, team: t(team,'ui'), role: t(roleName,'roles')
  });

  addLog(msg, false, () => { removeBadge(); });
  resetSelection();
}

window.showIspiyoncuSoylemedi = function() {
  showDecision(t('snitchHidden', 'ui'), t('whatDidTheySay', 'ui'), `
    <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap; max-width: 400px; margin: 0 auto;">
      <button class="action-btn role-masum" style="flex: 1; min-width: 100px;" onclick="saveIspiyoncuSoylemedi('Masum')">${t('saidMasum', 'ui')}</button>
      <button class="action-btn role-hain" style="flex: 1; min-width: 100px;" onclick="saveIspiyoncuSoylemedi('Şüpheli')">${t('saidSus', 'ui')}</button>
      <button class="action-btn role-tarafsiz" style="flex: 1; min-width: 100px;" onclick="saveIspiyoncuSoylemedi('Tarafsız')">${t('saidNeutral', 'ui')}</button>
      <button class="action-btn" style="background-color: #808e9b; color: white; width: 100%; margin-top: 5px;" onclick="saveIspiyoncuSoylemedi('Belirsiz')">${t('saidNothing', 'ui')}</button>
    </div>
  `);
}

window.saveIspiyoncuSoylemedi = function(group) {
  const target = flowData.target;
  const targetSpan = `<span style="color:${getColor(target)}">${getTranslatedCardName(target)}</span>`;

  if (group === 'Belirsiz') {
    directLog(tLog('snitchNoInfo', {target: targetSpan}));
  } else {
    const bg = group === 'Masum' ? '#0be881' : (group === 'Şüpheli' ? '#ff3f34' : '#4bcffa');
    const txt = group === 'Şüpheli' ? 'white' : 'black';
    const removeBadge = addRoleBadge(target, `${group} (?)`, bg, txt);
    
    const msg = tLog('snitchHiddenRole', {
      target: targetSpan, c1: bg, team: t(group,'ui')
    });

    addLog(msg, false, () => removeBadge());
  }
  resetSelection();
}

// --- GÖZCÜ KAYIT ---
window.saveGozcu = function(kimseGelmedi) {
  const targetSpan = `<span style="color:${getColor(flowData.target)}">${getTranslatedCardName(flowData.target)}</span>`;
  if (kimseGelmedi) { 
    directLog(tLog('lookoutNobody', {target: targetSpan}));
  } else {
    if (multiSelectColors.length === 0) { alert(currentLang === 'tr' ? "En az bir renk seçmelisiniz!" : "Please select at least one color!"); return; }
    const coloredVisitors = multiSelectColors.map(c => `<span style="color:${getColor(c)}">${getTranslatedCardName(c)}</span>`).join(", ");
    directLog(tLog('lookoutSaw', {target: targetSpan, visitors: coloredVisitors}));
  }
};

// --- ORTAK İŞLEMLER ---
window.directLog = function(msg) { 
  addLog(`<span style="color:${getColor(activePlayer)}">${getTranslatedCardName(activePlayer)}</span>: ${msg}`); 
  resetSelection(); 
};

window.markPlayer = function(status) {
  const card = document.getElementById(activePlayer); const iconSpan = card.querySelector('.status-icon'); const targetPlayer = activePlayer; 
  const targetSpan = `<span style="color:${getColor(activePlayer)}">${getTranslatedCardName(activePlayer)}</span>`;

  if (status === 'safe') {
    iconSpan.innerText = '✔'; iconSpan.style.color = '#0be881'; iconSpan.style.display = 'flex';
    addLog(tLog('markSafe', {target: targetSpan}), false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; });
  } else if (status === 'sus') {
    iconSpan.innerText = '✘'; iconSpan.style.color = '#ff3f34'; iconSpan.style.display = 'flex';
    addLog(tLog('markSus', {target: targetSpan}), false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; });
  }
  resetSelection();
};

window.setRole = function(role) {
  const target = activePlayer; const c = getRoleColors(role); const removeBadge = addRoleBadge(target, role, c.bg, c.text);
  const targetSpan = `<span style="color:${getColor(target)}">${getTranslatedCardName(target)}</span>`;
  addLog(tLog('setRole', {target: targetSpan, role: t(role,'roles')}), false, () => { removeBadge(); });
  resetSelection();
};

const btnWent = document.getElementById('btn-went');
if(btnWent) btnWent.addEventListener('click', () => { pendingAction = 'went'; selectedNameLabel.innerText = "➔ ?"; });

const btnStayed = document.getElementById('btn-stayed');
if(btnStayed) btnStayed.addEventListener('click', () => { directLog(tLog('stayedHome')); });

const btnWentOut = document.getElementById('btn-went-out');
if(btnWentOut) btnWentOut.addEventListener('click', () => { directLog(tLog('wentOut')); });

window.resetSelection = function() {
  activePlayer = null; pendingAction = null; flowData = {}; multiSelectColors = [];
  cards.forEach(c => c.style.border = "2px solid var(--card-border)"); openPanel(null);
};

const btnNewTurn = document.getElementById('btn-new-turn');
if (btnNewTurn) {
  btnNewTurn.addEventListener('click', () => {
    turnCount++; addLog(`<b style="color: var(--heading-color);">--- TURN / TUR ${turnCount} ---</b>`, true);
  });
}

// --- OYUNU SIFIRLAMA VE GEÇMİŞE KAYDETME ---
const btnResetGame = document.getElementById('btn-reset-game');
if (btnResetGame) {
  btnResetGame.addEventListener('click', () => {
    if(confirm(t('confirmReset', 'ui'))) {
      
      const listItems = logList.querySelectorAll('li');
      if (listItems.length > 0) {
        let currentLogs = [];
        for (let i = listItems.length - 1; i >= 0; i--) {
          const span = listItems[i].querySelector('span');
          if (span) currentLogs.push(span.innerHTML);
        }
        
        const gameRecord = {
          date: new Date().toLocaleString(currentLang === 'tr' ? 'tr-TR' : 'en-US'),
          logs: currentLogs
        };

        let history = JSON.parse(localStorage.getItem('feignTrackerHistory')) || [];
        history.unshift(gameRecord); 
        if (history.length > 15) history.pop(); 
        localStorage.setItem('feignTrackerHistory', JSON.stringify(history));
      }

      logList.innerHTML = ''; 
      turnCount = 1; 
      const manualNotes = document.getElementById('manual-notes');
      if (manualNotes) manualNotes.value = '';
      
      cards.forEach(card => { 
        const statusIcon = card.querySelector('.status-icon');
        if (statusIcon) statusIcon.style.display = 'none'; 
        const rc = card.querySelector('.roles-container'); 
        if(rc) rc.remove(); 
      });
      resetSelection();
    }
  });
}

// --- GEÇMİŞ PANELİNİ ÇİZME (RENDER) VE SİLME ---
function renderHistoryPanel() {
  const container = document.getElementById('history-list-container');
  if (!container) return;
  container.innerHTML = '';
  let history = JSON.parse(localStorage.getItem('feignTrackerHistory')) || [];

  if (history.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#7f8fa6; margin-top:20px; font-style:italic;">${t('noHistory', 'ui')}</p>`;
    return;
  }

  history.forEach((game) => {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'history-record';

    const dateDiv = document.createElement('div');
    dateDiv.className = 'history-date';
    dateDiv.innerText = game.date;
    gameDiv.appendChild(dateDiv);

    const ul = document.createElement('ul');
    ul.style.listStyleType = 'none'; ul.style.padding = '0'; ul.style.margin = '0';
    
    game.logs.forEach(logHtml => {
      const li = document.createElement('li');
      li.style.padding = "3px 0";
      li.innerHTML = logHtml; 
      ul.appendChild(li);
    });

    gameDiv.appendChild(ul);
    container.appendChild(gameDiv);
  });
}

const clearHistoryBtn = document.getElementById('clear-history-btn');
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener('click', () => {
    if(confirm(t('confirmClearHistory', 'ui'))) {
      localStorage.removeItem('feignTrackerHistory');
      renderHistoryPanel(); 
    }
  });
}

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

// --- FORMSPREE ARKA PLAN MAİL GÖNDERME SİSTEMİ ---
const sendFeedbackBtn = document.getElementById('send-feedback-btn');
const feedbackTextArea = document.getElementById('feedback-text');
if (sendFeedbackBtn) {
  sendFeedbackBtn.addEventListener('click', async () => {
    const feedbackText = feedbackTextArea.value.trim();
    if (!feedbackText) {
      alert(currentLang === 'tr' ? "Lütfen bir mesaj yazın." : "Please write a message.");
      return;
    }
    sendFeedbackBtn.disabled = true;
    const originalBtnText = sendFeedbackBtn.innerText;
    sendFeedbackBtn.innerText = currentLang === 'tr' ? "Gönderiliyor..." : "Sending...";
    try {
      const response = await fetch("https://formspree.io/f/xzdobbbd", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: feedbackText,
          date: new Date().toLocaleString(),
          language: currentLang === 'tr' ? "Türkçe" : "English"
        })
      });
      if (response.ok) {
        alert(currentLang === 'tr' ? "Mesajınız başarıyla iletildi!" : "Message sent successfully!");
        feedbackTextArea.value = '';
        document.getElementById('feedback-panel').style.display = 'none';
      } else {
        throw new Error("Sunucu hatası");
      }
    } catch (error) {
      alert(currentLang === 'tr' 
        ? "Bir hata oluştu. Lütfen internet bağlantınızı kontrol edin." 
        : "An error occurred. Please check your internet connection.");
    } finally {
      sendFeedbackBtn.disabled = false;
      sendFeedbackBtn.innerText = originalBtnText;
    }
  });
}
