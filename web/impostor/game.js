(function () {
  var LANG_KEY = "impostor.lang";

  var WORD_BANK = {
    en: {
      places: { label: "Places", words: ["Beach","Airport","Hospital","Casino","Submarine","Space Station","Circus","Library","Ski Resort","Cruise Ship","Prison","Museum","Farm","Amusement Park","Movie Theater","Restaurant","Police Station","Zoo","Desert Island","Ice Rink"] },
      occupations: { label: "Occupations", words: ["Firefighter","Surgeon","Pilot","Chef","Detective","Astronaut","Lifeguard","Electrician","Journalist","Beekeeper","Locksmith","Translator","Referee","Tailor","Park Ranger","Barista","Plumber","Zookeeper"] },
      food: { label: "Food & Drink", words: ["Pizza","Sushi","Taco","Pancakes","Espresso","Ice Cream","Ramen","BBQ Ribs","Smoothie","Popcorn","Croissant","Dumplings","Curry","Milkshake","Nachos","Falafel","Waffles","Lemonade"] },
      objects: { label: "Everyday Objects", words: ["Umbrella","Backpack","Toothbrush","Bicycle","Flashlight","Wallet","Mirror","Headphones","Candle","Ladder","Scissors","Blanket","Thermostat","Stapler","Doormat","Suitcase","Whistle","Compass"] },
      nature: { label: "Nature", words: ["Octopus","Volcano","Glacier","Hurricane","Coral Reef","Waterfall","Rainforest","Cactus","Beehive","Avalanche","Geyser","Tide Pool","Meteor Shower","Sand Dune","Thunderstorm","Iceberg","Canyon","Mangrove"] }
    },
    es: {
      places: { label: "Lugares", words: ["Playa","Aeropuerto","Hospital","Casino","Submarino","Estación Espacial","Circo","Biblioteca","Estación de Esquí","Crucero","Prisión","Museo","Granja","Parque de Atracciones","Cine","Restaurante","Comisaría","Zoológico","Isla Desierta","Pista de Hielo"] },
      occupations: { label: "Oficios", words: ["Bombero","Cirujano","Piloto","Chef","Detective","Astronauta","Salvavidas","Electricista","Periodista","Apicultor","Cerrajero","Traductor","Árbitro","Sastre","Guardabosques","Barista","Plomero","Cuidador de Zoológico"] },
      food: { label: "Comida y Bebida", words: ["Pizza","Sushi","Taco","Panqueques","Espresso","Helado","Ramen","Costillas BBQ","Batido","Palomitas","Croissant","Empanadillas","Curry","Malteada","Nachos","Falafel","Wafles","Limonada"] },
      objects: { label: "Objetos Cotidianos", words: ["Paraguas","Mochila","Cepillo de Dientes","Bicicleta","Linterna","Billetera","Espejo","Audífonos","Vela","Escalera","Tijeras","Manta","Termostato","Engrapadora","Felpudo","Maleta","Silbato","Brújula"] },
      nature: { label: "Naturaleza", words: ["Pulpo","Volcán","Glaciar","Huracán","Arrecife de Coral","Cascada","Selva Tropical","Cactus","Colmena","Avalancha","Géiser","Poza de Marea","Lluvia de Meteoros","Duna de Arena","Tormenta Eléctrica","Iceberg","Cañón","Manglar"] }
    }
  };
  var CATEGORY_ORDER = ["mix","places","occupations","food","objects","nature"];

  var STRINGS = {
    en: {
      channel: "SECURE CHANNEL // IMPOSTOR",
      setupEyebrow: "BRIEFING SETUP",
      title: "IMPOSTOR",
      lede: "One phone, passed hand to hand. Every player sees their assignment alone, then conceals it before passing on.",
      playersLabel: "Players",
      impostorsLabel: "Impostors among them",
      caseFileLabel: "Case file",
      mixLabel: "Mix",
      continueToNames: "Continue →",
      namesEyebrow: "NAME YOUR PLAYERS",
      namesLede: "Optional — leave any blank to use “Player N.”",
      back: "Back",
      beginBriefing: "Begin Briefing →",
      handoffLede: "Everyone else, look away. Hold the button below to view your assignment.",
      holdToView: "Hold to view assignment",
      impostorStamp: "IMPOSTOR",
      impostorInstructions: "You don't know the word. Listen closely, bluff with confidence, and try to blend in.",
      yourWordLabel: "Your word",
      crewInstructions: "Describe it without saying it outright. Listen for whoever's faking it.",
      holdToConceal: "Hold to conceal & pass on",
      caseFileEyebrow: "CASE FILE",
      turnLede: "Say one word related to the case file. Don't say the word itself.",
      turnDone: "Done",
      anotherRoundQuestion: "Another round of one-word clues?",
      anotherRoundHint: "Give everyone a chance to reconsider — impostors tend to get vaguer under pressure.",
      yesAnotherRound: "Yes, another round",
      noMoveToVote: "No, move to voting",
      voteHandoffLede: "Everyone else, look away. Hold the button below to cast your vote secretly.",
      holdToVote: "Hold to vote",
      whoIsImpostorEyebrow: "WHO'S THE IMPOSTOR?",
      selectHint: "Select a suspect to continue.",
      lockInVote: "Hold to lock in vote & pass on",
      allVotesEyebrow: "ALL VOTES CAST",
      readyToReveal: "Ready to reveal",
      revealResultsLede: "Tap reveal to see the word, the impostor, and how everyone voted.",
      revealResults: "Reveal results",
      tapAgainReveal: "Tap again to reveal",
      closedEyebrow: "CASE FILE CLOSED",
      playAgain: "Play again, same players",
      newSetup: "New setup",
      crewTag: "Crew",
      impostorTag: "Impostor",
      playerWord: "Player",
      noConsensus: "The vote was tied — no one was voted out. The impostor(s) get away with it.",
      votedBy: "Voted by:",
      noVotes: "No votes",
      crewWinsBanner: "CREW WINS",
      impostorsWinBanner: "IMPOSTORS WIN",
      howToPlay: "How to play",
      helpTitle: "HOW TO PLAY",
      helpStage1Title: "1. Assign",
      helpStage1Body: "Pass the device around. Each player holds the button to reveal their word — or their impostor status and the category — then holds again to hide it before passing it on.",
      helpStage2Title: "2. Discuss",
      helpStage2Body: "Going in order, everyone says one word related to the case file, without saying the word itself. After a full round, decide together whether to do another.",
      helpStage3Title: "3. Vote",
      helpStage3Body: "Pass the device once more. Each player secretly picks who they suspect. Once everyone's voted, reveal the word, every role, and who voted for whom.",
      helpImpostorNote: "The impostor(s) only see the category, never the word — they have to bluff.",
      helpClose: "Got it"
    },
    es: {
      channel: "CANAL SEGURO // IMPOSTOR",
      setupEyebrow: "CONFIGURACIÓN DE MISIÓN",
      title: "IMPOSTOR",
      lede: "Un solo teléfono, de mano en mano. Cada jugador ve su asignación a solas y luego la oculta antes de pasarlo.",
      playersLabel: "Jugadores",
      impostorsLabel: "Impostores entre ellos",
      caseFileLabel: "Expediente",
      mixLabel: "Mezcla",
      continueToNames: "Continuar →",
      namesEyebrow: "NOMBRA A LOS JUGADORES",
      namesLede: "Opcional — deja en blanco para usar “Jugador N.”",
      back: "Atrás",
      beginBriefing: "Comenzar misión →",
      handoffLede: "Que los demás no miren. Mantén presionado el botón para ver tu asignación.",
      holdToView: "Mantén presionado para ver",
      impostorStamp: "IMPOSTOR",
      impostorInstructions: "No conoces la palabra. Escucha con atención, farolea con confianza e intenta pasar desapercibido.",
      yourWordLabel: "Tu palabra",
      crewInstructions: "Descríbela sin decirla directamente. Detecta a quien esté fingiendo.",
      holdToConceal: "Mantén presionado para ocultar y pasar",
      caseFileEyebrow: "EXPEDIENTE",
      turnLede: "Di una palabra relacionada con el expediente. No digas la palabra en sí.",
      turnDone: "Listo",
      anotherRoundQuestion: "¿Otra ronda de pistas de una palabra?",
      anotherRoundHint: "Denle a todos otra oportunidad — los impostores suelen volverse más vagos bajo presión.",
      yesAnotherRound: "Sí, otra ronda",
      noMoveToVote: "No, pasar a la votación",
      voteHandoffLede: "Que los demás no miren. Mantén presionado el botón para votar en secreto.",
      holdToVote: "Mantén presionado para votar",
      whoIsImpostorEyebrow: "¿QUIÉN ES EL IMPOSTOR?",
      selectHint: "Elige a un sospechoso para continuar.",
      lockInVote: "Mantén presionado para confirmar tu voto y pasar",
      allVotesEyebrow: "TODOS VOTARON",
      readyToReveal: "Listo para revelar",
      revealResultsLede: "Toca revelar para ver la palabra, el impostor y cómo votó cada quien.",
      revealResults: "Revelar resultados",
      tapAgainReveal: "Toca de nuevo para revelar",
      closedEyebrow: "EXPEDIENTE CERRADO",
      playAgain: "Jugar de nuevo, mismos jugadores",
      newSetup: "Nueva configuración",
      crewTag: "Tripulante",
      impostorTag: "Impostor",
      playerWord: "Jugador",
      noConsensus: "El voto quedó empatado — nadie fue expulsado. El/los impostor(es) se salen con la suya.",
      votedBy: "Votado por:",
      noVotes: "Sin votos",
      crewWinsBanner: "GANA LA TRIPULACIÓN",
      impostorsWinBanner: "GANAN LOS IMPOSTORES",
      howToPlay: "Cómo jugar",
      helpTitle: "CÓMO JUGAR",
      helpStage1Title: "1. Asignación",
      helpStage1Body: "Pasen el dispositivo. Cada jugador mantiene presionado el botón para ver su palabra —o su condición de impostor y la categoría— y luego lo mantiene presionado de nuevo para ocultarla antes de pasarlo.",
      helpStage2Title: "2. Discusión",
      helpStage2Body: "Por turnos, cada quien dice una palabra relacionada con el expediente, sin decir la palabra en sí. Tras una ronda completa, decidan juntos si quieren otra.",
      helpStage3Title: "3. Votación",
      helpStage3Body: "Pasen el dispositivo una vez más. Cada quien elige en secreto a quien sospecha. Cuando todos hayan votado, revelen la palabra, cada rol y quién votó por quién.",
      helpImpostorNote: "El/los impostor(es) solo ven la categoría, nunca la palabra — tienen que farolear.",
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
    numImpostors: 1,
    categoryKey: "mix",
    playerNames: new Array(6).fill(""),
    wordPick: null, // { catKey, idx } — language-independent, resolved at render time
    currentIndex: 0,
    roles: [],
    revealed: false,
    discussionRound: 1,
    discussionTurnIndex: 0,
    votes: [],
    voteIndex: 0,
    pendingVote: null,
    confirmReveal: false,
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

  function maxImpostors(n) {
    return Math.max(1, Math.min(4, Math.floor(n / 3)));
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

  function pickWord(categoryKey) {
    var catKey = categoryKey;
    if (categoryKey === "mix") {
      var keys = CATEGORY_ORDER.slice(1);
      catKey = keys[Math.floor(Math.random() * keys.length)];
    }
    var words = WORD_BANK.en[catKey].words;
    return { catKey: catKey, idx: Math.floor(Math.random() * words.length) };
  }

  function resolveWord(pick, lang) {
    var entry = WORD_BANK[lang][pick.catKey];
    return { word: entry.words[pick.idx], label: entry.label };
  }

  function categoryLabel(categoryKey, lang) {
    return categoryKey === "mix" ? STRINGS[lang].mixLabel : WORD_BANK[lang][categoryKey].label;
  }

  function pluralImpostor(lang, n) {
    if (lang === "es") return n + (n > 1 ? " impostores" : " impostor");
    return n + " impostor" + (n > 1 ? "s" : "");
  }

  function assignRoles(numPlayers, numImpostors) {
    var idx = [];
    for (var i = 0; i < numPlayers; i++) idx.push(i);
    for (var j = idx.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = idx[j]; idx[j] = idx[k]; idx[k] = tmp;
    }
    var impostorSet = new Set(idx.slice(0, numImpostors));
    var roles = [];
    for (var p = 0; p < numPlayers; p++) roles.push(impostorSet.has(p));
    return roles;
  }

  function resetRound() {
    state.wordPick = pickWord(state.categoryKey);
    state.roles = assignRoles(state.numPlayers, state.numImpostors);
    state.currentIndex = 0;
    state.revealed = false;
    state.discussionRound = 1;
    state.discussionTurnIndex = 0;
    state.votes = new Array(state.numPlayers).fill(null);
    state.voteIndex = 0;
    state.pendingVote = null;
    state.confirmReveal = false;
    state.screen = "handoff";
  }

  function nextAfterConceal() {
    if (state.currentIndex + 1 < state.numPlayers) {
      state.currentIndex += 1;
      state.revealed = false;
      state.screen = "handoff";
    } else {
      state.screen = "discussion-turn";
    }
    render();
  }

  function advanceDiscussionTurn() {
    if (state.discussionTurnIndex + 1 < state.numPlayers) {
      state.discussionTurnIndex += 1;
      state.screen = "discussion-turn";
    } else {
      state.screen = "discussion-round-decision";
    }
    render();
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
      [t("helpStage3Title"), t("helpStage3Body")]
    ];
    var card = el("div", { class: "help-card" }, [
      text("div", "eyebrow", t("helpTitle"))
    ]);
    stages.forEach(function (stage) {
      card.appendChild(text("h2", "help-stage-title", stage[0]));
      card.appendChild(text("p", "lede", stage[1]));
    });
    card.appendChild(text("p", "", t("helpImpostorNote")));
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
    if (state.screen === "handoff" || state.screen === "reveal") {
      return { index: state.currentIndex, total: state.numPlayers };
    }
    if (state.screen === "discussion-turn") {
      return { index: state.discussionTurnIndex, total: state.numPlayers };
    }
    if (state.screen === "vote-handoff" || state.screen === "vote-select") {
      return { index: state.voteIndex, total: state.numPlayers };
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
      state.numPlayers = Math.max(3, state.numPlayers - 1);
      state.numImpostors = Math.min(state.numImpostors, maxImpostors(state.numPlayers));
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

    // impostors stepper
    var impField = el("div", { class: "field" });
    impField.appendChild(text("div", "field-label", t("impostorsLabel")));
    var iOut = el("output", {}, [document.createTextNode(String(state.numImpostors))]);
    var iMinus = el("button", { onclick: function () {
      state.numImpostors = Math.max(1, state.numImpostors - 1); render();
    } }, [document.createTextNode("–")]);
    var iPlus = el("button", { onclick: function () {
      state.numImpostors = Math.min(maxImpostors(state.numPlayers), state.numImpostors + 1); render();
    } }, [document.createTextNode("+")]);
    impField.appendChild(el("div", { class: "stepper" }, [iMinus, iOut, iPlus]));
    body.appendChild(impField);

    // category chips
    var catField = el("div", { class: "field" });
    catField.appendChild(text("div", "field-label", t("caseFileLabel")));
    var chips = el("div", { class: "chips" });
    CATEGORY_ORDER.forEach(function (key) {
      var label = categoryLabel(key, state.lang);
      var active = state.categoryKey === key;
      chips.appendChild(el("button", {
        class: "chip" + (active ? " active" : ""),
        onclick: function () { state.categoryKey = key; render(); }
      }, [document.createTextNode(label)]));
    });
    catField.appendChild(chips);
    body.appendChild(catField);

    body.appendChild(el("div", { class: "preview mono" }, [document.createTextNode(
      state.lang === "es"
        ? (state.numPlayers + " jugadores · " + pluralImpostor("es", state.numImpostors) + " · expediente: " + categoryLabel(state.categoryKey, state.lang).toLowerCase())
        : (state.numPlayers + " players · " + pluralImpostor("en", state.numImpostors) + " · case file: " + categoryLabel(state.categoryKey, state.lang).toLowerCase())
    )]));

    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { state.screen = "names"; render(); }
    }, [document.createTextNode(t("continueToNames"))]));
    return body;
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
      onclick: function () { resetRound(); render(); }
    }, [document.createTextNode(t("beginBriefing"))]));
    body.appendChild(actions);
    return body;
  }

  function screenHandoff() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("JUGADOR " + (state.currentIndex + 1) + " DE " + state.numPlayers)
      : ("PLAYER " + (state.currentIndex + 1) + " OF " + state.numPlayers)));
    body.appendChild(text("h2", "", (state.lang === "es" ? "Pasa el dispositivo a " : "Pass the device to ") + playerLabel(state.currentIndex)));
    body.appendChild(text("p", "", t("handoffLede")));
    body.appendChild(holdControl(t("holdToView"), function () {
      state.revealed = true;
      state.screen = "reveal";
      render();
    }));
    return body;
  }

  function screenReveal() {
    var isImpostor = state.roles[state.currentIndex];
    var resolved = resolveWord(state.wordPick, state.lang);
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", t("caseFileEyebrow") + ": " + resolved.label.toUpperCase()));

    if (isImpostor) {
      body.appendChild(el("div", { class: "stamp-box impostor animate" }, [text("div", "stamp", t("impostorStamp"))]));
      body.appendChild(text("p", "lede", t("impostorInstructions")));
    } else {
      body.appendChild(text("div", "field-label", t("yourWordLabel")));
      body.appendChild(el("div", { class: "stamp-box crew animate" }, [text("div", "stamp", resolved.word.toUpperCase())]));
      body.appendChild(text("p", "lede", t("crewInstructions")));
    }

    body.appendChild(holdControl(t("holdToConceal"), nextAfterConceal));
    return body;
  }

  function screenDiscussionTurn() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("DISCUSIÓN — RONDA " + state.discussionRound)
      : ("DISCUSSION — ROUND " + state.discussionRound)));
    body.appendChild(text("h2", "", state.lang === "es"
      ? ("Turno de " + playerLabel(state.discussionTurnIndex))
      : (playerLabel(state.discussionTurnIndex) + "’s turn")));
    body.appendChild(text("p", "lede", t("turnLede")));
    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: advanceDiscussionTurn
    }, [document.createTextNode(t("turnDone"))]));
    return body;
  }

  function screenDiscussionRoundDecision() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("RONDA " + state.discussionRound + " COMPLETA")
      : ("ROUND " + state.discussionRound + " COMPLETE")));
    body.appendChild(text("h2", "", t("anotherRoundQuestion")));
    body.appendChild(text("p", "lede", t("anotherRoundHint")));
    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () {
        state.discussionRound += 1;
        state.discussionTurnIndex = 0;
        state.screen = "discussion-turn";
        render();
      }
    }, [document.createTextNode(t("yesAnotherRound"))]));
    body.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: function () {
        state.voteIndex = 0;
        state.screen = "vote-handoff";
        render();
      }
    }, [document.createTextNode(t("noMoveToVote"))]));
    return body;
  }

  function screenVoteHandoff() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("VOTO " + (state.voteIndex + 1) + " DE " + state.numPlayers)
      : ("VOTE " + (state.voteIndex + 1) + " OF " + state.numPlayers)));
    body.appendChild(text("h2", "", (state.lang === "es" ? "Pasa el dispositivo a " : "Pass the device to ") + playerLabel(state.voteIndex)));
    body.appendChild(text("p", "", t("voteHandoffLede")));
    body.appendChild(holdControl(t("holdToVote"), function () {
      state.screen = "vote-select";
      render();
    }));
    return body;
  }

  function screenVoteSelect() {
    var body = el("div", { class: "screen" });
    body.appendChild(text("div", "eyebrow", t("whoIsImpostorEyebrow")));
    body.appendChild(text("h2", "", state.lang === "es"
      ? (playerLabel(state.voteIndex) + ", elige con cuidado.")
      : (playerLabel(state.voteIndex) + ", choose wisely.")));

    var list = el("div", { class: "choice-list" });
    for (var i = 0; i < state.numPlayers; i++) {
      if (i === state.voteIndex) continue;
      (function (idx) {
        list.appendChild(el("button", {
          class: "choice-btn" + (state.pendingVote === idx ? " active" : ""),
          onclick: function () { state.pendingVote = idx; render(); }
        }, [document.createTextNode(playerLabel(idx))]));
      })(i);
    }
    body.appendChild(list);

    if (state.pendingVote === null) {
      body.appendChild(text("p", "", t("selectHint")));
    } else {
      body.appendChild(holdControl(t("lockInVote"), function () {
        state.votes[state.voteIndex] = state.pendingVote;
        state.pendingVote = null;
        if (state.voteIndex + 1 < state.numPlayers) {
          state.voteIndex += 1;
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
          state.screen = "results";
        } else {
          state.confirmReveal = true;
          setTimeout(function () { state.confirmReveal = false; render(); }, 3000);
        }
        render();
      }
    }, [document.createTextNode(state.confirmReveal ? t("tapAgainReveal") : t("revealResults"))]));
    return body;
  }

  function tallyVotes() {
    var counts = new Array(state.numPlayers).fill(0);
    var voters = [];
    for (var i = 0; i < state.numPlayers; i++) voters.push([]);
    state.votes.forEach(function (candidate, voterIdx) {
      if (candidate === null) return;
      counts[candidate] += 1;
      voters[candidate].push(voterIdx);
    });
    var maxCount = Math.max.apply(null, counts);
    var topCandidates = [];
    for (var c = 0; c < counts.length; c++) if (counts[c] === maxCount) topCandidates.push(c);
    var accused = (maxCount > 0 && topCandidates.length === 1) ? topCandidates[0] : null;
    var crewWins = accused !== null && state.roles[accused] === true;
    return { counts: counts, voters: voters, accused: accused, crewWins: crewWins };
  }

  function screenResults() {
    var resolved = resolveWord(state.wordPick, state.lang);
    var tally = tallyVotes();
    var body = el("div", { class: "screen" });
    body.appendChild(text("div", "eyebrow", t("closedEyebrow")));
    body.appendChild(text("h2", "", (state.lang === "es" ? "La palabra era " : "The word was ") + resolved.word.toUpperCase()));
    body.appendChild(text("p", "", t("caseFileLabel") + ": " + resolved.label));

    body.appendChild(el("div", { class: "stamp-box " + (tally.crewWins ? "crew" : "impostor") + " animate" }, [
      text("div", "stamp", tally.crewWins ? t("crewWinsBanner") : t("impostorsWinBanner"))
    ]));

    var outcomeLine;
    if (tally.accused === null) {
      outcomeLine = t("noConsensus");
    } else if (tally.crewWins) {
      outcomeLine = state.lang === "es"
        ? (playerLabel(tally.accused) + " recibió más votos y era el impostor.")
        : (playerLabel(tally.accused) + " got the most votes and was the impostor.");
    } else {
      outcomeLine = state.lang === "es"
        ? (playerLabel(tally.accused) + " recibió más votos, pero era inocente.")
        : (playerLabel(tally.accused) + " got the most votes but was innocent.");
    }
    body.appendChild(text("p", "lede", outcomeLine));

    var caughtImpostors = tally.accused !== null && state.roles[tally.accused] ? 1 : 0;
    var remaining = state.numImpostors - caughtImpostors;
    if (tally.crewWins && remaining > 0) {
      body.appendChild(text("p", "", state.lang === "es"
        ? ("Quedan " + remaining + " impostor(es) sin descubrir.")
        : (remaining + " more impostor(s) still out there.")));
    }

    var roster = el("div", { class: "roster" });
    for (var i = 0; i < state.numPlayers; i++) {
      var isImp = state.roles[i];
      var voterNames = tally.voters[i].map(playerLabel);
      var voterLine = voterNames.length ? (t("votedBy") + " " + voterNames.join(", ")) : t("noVotes");
      roster.appendChild(el("div", { class: "roster-row tally-row" }, [
        el("div", { class: "tally-top" }, [
          text("span", "", playerLabel(i)),
          el("span", { class: "player-tag " + (isImp ? "impostor" : "crew") }, [document.createTextNode(isImp ? t("impostorTag") : t("crewTag"))])
        ]),
        text("div", "tally-voters", voterLine)
      ]));
    }
    body.appendChild(roster);

    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () { resetRound(); render(); }
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
    else if (state.screen === "handoff") screenEl = screenHandoff();
    else if (state.screen === "reveal") screenEl = screenReveal();
    else if (state.screen === "discussion-turn") screenEl = screenDiscussionTurn();
    else if (state.screen === "discussion-round-decision") screenEl = screenDiscussionRoundDecision();
    else if (state.screen === "vote-handoff") screenEl = screenVoteHandoff();
    else if (state.screen === "vote-select") screenEl = screenVoteSelect();
    else if (state.screen === "vote-complete") screenEl = screenVoteComplete();
    else screenEl = screenResults();
    device.appendChild(screenEl);
    if (state.showHelp) device.appendChild(helpOverlay());
  }

  render();
})();
