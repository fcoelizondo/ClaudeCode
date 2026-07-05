(function () {
  var LANG_KEY = "mafia.lang";

  var STRINGS = {
    en: {
      channel: "SECURE CHANNEL // MAFIA",
      setupEyebrow: "GAME SETUP",
      title: "MAFIA",
      lede: "One phone, passed hand to hand. It plays moderator: assigns roles, runs the night, and calls the vote.",
      playersLabel: "Players",
      mafiaLabel: "Mafia among them",
      specialRolesLabel: "Special roles",
      detectiveLabel: "Detective",
      doctorLabel: "Doctor",
      continueToNames: "Continue →",
      namesEyebrow: "NAME YOUR PLAYERS",
      namesLede: "Optional — leave any blank to use “Player N.”",
      back: "Back",
      beginGame: "Begin game →",
      handoffLede: "Everyone else, look away. Hold the button below to view your role.",
      holdToView: "Hold to view role",
      roleStampVillage: "VILLAGER",
      roleStampMafia: "MAFIA",
      roleStampDetective: "DETECTIVE",
      roleStampDoctor: "DOCTOR",
      villageInstructions: "Find the Mafia before they take over the village. You have no special power — just your wits.",
      mafiaInstructions: "Blend in by day. Each night, join your fellow Mafia to silently choose someone to eliminate.",
      detectiveInstructions: "Each night you may investigate one player and learn whether they're Mafia.",
      doctorInstructions: "Each night you may choose one player — including yourself — to protect from elimination.",
      teammatesLabel: "Your fellow Mafia:",
      holdToConceal: "Hold to conceal & pass on",
      nightTitle: "Night falls",
      nightLede: "Everyone close your eyes. The device will now wake each night role in turn.",
      continueNight: "Continue →",
      holdToAct: "Hold to take your turn",
      doctorHandoffTitle: "Pass the device to the Doctor",
      doctorSelectEyebrow: "DOCTOR'S CHOICE",
      doctorSelectLede: "Choose one player to protect tonight.",
      detectiveHandoffTitle: "Pass the device to the Detective",
      detectiveSelectEyebrow: "INVESTIGATION",
      detectiveSelectLede: "Choose one player to investigate.",
      detectiveResultMafia: "is Mafia.",
      detectiveResultInnocent: "is not Mafia.",
      mafiaHandoffTitle: "Pass the device to the Mafia",
      mafiaHandoffLede: "Decide together, quietly. Hold the button below when you're ready to choose.",
      mafiaSelectEyebrow: "MAFIA'S TARGET",
      mafiaSelectLede: "Choose one player to eliminate tonight.",
      confirmAndContinue: "Hold to confirm & continue",
      deathAnnouncement: "was found dead. They were the",
      savedAnnouncement: "was attacked in the night — but survived. The doctor made the right call.",
      noKillAnnouncement: "No one was attacked last night.",
      beginDiscussion: "Begin discussion →",
      discussionEyebrow: "DISCUSSION",
      discussionLede: "Talk it out loud. Who do you suspect? Decide together, then move to a vote.",
      aliveLabel: "Still standing",
      proceedToVote: "Proceed to vote →",
      voteHandoffLede: "Everyone else, look away. Hold the button below to cast your vote secretly.",
      holdToVote: "Hold to vote",
      whoToEliminateEyebrow: "WHO SHOULD HANG?",
      selectHint: "Select a suspect to continue.",
      lockInVote: "Hold to lock in vote & pass on",
      allVotesEyebrow: "ALL VOTES CAST",
      readyToReveal: "Ready to reveal",
      revealResultsLede: "Tap reveal to see who was voted out.",
      revealResults: "Reveal results",
      tapAgainReveal: "Tap again to reveal",
      lynchedAnnouncement: "was voted out. They were the",
      tieAnnouncement: "The vote was tied — no one was eliminated.",
      continueToNight: "Continue to night →",
      gameOverEyebrow: "GAME OVER",
      villageWinsBanner: "VILLAGE WINS",
      mafiaWinsBanner: "MAFIA WINS",
      finalRosterLabel: "Final roster",
      playAgain: "Play again, same players",
      newSetup: "New setup",
      roleTagVillage: "Villager",
      roleTagMafia: "Mafia",
      roleTagDetective: "Detective",
      roleTagDoctor: "Doctor",
      statusDead: "Dead",
      playerWord: "Player",
      howToPlay: "How to play",
      helpTitle: "HOW TO PLAY",
      helpStage1Title: "1. Assign",
      helpStage1Body: "Pass the device around. Each player holds the button to reveal their role — Villager, Mafia, Detective, or Doctor — then holds again to hide it before passing on. Mafia members learn each other's identities.",
      helpStage2Title: "2. Night",
      helpStage2Body: "Everyone \"closes their eyes.\" The device wakes the Doctor to protect someone, the Detective to investigate someone, and finally the Mafia to choose a target — each in a private handoff.",
      helpStage3Title: "3. Day",
      helpStage3Body: "The device reports who died (if anyone) and their role. Discuss out loud, then pass the device for a secret vote on who to eliminate.",
      helpStage4Title: "4. Repeat",
      helpStage4Body: "Night and day repeat until the Mafia are all gone (Village wins) or the Mafia equal or outnumber the rest (Mafia wins).",
      helpClose: "Got it"
    },
    es: {
      channel: "CANAL SEGURO // MAFIA",
      setupEyebrow: "CONFIGURACIÓN",
      title: "MAFIA",
      lede: "Un solo teléfono, de mano en mano. Actúa como moderador: asigna roles, dirige la noche y organiza la votación.",
      playersLabel: "Jugadores",
      mafiaLabel: "Mafiosos entre ellos",
      specialRolesLabel: "Roles especiales",
      detectiveLabel: "Detective",
      doctorLabel: "Doctor",
      continueToNames: "Continuar →",
      namesEyebrow: "NOMBRA A LOS JUGADORES",
      namesLede: "Opcional — deja en blanco para usar “Jugador N.”",
      back: "Atrás",
      beginGame: "Comenzar juego →",
      handoffLede: "Que los demás no miren. Mantén presionado el botón para ver tu rol.",
      holdToView: "Mantén presionado para ver",
      roleStampVillage: "ALDEANO",
      roleStampMafia: "MAFIA",
      roleStampDetective: "DETECTIVE",
      roleStampDoctor: "DOCTOR",
      villageInstructions: "Encuentra a la Mafia antes de que tome el pueblo. No tienes poder especial — solo tu ingenio.",
      mafiaInstructions: "Pasa desapercibido de día. Cada noche, únete a tus compañeros de Mafia para elegir en silencio a quién eliminar.",
      detectiveInstructions: "Cada noche puedes investigar a un jugador y descubrir si es Mafia.",
      doctorInstructions: "Cada noche puedes elegir a un jugador —incluyéndote a ti mismo— para protegerlo de la eliminación.",
      teammatesLabel: "Tus compañeros de Mafia:",
      holdToConceal: "Mantén presionado para ocultar y pasar",
      nightTitle: "Cae la noche",
      nightLede: "Todos cierren los ojos. El dispositivo despertará a cada rol nocturno por turno.",
      continueNight: "Continuar →",
      holdToAct: "Mantén presionado para tu turno",
      doctorHandoffTitle: "Pasa el dispositivo al Doctor",
      doctorSelectEyebrow: "ELECCIÓN DEL DOCTOR",
      doctorSelectLede: "Elige a un jugador para proteger esta noche.",
      detectiveHandoffTitle: "Pasa el dispositivo al Detective",
      detectiveSelectEyebrow: "INVESTIGACIÓN",
      detectiveSelectLede: "Elige a un jugador para investigar.",
      detectiveResultMafia: "es Mafia.",
      detectiveResultInnocent: "no es Mafia.",
      mafiaHandoffTitle: "Pasa el dispositivo a la Mafia",
      mafiaHandoffLede: "Decidan juntos, en silencio. Mantén presionado el botón cuando estén listos para elegir.",
      mafiaSelectEyebrow: "OBJETIVO DE LA MAFIA",
      mafiaSelectLede: "Elige a un jugador para eliminar esta noche.",
      confirmAndContinue: "Mantén presionado para confirmar y continuar",
      deathAnnouncement: "fue encontrado muerto. Era",
      savedAnnouncement: "fue atacado durante la noche — pero sobrevivió. El doctor tomó la decisión correcta.",
      noKillAnnouncement: "Nadie fue atacado anoche.",
      beginDiscussion: "Comenzar discusión →",
      discussionEyebrow: "DISCUSIÓN",
      discussionLede: "Discútanlo en voz alta. ¿A quién sospechan? Decidan juntos y pasen a la votación.",
      aliveLabel: "Siguen en pie",
      proceedToVote: "Pasar a votación →",
      voteHandoffLede: "Que los demás no miren. Mantén presionado el botón para votar en secreto.",
      holdToVote: "Mantén presionado para votar",
      whoToEliminateEyebrow: "¿QUIÉN DEBE CAER?",
      selectHint: "Elige a un sospechoso para continuar.",
      lockInVote: "Mantén presionado para confirmar tu voto y pasar",
      allVotesEyebrow: "TODOS VOTARON",
      readyToReveal: "Listo para revelar",
      revealResultsLede: "Toca revelar para ver a quién votaron fuera.",
      revealResults: "Revelar resultados",
      tapAgainReveal: "Toca de nuevo para revelar",
      lynchedAnnouncement: "fue votado fuera. Era",
      tieAnnouncement: "El voto quedó empatado — nadie fue eliminado.",
      continueToNight: "Continuar a la noche →",
      gameOverEyebrow: "FIN DEL JUEGO",
      villageWinsBanner: "GANA EL PUEBLO",
      mafiaWinsBanner: "GANA LA MAFIA",
      finalRosterLabel: "Plantilla final",
      playAgain: "Jugar de nuevo, mismos jugadores",
      newSetup: "Nueva configuración",
      roleTagVillage: "Aldeano",
      roleTagMafia: "Mafia",
      roleTagDetective: "Detective",
      roleTagDoctor: "Doctor",
      statusDead: "Muerto",
      playerWord: "Jugador",
      howToPlay: "Cómo jugar",
      helpTitle: "CÓMO JUGAR",
      helpStage1Title: "1. Asignación",
      helpStage1Body: "Pasen el dispositivo. Cada jugador mantiene presionado el botón para ver su rol —Aldeano, Mafia, Detective o Doctor— y luego lo oculta antes de pasarlo. Los miembros de la Mafia se reconocen entre sí.",
      helpStage2Title: "2. Noche",
      helpStage2Body: "Todos \"cierran los ojos\". El dispositivo despierta al Doctor para proteger a alguien, al Detective para investigar a alguien y finalmente a la Mafia para elegir un objetivo — cada uno en un turno privado.",
      helpStage3Title: "3. Día",
      helpStage3Body: "El dispositivo reporta quién murió (si alguien) y su rol. Discutan en voz alta y luego pasen el dispositivo para una votación secreta sobre a quién eliminar.",
      helpStage4Title: "4. Repetir",
      helpStage4Body: "Noche y día se repiten hasta que la Mafia desaparezca (gana el Pueblo) o la Mafia iguale o supere al resto (gana la Mafia).",
      helpClose: "Entendido"
    }
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function detectLang() {
    var stored = localStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "es") return stored;
    return (navigator.language || "").toLowerCase().indexOf("es") === 0 ? "es" : "en";
  }

  var state = {
    screen: "setup",
    lang: detectLang(),
    numPlayers: 6,
    numMafia: 1,
    hasDetective: true,
    hasDoctor: true,
    playerNames: new Array(6).fill(""),
    roles: [],      // "village" | "mafia" | "detective" | "doctor", per index
    alive: [],      // bool per index
    currentIndex: 0,
    revealed: false,
    round: 1,
    doctorPick: null,
    doctorProtect: null,
    detectivePick: null,
    detectiveResult: null,
    mafiaPick: null,
    mafiaTarget: null,
    nightOutcome: null, // { diedIndex: number|null, saved: bool }
    voteOrder: [],
    voteStepIdx: 0,
    votes: {},      // voterIndex -> candidateIndex
    pendingVote: null,
    confirmReveal: false,
    lastLynch: null, // { index: number|null, tie: bool }
    winner: null,   // "village" | "mafia" | null
    showHelp: false
  };

  function t(key) { return STRINGS[state.lang][key]; }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    render();
  }

  function setHelp(open) {
    state.showHelp = open;
    render();
  }

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && state.showHelp) setHelp(false);
  });

  function maxMafia(n) {
    return Math.max(1, Math.min(4, Math.floor(n / 3)));
  }

  function maxSpecialRoles(n, numMafia) {
    // leave at least one plain villager
    return Math.max(0, n - numMafia - 1);
  }

  function resizePlayerNames(n) {
    var names = state.playerNames.slice(0, n);
    while (names.length < n) names.push("");
    state.playerNames = names;
  }

  function playerLabel(i) {
    var custom = state.playerNames[i];
    if (custom && custom.trim()) return custom.trim();
    return t("playerWord") + " " + (i + 1);
  }

  function roleTag(role) {
    if (role === "mafia") return t("roleTagMafia");
    if (role === "detective") return t("roleTagDetective");
    if (role === "doctor") return t("roleTagDoctor");
    return t("roleTagVillage");
  }

  function roleTagClass(role) {
    if (role === "mafia") return "mafia";
    if (role === "detective" || role === "doctor") return "special";
    return "village";
  }

  function shuffledIndices(n) {
    var idx = [];
    for (var i = 0; i < n; i++) idx.push(i);
    for (var j = idx.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = idx[j]; idx[j] = idx[k]; idx[k] = tmp;
    }
    return idx;
  }

  function assignRoles(numPlayers, numMafia, hasDetective, hasDoctor) {
    var idx = shuffledIndices(numPlayers);
    var roles = new Array(numPlayers).fill("village");
    var cursor = 0;
    for (var m = 0; m < numMafia; m++) { roles[idx[cursor]] = "mafia"; cursor++; }
    if (hasDetective && cursor < numPlayers) { roles[idx[cursor]] = "detective"; cursor++; }
    if (hasDoctor && cursor < numPlayers) { roles[idx[cursor]] = "doctor"; cursor++; }
    return roles;
  }

  function aliveIndices() {
    var out = [];
    for (var i = 0; i < state.numPlayers; i++) if (state.alive[i]) out.push(i);
    return out;
  }

  function aliveMafiaCount() {
    return aliveIndices().filter(function (i) { return state.roles[i] === "mafia"; }).length;
  }
  function aliveVillageCount() {
    return aliveIndices().filter(function (i) { return state.roles[i] !== "mafia"; }).length;
  }

  function checkWinner() {
    var mafiaAlive = aliveMafiaCount();
    var villageAlive = aliveVillageCount();
    if (mafiaAlive === 0) return "village";
    if (mafiaAlive >= villageAlive) return "mafia";
    return null;
  }

  function startGame() {
    state.roles = assignRoles(state.numPlayers, state.numMafia, state.hasDetective, state.hasDoctor);
    state.alive = new Array(state.numPlayers).fill(true);
    state.currentIndex = 0;
    state.revealed = false;
    state.round = 1;
    state.winner = null;
    state.screen = "assign-handoff";
  }

  function playAgainSamePlayers() {
    startGame();
    render();
  }

  function nextAfterConceal() {
    if (state.currentIndex + 1 < state.numPlayers) {
      state.currentIndex += 1;
      state.revealed = false;
      state.screen = "assign-handoff";
    } else {
      beginNight();
    }
    render();
  }

  function beginNight() {
    state.doctorPick = null;
    state.doctorProtect = null;
    state.detectivePick = null;
    state.detectiveResult = null;
    state.mafiaPick = null;
    state.mafiaTarget = null;
    state.nightOutcome = null;
    state.screen = "night-intro";
  }

  function firstNightStep() {
    if (state.hasDoctor && isRoleAlive("doctor")) return "doctor-handoff";
    if (state.hasDetective && isRoleAlive("detective")) return "detective-handoff";
    return "mafia-handoff";
  }

  function roleIndex(role) {
    for (var i = 0; i < state.numPlayers; i++) if (state.roles[i] === role) return i;
    return -1;
  }
  function isRoleAlive(role) {
    var i = roleIndex(role);
    return i >= 0 && state.alive[i];
  }

  function afterDoctor() {
    if (state.hasDetective && isRoleAlive("detective")) { state.screen = "detective-handoff"; }
    else { state.screen = "mafia-handoff"; }
  }
  function afterDetective() {
    state.screen = "mafia-handoff";
  }

  function resolveNight() {
    var died = null;
    var saved = false;
    if (state.mafiaTarget !== null) {
      if (state.doctorProtect !== null && state.doctorProtect === state.mafiaTarget) {
        saved = true;
      } else {
        died = state.mafiaTarget;
        state.alive[died] = false;
      }
    }
    state.nightOutcome = { diedIndex: died, saved: saved };
    state.winner = checkWinner();
    state.screen = "day-intro";
  }

  function beginVote() {
    state.voteOrder = aliveIndices();
    state.voteStepIdx = 0;
    state.votes = {};
    state.pendingVote = null;
    state.confirmReveal = false;
    state.screen = "vote-handoff";
  }

  function tallyVotes() {
    var counts = {};
    var voters = {};
    state.voteOrder.forEach(function (voterIdx) {
      var candidate = state.votes[voterIdx];
      if (candidate === undefined || candidate === null) return;
      counts[candidate] = (counts[candidate] || 0) + 1;
      voters[candidate] = voters[candidate] || [];
      voters[candidate].push(voterIdx);
    });
    var maxCount = 0;
    Object.keys(counts).forEach(function (k) { if (counts[k] > maxCount) maxCount = counts[k]; });
    var top = Object.keys(counts).filter(function (k) { return counts[k] === maxCount; }).map(Number);
    var eliminated = (maxCount > 0 && top.length === 1) ? top[0] : null;
    return { counts: counts, voters: voters, eliminated: eliminated, tie: maxCount > 0 && top.length > 1 };
  }

  function resolveLynch() {
    var tally = tallyVotes();
    if (tally.eliminated !== null) {
      state.alive[tally.eliminated] = false;
      state.lastLynch = { index: tally.eliminated, tie: false };
    } else {
      state.lastLynch = { index: null, tie: tally.tie };
    }
    state.winner = checkWinner();
    state.screen = "day-result";
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "class") e.className = attrs[k];
      else if (k === "html") e.innerHTML = attrs[k];
      else if (k.indexOf("on") === 0) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function text(tag, cls, str) { return el(tag, { class: cls }, [document.createTextNode(str)]); }

  function langToggle() {
    var toggle = el("div", { class: "lang-toggle" });
    ["en", "es"].forEach(function (code) {
      toggle.appendChild(el("button", {
        class: "lang-btn" + (state.lang === code ? " active" : ""),
        "aria-pressed": state.lang === code ? "true" : "false",
        onclick: function () { setLang(code); }
      }, [document.createTextNode(code.toUpperCase())]));
    });
    return toggle;
  }

  function helpOverlay() {
    var stages = [
      [t("helpStage1Title"), t("helpStage1Body")],
      [t("helpStage2Title"), t("helpStage2Body")],
      [t("helpStage3Title"), t("helpStage3Body")],
      [t("helpStage4Title"), t("helpStage4Body")]
    ];
    var card = el("div", { class: "help-card" }, [
      text("div", "eyebrow", t("helpTitle"))
    ]);
    stages.forEach(function (stage) {
      card.appendChild(text("h2", "help-stage-title", stage[0]));
      card.appendChild(text("p", "lede", stage[1]));
    });
    card.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { setHelp(false); }
    }, [document.createTextNode(t("helpClose"))]));

    return el("div", {
      class: "help-overlay",
      onclick: function (ev) { if (ev.target === ev.currentTarget) setHelp(false); }
    }, [card]);
  }

  function progressForScreen() {
    if (state.screen === "assign-handoff" || state.screen === "assign-reveal") {
      return { index: state.currentIndex, total: state.numPlayers };
    }
    if (state.screen === "vote-handoff" || state.screen === "vote-select") {
      return { index: state.voteStepIdx, total: state.voteOrder.length };
    }
    return null;
  }

  function statusBar() {
    var progress = progressForScreen();
    var dots = el("div", { class: "dots" });
    if (progress) {
      for (var i = 0; i < progress.total; i++) {
        var cls = "";
        if (i < progress.index) cls = "done";
        else if (i === progress.index) cls = "now";
        dots.appendChild(el("span", { class: cls }));
      }
    }
    return el("div", { class: "statusbar" }, [
      text("div", "chan", t("channel")),
      dots
    ]);
  }

  function attachHold(circleEl, btnEl, durationMs, onComplete) {
    var r = circleEl.r.baseVal.value;
    var circumference = 2 * Math.PI * r;
    circleEl.style.strokeDasharray = circumference;
    circleEl.style.strokeDashoffset = circumference;
    var raf = null, startTs = null, done = false;

    function step(ts) {
      if (startTs === null) startTs = ts;
      var tt = Math.min((ts - startTs) / durationMs, 1);
      circleEl.style.strokeDashoffset = circumference * (1 - tt);
      if (tt >= 1) { finish(); return; }
      raf = requestAnimationFrame(step);
    }
    function finish() {
      if (done) return;
      done = true;
      cancel();
      onComplete();
    }
    function cancel() {
      if (raf) cancelAnimationFrame(raf);
      raf = null; startTs = null;
      btnEl.classList.remove("holding");
    }
    function reset() {
      if (done) return;
      cancel();
      circleEl.style.strokeDashoffset = circumference;
    }
    function begin(ev) {
      ev.preventDefault();
      if (done) return;
      if (reduceMotion) { finish(); return; }
      btnEl.classList.add("holding");
      startTs = null;
      raf = requestAnimationFrame(step);
    }
    btnEl.addEventListener("pointerdown", begin);
    btnEl.addEventListener("pointerup", reset);
    btnEl.addEventListener("pointerleave", reset);
    btnEl.addEventListener("pointercancel", reset);
    btnEl.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); finish(); }
    });
  }

  function holdControl(label, onComplete) {
    var wrap = el("div", { class: "hold-wrap" });
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 168 168");
    var track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    track.setAttribute("class", "track"); track.setAttribute("cx", "84"); track.setAttribute("cy", "84"); track.setAttribute("r", "78");
    var fill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fill.setAttribute("class", "fill"); fill.setAttribute("cx", "84"); fill.setAttribute("cy", "84"); fill.setAttribute("r", "78");
    svg.appendChild(track); svg.appendChild(fill);
    wrap.appendChild(svg);
    var holdBtn = el("div", { class: "hold-btn", tabindex: "0", role: "button" }, [document.createTextNode(label)]);
    wrap.appendChild(holdBtn);
    setTimeout(function () { attachHold(fill, holdBtn, 550, onComplete); }, 0);
    return wrap;
  }

  function screenSetup() {
    var body = el("div", { class: "screen" });
    body.appendChild(el("div", { class: "setup-header" }, [
      text("div", "eyebrow", t("setupEyebrow")),
      langToggle()
    ]));
    body.appendChild(text("h1", "", t("title")));
    body.appendChild(text("p", "lede", t("lede")));
    body.appendChild(el("button", {
      class: "link-btn",
      onclick: function () { setHelp(true); }
    }, [document.createTextNode(t("howToPlay"))]));

    // players stepper
    var playersField = el("div", { class: "field" });
    playersField.appendChild(text("div", "field-label", t("playersLabel")));
    var pOut = el("output", {}, [document.createTextNode(String(state.numPlayers))]);
    var pMinus = el("button", { onclick: function () {
      state.numPlayers = Math.max(4, state.numPlayers - 1);
      state.numMafia = Math.min(state.numMafia, maxMafia(state.numPlayers));
      clampSpecialRoles();
      resizePlayerNames(state.numPlayers);
      render();
    } }, [document.createTextNode("–")]);
    var pPlus = el("button", { onclick: function () {
      state.numPlayers = Math.min(15, state.numPlayers + 1);
      resizePlayerNames(state.numPlayers);
      render();
    } }, [document.createTextNode("+")]);
    playersField.appendChild(el("div", { class: "stepper" }, [pMinus, pOut, pPlus]));
    body.appendChild(playersField);

    // mafia stepper
    var mafiaField = el("div", { class: "field" });
    mafiaField.appendChild(text("div", "field-label", t("mafiaLabel")));
    var mOut = el("output", {}, [document.createTextNode(String(state.numMafia))]);
    var mMinus = el("button", { onclick: function () {
      state.numMafia = Math.max(1, state.numMafia - 1); render();
    } }, [document.createTextNode("–")]);
    var mPlus = el("button", { onclick: function () {
      state.numMafia = Math.min(maxMafia(state.numPlayers), state.numMafia + 1);
      clampSpecialRoles();
      render();
    } }, [document.createTextNode("+")]);
    mafiaField.appendChild(el("div", { class: "stepper" }, [mMinus, mOut, mPlus]));
    body.appendChild(mafiaField);

    // special role toggles
    var budget = maxSpecialRoles(state.numPlayers, state.numMafia);
    var canEnableDetective = state.hasDetective || (budget - (state.hasDoctor ? 1 : 0)) >= 1;
    var canEnableDoctor = state.hasDoctor || (budget - (state.hasDetective ? 1 : 0)) >= 1;
    var rolesField = el("div", { class: "field" });
    rolesField.appendChild(text("div", "field-label", t("specialRolesLabel")));
    var chips = el("div", { class: "chips" });
    var detectiveAttrs = { class: "chip" + (state.hasDetective ? " active" : "") };
    if (!canEnableDetective) detectiveAttrs.disabled = "disabled";
    detectiveAttrs.onclick = function () { if (canEnableDetective) { state.hasDetective = !state.hasDetective; render(); } };
    chips.appendChild(el("button", detectiveAttrs, [document.createTextNode(t("detectiveLabel"))]));

    var doctorAttrs = { class: "chip" + (state.hasDoctor ? " active" : "") };
    if (!canEnableDoctor) doctorAttrs.disabled = "disabled";
    doctorAttrs.onclick = function () { if (canEnableDoctor) { state.hasDoctor = !state.hasDoctor; render(); } };
    chips.appendChild(el("button", doctorAttrs, [document.createTextNode(t("doctorLabel"))]));
    rolesField.appendChild(chips);
    body.appendChild(rolesField);

    body.appendChild(el("div", { class: "preview mono" }, [document.createTextNode(setupPreviewText())]));

    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { state.screen = "names"; render(); }
    }, [document.createTextNode(t("continueToNames"))]));
    return body;
  }

  function clampSpecialRoles() {
    var budget = maxSpecialRoles(state.numPlayers, state.numMafia);
    var used = (state.hasDetective ? 1 : 0) + (state.hasDoctor ? 1 : 0);
    if (used > budget) {
      if (budget < 1) { state.hasDetective = false; state.hasDoctor = false; }
      else if (budget === 1) { if (state.hasDoctor && state.hasDetective) state.hasDoctor = false; }
    }
  }

  function setupPreviewText() {
    var villageCount = state.numPlayers - state.numMafia;
    if (state.lang === "es") {
      var parts = [state.numPlayers + " jugadores", state.numMafia + (state.numMafia > 1 ? " mafiosos" : " mafioso")];
      if (state.hasDetective) parts.push("1 detective");
      if (state.hasDoctor) parts.push("1 doctor");
      return parts.join(" · ");
    }
    var partsEn = [state.numPlayers + " players", state.numMafia + " mafia"];
    if (state.hasDetective) partsEn.push("1 detective");
    if (state.hasDoctor) partsEn.push("1 doctor");
    return partsEn.join(" · ");
  }

  function screenNames() {
    var body = el("div", { class: "screen" });
    body.appendChild(text("div", "eyebrow", t("namesEyebrow")));
    body.appendChild(text("p", "lede", t("namesLede")));

    var list = el("div", { class: "name-list" });
    for (var i = 0; i < state.numPlayers; i++) {
      (function (idx) {
        var input = el("input", {
          class: "name-input",
          type: "text",
          maxlength: "24",
          placeholder: t("playerWord") + " " + (idx + 1),
          value: state.playerNames[idx] || "",
          oninput: function (ev) { state.playerNames[idx] = ev.target.value; }
        });
        list.appendChild(el("div", { class: "name-row" }, [
          text("div", "name-index", String(idx + 1)),
          input
        ]));
      })(i);
    }
    body.appendChild(list);

    body.appendChild(el("div", { class: "spacer" }));
    var actions = el("div", { class: "chips" });
    actions.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: function () { state.screen = "setup"; render(); }
    }, [document.createTextNode(t("back"))]));
    actions.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { startGame(); render(); }
    }, [document.createTextNode(t("beginGame"))]));
    body.appendChild(actions);
    return body;
  }

  function screenAssignHandoff() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("JUGADOR " + (state.currentIndex + 1) + " DE " + state.numPlayers)
      : ("PLAYER " + (state.currentIndex + 1) + " OF " + state.numPlayers)));
    body.appendChild(text("h2", "", (state.lang === "es" ? "Pasa el dispositivo a " : "Pass the device to ") + playerLabel(state.currentIndex)));
    body.appendChild(text("p", "", t("handoffLede")));
    body.appendChild(holdControl(t("holdToView"), function () {
      state.revealed = true;
      state.screen = "assign-reveal";
      render();
    }));
    return body;
  }

  function screenAssignReveal() {
    var role = state.roles[state.currentIndex];
    var body = el("div", { class: "screen center" });
    var stampClass = role === "mafia" ? "mafia" : (role === "village" ? "village" : "special");
    var stampLabel = role === "mafia" ? t("roleStampMafia")
      : role === "detective" ? t("roleStampDetective")
      : role === "doctor" ? t("roleStampDoctor")
      : t("roleStampVillage");
    var instructions = role === "mafia" ? t("mafiaInstructions")
      : role === "detective" ? t("detectiveInstructions")
      : role === "doctor" ? t("doctorInstructions")
      : t("villageInstructions");

    body.appendChild(el("div", { class: "stamp-box " + stampClass + " animate" }, [text("div", "stamp", stampLabel)]));
    body.appendChild(text("p", "lede", instructions));

    if (role === "mafia") {
      var teammates = [];
      for (var i = 0; i < state.numPlayers; i++) {
        if (i !== state.currentIndex && state.roles[i] === "mafia") teammates.push(i);
      }
      if (teammates.length) {
        body.appendChild(text("div", "field-label", t("teammatesLabel")));
        var pills = el("div", { class: "teammates" });
        teammates.forEach(function (idx) {
          pills.appendChild(el("div", { class: "chip static" }, [document.createTextNode(playerLabel(idx))]));
        });
        body.appendChild(pills);
      }
    }

    body.appendChild(holdControl(t("holdToConceal"), nextAfterConceal));
    return body;
  }

  function screenNightIntro() {
    var body = el("div", { class: "screen center night" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("NOCHE " + state.round) : ("NIGHT " + state.round)));
    body.appendChild(text("h2", "", t("nightTitle")));
    body.appendChild(text("p", "lede", t("nightLede")));
    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { state.screen = firstNightStep(); render(); }
    }, [document.createTextNode(t("continueNight"))]));
    return body;
  }

  function screenRoleHandoff(titleKey, ledeKey, onHold) {
    var body = el("div", { class: "screen center night" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("NOCHE " + state.round) : ("NIGHT " + state.round)));
    body.appendChild(text("h2", "", t(titleKey)));
    body.appendChild(text("p", "", t(ledeKey)));
    body.appendChild(holdControl(t("holdToAct"), onHold));
    return body;
  }

  function targetChoiceList(excludeIdx, candidates, selected, onPick) {
    var list = el("div", { class: "choice-list" });
    candidates.forEach(function (idx) {
      if (idx === excludeIdx) return;
      list.appendChild(el("button", {
        class: "choice-btn" + (selected === idx ? " active" : ""),
        onclick: function () { onPick(idx); }
      }, [document.createTextNode(playerLabel(idx))]));
    });
    return list;
  }

  function screenDoctorHandoff() {
    return screenRoleHandoff("doctorHandoffTitle", "handoffLede", function () {
      state.screen = "doctor-select";
      render();
    });
  }
  function screenDoctorSelect() {
    var body = el("div", { class: "screen night" });
    body.appendChild(text("div", "eyebrow", t("doctorSelectEyebrow")));
    body.appendChild(text("p", "lede", t("doctorSelectLede")));
    body.appendChild(targetChoiceList(-1, aliveIndices(), state.doctorPick, function (idx) {
      state.doctorPick = idx; render();
    }));
    if (state.doctorPick === null) {
      body.appendChild(text("p", "", t("selectHint")));
    } else {
      body.appendChild(holdControl(t("confirmAndContinue"), function () {
        state.doctorProtect = state.doctorPick;
        afterDoctor();
        render();
      }));
    }
    return body;
  }

  function screenDetectiveHandoff() {
    return screenRoleHandoff("detectiveHandoffTitle", "handoffLede", function () {
      state.screen = "detective-select";
      render();
    });
  }
  function screenDetectiveSelect() {
    var detIdx = roleIndex("detective");
    var body = el("div", { class: "screen night" });
    body.appendChild(text("div", "eyebrow", t("detectiveSelectEyebrow")));
    body.appendChild(text("p", "lede", t("detectiveSelectLede")));
    body.appendChild(targetChoiceList(detIdx, aliveIndices(), state.detectivePick, function (idx) {
      state.detectivePick = idx; render();
    }));
    if (state.detectivePick === null) {
      body.appendChild(text("p", "", t("selectHint")));
    } else {
      body.appendChild(holdControl(t("confirmAndContinue"), function () {
        state.detectiveResult = state.roles[state.detectivePick] === "mafia";
        state.screen = "detective-result";
        render();
      }));
    }
    return body;
  }
  function screenDetectiveResult() {
    var body = el("div", { class: "screen center night" });
    var resultKey = state.detectiveResult ? "detectiveResultMafia" : "detectiveResultInnocent";
    body.appendChild(el("div", { class: "stamp-box " + (state.detectiveResult ? "mafia" : "village") + " animate" }, [
      text("div", "stamp", playerLabel(state.detectivePick))
    ]));
    body.appendChild(text("p", "lede", playerLabel(state.detectivePick) + " " + t(resultKey)));
    body.appendChild(holdControl(t("holdToConceal"), function () {
      afterDetective();
      render();
    }));
    return body;
  }

  function screenMafiaHandoff() {
    var body = el("div", { class: "screen center night" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("NOCHE " + state.round) : ("NIGHT " + state.round)));
    body.appendChild(text("h2", "", t("mafiaHandoffTitle")));
    body.appendChild(text("p", "", t("mafiaHandoffLede")));
    body.appendChild(holdControl(t("holdToAct"), function () {
      state.screen = "mafia-select";
      render();
    }));
    return body;
  }
  function screenMafiaSelect() {
    var villageAlive = aliveIndices().filter(function (i) { return state.roles[i] !== "mafia"; });
    var body = el("div", { class: "screen night" });
    body.appendChild(text("div", "eyebrow", t("mafiaSelectEyebrow")));
    body.appendChild(text("p", "lede", t("mafiaSelectLede")));
    body.appendChild(targetChoiceList(-1, villageAlive, state.mafiaPick, function (idx) {
      state.mafiaPick = idx; render();
    }));
    if (state.mafiaPick === null) {
      body.appendChild(text("p", "", t("selectHint")));
    } else {
      body.appendChild(holdControl(t("confirmAndContinue"), function () {
        state.mafiaTarget = state.mafiaPick;
        resolveNight();
        render();
      }));
    }
    return body;
  }

  function screenDayIntro() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("DÍA " + state.round) : ("DAY " + state.round)));
    var outcome = state.nightOutcome;
    if (outcome.diedIndex !== null) {
      body.appendChild(text("h2", "", playerLabel(outcome.diedIndex) + " " + t("deathAnnouncement") + " " + roleTag(state.roles[outcome.diedIndex]) + "."));
    } else if (outcome.saved) {
      body.appendChild(text("h2", "", t("savedAnnouncement")));
    } else {
      body.appendChild(text("h2", "", t("noKillAnnouncement")));
    }
    body.appendChild(el("div", { class: "spacer" }));
    if (state.winner) {
      body.appendChild(el("button", {
        class: "btn btn-primary",
        onclick: function () { state.screen = "game-over"; render(); }
      }, [document.createTextNode(t("gameOverEyebrow"))]));
    } else {
      body.appendChild(el("button", {
        class: "btn btn-primary",
        onclick: function () { state.screen = "day-discussion"; render(); }
      }, [document.createTextNode(t("beginDiscussion"))]));
    }
    return body;
  }

  function screenDayDiscussion() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", t("discussionEyebrow")));
    body.appendChild(text("p", "lede", t("discussionLede")));
    body.appendChild(text("div", "field-label", t("aliveLabel")));
    var list = el("div", { class: "alive-list" });
    aliveIndices().forEach(function (idx) {
      list.appendChild(el("div", { class: "chip static" }, [document.createTextNode(playerLabel(idx))]));
    });
    body.appendChild(list);
    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { beginVote(); render(); }
    }, [document.createTextNode(t("proceedToVote"))]));
    return body;
  }

  function screenVoteHandoff() {
    var voterIdx = state.voteOrder[state.voteStepIdx];
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("VOTO " + (state.voteStepIdx + 1) + " DE " + state.voteOrder.length)
      : ("VOTE " + (state.voteStepIdx + 1) + " OF " + state.voteOrder.length)));
    body.appendChild(text("h2", "", (state.lang === "es" ? "Pasa el dispositivo a " : "Pass the device to ") + playerLabel(voterIdx)));
    body.appendChild(text("p", "", t("voteHandoffLede")));
    body.appendChild(holdControl(t("holdToVote"), function () {
      state.screen = "vote-select";
      render();
    }));
    return body;
  }

  function screenVoteSelect() {
    var voterIdx = state.voteOrder[state.voteStepIdx];
    var body = el("div", { class: "screen" });
    body.appendChild(text("div", "eyebrow", t("whoToEliminateEyebrow")));
    body.appendChild(text("h2", "", playerLabel(voterIdx) + ","));

    var list = el("div", { class: "choice-list" });
    state.voteOrder.forEach(function (idx) {
      if (idx === voterIdx) return;
      list.appendChild(el("button", {
        class: "choice-btn" + (state.pendingVote === idx ? " active" : ""),
        onclick: function () { state.pendingVote = idx; render(); }
      }, [document.createTextNode(playerLabel(idx))]));
    });
    body.appendChild(list);

    if (state.pendingVote === null) {
      body.appendChild(text("p", "", t("selectHint")));
    } else {
      body.appendChild(holdControl(t("lockInVote"), function () {
        state.votes[voterIdx] = state.pendingVote;
        state.pendingVote = null;
        if (state.voteStepIdx + 1 < state.voteOrder.length) {
          state.voteStepIdx += 1;
          state.screen = "vote-handoff";
        } else {
          state.screen = "vote-complete";
        }
        render();
      }));
    }
    return body;
  }

  function screenVoteComplete() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", t("allVotesEyebrow")));
    body.appendChild(text("h2", "", t("readyToReveal")));
    body.appendChild(text("p", "lede", t("revealResultsLede")));
    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn " + (state.confirmReveal ? "btn-danger" : "btn-ghost"),
      onclick: function () {
        if (state.confirmReveal) {
          state.confirmReveal = false;
          resolveLynch();
        } else {
          state.confirmReveal = true;
          setTimeout(function () { state.confirmReveal = false; render(); }, 3000);
        }
        render();
      }
    }, [document.createTextNode(state.confirmReveal ? t("tapAgainReveal") : t("revealResults"))]));
    return body;
  }

  function screenDayResult() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("DÍA " + state.round) : ("DAY " + state.round)));
    var lynch = state.lastLynch;
    if (lynch.index !== null) {
      body.appendChild(text("h2", "", playerLabel(lynch.index) + " " + t("lynchedAnnouncement") + " " + roleTag(state.roles[lynch.index]) + "."));
    } else {
      body.appendChild(text("h2", "", t("tieAnnouncement")));
    }
    body.appendChild(el("div", { class: "spacer" }));
    if (state.winner) {
      body.appendChild(el("button", {
        class: "btn btn-primary",
        onclick: function () { state.screen = "game-over"; render(); }
      }, [document.createTextNode(t("gameOverEyebrow"))]));
    } else {
      body.appendChild(el("button", {
        class: "btn btn-primary",
        onclick: function () { state.round += 1; beginNight(); render(); }
      }, [document.createTextNode(t("continueToNight"))]));
    }
    return body;
  }

  function rosterList() {
    var roster = el("div", { class: "roster" });
    for (var i = 0; i < state.numPlayers; i++) {
      var dead = !state.alive[i];
      roster.appendChild(el("div", { class: "roster-row" + (dead ? " dead" : "") }, [
        text("span", "roster-name", playerLabel(i)),
        el("span", { class: "player-tag " + roleTagClass(state.roles[i]) }, [
          document.createTextNode(roleTag(state.roles[i]) + (dead ? " · " + t("statusDead") : ""))
        ])
      ]));
    }
    return roster;
  }

  function screenGameOver() {
    var body = el("div", { class: "screen" });
    body.appendChild(text("div", "eyebrow", t("gameOverEyebrow")));
    body.appendChild(el("div", { class: "stamp-box " + (state.winner === "village" ? "village" : "mafia") + " animate" }, [
      text("div", "stamp", state.winner === "village" ? t("villageWinsBanner") : t("mafiaWinsBanner"))
    ]));
    body.appendChild(text("div", "field-label", t("finalRosterLabel")));
    body.appendChild(rosterList());

    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: playAgainSamePlayers
    }, [document.createTextNode(t("playAgain"))]));
    body.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: function () { state.screen = "setup"; render(); }
    }, [document.createTextNode(t("newSetup"))]));
    return body;
  }

  function render() {
    document.documentElement.lang = state.lang;
    var device = document.getElementById("device");
    device.innerHTML = "";
    device.appendChild(statusBar());
    var screenEl;
    if (state.screen === "setup") screenEl = screenSetup();
    else if (state.screen === "names") screenEl = screenNames();
    else if (state.screen === "assign-handoff") screenEl = screenAssignHandoff();
    else if (state.screen === "assign-reveal") screenEl = screenAssignReveal();
    else if (state.screen === "night-intro") screenEl = screenNightIntro();
    else if (state.screen === "doctor-handoff") screenEl = screenDoctorHandoff();
    else if (state.screen === "doctor-select") screenEl = screenDoctorSelect();
    else if (state.screen === "detective-handoff") screenEl = screenDetectiveHandoff();
    else if (state.screen === "detective-select") screenEl = screenDetectiveSelect();
    else if (state.screen === "detective-result") screenEl = screenDetectiveResult();
    else if (state.screen === "mafia-handoff") screenEl = screenMafiaHandoff();
    else if (state.screen === "mafia-select") screenEl = screenMafiaSelect();
    else if (state.screen === "day-intro") screenEl = screenDayIntro();
    else if (state.screen === "day-discussion") screenEl = screenDayDiscussion();
    else if (state.screen === "vote-handoff") screenEl = screenVoteHandoff();
    else if (state.screen === "vote-select") screenEl = screenVoteSelect();
    else if (state.screen === "vote-complete") screenEl = screenVoteComplete();
    else if (state.screen === "day-result") screenEl = screenDayResult();
    else screenEl = screenGameOver();
    device.appendChild(screenEl);
    if (state.showHelp) device.appendChild(helpOverlay());
  }

  render();
})();
