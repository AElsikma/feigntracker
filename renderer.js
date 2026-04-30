// ==========================================
// 1. TÜRKÇE EK YARDIMCISI (SUFFIX HELPER)
// ==========================================
function getSuffix(word, type) {
  const lastVowel = word.match(/[aeıioöuü]/g)?.pop().toLowerCase();
  if (type === 'in') {
    if (['a','ı'].includes(lastVowel)) return "'nın";
    if (['e','i'].includes(lastVowel)) return "'nin";
    if (['o','u'].includes(lastVowel)) return "'nun";
    if (['ö','ü'].includes(lastVowel)) return "'nün";
  }
  if (type === 'a') {
    if (['a','ı','o','u'].includes(lastVowel)) return "'ya";
    if (['e','i','ö','ü'].includes(lastVowel)) return "'ye";
  }
  return "'";
}

// ==========================================
// 2. DİL VE ÇEVİRİ SÖZLÜĞÜ
// ==========================================
const translations = {
  tr: {
    newTurn: "Yeni Tura Geç", resetGame: "Oyunu Sıfırla", safe: "✔ Güvenli", sus: "✘ Şüpheli",
    setRole: "Rol Belirt", wentTo: "Şuraya Gitti ➔", actionSpecial: "⚡ Eylem (Rol Özel)",
    incomingActions: "📥 Gelen Eylemler", stayedHome: "Evde Kaldı", wentOut: "Dışarı Çıktı",
    cancel: "İptal", chooseRole: "Rol Seçin", back: "Geri", whoseAction: "Hangi Rolün Eylemi?",
    cancelSelection: "İptali Seç", whatHappened: "Bu Oyuncuya Ne Yapıldı?", actionHistory: "Aksiyon Geçmişi",
    searchPlaceholder: "Geçmişte ara...", freeNotes: "Serbest Notlar", notesPlaceholder: "Notlarınızı buraya yazabilirsiniz...",
    feedbackBtn: "💬 Geri Bildirim", historyBtn: "📜 Oyun Geçmişi",
    step: "Adım",
    roles: {
      "Doktor": "Doktor", "Deli": "Deli", "Polis": "Polis", "Gözcü": "Gözcü", "Dedektif": "Dedektif",
      "Tuzakçı": "Tuzakçı", "İspiyoncu": "İspiyoncu", "Provakatör": "Provakatör", "İzci": "İzci",
      "Temizlikçi": "Temizlikçi", "Suçlayıcı": "Suçlayıcı", "Survivor": "Survivor", "Seri Katil": "Seri Katil",
      "Bombacı": "Bombacı", "Hırsız": "Hırsız", "Büyücü": "Büyücü", "Hortlak": "Hortlak"
    },
    ui: {
      targetWait: "Hedef Bekleniyor", targetSelect: "Lütfen tablodan hedef seçin.",
      confirmReset: "Tüm kayıtlar silinecek. Emin misiniz?", or: "VEYA", 
      chooseGroup: "Grubunu Seçin", hiddenInfo: "Bilgiyi Gizledi", trappedBtn: "Tuzağa Yakalandı",
      saidMasum: "Masum Dedi", saidSus: "Şüpheli Dedi", saidNeutral: "Tarafsız Dedi", saidNothing: "Belirsiz",
      nobodyCame: "Kimse Gelmedi", saveSelected: "Seçilenleri Kaydet", stayedHomeBtn: "Evden Çıkmadı",
      Masum: "Masum", Şüpheli: "Şüpheli", Tarafsız: "Tarafsız",
      btnNormal: "Bir Şey Olmadı", btnSaved: "Kurtardı", btnTriedExit: "Çıkmaya Çalıştı", btnStayed: "Çıkmaya Çalışmadı",
      btnNoTrigger: "Basılmadı", btnTriggered: "Basıldı", btnProvoked: "Provoke Etti",
      btnShield: "Kalkan Kullandı", btnNoShield: "Kalkan Kullanmadı",
      survHealSuccess: "Ölümden Döndü", survHealFail: "Saldırı Almadı",
      selfTargetAlert: "Hata: Kendini seçemezsin!"
    }
  }
};

let currentLang = 'tr';
function t(key, sub = null) {
  if (sub) return translations[currentLang][sub][key] || key;
  return translations[currentLang][key] || key;
}

// ==========================================
// 3. LOG VE YARDIMCI FONKSİYONLAR
// ==========================================
function buildLog(actorName, roleName, actionText) {
  const actorColor = getColor(actorName);
  const actorDisplay = getTranslatedCardName(actorName);
  const roleDisplay = roleName ? `(${t(roleName, 'roles')}) ` : "";
  return `<span style="color:${actorColor}">${actorDisplay}</span>: ${roleDisplay}${actionText}`;
}

function getColor(id) {
  const colors = { 'Beyaz': '#F3F3F3', 'Turuncu': '#FA8A1C', 'Mor': '#b554e6', 'Koyu Yeşil': '#40a124', 'Mavi': '#6c8dec', 'Kırmızı': '#ff4d4d', 'Sarı': '#FCE14E', 'Açık Yeşil': '#7AFF48', 'Turkuaz': '#2BD8C8', 'Açık Pembe': '#FF95B7', 'Kahverengi': '#d18b5e', 'Koyu Pembe': '#EB00E4', 'Parlak Turuncu': '#F84000' };
  return colors[id] || '#fff';
}

function getTranslatedCardName(id) {
  return id; 
}

// ==========================================
// 4. ANA MANTIK VE PANEL YÖNETİMİ
// ==========================================
const cards = document.querySelectorAll('.player-card');
const logList = document.getElementById('log-list');
let activePlayer = null; 
let pendingAction = null; 
let flowData = {}; 
let multiSelectColors = [];

window.openPanel = function(id) {
  ['action-panel', 'role-panel', 'eylem-panel', 'decision-panel', 'gelen-eylem-panel'].forEach(p => {
    const el = document.getElementById(p); if(el) el.style.display = "none";
  });
  if(id) document.getElementById(id).style.display = "block";
};

// --- ROL BUTONLARINI TETİKLEME ---
window.startRoleAction = function(role) {
  if (role === 'Survivor') {
    showSurvivorDecision();
    return;
  }
  pendingAction = role.toLowerCase() + '_target';
  showDecision(t(role, 'roles'), t('ui','targetSelect'), `
     <button class="action-btn" style="background:#555" onclick="resetSelection()">${t('cancel')}</button>
  `);
};

// --- KARAR PANELİ ---
function showDecision(title, content, btns) {
  openPanel('decision-panel');
  document.getElementById('decision-title').innerHTML = title;
  document.getElementById('decision-content').innerHTML = content;
  document.getElementById('decision-buttons').innerHTML = btns;
}

// --- SURVIVOR ÖZEL ---
window.showSurvivorDecision = function() {
  showDecision(t('Survivor','roles'), t('ui','btnShield') + "?", `
    <button class="action-btn safe-btn" onclick="showSurvivorResult(true)">${t('ui','btnShield')}</button>
    <button class="action-btn" onclick="completeAction('Survivor', '${t('ui','btnNoShield')}.')">${t('ui','btnNoShield')}</button>
  `);
};

window.showSurvivorResult = function(used) {
  showDecision(t('Survivor','roles'), "Sonuç ne oldu?", `
    <button class="action-btn safe-btn" onclick="completeAction('Survivor', '${t('ui','btnShield')} ve ${t('ui','survHealSuccess')}.')">${t('ui','survHealSuccess')}</button>
    <button class="action-btn" onclick="completeAction('Survivor', '${t('ui','btnShield')} ama ${t('ui','survHealFail')}.')">${t('ui','survHealFail')}</button>
  `);
};

// --- GÖZCÜ KAYIT ---
window.saveGozcu = function(isNobody) {
  const targetName = getTranslatedCardName(flowData.target);
  const targetSpan = `<span style="color:${getColor(flowData.target)}">${targetName}${getSuffix(targetName, 'a')}</span>`;

  if (isNobody) {
    addLog(buildLog(activePlayer, "Gözcü", `${targetSpan} kimsenin gelmediğini söyledi.`));
  } else {
    if (multiSelectColors.length === 0) { alert("Lütfen renk seçin!"); return; }
    const visitors = multiSelectColors.map(c => `<span style="color:${getColor(c)}">${getTranslatedCardName(c)}</span>`).join(", ");
    addLog(buildLog(activePlayer, "Gözcü", `${targetSpan} şunların geldiğini gördü: ${visitors}.`));
  }
  resetSelection();
};

// --- KART TIKLAMA ---
cards.forEach(card => {
  card.addEventListener('click', () => {
    const clickedId = card.id;

    if (pendingAction === 'gozcu_visitors') {
      if (clickedId === activePlayer || clickedId === flowData.target) return;
      const idx = multiSelectColors.indexOf(clickedId);
      if (idx > -1) { multiSelectColors.splice(idx, 1); card.style.border = "2px solid var(--card-border)"; }
      else { multiSelectColors.push(clickedId); card.style.border = "3px dashed #0fbcf9"; }
      return;
    }

    if (pendingAction && activePlayer) {
      if (clickedId === activePlayer) { alert(t('ui','selfTargetAlert')); return; }
      flowData.target = clickedId;
      const tName = getTranslatedCardName(clickedId);
      const tCol = getColor(clickedId);
      const tSpanA = `<span style="color:${tCol}">${tName}${getSuffix(tName, 'a')}</span>`;

      // Rol Bazlı Karar Butonları
      if (pendingAction === 'doktor_target') {
        showDecision(t('Doktor','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Doktor','${tSpanA} gitti, BİR ŞEY OLMADI.')">${t('ui','btnNormal')}</button>
          <button class="action-btn safe-btn" onclick="completeAction('Doktor','${tSpanA} gitti ve KURTARDI.')">${t('ui','btnSaved')}</button>
          <button class="action-btn" onclick="completeAction('Doktor','${tSpanA} giderken TUZAĞA YAKALANDI.')">${t('ui','trappedBtn')}</button>
        `);
      }
      else if (pendingAction === 'polis_target') {
        showDecision(t('Polis','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Polis','${tSpanA} gitti, ÇIKMAYA ÇALIŞTI.')">${t('ui','btnTriedExit')}</button>
          <button class="action-btn" onclick="completeAction('Polis','${tSpanA} gitti, ÇIKMAYA ÇALIŞMADI.')">${t('ui','btnStayed')}</button>
          <button class="action-btn" onclick="completeAction('Polis','${tSpanA} giderken TUZAĞA YAKALANDI.')">${t('ui','trappedBtn')}</button>
        `);
      }
      else if (pendingAction === 'tuzakcı_target') {
        showDecision(t('Tuzakçı','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Tuzakçı','${tSpanA} tuzak kurdu, BASILMADI.')">${t('ui','btnNoTrigger')}</button>
          <button class="action-btn sus-btn" onclick="completeAction('Tuzakçı','${tSpanA} tuzak kurdu, BASILDI.')">${t('ui','btnTriggered')}</button>
          <button class="action-btn" onclick="completeAction('Tuzakçı','${tSpanA} tuzak kurmaya giderken TUZAĞA YAKALANDI.')">${t('ui','trappedBtn')}</button>
        `);
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        showDecision(tName, t('ui','saveSelected'), `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">${t('ui','saveSelected')}</button>
          <button class="action-btn" onclick="saveGozcu(true)">${t('ui','nobodyCame')}</button>
          <button class="action-btn" onclick="completeAction('Gözcü','${tSpanA} giderken TUZAĞA YAKALANDI.')">${t('ui','trappedBtn')}</button>
        `);
      }
       else if (pendingAction === 'dedektif_target') {
        showDecision(t('Dedektif','roles'), "?", `
          <button class="action-btn safe-btn" onclick="completeAction('Dedektif','${tSpanA} baktı: MASUM.')">MASUM</button>
          <button class="action-btn sus-btn" onclick="completeAction('Dedektif','${tSpanA} baktı: ŞÜPHELİ.')">ŞÜPHELİ</button>
        `);
      }
      else if (pendingAction === 'deli_target') {
        showDecision(t('Deli','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Deli','${tSpanA} ziyaret etti.')">Ziyaret Etti</button>
        `);
      }
      return;
    }

    resetSelection();
    activePlayer = clickedId;
    card.style.border = "3px solid #fff";
    document.getElementById('selected-name').innerText = getTranslatedCardName(clickedId);
    document.getElementById('selected-name').style.color = getColor(clickedId);
    openPanel('action-panel');
  });
});

// --- YARDIMCI FONKSİYONLAR ---
window.completeAction = function(role, text) {
  addLog(buildLog(activePlayer, role, text));
  resetSelection();
};

window.resetSelection = function() {
  activePlayer = null; pendingAction = null; flowData = {}; multiSelectColors = [];
  cards.forEach(c => c.style.border = "2px solid var(--card-border)");
  openPanel(null);
};

function addLog(html) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${html}</span><button class="delete-log" onclick="this.parentElement.remove()">X</button>`;
  logList.prepend(li);
}

// --- ALT BUTONLAR ---
document.getElementById('btn-went').onclick = () => { 
  pendingAction = 'went_target'; 
  showDecision(t('ui','targetWait'), t('ui','targetSelect'), ""); 
};
document.getElementById('btn-stayed').onclick = () => { completeAction(null, t('stayedHome')); };
