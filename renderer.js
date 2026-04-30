const cards = document.querySelectorAll('.player-card');
const panels = ['action-panel', 'role-panel', 'eylem-panel', 'decision-panel', 'gelen-eylem-panel'];
const selectedNameLabel = document.getElementById('selected-name');
const logList = document.getElementById('log-list');

let activePlayer = null;
let pendingAction = null; 
let turnCount = 1;

let flowData = {}; 
let multiSelectColors = [];

// Rol veritabanı
const roleDB = {
  masum: [{n:'Doktor'}, {n:'Deli'}],
  gri: [{n:'Polis'}, {n:'Gözcü'}, {n:'Dedektif'}, {n:'Tuzakçı'}, {n:'İspiyoncu'}, {n:'Provakatör'}, {n:'İzci'}],
  hain: [{n:'Temizlikçi'}, {n:'Suçlayıcı'}],
  tarafsiz: [{n:'Survivor'}, {n:'Seri Katil'}, {n:'Bombacı'}, {n:'Hırsız'}, {n:'Büyücü'}, {n:'Hortlak'}]
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
    if (container.children.length === 0) {
      container.remove();
    }
  };
}

function getRoleColors(roleName) {
  if (roleDB.masum.find(r => r.n === roleName)) return { bg: '#0be881', text: 'black' };
  if (roleDB.gri.find(r => r.n === roleName)) return { bg: '#808e9b', text: 'white' };
  if (roleDB.hain.find(r => r.n === roleName)) return { bg: '#ff3f34', text: 'white' };
  if (roleDB.tarafsiz.find(r => r.n === roleName)) return { bg: '#4bcffa', text: 'black' };
  return { bg: 'rgba(0,0,0,0.45)', text: 'white' };
}

// --- KART TIKLAMA MANTIĞI VE ZİNCİRLEME KARARLAR ---
cards.forEach(card => {
  card.addEventListener('click', () => {
    const clickedPlayer = card.id;

    if (pendingAction && activePlayer) {
      
      const selfTargetActions = ['went', 'doktor_target', 'polis_target', 'tuzakci_target', 'provokator_target', 'gozcu_target', 'izci_target', 'dedektif_target', 'ispiyoncu_target'];
      if (selfTargetActions.includes(pendingAction) && clickedPlayer === activePlayer) {
        alert("Oyuncu kendi evini hedef seçemez! (Evde kaldıysa menüden 'Evde Kaldı' butonunu kullanın)");
        return;
      }

      if (pendingAction === 'gozcu_visitors') {
        if (clickedPlayer === activePlayer) { alert("Gözcü kendini 'gelenler' arasında sayamaz."); return; }
        if (clickedPlayer === flowData.target) { alert("Ev sahibi kendi evine 'gelen ziyaretçi' olamaz."); return; }
        
        const index = multiSelectColors.indexOf(clickedPlayer);
        if (index > -1) { multiSelectColors.splice(index, 1); card.style.border = "2px solid transparent"; } 
        else { multiSelectColors.push(clickedPlayer); card.style.border = "3px dashed #0fbcf9"; }
        return; 
      }

      if (pendingAction === 'izci_went_where') {
        if (clickedPlayer === flowData.target) { alert("İzlenen kişi kendi evine gitmiş olamaz! (Evden çıkmadıysa 'Evden Çıkmadı' butonunu kullanın)"); return; }
        directLog(`(İzci) <b style="color:${getColor(flowData.target)}">${flowData.target}</b> oyuncusunun ➔ <b style="color:${getColor(clickedPlayer)}">${clickedPlayer}</b> hedefine gittiğini gördü.`);
        return;
      }

      if (pendingAction === 'went') {
        const bg = 'rgba(0,0,0,0.45)';
        addLog(
          `<b style="color:${getColor(activePlayer)}; background:${bg}; padding:2px 5px; border-radius:4px;">${activePlayer}</b> ` +
          `➔ ` +
          `<b style="color:${getColor(clickedPlayer)}; background:${bg}; padding:2px 5px; border-radius:4px;">${clickedPlayer}</b> ` +
          `hedefine gitti.`
        );
        resetSelection();
        return;
      }

      flowData.target = clickedPlayer;

      // JAVASCRIPT ÇAKISMA HATASI DÜZELTİLDİ: İç içe tırnak ve HTML özellikleri '&quot;' formatına geçirildi.
      if (pendingAction === 'doktor_target') {
        showDecision("Doktor Sonucu", "Doktor eylemi sonucu ne oldu?", `
          <button class="action-btn" onclick="directLog('Doktor olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti, BİR ŞEY OLMADI.')">Bir Şey Olmadı</button>
          <button class="action-btn safe-btn" onclick="directLog('Doktor olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti ve KURTARDI.')">Kurtardı</button>
          <button class="action-btn" onclick="directLog('Doktor olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      } 
      else if (pendingAction === 'polis_target') {
        showDecision("Polis Sonucu", "Polis eylemi sonucu ne oldu?", `
          <button class="action-btn" onclick="directLog('Polis olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti, ÇIKMAYA ÇALIŞTI.')">Çıkmaya Çalıştı</button>
          <button class="action-btn" onclick="directLog('Polis olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti, ÇIKMAYA ÇALIŞMADI.')">Çıkmaya Çalışmadı</button>
          <button class="action-btn" onclick="directLog('Polis olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'tuzakci_target') {
        showDecision("Tuzak Sonucu", "Kurulan tuzağa basıldı mı?", `
          <button class="action-btn" onclick="directLog('<b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine tuzak kurdu, BASILMADI.')">Basılmadı</button>
          <button class="action-btn sus-btn" onclick="directLog('<b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine tuzak kurdu, BASILDI.')">Basıldı</button>
          <button class="action-btn" onclick="directLog('<b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine tuzak kurmaya gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'provokator_target') {
        showDecision("Provokatör Sonucu", "Provokatör eylemi sonucu ne oldu?", `
          <button class="action-btn safe-btn" onclick="directLog('<b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> oyuncusunu provoke ettiğini söyledi.')">Provoke Etti</button>
          <button class="action-btn" onclick="directLog('<b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> oyuncusunu provoke etmeye gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'gozcu_target') {
        pendingAction = 'gozcu_visitors';
        showDecision(`${clickedPlayer}'a Gelenleri Seçin`, "Gelenleri tablodan tıklayarak çoklu seçin.", `
          <button class="action-btn safe-btn" onclick="saveGozcu(false)">Seçilenleri Kaydet</button>
          <button class="action-btn" onclick="saveGozcu(true)">Kimse Gelmedi</button>
          <button class="action-btn" onclick="directLog('Gözcü olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine giderken TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
        `);
      }
      else if (pendingAction === 'izci_target') {
        pendingAction = 'izci_went_where';
        showDecision(`${clickedPlayer} Nereye Gitmiş?`, "Gittiği rengi tablodan seçin, evde kaldığını veya tuzağa yakalandığınızı belirtin.", `
          <button class="action-btn eylem-btn" onclick="directLog('(İzci) <b style=&quot;color:${getColor(flowData.target)}&quot;>${flowData.target}</b> oyuncusunun EVDEN ÇIKMADIĞINI gördü.')">Evden Çıkmadı</button>
          <button class="action-btn" onclick="directLog('İzci olarak <b style=&quot;color:${getColor(flowData.target)}&quot;>${flowData.target}</b> oyuncusunu izlemeye gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
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
            <button class="action-btn eylem-btn" style="flex: 1; min-width: 100px;" onclick="showIspiyoncuSoylemedi()">Bilgiyi Gizledi (Söylemedi)</button>
            <button class="action-btn" style="flex: 1; min-width: 100px;" onclick="directLog('İspiyoncu olarak <b style=&quot;color:${getColor(clickedPlayer)}&quot;>${clickedPlayer}</b> hedefine gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>
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

window.showSurvivorDecision = function() {
  showDecision("Survivor Eylemi", "Kalkan durumunu seçin:", `
    <button class="action-btn safe-btn" onclick="directLog('Kalkan Kullandı ve KURTULDU.')">Kalkan Kullandı</button>
    <button class="action-btn" onclick="directLog('Kalkan kullanmadı.')">Kalkan Kullanmadı</button>
  `);
}

// --- DEDEKTİF MANTIĞI ---
window.showDedektifTeamSelection = function(step) {
  pendingAction = step === 1 ? 'dedektif_team_1' : 'dedektif_team_2';
  
  let trapBtn = step === 1 ? `<button class="action-btn" style="flex: 1; min-width: 100px;" onclick="directLog('Dedektif olarak <b style=&quot;color:${getColor(flowData.dedektif.target)}&quot;>${flowData.dedektif.target}</b> hedefine gitti, TUZAĞA YAKALANDI.')">Tuzağa Yakalandı</button>` : '';

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
  if (pendingAction === 'dedektif_team_1') {
    flowData.dedektif.t1 = team;
    showDedektifRoleSelection(1);
  } else if (pendingAction === 'dedektif_team_2') {
    flowData.dedektif.t2 = team;
    showDedektifRoleSelection(2);
  }
}

window.showDedektifRoleSelection = function(step) {
  pendingAction = step === 1 ? 'dedektif_role_1' : 'dedektif_role_2';
  const currentTeam = step === 1 ? flowData.dedektif.t1 : flowData.dedektif.t2;
  
  let rolesToShow = [];
  let colorClass = '';

  if (currentTeam === 'Masum') {
    rolesToShow = [...roleDB.masum, ...roleDB.gri].filter(r => r.n !== 'Deli');
    colorClass = 'role-masum';
  } else if (currentTeam === 'Şüpheli') {
    rolesToShow = [...roleDB.hain, ...roleDB.gri];
    colorClass = 'role-hain';
  } else if (currentTeam === 'Tarafsız') {
    rolesToShow = [...roleDB.tarafsiz];
    colorClass = 'role-tarafsiz';
  }

  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => {
    html += `<button class="action-btn ${colorClass}" onclick="selectDedektifRole('${r.n}')">${r.n}</button>`;
  });
  html += `</div>`;
  
  showDecision(`Dedektif: ${step}. Rolü Seçin`, `Bu rol bir <b>${currentTeam}</b> olarak görünüyor. Peki hangi rol?`, html);
}

window.selectDedektifRole = function(roleName) {
  if (pendingAction === 'dedektif_role_1') {
    flowData.dedektif.r1 = roleName;
    showDedektifTeamSelection(2);
  } else if (pendingAction === 'dedektif_role_2') {
    flowData.dedektif.r2 = roleName;
    const { target, t1, r1, t2, r2 } = flowData.dedektif;
    
    const c1_bg = t1 === 'Masum' ? '#0be881' : (t1 === 'Şüpheli' ? '#ff3f34' : '#4bcffa');
    const c1_txt = t1 === 'Şüpheli' ? 'white' : 'black';
    
    const c2_bg = t2 === 'Masum' ? '#0be881' : (t2 === 'Şüpheli' ? '#ff3f34' : '#4bcffa');
    const c2_txt = t2 === 'Şüpheli' ? 'white' : 'black';

    const rb1 = addRoleBadge(target, r1, c1_bg, c1_txt);
    const rb2 = addRoleBadge(target, r2, c2_bg, c2_txt);

    addLog(`(Dedektif) <b style="color:${getColor(target)}">${target}</b> oyuncusunun <b style="color:${c1_bg}">${t1} ${r1}</b> veya <b style="color:${c2_bg}">${t2} ${r2}</b> olduğunu söyledi.`, false, () => {
      rb1(); 
      rb2();
    });
    resetSelection();
  }
}

// --- İSPİYONCU MANTIĞI ---
window.renderIspiyoncuRoles = function(team) {
  let rolesToShow = [];
  let colorClass = '';

  if (team === 'Masum') {
    rolesToShow = [...roleDB.masum, ...roleDB.gri].filter(r => r.n !== 'Deli');
    colorClass = 'role-masum';
  } else if (team === 'Şüpheli') {
    rolesToShow = [...roleDB.hain, ...roleDB.gri];
    colorClass = 'role-hain';
  } else if (team === 'Tarafsız') {
    rolesToShow = [...roleDB.tarafsiz];
    colorClass = 'role-tarafsiz';
  }

  let html = `<div class="role-grid">`;
  rolesToShow.forEach(r => {
    html += `<button class="action-btn ${colorClass}" onclick="selectIspiyoncuRole('${r.n}', '${team}')">${r.n}</button>`;
  });
  html += `</div>`;
  
  showDecision(`İspiyoncu: Rolü Seçin`, `İspiyonladığı net rolü seçin (${team}).`, html);
}

window.selectIspiyoncuRole = function(roleName, team) {
  const target = flowData.target;
  
  const bg = team === 'Masum' ? '#0be881' : (team === 'Şüpheli' ? '#ff3f34' : '#4bcffa');
  const txt = team === 'Şüpheli' ? 'white' : 'black';
  
  const removeBadge = addRoleBadge(target, roleName, bg, txt);
  
  addLog(`(İspiyoncu) <b style="color:${getColor(target)}">${target}</b> oyuncusunun <b style="color:${bg}">${team} ${roleName}</b> olduğunu söyledi.`, false, () => {
    removeBadge();
  });
  resetSelection();
}

window.showIspiyoncuSoylemedi = function() {
  showDecision(`İspiyoncu Bilgiyi Sakladı`, `Peki hedef oyuncunun hangi grupta olduğunu belirtti mi?`, `
    <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap; max-width: 400px; margin: 0 auto;">
      <button class="action-btn role-masum" style="flex: 1; min-width: 100px;" onclick="saveIspiyoncuSoylemedi('Masum')">Masum Dedi</button>
      <button class="action-btn role-hain" style="flex: 1; min-width: 100px;" onclick="saveIspiyoncuSoylemedi('Şüpheli')">Şüpheli Dedi</button>
      <button class="action-btn role-tarafsiz" style="flex: 1; min-width: 100px;" onclick="saveIspiyoncuSoylemedi('Tarafsız')">Tarafsız Dedi</button>
      <button class="action-btn" style="background-color: #808e9b; color: white; width: 100%; margin-top: 5px;" onclick="saveIspiyoncuSoylemedi('Belirsiz')">Hiçbir Şey Söylemedi (Belirsiz)</button>
    </div>
  `);
}

window.saveIspiyoncuSoylemedi = function(group) {
  const target = flowData.target;
  
  if (group === 'Belirsiz') {
    addLog(`(İspiyoncu) <b style="color:${getColor(target)}">${target}</b> hedefine gittiğini ama <b>hiçbir bilgi vermeyeceğini</b> söyledi.`);
  } else {
    const bg = group === 'Masum' ? '#0be881' : (group === 'Şüpheli' ? '#ff3f34' : '#4bcffa');
    const txt = group === 'Şüpheli' ? 'white' : 'black';
    
    const removeBadge = addRoleBadge(target, `${group} (?)`, bg, txt);
    addLog(`(İspiyoncu) <b style="color:${getColor(target)}">${target}</b> oyuncusunun <b style="color:${bg}">${group}</b> olduğunu söyledi ama <b>net rolünü gizledi</b>.`, false, () => {
      removeBadge();
    });
  }
  resetSelection();
}

// --- GÖZCÜ KAYIT ---
window.saveGozcu = function(kimseGelmedi) {
  if (kimseGelmedi) {
    directLog(`(Gözcü) <b style="color:${getColor(flowData.target)}">${flowData.target}</b> hedefine kimsenin gelmediğini söyledi.`);
  } else {
    if (multiSelectColors.length === 0) { alert("En az bir renk seçmelisiniz!"); return; }
    const coloredVisitors = multiSelectColors.map(c => `<b style="color:${getColor(c)}">${c}</b>`).join(", ");
    directLog(`(Gözcü) <b style="color:${getColor(flowData.target)}">${flowData.target}</b> hedefine şunların geldiğini gördü: ${coloredVisitors}.`);
  }
};

// --- ORTAK İŞLEMLER ---
window.directLog = function(msg) {
  addLog(`<b style="color:${getColor(activePlayer)}">${activePlayer}</b>: ${msg}`);
  resetSelection();
};

window.markPlayer = function(status) {
  const card = document.getElementById(activePlayer);
  const iconSpan = card.querySelector('.status-icon');
  const targetPlayer = activePlayer; 
  if (status === 'safe') {
    iconSpan.innerText = '✔'; iconSpan.style.color = '#0be881'; iconSpan.style.display = 'flex';
    addLog(`<b style="color:${getColor(activePlayer)}">${activePlayer}</b> güvenli.`, false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; });
  } else if (status === 'sus') {
    iconSpan.innerText = '✘'; iconSpan.style.color = '#ff3f34'; iconSpan.style.display = 'flex';
    addLog(`<b style="color:${getColor(activePlayer)}">${activePlayer}</b> şüpheli.`, false, () => { document.getElementById(targetPlayer).querySelector('.status-icon').style.display = 'none'; });
  }
  resetSelection();
};

window.setRole = function(role) {
  const target = activePlayer;
  const c = getRoleColors(role); 
  const removeBadge = addRoleBadge(target, role, c.bg, c.text);
  
  addLog(`<b style="color:${getColor(target)}">${target}</b> rolünü <b>${role}</b> olarak açıkladı.`, false, () => { 
    removeBadge(); 
  });
  resetSelection();
};

// ORİJİNAL BUTON DİNLEYİCİLERİ
document.getElementById('btn-went').addEventListener('click', () => { pendingAction = 'went'; selectedNameLabel.innerText = `${activePlayer} kime gitti?`; selectedNameLabel.style.color = "white"; });
document.getElementById('btn-stayed').addEventListener('click', () => { directLog('Evde kaldığını söyledi.'); });
document.getElementById('btn-went-out').addEventListener('click', () => { directLog('Dışarı çıktığını (belirsiz) söyledi.'); });

window.resetSelection = function() {
  activePlayer = null;
  pendingAction = null;
  flowData = {};
  multiSelectColors = [];
  cards.forEach(c => c.style.border = "2px solid transparent");
  openPanel(null);
};

document.getElementById('btn-new-turn').addEventListener('click', () => {
  turnCount++;
  addLog(`<b style="color: #ffd32a;">--- ${turnCount}. TUR BAŞLADI ---</b>`, true);
});

document.getElementById('btn-reset-game').addEventListener('click', () => {
  if(confirm("Tüm kayıtlar silinecek. Emin misiniz?")) {
    logList.innerHTML = ''; turnCount = 1;
    const notes = document.getElementById('manual-notes');
    if(notes) notes.value = '';
    cards.forEach(card => {
      card.querySelector('.status-icon').style.display = 'none';
      const rc = card.querySelector('.roles-container');
      if(rc) rc.remove(); 
    });
    resetSelection();
  }
});

function addLog(text, isSystemLog = false, onDeleteCallback = null) {
  const li = document.createElement('li');
  const contentSpan = document.createElement('span');
  contentSpan.innerHTML = text;
  li.appendChild(contentSpan);

  if (!isSystemLog) {
    const delBtn = document.createElement('button');
    delBtn.innerText = "X"; delBtn.className = "delete-log";
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
// ARAMA (FİLTRELEME) FONKSİYONU 
// ==========================================
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
