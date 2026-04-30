// translations objesi içinde hem UI hem de LOG metinlerini yönetiyoruz
const translations = {
  tr: {
    ui: {
      actionHistory: "AKSİYON GEÇMİŞİ",
      resetSelection: "Seçimi Sıfırla",
      wentToLabel: "{p} kime gitti?",
      saveSelected: "Seçilenleri Kaydet",
      nobodyCame: "Kimse Gelmedi",
      trappedBtn: "TUZAĞA YAKALANDI",
      btnNormal: "BİR ŞEY OLMADI",
      btnSaved: "KURTARDI",
      btnTriedExit: "ÇIKMAYA ÇALIŞTI",
      btnStayed: "ÇIKMADI",
      btnNoTrigger: "BASILMADI",
      btnTriggered: "BASILDI",
      btnProvoked: "PROVOKE ETTİ",
      stayedHomeBtn: "EVDEN ÇIKMADI",
      chooseGroup: "Grup Seç",
      hiddenInfo: "Rolü Gizledi / Hiç Söylemedi",
      btnShield: "KALKAN KULLANDI",
      btnNoShield: "KULLANMADI",
      Masum: "Masum",
      Şüpheli: "Şüpheli",
      Tarafsız: "Tarafsız"
    },
    roles: {
      Doktor: "Doktor", Polis: "Polis", Tuzakçı: "Tuzakçı", 
      Provakatör: "Provakatör", Gözcü: "Gözcü", İzci: "İzci", 
      Dedektif: "Dedektif", İspiyoncu: "İspiyoncu", Survivor: "Survivor"
    },
    log: {
      went: "<span style='color:{c1}'>{p1}</span> ➔ <span style='color:{c2}'>{p2}</span>'a gitti.",
      stayed: "Evde kaldığını söyledi.",
      wentOut: "Dışarı çıktığını (belirsiz) söyledi.",
      docNormal: "Doktor olarak <span style='color:{c}'>{p}</span>'a gitti, BİR ŞEY OLMADI.",
      docSaved: "Doktor olarak <span style='color:{c}'>{p}</span>'a gitti ve KURTARDI.",
      docTrapped: "Doktor olarak <span style='color:{c}'>{p}</span>'a gitti, TUZAĞA YAKALANDI.",
      polExit: "Polis olarak <span style='color:{c}'>{p}</span>'a gitti, ÇIKMAYA ÇALIŞTI.",
      polStayed: "Polis olarak <span style='color:{c}'>{p}</span>'a gitti, ÇIKMAYA ÇALIŞMADI.",
      polTrapped: "Polis olarak <span style='color:{c}'>{p}</span>'a gitti, TUZAĞA YAKALANDI.",
      tuzNormal: "<span style='color:{c}'>{p}</span>'a tuzak kurdu, BASILMADI.",
      tuzTriggered: "<span style='color:{c}'>{p}</span>'a tuzak kurdu, BASILDI.",
      tuzTrapped: "<span style='color:{c}'>{p}</span>'a tuzak kurmaya gitti, TUZAĞA YAKALANDI.",
      provProvoked: "<span style='color:{c}'>{p}</span>'ı provoke ettiğini söyledi.",
      provTrapped: "<span style='color:{c}'>{p}</span>'ı provoke etmeye gitti, TUZAĞA YAKALANDI.",
      gozTrapped: "Gözcü olarak <span style='color:{c}'>{p}</span>'a giderken TUZAĞA YAKALANDI.",
      gozNobody: "(Gözcü) <span style='color:{c}'>{p}</span>'a kimsenin gelmediğini söyledi.",
      gozSaw: "(Gözcü) <span style='color:{c}'>{p}</span>'a şunların geldiğini gördü: {v}",
      izcStayed: "(İzci) <span style='color:{c}'>{p}</span>'in EVDEN ÇIKMADIĞINI gördü.",
      izcTrapped: "İzci olarak <span style='color:{c}'>{p}</span>'i izlemeye gitti, TUZAĞA YAKALANDI.",
      izcSaw: "(İzci) <span style='color:{c1}'>{p1}</span>'in ➔ <span style='color:{c2}'>{p2}</span>'a gittiğini gördü.",
      survShield: "Kalkan Kullandı ve KURTULDU.",
      survNoShield: "Kalkan kullanmadı.",
      dedektifReport: "(Dedektif) <span style='color:{c}'>{p}</span>'in <b style='color:{c1_bg}'>{t1} {r1}</b> veya <b style='color:{c2_bg}'>{t2} {r2}</b> olduğunu söyledi.",
      ispReport: "(İspiyoncu) <span style='color:{c}'>{p}</span>'in <b style='color:{bg}'>{team} {role}</b> olduğunu söyledi.",
      ispTrapped: "İspiyoncu olarak <span style='color:{c}'>{p}</span>'a gitti, TUZAĞA YAKALANDI.",
      ispNothing: "(İspiyoncu) <span style='color:{c}'>{p}</span>'e gittiğini ama hiçbir bilgi vermeyeceğini söyledi.",
      ispHidden: "(İspiyoncu) <span style='color:{c}'>{p}</span>'in <b style='color:{bg}'>{team}</b> olduğunu söyledi ama net rolünü gizledi."
    }
  },
  en: {
    ui: {
      actionHistory: "ACTION HISTORY",
      resetSelection: "Reset Selection",
      wentToLabel: "Where did {p} go?",
      saveSelected: "Save Selected",
      nobodyCame: "Nobody Came",
      trappedBtn: "TRAPPED",
      btnNormal: "NOTHING HAPPENED",
      btnSaved: "SAVED",
      btnTriedExit: "TRIED TO EXIT",
      btnStayed: "STAYED IN",
      btnNoTrigger: "NOT TRIGGERED",
      btnTriggered: "TRIGGERED",
      btnProvoked: "PROVOKED",
      stayedHomeBtn: "DID NOT LEAVE HOME",
      chooseGroup: "Choose Group",
      hiddenInfo: "Hid Role / Said Nothing",
      btnShield: "USED SHIELD",
      btnNoShield: "DID NOT USE",
      Masum: "Innocent",
      Şüpheli: "Suspect",
      Tarafsız: "Neutral"
    },
    roles: {
      Doktor: "Doctor", Polis: "Police", Tuzakçı: "Trapper", 
      Provakatör: "Provocateur", Gözcü: "Lookout", İzci: "Tracker", 
      Dedektif: "Investigator", İspiyoncu: "Snitch", Survivor: "Survivor"
    },
    log: {
      went: "<span style='color:{c1}'>{p1}</span> ➔ went to <span style='color:{c2}'>{p2}</span>.",
      stayed: "Said they stayed home.",
      wentOut: "Said they went out (unknown).",
      docNormal: "Went to <span style='color:{c}'>{p}</span> as Doctor, NOTHING HAPPENED.",
      docSaved: "Went to <span style='color:{c}'>{p}</span> as Doctor, and SAVED.",
      docTrapped: "Went to <span style='color:{c}'>{p}</span> as Doctor, TRAPPED.",
      polExit: "Went to <span style='color:{c}'>{p}</span> as Police, TRIED TO EXIT.",
      polStayed: "Went to <span style='color:{c}'>{p}</span> as Police, DID NOT EXIT.",
      polTrapped: "Went to <span style='color:{c}'>{p}</span> as Police, TRAPPED.",
      tuzNormal: "Set trap for <span style='color:{c}'>{p}</span>, NOT TRIGGERED.",
      tuzTriggered: "Set trap for <span style='color:{c}'>{p}</span>, TRIGGERED.",
      tuzTrapped: "Went to set trap for <span style='color:{c}'>{p}</span>, TRAPPED.",
      provProvoked: "Said they provoked <span style='color:{c}'>{p}</span>.",
      provTrapped: "Went to provoke <span style='color:{c}'>{p}</span>, TRAPPED.",
      gozTrapped: "Went to <span style='color:{c}'>{p}</span> as Lookout, TRAPPED.",
      gozNobody: "(Lookout) Said nobody visited <span style='color:{c}'>{p}</span>.",
      gozSaw: "(Lookout) Saw these visiting <span style='color:{c}'>{p}</span>: {v}",
      izcStayed: "(Tracker) Saw that <span style='color:{c}'>{p}</span> DID NOT LEAVE HOME.",
      izcTrapped: "Went to track <span style='color:{c}'>{p}</span>, TRAPPED.",
      izcSaw: "(Tracker) Saw that <span style='color:{c1}'>{p1}</span> went to <span style='color:{c2}'>{p2}</span>.",
      survShield: "Used shield and SURVIVED.",
      survNoShield: "Did not use shield.",
      dedektifReport: "(Investigator) Said <span style='color:{c}'>{p}</span> is <b style='color:{c1_bg}'>{t1} {r1}</b> or <b style='color:{c2_bg}'>{t2} {r2}</b>.",
      ispReport: "(Snitch) Said <span style='color:{c}'>{p}</span> is <b style='color:{bg}'>{team} {role}</b>.",
      ispTrapped: "Went to <span style='color:{c}'>{p}</span> as Snitch, TRAPPED.",
      ispNothing: "(Snitch) Went to <span style='color:{c}'>{p}</span> but provided no info.",
      ispHidden: "(Snitch) Said <span style='color:{c}'>{p}</span> is <b style='color:{bg}'>{team}</b> but hid exact role."
    }
  }
};

let currentLang = 'tr';

function t(key, category = 'ui') {
  return (translations[currentLang][category] && translations[currentLang][category][key]) || key;
}

// Loglar için parametreli çeviri fonksiyonu
function tLog(key, params = {}) {
  let str = (translations[currentLang].log && translations[currentLang].log[key]) || key;
  for (let p in params) {
    str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
  }
  return str;
}

// Global Değişkenler
let activePlayer = null;
let pendingAction = null;
let flowData = { target: null, dedektif: null };
let multiSelectColors = [];

// Yardımcılar
const getColor = (name) => {
  const map = { "Kırmızı":"#ff3f34", "Mavi":"#1e90ff", "Yeşil":"#0be881", "Sarı":"#ffdd59", "Turuncu":"#ff9f43", "Mor":"#ef5777", "Pembe":"#f53b57", "Beyaz":"#ffffff" };
  return map[name] || "white";
};

const getTranslatedCardName = (colorName) => {
  const nameMap = { "Kırmızı": {tr:"Kırmızı", en:"Red"}, "Mavi": {tr:"Mavi", en:"Blue"}, "Yeşil": {tr:"Yeşil", en:"Green"}, "Sarı": {tr:"Sarı", en:"Yellow"}, "Turuncu": {tr:"Turuncu", en:"Orange"}, "Mor": {tr:"Mor", en:"Purple"}, "Pembe": {tr:"Pembe", en:"Pink"}, "Beyaz": {tr:"Beyaz", en:"White"} };
  return (nameMap[colorName] && nameMap[colorName][currentLang]) || colorName;
};

// --- CORE UI FUNCTIONS ---

window.addLog = function(htmlContent, isHeader = false, callback = null) {
  const container = document.getElementById('log-container');
  const entry = document.createElement('div');
  entry.className = isHeader ? 'log-entry header' : 'log-entry';
  entry.innerHTML = htmlContent;
  container.prepend(entry);
  if (callback) callback();
};

window.resetSelection = function() {
  activePlayer = null;
  pendingAction = null;
  multiSelectColors = [];
  document.querySelectorAll('.player-card').forEach(c => {
    c.classList.remove('active');
    c.style.border = "2px solid var(--card-border)";
  });
  document.getElementById('decision-overlay').classList.remove('active');
  document.getElementById('action-menu').classList.remove('active');
  document.getElementById('selected-name-label').innerText = "";
};

window.showDecision = function(title, subtitle, contentHtml) {
  const overlay = document.getElementById('decision-overlay');
  document.getElementById('decision-title').innerText = title;
  document.getElementById('decision-subtitle').innerText = subtitle;
  document.getElementById('decision-content').innerHTML = contentHtml;
  overlay.classList.add('active');
};

// --- ACTION LOGIC ---

window.directLog = function(msg) {
  const activeName = getTranslatedCardName(activePlayer);
  addLog(`<span style="color:${getColor(activePlayer)}">${activeName}</span>: ${msg}`);
  resetSelection();
};

// Role Butonları Tıklama
document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!activePlayer) return;
    const role = btn.dataset.role;
    const translatedRole = t(role, 'roles');
    
    // Alt Menüyü Göster
    document.getElementById('action-menu').classList.add('active');
    
    if (role === 'Survivor') {
       showSurvivorDecision();
    } else {
       pendingAction = role.toLowerCase() + "_target";
       document.getElementById('selected-name-label').innerText = `${getTranslatedCardName(activePlayer)} (${translatedRole}) ➔ ?`;
    }
  });
});

// "Gitti", "Evde", "Dışarı" Butonları
document.getElementById('btn-went').addEventListener('click', () => { 
  pendingAction = 'went'; 
  const label = document.getElementById('selected-name-label');
  label.innerText = t('wentToLabel', 'ui').replace('{p}', getTranslatedCardName(activePlayer)); 
  label.style.color = "white"; 
});
document.getElementById('btn-stayed').addEventListener('click', () => { directLog(tLog('stayed')); });
document.getElementById('btn-went-out').addEventListener('click', () => { directLog(tLog('wentOut')); });

// Kart Tıklama İşlemleri
document.querySelectorAll('.player-card').forEach(card => {
  card.addEventListener('click', () => {
    const clickedPlayer = card.dataset.color;
    const clickedNameDisplay = getTranslatedCardName(clickedPlayer);

    if (!activePlayer) {
      activePlayer = clickedPlayer;
      card.classList.add('active');
      return;
    }

    // Özel Çoklu Seçim veya Sıralı Seçim Durumları
    if (pendingAction === 'gozcu_visitors' || pendingAction === 'izci_went_where') {
       if (pendingAction === 'gozcu_visitors' && clickedPlayer === activePlayer) return;
       if (pendingAction === 'gozcu_visitors') {
          const index = multiSelectColors.indexOf(clickedPlayer);
          if (index > -1) { multiSelectColors.splice(index, 1); card.style.border = "2px solid var(--card-border)"; } 
          else { multiSelectColors.push(clickedPlayer); card.style.border = "3px dashed #0fbcf9"; }
          return; 
       }
       if (pendingAction === 'izci_went_where') {
          addLog(tLog('izcSaw', {
            c1: getColor(flowData.target), p1: getTranslatedCardName(flowData.target),
            c2: getColor(clickedPlayer), p2: clickedNameDisplay
          }));
          resetSelection();
          return;
       }
    }

    if (pendingAction === 'went') {
      addLog(tLog('went', {
         c1: getColor(activePlayer), p1: getTranslatedCardName(activePlayer),
         c2: getColor(clickedPlayer), p2: clickedNameDisplay
      }));
      resetSelection(); return;
    }

    flowData.target = clickedPlayer;

    // Rol Hedef Karar Ekranları
    if (pendingAction === 'doktor_target') {
      showDecision(t('Doktor','roles'), "?", `
        <button class="action-btn" onclick="directLog(tLog('docNormal', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnNormal','ui')}</button>
        <button class="action-btn safe-btn" onclick="directLog(tLog('docSaved', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnSaved','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('docTrapped', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('trappedBtn','ui')}</button>
      `);
    } 
    else if (pendingAction === 'polis_target') {
       showDecision(t('Polis','roles'), "?", `
        <button class="action-btn" onclick="directLog(tLog('polExit', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnTriedExit','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('polStayed', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnStayed','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('polTrapped', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('trappedBtn','ui')}</button>
      `);
    }
    else if (pendingAction === 'tuzakci_target') {
       showDecision(t('Tuzakçı','roles'), "?", `
        <button class="action-btn" onclick="directLog(tLog('tuzNormal', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnNoTrigger','ui')}</button>
        <button class="action-btn sus-btn" onclick="directLog(tLog('tuzTriggered', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnTriggered','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('tuzTrapped', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('trappedBtn','ui')}</button>
      `);
    }
    else if (pendingAction === 'provokator_target') {
       showDecision(t('Provakatör','roles'), "?", `
        <button class="action-btn safe-btn" onclick="directLog(tLog('provProvoked', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('btnProvoked','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('provTrapped', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('trappedBtn','ui')}</button>
      `);
    }
    else if (pendingAction === 'gozcu_target') {
      pendingAction = 'gozcu_visitors';
      showDecision(clickedNameDisplay, t('saveSelected','ui'), `
        <button class="action-btn safe-btn" onclick="saveGozcu(false)">${t('saveSelected','ui')}</button>
        <button class="action-btn" onclick="saveGozcu(true)">${t('nobodyCame','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('gozTrapped', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('trappedBtn','ui')}</button>
      `);
    }
    else if (pendingAction === 'izci_target') {
      pendingAction = 'izci_went_where';
      showDecision(clickedNameDisplay, "?", `
        <button class="action-btn eylem-btn" onclick="addLog(tLog('izcStayed', {c:'${getColor(flowData.target)}', p:'${getTranslatedCardName(flowData.target)}'})); resetSelection();">${t('stayedHomeBtn','ui')}</button>
        <button class="action-btn" onclick="directLog(tLog('izcTrapped', {c:'${getColor(flowData.target)}', p:'${getTranslatedCardName(flowData.target)}'}))">${t('trappedBtn','ui')}</button>
      `);
    }
    else if (pendingAction === 'ispiyoncu_target') {
      // İspiyoncu için Takım Seçimi
      showDecision(clickedNameDisplay, t('chooseGroup','ui'), `
        <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap;">
          <button class="action-btn role-masum" onclick="renderIspiyoncuRoles('Masum')">${t('Masum','ui')}</button>
          <button class="action-btn role-hain" onclick="renderIspiyoncuRoles('Şüpheli')">${t('Şüpheli','ui')}</button>
          <button class="action-btn role-tarafsiz" onclick="renderIspiyoncuRoles('Tarafsız')">${t('Tarafsız','ui')}</button>
          <button class="action-btn eylem-btn" style="width:100%" onclick="showIspiyoncuSoylemedi()">${t('hiddenInfo','ui')}</button>
          <button class="action-btn" style="width:100%" onclick="directLog(tLog('ispTrapped', {c:'${getColor(clickedPlayer)}', p:'${clickedNameDisplay}'}))">${t('trappedBtn','ui')}</button>
        </div>
      `);
    }
  });
});

window.saveGozcu = function(kimseGelmedi) {
  if (kimseGelmedi) {
    addLog(tLog('gozNobody', {c: getColor(flowData.target), p: getTranslatedCardName(flowData.target)}));
  } else {
    if (multiSelectColors.length === 0) { alert(t('saveSelected', 'ui')); return; }
    const visitorsStr = multiSelectColors.map(c => `<span style="color:${getColor(c)}">${getTranslatedCardName(c)}</span>`).join(", ");
    addLog(tLog('gozSaw', {c: getColor(flowData.target), p: getTranslatedCardName(flowData.target), v: visitorsStr}));
  }
  resetSelection();
};

window.showSurvivorDecision = function() {
  showDecision(t('Survivor','roles'), "?", `
    <button class="action-btn safe-btn" onclick="directLog(tLog('survShield'))">${t('btnShield','ui')}</button>
    <button class="action-btn" onclick="directLog(tLog('survNoShield'))">${t('btnNoShield','ui')}</button>
  `);
};

// Dil Değiştirme
window.switchLanguage = function(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.innerText.toLowerCase() === lang));
  // Arayüz elemanlarını güncelle
  document.getElementById('history-title').innerText = t('actionHistory');
  document.getElementById('btn-reset').innerText = t('resetSelection');
  // Rol butonlarını güncelle
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.innerText = t(btn.dataset.role, 'roles');
  });
};
