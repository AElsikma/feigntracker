// ==========================================
// YARDIMCI: Türkçe Kesme İşareti
// ==========================================
function turkishApostrophe(word, suffix) {
  // Türkçe sesli harf uyumuna göre kesme işareti + ek
  const backVowels = ['a','ı','o','u','A','I','O','U'];
  const frontVowels = ['e','i','ö','ü','E','İ','Ö','Ü'];
  const vowels = [...backVowels, ...frontVowels];
  
  // Son sesliyi bul
  let lastVowel = '';
  for (let i = word.length - 1; i >= 0; i--) {
    if (vowels.includes(word[i])) { lastVowel = word[i].toLowerCase(); break; }
  }
  
  // -a/-e eki için
  if (suffix === 'a') {
    return backVowels.map(v=>v.toLowerCase()).includes(lastVowel) ? `${word}'a` : `${word}'e`;
  }
  // -ı/-i/-u/-ü eki için (genitif/yön)
  if (suffix === 'ı') {
    if (['a','ı'].includes(lastVowel)) return `${word}'ı`;
    if (['e','i'].includes(lastVowel)) return `${word}'i`;
    if (['o','u'].includes(lastVowel)) return `${word}'u`;
    if (['ö','ü'].includes(lastVowel)) return `${word}'ü`;
  }
  // -ın/-in/-un/-ün eki
  if (suffix === 'ın') {
    if (['a','ı'].includes(lastVowel)) return `${word}'ın`;
    if (['e','i'].includes(lastVowel)) return `${word}'in`;
    if (['o','u'].includes(lastVowel)) return `${word}'un`;
    if (['ö','ü'].includes(lastVowel)) return `${word}'ün`;
  }
  return `${word}'${suffix}`;
}

// Renkli span + kesme işareti birleşimi
function colorSpan(id, lang) {
  const name = lang === 'en' ? getEnName(id) : id;
  const suffix = lang === 'en' ? null : getSuffix(id);
  return { 
    plain: `<span style="color:${getColor(id)}">${name}</span>`,
    withA: lang === 'en' ? `<span style="color:${getColor(id)}">${name}</span>` : `<span style="color:${getColor(id)}">${turkishApostrophe(id, 'a')}</span>`,
    withI: lang === 'en' ? `<span style="color:${getColor(id)}">${name}</span>` : `<span style="color:${getColor(id)}">${turkishApostrophe(id, 'ı')}</span>`,
    withIn: lang === 'en' ? `<span style="color:${getColor(id)}">${name}</span>` : `<span style="color:${getColor(id)}">${turkishApostrophe(id, 'ın')}</span>`,
  };
}

function getEnName(id) {
  const card = document.getElementById(id);
  return card ? card.getAttribute('data-color') : id;
}

// ==========================================
// 1. DİL (i18n) VE ÇEVİRİ SÖZLÜĞÜ
// ==========================================
const translations = {
  tr: {
    newTurn: "Yeni Tura Geç", resetGame: "Oyunu Sıfırla", safe: "✔ Güvenli", sus: "✘ Şüpheli",
    setRole: "Rol Belirt", wentTo: "Şuraya Gitti ➔", actionSpecial: "⚡ Eylem (Rol Özel)",
    incomingActions: "📥 Gelen Eylemler", stayedHome: "Evde Kaldı", wentOut: "Dışarı Çıktı (Belirsiz)",
    cancel: "İptal", chooseRole: "Rol Seçin", back: "Geri", whoseAction: "Hangi Rolün Eylemi?",
    cancelSelection: "İptal", whatHappened: "Bu Oyuncuya Ne Yapıldı?", actionHistory: "Aksiyon Geçmişi",
    searchPlaceholder: "Geçmişte ara...", freeNotes: "Serbest Notlar",
    notesPlaceholder: "Şüphelerinizi, zamanlamaları veya çelişkileri buraya yazabilirsiniz...",
    feedbackTitle: "Bize Ulaşın", send: "Gönder", feedbackBtn: "💬 Geri Bildirim",
    historyBtn: "📜 Oyun Geçmişi", pastGames: "Geçmiş Oyunlar", clearHistory: "Tümünü Sil",
    roles: {
      "Doktor":"Doktor","Deli":"Deli","Polis":"Polis","Gözcü":"Gözcü","Dedektif":"Dedektif",
      "Tuzakçı":"Tuzakçı","İspiyoncu":"İspiyoncu","Provakatör":"Provakatör","İzci":"İzci",
      "Temizlikçi":"Temizlikçi","Suçlayıcı":"Suçlayıcı","Survivor":"Survivor","Seri Katil":"Seri Katil",
      "Bombacı":"Bombacı","Hırsız":"Hırsız","Büyücü":"Büyücü","Hortlak":"Hortlak"
    },
    log: {
      wentTo: "{actorC} ➔ {targetA} gitti.",
      stayedHome: "Evde kaldığını söyledi.",
      wentOut: "Dışarı çıktığını (belirsiz) söyledi.",
      docNormal: "Doktor olarak {targetA} gitti, BİR ŞEY OLMADI.",
      docSaved: "Doktor olarak {targetA} gitti ve KURTARDI.",
      docTrapped: "Doktor olarak {targetA} gitti, TUZAĞA YAKALANDI.",
      polTriedExit: "Polis olarak {targetA} gitti, ÇIKMAYA ÇALIŞTI.",
      polStayed: "Polis olarak {targetA} gitti, ÇIKMAYA ÇALIŞMADI.",
      polTrapped: "Polis olarak {targetA} gitti, TUZAĞA YAKALANDI.",
      trapNoTrigger: "{targetA} tuzak kurdu, BASILMADI.",
      trapTriggered: "{targetA} tuzak kurdu, BASILDI.",
      trapTrapped: "{targetA} tuzak kurmaya gitti, TUZAĞA YAKALANDI.",
      provProvoked: "{targetI} provoke ettiğini söyledi.",
      provTrapped: "{targetA} provoke etmeye gitti, TUZAĞA YAKALANDI.",
      lookoutNobody: "(Gözcü) {targetA} kimsenin gelmediğini söyledi.",
      lookoutSaw: "(Gözcü) {targetA} şunların geldiğini gördü: {visitors}.",
      lookoutTrapped: "Gözcü olarak {targetA} giderken TUZAĞA YAKALANDI.",
      trackerSawStayed: "(İzci) {targetIn} EVDEN ÇIKMADIĞINI gördü.",
      trackerTrapped: "İzci olarak {targetI} izlemeye gitti, TUZAĞA YAKALANDI.",
      trackerSawWent: "(İzci) {targetIn} ➔ {visitedA} gittiğini gördü.",
      detTrapped: "Dedektif olarak {targetA} gitti, TUZAĞA YAKALANDI.",
      detSaidRoles: "(Dedektif) {targetIn} <b style=\"color:{c1}\">{t1} {r1}</b> veya <b style=\"color:{c2}\">{t2} {r2}</b> olduğunu söyledi.",
      snitchTrapped: "İspiyoncu olarak {targetA} gitti, TUZAĞA YAKALANDI.",
      snitchSaidRole: "(İspiyoncu) {targetIn} <b style=\"color:{c1}\">{team} {role}</b> olduğunu söyledi.",
      snitchHiddenRole: "(İspiyoncu) {targetIn} <b style=\"color:{c1}\">{team}</b> olduğunu söyledi ama net rolünü gizledi.",
      snitchNoInfo: "{targetA} gittiğini ama hiçbir bilgi vermeyeceğini söyledi.",
      survShield: "Kalkan Kullandı.",
      survNoShield: "Kalkan kullanmadı.",
      survShieldCut: "Kalkan Kullandı → Kalkan KESİLDİ.",
      survShieldNotCut: "Kalkan Kullandı → Kalkan KESİLMEDİ.",
      incDocSaved: "DOKTOR geldi ve KURTARDI.",
      incDocCame: "DOKTOR geldi ama kurtarmadı.",
      incPolCaught: "POLİS geldi ve TUTTU.",
      incTrapHit: "TUZAĞA BASTI.",
      incProvCame: "PROVOKATÖR geldi.",
      markSafe: "{targetC} güvenli.",
      markSus: "{targetC} şüpheli.",
      setRole: "{targetC} rolünü <b>{role}</b> olarak açıkladı."
    },
    ui: {
      targetWait: "Hedef Bekleniyor",
      targetSelect: "Lütfen yukarıdaki tablodan hedef oyuncuyu seçin.",
      confirmReset: "Tüm kayıtlar silinip GEÇMİŞ OYUNLAR'a kaydedilecek. Emin misiniz?",
      noHistory: "Henüz kaydedilmiş bir oyun geçmişi bulunmuyor.",
      hiddenInfo: "Bilgiyi Gizledi (Söylemedi)",
      trappedBtn: "Tuzağa Yakalandı",
      saidMasum: "Masum Dedi", saidSus: "Şüpheli Dedi", saidNeutral: "Tarafsız Dedi",
      saidNothing: "Hiçbir Şey Söylemedi (Belirsiz)",
      snitchHidden: "İspiyoncu Bilgiyi Sakladı",
      whatDidTheySay: "Hedef oyuncunun hangi grupta olduğunu belirtti mi?",
      nobodyCame: "Kimse Gelmedi", saveSelected: "Seçilenleri Kaydet", stayedHomeBtn: "Evden Çıkmadı",
      Masum: "Masum", Şüpheli: "Şüpheli", Tarafsız: "Tarafsız",
      btnNormal: "Bir Şey Olmadı", btnSaved: "Kurtardı",
      btnTriedExit: "Çıkmaya Çalıştı", btnStayed: "Çıkmaya Çalışmadı",
      btnNoTrigger: "Basılmadı", btnTriggered: "Basıldı", btnProvoked: "Provoke Etti",
      btnShield: "Kalkan Kullandı", btnNoShield: "Kalkan Kullanmadı",
      btnShieldCut: "Kalkan Kesildi", btnShieldNotCut: "Kalkan Kesilmedi",
      selfTargetAlert: "Hata: Kendini seçemezsin!",
      confirmClearHistory: "Tüm oyun geçmişiniz kalıcı olarak silinecektir. Emin misiniz?",
      dedektifStep1: "Dedektif — 1. Rol", dedektifStep2: "Dedektif — 2. Rol",
      chooseGroup: "Grubunu Seçin", chooseRole: "Rol Seçin",
      survivorAction: "Survivor Eylemi", survivorQuestion: "Kalkan durumunu seçin:",
      survivorCutQuestion: "Kalkan kesildi mi?"
    }
  },
  en: {
    newTurn: "Next Turn", resetGame: "Reset Game", safe: "✔ Safe", sus: "✘ Sus",
    setRole: "Set Role", wentTo: "Went To ➔", actionSpecial: "⚡ Action (Role Specific)",
    incomingActions: "📥 Incoming Actions", stayedHome: "Stayed Home", wentOut: "Went Out (Unknown)",
    cancel: "Cancel", chooseRole: "Choose Role", back: "Back", whoseAction: "Whose Action?",
    cancelSelection: "Cancel", whatHappened: "What happened to this player?", actionHistory: "Action History",
    searchPlaceholder: "Search logs...", freeNotes: "Free Notes",
    notesPlaceholder: "Write your suspicions, timings, or contradictions here...",
    feedbackTitle: "Contact Us", send: "Send", feedbackBtn: "💬 Feedback",
    historyBtn: "📜 Game History", pastGames: "Past Games", clearHistory: "Clear All",
    roles: {
      "Doktor":"Doctor","Deli":"Insane","Polis":"Police","Gözcü":"Lookout","Dedektif":"Investigator",
      "Tuzakçı":"Trapper","İspiyoncu":"Snitch","Provakatör":"Provocateur","İzci":"Tracker",
      "Temizlikçi":"Cleaner","Suçlayıcı":"Blamer","Survivor":"Survivor","Seri Katil":"Serial Killer",
      "Bombacı":"Bomber","Hırsız":"Thief","Büyücü":"Magician","Hortlak":"Ghost"
    },
    log: {
      wentTo: "{actorC} ➔ went to {targetC}.",
      stayedHome: "Said they stayed home.",
      wentOut: "Said they went out (unknown).",
      docNormal: "Went to {targetC} as Doctor, NOTHING HAPPENED.",
      docSaved: "Went to {targetC} as Doctor and SAVED.",
      docTrapped: "Went to {targetC} as Doctor, TRAPPED.",
      polTriedExit: "Went to {targetC} as Police, TRIED TO EXIT.",
      polStayed: "Went to {targetC} as Police, DID NOT TRY TO EXIT.",
      polTrapped: "Went to {targetC} as Police, TRAPPED.",
      trapNoTrigger: "Set trap for {targetC}, NOT TRIGGERED.",
      trapTriggered: "Set trap for {targetC}, TRIGGERED.",
      trapTrapped: "Went to set trap for {targetC}, TRAPPED.",
      provProvoked: "Said they provoked {targetC}.",
      provTrapped: "Went to provoke {targetC}, TRAPPED.",
      lookoutNobody: "(Lookout) Said nobody visited {targetC}.",
      lookoutSaw: "(Lookout) Saw these visiting {targetC}: {visitors}.",
      lookoutTrapped: "Went to {targetC} as Lookout, TRAPPED.",
      trackerSawStayed: "(Tracker) Saw that {targetC} DID NOT LEAVE HOME.",
      trackerTrapped: "Went to track {targetC} as Tracker, TRAPPED.",
      trackerSawWent: "(Tracker) Saw {targetC} ➔ go to {visitedC}.",
      detTrapped: "Went to {targetC} as Investigator, TRAPPED.",
      detSaidRoles: "(Investigator) Said {targetC} is <b style=\"color:{c1}\">{t1} {r1}</b> or <b style=\"color:{c2}\">{t2} {r2}</b>.",
      snitchTrapped: "Went to {targetC} as Snitch, TRAPPED.",
      snitchSaidRole: "(Snitch) Said {targetC} is <b style=\"color:{c1}\">{team} {role}</b>.",
      snitchHiddenRole: "(Snitch) Said {targetC} is <b style=\"color:{c1}\">{team}</b> but hid exact role.",
      snitchNoInfo: "Said they went to {targetC} but won't share any info.",
      survShield: "Used Shield.",
      survNoShield: "Did not use Shield.",
      survShieldCut: "Used Shield → Shield was CUT.",
      survShieldNotCut: "Used Shield → Shield was NOT CUT.",
      incDocSaved: "DOCTOR came and SAVED.",
      incDocCame: "DOCTOR came (Did not save).",
      incPolCaught: "POLICE came and CAUGHT.",
      incTrapHit: "STEPPED on TRAP.",
      incProvCame: "PROVOCATEUR came.",
      markSafe: "{targetC} is safe.",
      markSus: "{targetC} is suspicious.",
      setRole: "{targetC} revealed role as <b>{role}</b>."
    },
    ui: {
      targetWait: "Waiting for Target",
      targetSelect: "Please select target player from the grid above.",
      confirmReset: "Current logs will be saved to PAST GAMES and cleared. Are you sure?",
      noHistory: "No saved game history found yet.",
      hiddenInfo: "Hid Info (Didn't Say)",
      trappedBtn: "Trapped",
      saidMasum: "Said Safe", saidSus: "Said Sus", saidNeutral: "Said Neutral",
      saidNothing: "Said Nothing (Unknown)",
      snitchHidden: "Snitch Hid Info",
      whatDidTheySay: "Did they specify the group of the target?",
      nobodyCame: "Nobody", saveSelected: "Save Selected", stayedHomeBtn: "Stayed Home",
      Masum: "Safe", Şüpheli: "Sus", Tarafsız: "Neutral",
      btnNormal: "Nothing Happened", btnSaved: "Saved",
      btnTriedExit: "Tried to Exit", btnStayed: "Didn't Try Exit",
      btnNoTrigger: "Not Triggered", btnTriggered: "Triggered", btnProvoked: "Provoked",
      btnShield: "Shield Used", btnNoShield: "No Shield",
      btnShieldCut: "Shield Cut", btnShieldNotCut: "Shield Not Cut",
      selfTargetAlert: "Error: Cannot select yourself!",
      confirmClearHistory: "All past game history will be permanently deleted. Are you sure?",
      dedektifStep1: "Investigator — Role 1", dedektifStep2: "Investigator — Role 2",
      chooseGroup: "Choose Group", chooseRole: "Choose Role",
      survivorAction: "Survivor Action", survivorQuestion: "Select shield status:",
      survivorCutQuestion: "Was the shield cut?"
    }
  }
};

let currentLang = 'tr';

function t(key, sub = null) {
  if (sub) return (translations[currentLang][sub] || {})[key] || key;
  return translations[currentLang][key] || key;
}

// Log şablonu: {actorC}, {targetC}, {targetA}, {targetI}, {targetIn}, {visitedA} vb. yerleştirir
function tLog(key, params = {}) {
  let str = (translations[currentLang].log || {})[key] || key;
  for (let k in params) {
    str = str.split(`{${k}}`).join(params[k]);
  }
  return str;
}

// ==========================================
// 2. DOM ELEMENTLERİ
// ==========================================
const cards = document.querySelectorAll('.player-card');
const panels = ['action-panel','role-panel','eylem-panel','decision-panel','gelen-eylem-panel'];
const selectedNameLabel = document.getElementById('selected-name');
const logList = document.getElementById('log-list');

let activePlayer = null, pendingAction = null, turnCount = 1;
let flowData = {}, multiSelectColors = [];

const roleDB = {
  masum:    [{n:'Doktor'},{n:'Deli'}],
  gri:      [{n:'Polis'},{n:'Gözcü'},{n:'Dedektif'},{n:'Tuzakçı'},{n:'İspiyoncu'},{n:'Provakatör'},{n:'İzci'}],
  hain:     [{n:'Temizlikçi'},{n:'Suçlayıcı'}],
  tarafsiz: [{n:'Survivor'},{n:'Seri Katil'},{n:'Bombacı'},{n:'Hırsız'},{n:'Büyücü'},{n:'Hortlak'}]
};

// ==========================================
// 3. RENK VE İSİM YARDIMCILARI
// ==========================================
function getColor(id) {
  const colors = {
    'Beyaz':'#F3F3F3','Turuncu':'#FA8A1C','Mor':'#b554e6','Koyu Yeşil':'#40a124',
    'Mavi':'#6c8dec','Kırmızı':'#ff4d4d','Sarı':'#FCE14E','Açık Yeşil':'#7AFF48',
    'Turkuaz':'#2BD8C8','Açık Pembe':'#FF95B7','Kahverengi':'#d18b5e',
    'Koyu Pembe':'#EB00E4','Parlak Turuncu':'#F84000'
  };
  return colors[id] || '#ffffff';
}

function getDisplayName(id) {
  if (currentLang === 'en') {
    const card = document.getElementById(id);
    return card ? card.getAttribute('data-color') : id;
  }
  return id;
}

// Tüm log parametrelerini tek seferde üretir
function makeLogParams(targetId, extraId = null) {
  const tName = getDisplayName(targetId);
  const tColor = getColor(targetId);
  const params = {
    targetC:  `<span style="color:${tColor}">${tName}</span>`,
    targetA:  currentLang === 'en'
                ? `<span style="color:${tColor}">${tName}</span>`
                : `<span style="color:${tColor}">${turkishApostrophe(targetId, 'a')}</span>`,
    targetI:  currentLang === 'en'
                ? `<span style="color:${tColor}">${tName}</span>`
                : `<span style="color:${tColor}">${turkishApostrophe(targetId, 'ı')}</span>`,
    targetIn: currentLang === 'en'
                ? `<span style="color:${tColor}">${tName}</span>`
                : `<span style="color:${tColor}">${turkishApostrophe(targetId, 'ın')}</span>`,
  };
  if (extraId) {
    const eName = getDisplayName(extraId);
    const eColor = getColor(extraId);
    params.visitedC = `<span style="color:${eColor}">${eName}</span>`;
    params.visitedA = currentLang === 'en'
      ? `<span style="color:${eColor}">${eName}</span>`
      : `<span style="color:${eColor}">${turkishApostrophe(extraId, 'a')}</span>`;
  }
  return params;
}

function makeActorParam(actorId) {
  return `<span style="color:${getColor(actorId)}">${getDisplayName(actorId)}</span>`;
}

function getRoleColors(roleName) {
  if (roleDB.masum.find(r=>r.n===roleName))    return {bg:'#0be881',text:'black'};
  if (roleDB.gri.find(r=>r.n===roleName))      return {bg:'#808e9b',text:'white'};
  if (roleDB.hain.find(r=>r.n===roleName))     return {bg:'#ff3f34',text:'white'};
  if (roleDB.tarafsiz.find(r=>r.n===roleName)) return {bg:'#4bcffa',text:'black'};
  return {bg:'rgba(0,0,0,0.45)',text:'white'};
}

// ==========================================
// 4. TEMA / DİL
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.innerText = document.body.classList.contains('light-mode') ? "🌙 Mode" : "☀️ Mode";
});

const langToggle = document.getElementById('lang-toggle');
if (langToggle) langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  langToggle.innerText = currentLang === 'tr' ? "🌐 EN" : "🌐 TR";
  applyTranslations();
});

const feedbackBtn = document.getElementById('feedback-btn');
if (feedbackBtn) feedbackBtn.addEventListener('click', () => {
  const fP = document.getElementById('feedback-panel');
  const hP = document.getElementById('history-panel');
  if (hP) hP.style.display = 'none';
  fP.style.display = fP.style.display === 'flex' ? 'none' : 'flex';
});

const historyBtn = document.getElementById('history-btn');
if (historyBtn) historyBtn.addEventListener('click', () => {
  const fP = document.getElementById('feedback-panel');
  const hP = document.getElementById('history-panel');
  if (fP) fP.style.display = 'none';
  hP.style.display = hP.style.display === 'flex' ? 'none' : 'flex';
  if (hP.style.display === 'flex') renderHistoryPanel();
});

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerText = t(el.getAttribute('data-i18n'));
  });
  const srch = document.getElementById('log-search');
  if (srch) srch.placeholder = t('searchPlaceholder');
  const nts = document.getElementById('manual-notes');
  if (nts) nts.placeholder = t('notesPlaceholder');

  cards.forEach(card => {
    const rawId   = card.id;
    const enName  = card.getAttribute('data-color');
    const display = currentLang === 'en' ? enName : rawId;
    const icon    = card.querySelector('.status-icon');
    const rc      = card.querySelector('.roles-container');
    card.innerHTML = display.replace(' ', '<br>');
    if (icon) card.appendChild(icon);
    if (rc)   card.appendChild(rc);
  });

  document.querySelectorAll('.role-badge').forEach(badge => {
    const rk = badge.getAttribute('data-role');
    if (!rk) return;
    if (rk.includes(' (?)')) {
      const base = rk.split(' ')[0];
      badge.innerText = t(base,'ui') + ' (?)';
    } else {
      badge.innerText = t(rk,'roles');
    }
  });

  renderDynamicPanels();
}

// ==========================================
// 5. DİNAMİK PANELLER
// ==========================================
function renderDynamicPanels() {
  const roleGrid = document.getElementById('role-grid-container');
  if (roleGrid) {
    roleGrid.innerHTML = '';
    Object.keys(roleDB).forEach(cat => {
      const cls = cat==='masum'?'role-masum':cat==='gri'?'role-gri':cat==='hain'?'role-hain':'role-tarafsiz';
      roleDB[cat].forEach(r => {
        roleGrid.innerHTML += `<button class="action-btn ${cls}" onclick="setRole('${r.n}')">${t(r.n,'roles')}</button>`;
      });
    });
  }

  const actionGrid = document.getElementById('action-grid-container');
  if (actionGrid) {
    actionGrid.innerHTML = `
      <button class="action-btn role-masum" onclick="startFlow('doktor_target')">${t('Doktor','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('polis_target')">${t('Polis','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('gozcu_target')">${t('Gözcü','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('dedektif_target')">${t('Dedektif','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('tuzakci_target')">${t('Tuzakçı','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('ispiyoncu_target')">${t('İspiyoncu','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('provokator_target')">${t('Provakatör','roles')}</button>
      <button class="action-btn role-gri"   onclick="startFlow('izci_target')">${t('İzci','roles')}</button>
      <button class="action-btn role-tarafsiz" onclick="showSurvivorDecision()">${t('Survivor','roles')}</button>
    `;
  }

  const inGrid = document.getElementById('incoming-action-container');
  if (inGrid) {
    inGrid.innerHTML = `
      <button class="action-btn role-masum" onclick="directLog(tLog('incDocSaved'))">${t('Doktor','roles')} (+)</button>
      <button class="action-btn role-masum" onclick="directLog(tLog('incDocCame'))">${t('Doktor','roles')} (-)</button>
      <button class="action-btn role-gri"   onclick="directLog(tLog('incPolCaught'))">${t('Polis','roles')} (+)</button>
      <button class="action-btn role-hain"  onclick="directLog(tLog('incTrapHit'))">${t('Tuzakçı','roles')} (+)</button>
      <button class="action-btn role-hain"  onclick="directLog(tLog('incProvCame'))">${t('Provakatör','roles')} (+)</button>
    `;
  }
}
renderDynamicPanels();

// ==========================================
// 6. PANEL KONTROLÜ
// ==========================================
window.openPanel = function(panelId) {
  panels.forEach(id => { const el=document.getElementById(id); if(el) el.style.display='none'; });
  if (panelId) document.getElementById(panelId).style.display = 'block';
};

// ==========================================
// 7. BADGE SİSTEMİ
// ==========================================
function addRoleBadge(playerName, roleKey, bgColor='rgba(0,0,0,0.45)', textColor='white') {
  const card = document.getElementById(playerName);
  let container = card.querySelector('.roles-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'roles-container';
    card.appendChild(container);
  }
  const badge = document.createElement('div');
  badge.className = 'role-badge';
  badge.setAttribute('data-role', roleKey);
  if (roleKey.includes(' (?)')) {
    badge.innerText = t(roleKey.split(' ')[0],'ui') + ' (?)';
  } else {
    badge.innerText = t(roleKey,'roles');
  }
  badge.style.background = bgColor;
  badge.style.color = textColor;
  badge.style.border = '1px solid rgba(0,0,0,0.2)';
  container.appendChild(badge);
  return () => { badge.remove(); if (container.children.length===0) container.remove(); };
}

// ==========================================
// 8. KART TIKLAMA — ANA MANTIK
// ==========================================
cards.forEach(card => {
  card.addEventListener('click', () => {
    const clicked = card.id;

    if (pendingAction && activePlayer) {
      const selfBlocked = ['went','doktor_target','polis_target','tuzakci_target',
        'provokator_target','gozcu_target','izci_target','dedektif_target','ispiyoncu_target'];

      if (selfBlocked.includes(pendingAction) && clicked === activePlayer) {
        alert(t('selfTargetAlert','ui')); return;
      }

      // GÖZCÜ: çoklu seçim (kendisi ve hedef ev hariç)
      if (pendingAction === 'gozcu_visitors') {
        if (clicked === activePlayer) return; // gözcünün kendisi
        if (clicked === flowData.target) return; // gözlenen ev
        const idx = multiSelectColors.indexOf(clicked);
        if (idx > -1) { multiSelectColors.splice(idx,1); card.style.border='2px solid var(--card-border)'; }
        else          { multiSelectColors.push(clicked);  card.style.border='3px dashed #0fbcf9'; }
        return;
      }

      // İZCİ: gittiği yeri seç
      if (pendingAction === 'izci_went_where') {
        if (clicked === flowData.target) return; // kendi evine gidemez
        const p = makeLogParams(flowData.target, clicked);
        p.actorC = makeActorParam(activePlayer);
        directLog(tLog('trackerSawWent', p));
        return;
      }

      // GITI
      if (pendingAction === 'went') {
        const p = makeLogParams(clicked);
        p.actorC = makeActorParam(activePlayer);
        addLog(tLog('wentTo', p));
        resetSelection(); return;
      }

      // Hedef seçildi, karar ekranına geç
      flowData.target = clicked;
      const p = makeLogParams(clicked);

      if (pendingAction === 'doktor_target') {
        showDecision(t('Doktor','roles'), '?', buildDecisionButtons([
          {msg: tLog('docNormal',p), label: t('btnNormal','ui'), cls: 'action-btn'},
          {msg: tLog('docSaved',p),  label: t('btnSaved','ui'),  cls: 'action-btn safe-btn'},
          {msg: tLog('docTrapped',p),label: t('trappedBtn','ui'),cls: 'action-btn'},
        ]));
      }
      else if (pendingAction === 'polis_target') {
        showDecision(t('Polis','roles'), '?', buildDecisionButtons([
          {msg: tLog('polTriedExit',p), label: t('btnTriedExit','ui'), cls: 'action-btn'},
          {msg: tLog('polStayed',p),    label: t('btnStayed','ui'),    cls: 'action-btn'},
          {msg: tLog('polTrapped',p),   label: t('trappedBtn','ui'),   cls: 'action-btn'},
        ]));
      }
      else if (pendingAction === 'tuzakci_target') {
        showDecision(t('Tuzakçı','roles'), '?', buildDecisionButtons([
          {msg: tLog('trapNoTrigger',p), label: t('btnNoTrigger','ui'), cls: 'action-btn'},
          {msg: tLog('trapTriggered',p), label: t('btnTriggered','ui'), cls: 'action-btn sus-btn'},
          {msg: tLog('trapTrapped',p),   label: t('trappedBtn','ui'),   cls: 'action-btn'},
        ]));
      }
      else if (pendingAction === 'provokator_target') {
        showDecision(t('Provakatör','roles'), '?', buildDecisionButtons([
          {msg: tLog('provProvoked',p), label: t('btnProvoked','ui'),  cls: 'action-btn safe-btn'},
          {msg: tLog('provTrapped',p),  label: t('trappedBtn','ui'),   cls: 'action-btn'},
        ]));
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        const trapped = tLog('lookoutTrapped', p);
        showDecision(getDisplayName(clicked), t('saveSelected','ui'), `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">${t('saveSelected','ui')}</button>
          <button class="action-btn" onclick="saveGozcu(true)">${t('nobodyCame','ui')}</button>
          ${makeDLBtn(trapped, t('trappedBtn','ui'), 'action-btn')}
        `);
      }
      else if (pendingAction === 'izci_target') {
        pendingAction = 'izci_went_where';
        const stayed  = tLog('trackerSawStayed', p);
        const trapped = tLog('trackerTrapped', p);
        showDecision(getDisplayName(clicked), '?', `
          <button class="action-btn eylem-btn" onclick="directLog('${esc(stayed)}')">${t('stayedHomeBtn','ui')}</button>
          ${makeDLBtn(trapped, t('trappedBtn','ui'), 'action-btn')}
        `);
      }
      else if (pendingAction === 'dedektif_target') {
        flowData.dedektif = { target: clicked, t1:null, r1:null, t2:null, r2:null };
        showDedektifTeamSelection(1);
      }
      else if (pendingAction === 'ispiyoncu_target') {
        const trapped = tLog('snitchTrapped', p);
        showDecision(getDisplayName(clicked), t('chooseGroup','ui'), `
          <div style="display:flex;justify-content:center;gap:5px;flex-wrap:wrap;max-width:400px;margin:0 auto;">
            <button class="action-btn role-masum"    style="flex:1;min-width:100px;" onclick="renderIspiyoncuRoles('Masum')">${t('Masum','ui')}</button>
            <button class="action-btn role-hain"     style="flex:1;min-width:100px;" onclick="renderIspiyoncuRoles('Şüpheli')">${t('Şüpheli','ui')}</button>
            <button class="action-btn role-tarafsiz" style="flex:1;min-width:100px;" onclick="renderIspiyoncuRoles('Tarafsız')">${t('Tarafsız','ui')}</button>
            <button class="action-btn eylem-btn"     style="flex:1;min-width:100px;" onclick="showIspiyoncuSoylemedi()">${t('hiddenInfo','ui')}</button>
            ${makeDLBtn(trapped, t('trappedBtn','ui'), 'action-btn', 'flex:1;min-width:100px;')}
          </div>
        `);
      }
      return;
    }

    // Yeni oyuncu seç
    resetSelection();
    activePlayer = clicked;
    card.style.border = '3px solid #fff';
    selectedNameLabel.innerText = getDisplayName(clicked);
    selectedNameLabel.style.color = getColor(clicked);
    openPanel('action-panel');
  });
});

// ==========================================
// 9. KARAR EKRANI YARDIMCILARI
// ==========================================
function showDecision(title, content, buttonsHTML) {
  openPanel('decision-panel');
  document.getElementById('decision-title').innerHTML = title;
  document.getElementById('decision-content').innerHTML = content;
  document.getElementById('decision-buttons').innerHTML = buttonsHTML;
}

// Güvenli onclick için kaçış
function esc(str) {
  return str.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
}

// directLog çağıran buton HTML'i üretir
function makeDLBtn(msg, label, cls, style='') {
  return `<button class="${cls}" style="${style}" onclick="directLog('${esc(msg)}')">${label}</button>`;
}

// Birden fazla buton üretir
function buildDecisionButtons(btns) {
  return btns.map(b => makeDLBtn(b.msg, b.label, b.cls)).join('');
}

window.startFlow = function(type) {
  pendingAction = type;
  showDecision(t('targetWait','ui'), t('targetSelect','ui'), '');
};

// ==========================================
// 10. SURVIVOR
// ==========================================
window.showSurvivorDecision = function() {
  showDecision(t('survivorAction','ui'), t('survivorQuestion','ui'), `
    <button class="action-btn safe-btn" onclick="showSurvivorCutDecision()">${t('btnShield','ui')}</button>
    <button class="action-btn" onclick="directLog(tLog('survNoShield'))">${t('btnNoShield','ui')}</button>
  `);
};

window.showSurvivorCutDecision = function() {
  showDecision(t('survivorAction','ui'), t('survivorCutQuestion','ui'), `
    <button class="action-btn sus-btn"  onclick="directLog(tLog('survShieldCut'))">${t('btnShieldCut','ui')}</button>
    <button class="action-btn safe-btn" onclick="directLog(tLog('survShieldNotCut'))">${t('btnShieldNotCut','ui')}</button>
  `);
};

// ==========================================
// 11. DEDEKTİF
// ==========================================
window.showDedektifTeamSelection = function(step) {
  pendingAction = step===1 ? 'dedektif_team_1' : 'dedektif_team_2';
  const tp = makeLogParams(flowData.dedektif.target);
  const trapped = step===1 ? makeDLBtn(tLog('detTrapped',tp), t('trappedBtn','ui'), 'action-btn', 'flex:1;min-width:100px;') : '';
  const title = step===1 ? t('dedektifStep1','ui') : t('dedektifStep2','ui');

  showDecision(title, t('chooseGroup','ui'), `
    <div style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;">
      <button class="action-btn role-masum"    style="flex:1;min-width:80px;" onclick="selectDedektifTeam('Masum')">${t('Masum','ui')}</button>
      <button class="action-btn role-hain"     style="flex:1;min-width:80px;" onclick="selectDedektifTeam('Şüpheli')">${t('Şüpheli','ui')}</button>
      <button class="action-btn role-tarafsiz" style="flex:1;min-width:80px;" onclick="selectDedektifTeam('Tarafsız')">${t('Tarafsız','ui')}</button>
      ${trapped}
    </div>
  `);
};

window.selectDedektifTeam = function(team) {
  if (pendingAction==='dedektif_team_1') { flowData.dedektif.t1=team; showDedektifRoleSelection(1); }
  else                                    { flowData.dedektif.t2=team; showDedektifRoleSelection(2); }
};

window.showDedektifRoleSelection = function(step) {
  pendingAction = step===1 ? 'dedektif_role_1' : 'dedektif_role_2';
  const team = step===1 ? flowData.dedektif.t1 : flowData.dedektif.t2;
  let roles=[], cls='';
  if (team==='Masum')    { roles=[...roleDB.masum,...roleDB.gri].filter(r=>r.n!=='Deli'); cls='role-masum'; }
  else if (team==='Şüpheli') { roles=[...roleDB.hain,...roleDB.gri]; cls='role-hain'; }
  else                       { roles=[...roleDB.tarafsiz]; cls='role-tarafsiz'; }

  const title = step===1 ? t('dedektifStep1','ui') : t('dedektifStep2','ui');
  let html = `<div class="role-grid">`;
  roles.forEach(r => { html += `<button class="action-btn ${cls}" onclick="selectDedektifRole('${r.n}')">${t(r.n,'roles')}</button>`; });
  html += `</div>`;
  showDecision(title, t('chooseRole','ui'), html);
};

window.selectDedektifRole = function(roleName) {
  if (pendingAction==='dedektif_role_1') { flowData.dedektif.r1=roleName; showDedektifTeamSelection(2); return; }
  flowData.dedektif.r2 = roleName;
  const {target,t1,r1,t2,r2} = flowData.dedektif;
  const c1_bg = t1==='Masum'?'#0be881':(t1==='Şüpheli'?'#ff3f34':'#4bcffa');
  const c1_tx = t1==='Şüpheli'?'white':'black';
  const c2_bg = t2==='Masum'?'#0be881':(t2==='Şüpheli'?'#ff3f34':'#4bcffa');
  const c2_tx = t2==='Şüpheli'?'white':'black';
  const rb1 = addRoleBadge(target,r1,c1_bg,c1_tx);
  const rb2 = addRoleBadge(target,r2,c2_bg,c2_tx);
  const tp = makeLogParams(target);
  const msg = tLog('detSaidRoles', {
    ...tp, c1:c1_bg, t1:t(t1,'ui'), r1:t(r1,'roles'),
            c2:c2_bg, t2:t(t2,'ui'), r2:t(r2,'roles')
  });
  addLog(msg, false, ()=>{ rb1(); rb2(); });
  resetSelection();
};

// ==========================================
// 12. İSPİYONCU
// ==========================================
window.renderIspiyoncuRoles = function(team) {
  let roles=[], cls='';
  if (team==='Masum')    { roles=[...roleDB.masum,...roleDB.gri].filter(r=>r.n!=='Deli'); cls='role-masum'; }
  else if (team==='Şüpheli') { roles=[...roleDB.hain,...roleDB.gri]; cls='role-hain'; }
  else                       { roles=[...roleDB.tarafsiz]; cls='role-tarafsiz'; }
  let html = `<div class="role-grid">`;
  roles.forEach(r => { html += `<button class="action-btn ${cls}" onclick="selectIspiyoncuRole('${r.n}','${team}')">${t(r.n,'roles')}</button>`; });
  html += `</div>`;
  showDecision(t('İspiyoncu','roles'), t('chooseRole','ui'), html);
};

window.selectIspiyoncuRole = function(roleName, team) {
  const target = flowData.target;
  const bg = team==='Masum'?'#0be881':(team==='Şüpheli'?'#ff3f34':'#4bcffa');
  const tx = team==='Şüpheli'?'white':'black';
  const rb = addRoleBadge(target, roleName, bg, tx);
  const tp = makeLogParams(target);
  const msg = tLog('snitchSaidRole', {...tp, c1:bg, team:t(team,'ui'), role:t(roleName,'roles')});
  addLog(msg, false, ()=>rb());
  resetSelection();
};

window.showIspiyoncuSoylemedi = function() {
  showDecision(t('snitchHidden','ui'), t('whatDidTheySay','ui'), `
    <div style="display:flex;justify-content:center;gap:5px;flex-wrap:wrap;max-width:400px;margin:0 auto;">
      <button class="action-btn role-masum"    style="flex:1;min-width:100px;" onclick="saveIspiyoncuSoylemedi('Masum')">${t('saidMasum','ui')}</button>
      <button class="action-btn role-hain"     style="flex:1;min-width:100px;" onclick="saveIspiyoncuSoylemedi('Şüpheli')">${t('saidSus','ui')}</button>
      <button class="action-btn role-tarafsiz" style="flex:1;min-width:100px;" onclick="saveIspiyoncuSoylemedi('Tarafsız')">${t('saidNeutral','ui')}</button>
      <button class="action-btn" style="background:#808e9b;color:white;width:100%;margin-top:5px;" onclick="saveIspiyoncuSoylemedi('Belirsiz')">${t('saidNothing','ui')}</button>
    </div>
  `);
};

window.saveIspiyoncuSoylemedi = function(group) {
  const target = flowData.target;
  const tp = makeLogParams(target);
  if (group==='Belirsiz') {
    directLog(tLog('snitchNoInfo', tp));
  } else {
    const bg = group==='Masum'?'#0be881':(group==='Şüpheli'?'#ff3f34':'#4bcffa');
    const tx = group==='Şüpheli'?'white':'black';
    const rb = addRoleBadge(target, `${group} (?)`, bg, tx);
    const msg = tLog('snitchHiddenRole', {...tp, c1:bg, team:t(group,'ui')});
    addLog(msg, false, ()=>rb());
  }
  resetSelection();
};

// ==========================================
// 13. GÖZCÜ KAYIT
// ==========================================
window.saveGozcu = function(kimseGelmedi) {
  const tp = makeLogParams(flowData.target);
  if (kimseGelmedi) {
    directLog(tLog('lookoutNobody', tp));
  } else {
    if (multiSelectColors.length===0) { alert(currentLang==='tr'?'En az bir renk seçmelisiniz!':'Please select at least one player!'); return; }
    const visitors = multiSelectColors.map(c => `<span style="color:${getColor(c)}">${getDisplayName(c)}</span>`).join(', ');
    directLog(tLog('lookoutSaw', {...tp, visitors}));
  }
};

// ==========================================
// 14. ORTAK İŞLEMLER
// ==========================================
window.directLog = function(msg) {
  addLog(`<span style="color:${getColor(activePlayer)}">${getDisplayName(activePlayer)}</span>: ${msg}`);
  resetSelection();
};

window.markPlayer = function(status) {
  const card = document.getElementById(activePlayer);
  const icon = card.querySelector('.status-icon');
  const pid  = activePlayer;
  const tp   = makeLogParams(activePlayer);
  tp.targetC = `<span style="color:${getColor(activePlayer)}">${getDisplayName(activePlayer)}</span>`;
  if (status==='safe') {
    icon.innerText='✔'; icon.style.color='#0be881'; icon.style.display='flex';
    addLog(tLog('markSafe', tp), false, ()=>{ document.getElementById(pid).querySelector('.status-icon').style.display='none'; });
  } else {
    icon.innerText='✘'; icon.style.color='#ff3f34'; icon.style.display='flex';
    addLog(tLog('markSus', tp), false, ()=>{ document.getElementById(pid).querySelector('.status-icon').style.display='none'; });
  }
  resetSelection();
};

window.setRole = function(role) {
  const target = activePlayer;
  const c = getRoleColors(role);
  const rb = addRoleBadge(target, role, c.bg, c.text);
  const tp = makeLogParams(target);
  tp.targetC = `<span style="color:${getColor(target)}">${getDisplayName(target)}</span>`;
  addLog(tLog('setRole', {...tp, role:t(role,'roles')}), false, ()=>rb());
  resetSelection();
};

document.getElementById('btn-went')?.addEventListener('click', () => {
  pendingAction = 'went';
  selectedNameLabel.innerText = '➔ ?';
});
document.getElementById('btn-stayed')?.addEventListener('click',   () => directLog(tLog('stayedHome')));
document.getElementById('btn-went-out')?.addEventListener('click', () => directLog(tLog('wentOut')));

window.resetSelection = function() {
  activePlayer=null; pendingAction=null; flowData={}; multiSelectColors=[];
  cards.forEach(c => c.style.border='2px solid var(--card-border)');
  openPanel(null);
};

// ==========================================
// 15. YENİ TUR / SIFIRLA
// ==========================================
document.getElementById('btn-new-turn')?.addEventListener('click', () => {
  turnCount++;
  addLog(`<b style="color:var(--heading-color);">--- ${currentLang==='tr'?'TUR':'TURN'} ${turnCount} ---</b>`, true);
});

document.getElementById('btn-reset-game')?.addEventListener('click', () => {
  if (!confirm(t('confirmReset','ui'))) return;
  const items = logList.querySelectorAll('li');
  if (items.length > 0) {
    let logs = [];
    for (let i=items.length-1; i>=0; i--) { const s=items[i].querySelector('span'); if(s) logs.push(s.innerHTML); }
    const rec = { date: new Date().toLocaleString(currentLang==='tr'?'tr-TR':'en-US'), logs };
    let hist = JSON.parse(localStorage.getItem('feignTrackerHistory')) || [];
    hist.unshift(rec); if (hist.length>15) hist.pop();
    localStorage.setItem('feignTrackerHistory', JSON.stringify(hist));
  }
  logList.innerHTML=''; turnCount=1;
  const n=document.getElementById('manual-notes'); if(n) n.value='';
  cards.forEach(card => {
    const si=card.querySelector('.status-icon'); if(si) si.style.display='none';
    const rc=card.querySelector('.roles-container'); if(rc) rc.remove();
  });
  resetSelection();
});

// ==========================================
// 16. GEÇMİŞ PANELİ
// ==========================================
function renderHistoryPanel() {
  const c = document.getElementById('history-list-container'); if(!c) return;
  c.innerHTML = '';
  const hist = JSON.parse(localStorage.getItem('feignTrackerHistory')) || [];
  if (hist.length===0) { c.innerHTML=`<p style="text-align:center;color:#7f8fa6;margin-top:20px;font-style:italic;">${t('noHistory','ui')}</p>`; return; }
  hist.forEach(game => {
    const gd=document.createElement('div'); gd.className='history-record';
    const dd=document.createElement('div'); dd.className='history-date'; dd.innerText=game.date;
    gd.appendChild(dd);
    const ul=document.createElement('ul'); ul.style.cssText='list-style:none;padding:0;margin:0;';
    game.logs.forEach(h => { const li=document.createElement('li'); li.style.padding='3px 0'; li.innerHTML=h; ul.appendChild(li); });
    gd.appendChild(ul); c.appendChild(gd);
  });
}

document.getElementById('clear-history-btn')?.addEventListener('click', () => {
  if (confirm(t('confirmClearHistory','ui'))) { localStorage.removeItem('feignTrackerHistory'); renderHistoryPanel(); }
});

// ==========================================
// 17. LOG FONKSİYONU
// ==========================================
function addLog(text, isSystem=false, onDelete=null) {
  const li=document.createElement('li');
  const sp=document.createElement('span'); sp.innerHTML=text; li.appendChild(sp);
  if (!isSystem) {
    const db=document.createElement('button'); db.innerText='X'; db.className='delete-log';
    db.onclick=()=>{ li.remove(); if(onDelete) onDelete(); };
    li.appendChild(db);
  }
  logList.prepend(li);
}

// ==========================================
// 18. ARAMA
// ==========================================
document.getElementById('log-search')?.addEventListener('input', function() {
  const filter = this.value.toLocaleLowerCase('tr-TR');
  Array.from(logList.children).forEach(li => {
    li.style.display = (li.textContent||li.innerText).toLocaleLowerCase('tr-TR').includes(filter) ? '' : 'none';
  });
});

// ==========================================
// 19. FORMSPREE
// ==========================================
document.getElementById('send-feedback-btn')?.addEventListener('click', async () => {
  const area = document.getElementById('feedback-text');
  const text = area.value.trim();
  if (!text) { alert(currentLang==='tr'?'Lütfen bir mesaj yazın.':'Please write a message.'); return; }
  const btn = document.getElementById('send-feedback-btn');
  btn.disabled=true;
  const orig=btn.innerText;
  btn.innerText=currentLang==='tr'?'Gönderiliyor...':'Sending...';
  try {
    const res = await fetch('https://formspree.io/f/xzdobbbd', {
      method:'POST',
      headers:{'Accept':'application/json','Content-Type':'application/json'},
      body: JSON.stringify({ message:text, date:new Date().toLocaleString(), language:currentLang==='tr'?'Türkçe':'English' })
    });
    if (res.ok) {
      alert(currentLang==='tr'?'Mesajınız başarıyla iletildi!':'Message sent successfully!');
      area.value='';
      document.getElementById('feedback-panel').style.display='none';
    } else { throw new Error(); }
  } catch { alert(currentLang==='tr'?'Bir hata oluştu. İnternet bağlantınızı kontrol edin.':'An error occurred. Please check your connection.'); }
  finally { btn.disabled=false; btn.innerText=orig; }
});
