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
      mafiaInstructions: "Blend in by day. Each night, choose someone to eliminate — your fellow Mafia will see your pick and can agree or propose someone else. If you can't agree, the night starts over once; still no agreement and no one dies.",
      detectiveInstructions: "Each night you may investigate one player and learn whether they're Mafia.",
      doctorInstructions: "Each night you may choose one player — including yourself — to protect from elimination.",
      teammatesLabel: "Your fellow Mafia:",
      holdToConceal: "Hold to conceal & pass on",
      nightTitle: "Night falls",
      nightLede: "The device will visit every player, one at a time. Watch only your own screen — some of you will see an action, most will see nothing to do.",
      continueNight: "Continue →",
      holdToAct: "Hold to take your turn",
      nightHandoffLede: "Everyone else, look away. Hold the button below when it's your turn.",
      doctorSelectEyebrow: "DOCTOR'S CHOICE",
      doctorSelectLede: "Choose one player to protect tonight.",
      detectiveSelectEyebrow: "INVESTIGATION",
      detectiveSelectLede: "Choose one player to investigate.",
      detectiveResultMafia: "is Mafia.",
      detectiveResultInnocent: "is not Mafia.",
      mafiaSelectEyebrow: "MAFIA'S TARGET",
      mafiaSelectLede: "You're the first Mafia to choose. Pick someone to eliminate — your fellow Mafia will see your pick and can agree, or propose someone else.",
      mafiaProposalLede: "is the current pick from your fellow Mafia. Tap them again to agree, or tap someone else to propose a different target.",
      noActionEyebrow: "QUIET NIGHT",
      noActionLede: "You have no power tonight. It doesn't matter what you tap — tap the button below, then hold to pass the device on.",
      noActionAck: "Nothing to decide — tap here",
      noActionHint: "Tap the button above to continue.",
      confirmAndContinue: "Hold to confirm & continue",
      nightRetryTitle: "The Mafia didn't agree",
      nightRetryLede: "Everyone gets the device again. Watch only your own screen.",
      deathAnnouncement: "was found dead. They were the",
      savedAnnouncement: "was attacked in the night — but survived. The doctor made the right call.",
      noKillAnnouncement: "No one was attacked last night.",
      mafiaDisagreedAnnouncement: "The Mafia couldn't agree on a target. No one was attacked last night.",
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
      helpStage2Body: "The device passes to every player in turn, one at a time. Those with a night role — Doctor, Detective, Mafia — see their action; everyone else sees nothing to do. Each Mafia player sees the current target proposed by their teammates and can agree or propose someone else; if they can't agree after a full round, the night starts over once, then no one dies. Watch only your own screen so no one learns who has which role.",
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
      mafiaInstructions: "Pasa desapercibido de día. Cada noche, elige a alguien para eliminar — tus compañeros de Mafia verán tu elección y podrán estar de acuerdo o proponer a alguien más. Si no se ponen de acuerdo, la noche vuelve a empezar una vez; si siguen sin acuerdo, nadie muere.",
      detectiveInstructions: "Cada noche puedes investigar a un jugador y descubrir si es Mafia.",
      doctorInstructions: "Cada noche puedes elegir a un jugador —incluyéndote a ti mismo— para protegerlo de la eliminación.",
      teammatesLabel: "Tus compañeros de Mafia:",
      holdToConceal: "Mantén presionado para ocultar y pasar",
      nightTitle: "Cae la noche",
      nightLede: "El dispositivo visitará a cada jugador, uno por uno. Miren solo su propia pantalla — algunos verán una acción, la mayoría no verá nada que hacer.",
      continueNight: "Continuar →",
      holdToAct: "Mantén presionado para tu turno",
      nightHandoffLede: "Que los demás no miren. Mantén presionado el botón cuando sea tu turno.",
      doctorSelectEyebrow: "ELECCIÓN DEL DOCTOR",
      doctorSelectLede: "Elige a un jugador para proteger esta noche.",
      detectiveSelectEyebrow: "INVESTIGACIÓN",
      detectiveSelectLede: "Elige a un jugador para investigar.",
      detectiveResultMafia: "es Mafia.",
      detectiveResultInnocent: "no es Mafia.",
      mafiaSelectEyebrow: "OBJETIVO DE LA MAFIA",
      mafiaSelectLede: "Eres el primer mafioso en elegir. Elige a alguien para eliminar — tus compañeros de Mafia verán tu elección y podrán estar de acuerdo o proponer a alguien más.",
      mafiaProposalLede: "es la elección actual de tus compañeros de Mafia. Tócalo de nuevo para estar de acuerdo, o toca a alguien más para proponer un objetivo diferente.",
      noActionEyebrow: "NOCHE TRANQUILA",
      noActionLede: "No tienes poder esta noche. No importa qué toques — toca el botón de abajo y luego mantén presionado para pasar el dispositivo.",
      noActionAck: "Nada que decidir — toca aquí",
      noActionHint: "Toca el botón de arriba para continuar.",
      confirmAndContinue: "Mantén presionado para confirmar y continuar",
      nightRetryTitle: "La Mafia no se puso de acuerdo",
      nightRetryLede: "Todos reciben el dispositivo de nuevo. Miren solo su propia pantalla.",
      deathAnnouncement: "fue encontrado muerto. Era",
      savedAnnouncement: "fue atacado durante la noche — pero sobrevivió. El doctor tomó la decisión correcta.",
      noKillAnnouncement: "Nadie fue atacado anoche.",
      mafiaDisagreedAnnouncement: "La Mafia no pudo ponerse de acuerdo en un objetivo. Nadie fue atacado anoche.",
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
      helpStage2Body: "El dispositivo pasa por cada jugador, uno por uno. Quienes tienen un rol nocturno — Doctor, Detective, Mafia — ven su acción; los demás no ven nada que hacer. Cada mafioso ve el objetivo actual propuesto por sus compañeros y puede estar de acuerdo o proponer a alguien más; si no se ponen de acuerdo tras una ronda completa, la noche vuelve a empezar una vez, y si aún no hay acuerdo, nadie muere. Miren solo su propia pantalla para que nadie descubra los roles.",
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
    nightOrder: [],
    nightStepIdx: 0,
    turnPick: null,
    turnRevealed: false, // detective-only: whether this turn's investigation result has been unlocked
    doctorProtect: null,
    mafiaVotes: {},      // mafiaPlayerIndex -> targetIndex, checked for consensus at end of round
    mafiaProposal: null, // rolling current pick, shown to the next Mafia player to act
    nightRetried: false, // whether this night already redid a full round once
    mafiaTarget: null,
    nightOutcome: null, // { diedIndex: number|null, saved: bool, disagreement: bool }
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
    state.nightRetried = false;
    beginNightRound();
    state.screen = "night-intro";
  }

  function beginNightRound() {
    state.nightOrder = aliveIndices();
    state.nightStepIdx = 0;
    state.turnPick = null;
    state.turnRevealed = false;
    state.doctorProtect = null;
    state.mafiaVotes = {};
    state.mafiaProposal = null;
    state.mafiaTarget = null;
    state.nightOutcome = null;
  }

  function retryNightSubRound() {
    beginNightRound();
    state.screen = "night-handoff";
  }

  function currentNightIdx() {
    return state.nightOrder[state.nightStepIdx];
  }

  function advanceNightTurn() {
    if (state.nightStepIdx + 1 < state.nightOrder.length) {
      state.nightStepIdx += 1;
      state.turnPick = null;
      state.turnRevealed = false;
      state.screen = "night-handoff";
    } else {
      resolveNight();
    }
  }

  function finalizeNightTurn() {
    var idx = currentNightIdx();
    var role = state.roles[idx];
    if (role === "doctor") state.doctorProtect = state.turnPick;
    else if (role === "mafia") {
      state.mafiaVotes[idx] = state.turnPick;
      state.mafiaProposal = state.turnPick;
    }
    advanceNightTurn();
  }

  function mafiaConsensusTarget() {
    var picks = Object.keys(state.mafiaVotes).map(function (k) { return state.mafiaVotes[k]; });
    if (picks.length === 0) return { consensus: true, target: null };
    var allSame = picks.every(function (p) { return p === picks[0]; });
    return { consensus: allSame, target: allSame ? picks[0] : null };
  }

  function resolveNight() {
    var result = mafiaConsensusTarget();
    if (!result.consensus) {
      if (!state.nightRetried) {
        state.nightRetried = true;
        state.screen = "night-retry";
        return;
      }
      state.mafiaTarget = null;
      state.nightOutcome = { diedIndex: null, saved: false, disagreement: true };
      state.winner = checkWinner();
      state.screen = "day-intro";
      return;
    }
    state.mafiaTarget = result.target;
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
    state.nightOutcome = { diedIndex: died, saved: saved, disagreement: false };
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
    if (state.screen === "night-handoff" || state.screen === "night-turn") {
      return { index: state.nightStepIdx, total: state.nightOrder.length };
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
      onclick: function () { state.screen = "night-handoff"; render(); }
    }, [document.createTextNode(t("continueNight"))]));
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

  function screenNightHandoff() {
    var idx = currentNightIdx();
    var body = el("div", { class: "screen center night" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("NOCHE " + state.round) : ("NIGHT " + state.round)));
    body.appendChild(text("h2", "", (state.lang === "es" ? "Pasa el dispositivo a " : "Pass the device to ") + playerLabel(idx)));
    body.appendChild(text("p", "", t("nightHandoffLede")));
    body.appendChild(holdControl(t("holdToAct"), function () {
      state.screen = "night-turn";
      render();
    }));
    return body;
  }

  function screenNightTurn() {
    var idx = currentNightIdx();
    var role = state.roles[idx];
    var body = el("div", { class: "screen night" });

    if (role === "detective") {
      // Detective gets a two-step turn: pick + hold locks in the choice and
      // reveals the result; a second hold conceals it and passes on. This is
      // the only role where holding must not immediately advance the turn —
      // otherwise a player could tap through every name and read every
      // result before ever confirming, learning everyone's role in one turn.
      body.appendChild(text("div", "eyebrow", t("detectiveSelectEyebrow")));
      if (!state.turnRevealed) {
        body.appendChild(text("p", "lede", t("detectiveSelectLede")));
        body.appendChild(targetChoiceList(idx, aliveIndices(), state.turnPick, function (pick) { state.turnPick = pick; render(); }));
        if (state.turnPick === null) {
          body.appendChild(text("p", "", t("selectHint")));
        } else {
          body.appendChild(holdControl(t("confirmAndContinue"), function () {
            state.turnRevealed = true;
            render();
          }));
        }
      } else {
        var isMafia = state.roles[state.turnPick] === "mafia";
        body.appendChild(text("p", "lede", playerLabel(state.turnPick) + " " + t(isMafia ? "detectiveResultMafia" : "detectiveResultInnocent")));
        body.appendChild(holdControl(t("holdToConceal"), function () {
          finalizeNightTurn();
          render();
        }));
      }
      return body;
    }

    if (role === "doctor") {
      body.appendChild(text("div", "eyebrow", t("doctorSelectEyebrow")));
      body.appendChild(text("p", "lede", t("doctorSelectLede")));
      body.appendChild(targetChoiceList(-1, aliveIndices(), state.turnPick, function (pick) { state.turnPick = pick; render(); }));
    } else if (role === "mafia") {
      var villageAlive = aliveIndices().filter(function (i) { return state.roles[i] !== "mafia"; });
      body.appendChild(text("div", "eyebrow", t("mafiaSelectEyebrow")));
      if (state.mafiaProposal !== null) {
        body.appendChild(text("p", "lede", playerLabel(state.mafiaProposal) + " " + t("mafiaProposalLede")));
      } else {
        body.appendChild(text("p", "lede", t("mafiaSelectLede")));
      }
      body.appendChild(targetChoiceList(-1, villageAlive, state.turnPick, function (pick) { state.turnPick = pick; render(); }));
    } else {
      body.appendChild(text("div", "eyebrow", t("noActionEyebrow")));
      body.appendChild(text("p", "lede", t("noActionLede")));
      var ackList = el("div", { class: "choice-list" });
      ackList.appendChild(el("button", {
        class: "choice-btn" + (state.turnPick !== null ? " active" : ""),
        onclick: function () { state.turnPick = true; render(); }
      }, [document.createTextNode(t("noActionAck"))]));
      body.appendChild(ackList);
    }

    if (state.turnPick === null) {
      body.appendChild(text("p", "", role === "village" ? t("noActionHint") : t("selectHint")));
    } else {
      body.appendChild(holdControl(t("confirmAndContinue"), function () {
        finalizeNightTurn();
        render();
      }));
    }
    return body;
  }

  function screenNightRetry() {
    var body = el("div", { class: "screen center night" });
    body.appendChild(text("div", "eyebrow", state.lang === "es" ? ("NOCHE " + state.round) : ("NIGHT " + state.round)));
    body.appendChild(text("h2", "", t("nightRetryTitle")));
    body.appendChild(text("p", "lede", t("nightRetryLede")));
    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { retryNightSubRound(); render(); }
    }, [document.createTextNode(t("continueNight"))]));
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
    } else if (outcome.disagreement) {
      body.appendChild(text("h2", "", t("mafiaDisagreedAnnouncement")));
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
    else if (state.screen === "night-handoff") screenEl = screenNightHandoff();
    else if (state.screen === "night-turn") screenEl = screenNightTurn();
    else if (state.screen === "night-retry") screenEl = screenNightRetry();
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
