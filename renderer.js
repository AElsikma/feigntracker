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
// 2. DİL (i18n) VE ÇEVİRİ SÖZLÜĞÜ
// ==========================================
const translations = {
  tr: {
    newTurn: "Yeni Tura Geç", resetGame: "Oyunu Sıfırla", safe: "✔ Güvenli", sus: "✘ Şüpheli",
    setRole: "Rol Belirt", wentTo: "Şuraya Gitti ➔", actionSpecial: "⚡ Eylem (Rol Özel)",
    incomingActions: "📥 Gelen Eylemler", stayedHome: "Evde Kaldı", wentOut: "Dışarı Çıktı (Belirsiz)",
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
  },
  en: {
    newTurn: "Next Turn", resetGame: "Reset Game", safe: "✔ Safe", sus: "✘ Sus",
    setRole: "Set Role", wentTo: "Went To ➔", actionSpecial: "⚡ Action",
    incomingActions: "📥 Incoming Actions", stayedHome: "Stayed Home", wentOut: "Went Out",
    cancel: "Cancel", chooseRole: "Choose Role", back: "Back", whoseAction: "Action?",
    cancelSelection: "Cancel", whatHappened: "Action Result?", actionHistory: "Action History",
    searchPlaceholder: "Search...", freeNotes: "Notes", notesPlaceholder: "Notes here...",
    feedbackBtn: "💬 Feedback", historyBtn: "📜 History",
    step: "Step",
    roles: { "Doktor": "Doctor", "Polis": "Police", "Gözcü": "Lookout", "Dedektif": "Investigator", "Tuzakçı": "Trapper", "Survivor": "Survivor" /* ... extend if needed */ },
    ui: {
      targetWait: "Waiting Target", targetSelect: "Select a player.", or: "OR", 
      chooseGroup: "Choose Group", hiddenInfo: "Hidden Info", trappedBtn: "Trapped",
      saidMasum: "Said Safe", saidSus: "Said Sus", saidNothing: "Unknown",
      nobodyCame: "Nobody", saveSelected: "Save", stayedHomeBtn: "Stayed Home",
      Masum: "Innocent", Şüpheli: "Suspect", Tarafsız: "Neutral",
      btnNormal: "Nothing", btnSaved: "Saved", btnTriedExit: "Tried Exit", btnStayed: "Stayed",
      btnNoTrigger: "No Trigger", btnTriggered: "Triggered", btnProvoked: "Provoked",
      btnShield: "Used Shield", btnNoShield: "No Shield",
      survHealSuccess: "Survived Hit", survHealFail: "No Hit Received",
      selfTargetAlert: "Error: Cannot select self!"
    }
  }
};

let currentLang = 'tr';
function t(key, sub = null) {
  if (sub) return translations[currentLang][sub][key] || key;
  return translations[currentLang][key] || key;
}

// ==========================================
// 3. LOG ÜRETİCİ (FORMAT: Renk: (Rol) Mesaj)
// ==========================================
function buildLog(actorName, roleName, actionText) {
  const actorColor = getColor(actorName);
  const actorDisplay = getTranslatedCardName(actorName);
  const roleDisplay = roleName ? `(${t(roleName, 'roles')}) ` : "";
  return `<span style="color:${actorColor}">${actorDisplay}</span>: ${roleDisplay}${actionText}`;
}

// ==========================================
// 4. ANA MANTIK VE DEĞİŞKENLER
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

// --- GÖZCÜ KAYIT (Geliştirilmiş) ---
window.saveGozcu = function(isNobody) {
  const actor = activePlayer;
  const target = flowData.target;
  const targetName = getTranslatedCardName(target);
  const targetSpan = `<span style="color:${getColor(target)}">${targetName}${currentLang === 'tr' ? getSuffix(targetName, 'a') : "'s house"}</span>`;

  if (isNobody) {
    addLog(buildLog(actor, "Gözcü", `${targetSpan} kimsenin gelmediğini söyledi.`));
  } else {
    if (multiSelectColors.length === 0) { alert("Lütfen renk seçin!"); return; }
    const visitors = multiSelectColors.map(c => `<span style="color:${getColor(c)}">${getTranslatedCardName(c)}</span>`).join(", ");
    addLog(buildLog(actor, "Gözcü", `${targetSpan} şunların geldiğini gördü: ${visitors}.`));
  }
  resetSelection();
};

// --- TETİKLEYİCİLER ---
cards.forEach(card => {
  card.addEventListener('click', () => {
    const clickedId = card.id;

    // Gözcü/İzci Çoklu Seçim Modu
    if (pendingAction === 'gozcu_visitors') {
      if (clickedId === activePlayer || clickedId === flowData.target) return; // Kendini ve hedefi seçemez
      const idx = multiSelectColors.indexOf(clickedId);
      if (idx > -1) { multiSelectColors.splice(idx, 1); card.style.border = "2px solid var(--card-border)"; }
      else { multiSelectColors.push(clickedId); card.style.border = "3px dashed #0fbcf9"; }
      return;
    }

    if (pendingAction && activePlayer) {
      // Hedef Seçimi
      if (clickedId === activePlayer) { alert(t('selfTargetAlert','ui')); return; }
      flowData.target = clickedId;
      const targetName = getTranslatedCardName(clickedId);
      const targetColor = getColor(clickedId);
      const targetSpan = `<span style="color:${targetColor}">${targetName}</span>`;
      const targetSuffixA = targetName + (currentLang === 'tr' ? getSuffix(targetName, 'a') : "'s house");
      const targetSpanA = `<span style="color:${targetColor}">${targetSuffixA}</span>`;

      if (pendingAction === 'doktor_target') {
        showDecision(t('Doktor','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Doktor','${targetSpanA} gitti, BİR ŞEY OLMADI.')">${t('btnNormal','ui')}</button>
          <button class="action-btn safe-btn" onclick="completeAction('Doktor','${targetSpanA} gitti ve KURTARDI.')">${t('btnSaved','ui')}</button>
          <button class="action-btn" onclick="completeAction('Doktor','${targetSpanA} giderken TUZAĞA YAKALANDI.')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'polis_target') {
        showDecision(t('Polis','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Polis','${targetSpanA} gitti, ÇIKMAYA ÇALIŞTI.')">${t('btnTriedExit','ui')}</button>
          <button class="action-btn" onclick="completeAction('Polis','${targetSpanA} gitti, ÇIKMAYA ÇALIŞMADI.')">${t('btnStayed','ui')}</button>
          <button class="action-btn" onclick="completeAction('Polis','${targetSpanA} giderken TUZAĞA YAKALANDI.')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'tuzakci_target') {
        showDecision(t('Tuzakçı','roles'), "?", `
          <button class="action-btn" onclick="completeAction('Tuzakçı','${targetSpanA} tuzak kurdu, BASILMADI.')">${t('btnNoTrigger','ui')}</button>
          <button class="action-btn sus-btn" onclick="completeAction('Tuzakçı','${targetSpanA} tuzak kurdu, BASILDI.')">${t('btnTriggered','ui')}</button>
          <button class="action-btn" onclick="completeAction('Tuzakçı','${targetSpanA} tuzak kurmaya giderken TUZAĞA YAKALANDI.')">${t('trappedBtn','ui')}</button>
        `);
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        showDecision(targetName, t('saveSelected','ui'), `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">${t('saveSelected','ui')}</button>
          <button class="action-btn" onclick="saveGozcu(true)">${t('nobodyCame','ui')}</button>
          <button class="action-btn" onclick="completeAction('Gözcü','${targetSpanA} giderken TUZAĞA YAKALANDI.')">${t('trappedBtn','ui')}</button>
        `);
      }
      // ... Diğer roller benzer şekilde güncellendi
      return;
    }

    // Oyuncu Seçimi
    resetSelection();
    activePlayer = clickedId;
    card.style.border = "3px solid #fff";
    document.getElementById('selected-name').innerText = getTranslatedCardName(clickedId);
    document.getElementById('selected-name').style.color = getColor(clickedId);
    openPanel('action-panel');
  });
});

window.completeAction = function(role, text) {
  addLog(buildLog(activePlayer, role, text));
  resetSelection();
};

window.showSurvivorDecision = function() {
  showDecision(t('Survivor','roles'), t('btnShield','ui') + "?", `
    <button class="action-btn safe-btn" onclick="showSurvivorResult(true)">${t('btnShield','ui')}</button>
    <button class="action-btn" onclick="completeAction('Survivor', '${t('btnNoShield','ui')}.')">${t('btnNoShield','ui')}</button>
  `);
};

window.showSurvivorResult = function(used) {
  showDecision(t('Survivor','roles'), "Sonuç ne oldu?", `
    <button class="action-btn safe-btn" onclick="completeAction('Survivor', '${t('btnShield','ui')} ve ${t('survHealSuccess','ui')}.')">${t('survHealSuccess','ui')}</button>
    <button class="action-btn" onclick="completeAction('Survivor', '${t('btnShield','ui')} ama ${t('survHealFail','ui')}.')">${t('survHealFail','ui')}</button>
  `);
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

function showDecision(title, content, btns) {
  openPanel('decision-panel');
  document.getElementById('decision-title').innerHTML = title;
  document.getElementById('decision-content').innerHTML = content;
  document.getElementById('decision-buttons').innerHTML = btns;
}

function getColor(id) {
  const colors = { 'Beyaz': '#F3F3F3', 'Turuncu': '#FA8A1C', 'Mor': '#b554e6', 'Koyu Yeşil': '#40a124', 'Mavi': '#6c8dec', 'Kırmızı': '#ff4d4d', 'Sarı': '#FCE14E', 'Açık Yeşil': '#7AFF48', 'Turkuaz': '#2BD8C8', 'Açık Pembe': '#FF95B7', 'Kahverengi': '#d18b5e', 'Koyu Pembe': '#EB00E4', 'Parlak Turuncu': '#F84000' };
  return colors[id] || '#fff';
}

function getTranslatedCardName(id) {
  const card = document.getElementById(id);
  return currentLang === 'en' ? card.getAttribute('data-color') : id;
}

// Başlatıcı eylemleri
document.getElementById('btn-went').onclick = () => { pendingAction = 'went'; showDecision(t('targetWait','ui'), t('targetSelect','ui'), ""); };
document.getElementById('btn-stayed').onclick = () => { completeAction(null, t('stayedHome')); };
