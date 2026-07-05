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
      beginBriefing: "Begin Briefing →",
      handoffLede: "Everyone else, look away. Hold the button below to view your assignment.",
      holdToView: "Hold to view assignment",
      impostorStamp: "IMPOSTOR",
      impostorInstructions: "You don't know the word. Listen closely, bluff with confidence, and try to blend in.",
      yourWordLabel: "Your word",
      crewInstructions: "Describe it without saying it outright. Listen for whoever's faking it.",
      holdToConceal: "Hold to conceal & pass on",
      completeEyebrow: "BRIEFING COMPLETE",
      discussion: "Discussion",
      start: "Start",
      pause: "Pause",
      reset: "Reset",
      revealAnswers: "Reveal answers",
      tapAgainReveal: "Tap again to reveal all",
      closedEyebrow: "CASE FILE CLOSED",
      playAgain: "Play again, same players",
      newSetup: "New setup",
      crewTag: "Crew",
      impostorTag: "Impostor",
      playerWord: "Player",
      caseFileEyebrow: "CASE FILE",
      min: "min"
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
      beginBriefing: "Comenzar misión →",
      handoffLede: "Que los demás no miren. Mantén presionado el botón para ver tu asignación.",
      holdToView: "Mantén presionado para ver",
      impostorStamp: "IMPOSTOR",
      impostorInstructions: "No conoces la palabra. Escucha con atención, farolea con confianza e intenta pasar desapercibido.",
      yourWordLabel: "Tu palabra",
      crewInstructions: "Descríbela sin decirla directamente. Detecta a quien esté fingiendo.",
      holdToConceal: "Mantén presionado para ocultar y pasar",
      completeEyebrow: "MISIÓN LISTA",
      discussion: "Discusión",
      start: "Iniciar",
      pause: "Pausar",
      reset: "Reiniciar",
      revealAnswers: "Revelar respuestas",
      tapAgainReveal: "Toca de nuevo para revelar todo",
      closedEyebrow: "EXPEDIENTE CERRADO",
      playAgain: "Jugar de nuevo, mismos jugadores",
      newSetup: "Nueva configuración",
      crewTag: "Tripulante",
      impostorTag: "Impostor",
      playerWord: "Jugador",
      caseFileEyebrow: "EXPEDIENTE",
      min: "min"
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
    wordPick: null, // { catKey, idx } — language-independent, resolved at render time
    currentIndex: 0,
    roles: [],
    revealed: false,
    timerTotal: 300,
    timerRemaining: 300,
    timerRunning: false,
    timerHandle: null,
    confirmReveal: false
  };

  function t(key) { return STRINGS[state.lang][key]; }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    render();
  }

  function maxImpostors(n) {
    return Math.max(1, Math.min(4, Math.floor(n / 3)));
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

  function beginBriefing() {
    state.wordPick = pickWord(state.categoryKey);
    state.roles = assignRoles(state.numPlayers, state.numImpostors);
    state.currentIndex = 0;
    state.revealed = false;
    state.screen = "handoff";
    render();
  }

  function nextAfterConceal() {
    if (state.currentIndex + 1 < state.numPlayers) {
      state.currentIndex += 1;
      state.revealed = false;
      state.screen = "handoff";
    } else {
      state.screen = "complete";
      state.timerRemaining = state.timerTotal;
      state.timerRunning = false;
    }
    render();
  }

  function stopTimer() {
    if (state.timerHandle) { clearInterval(state.timerHandle); state.timerHandle = null; }
    state.timerRunning = false;
  }

  function startTimer() {
    if (state.timerHandle) return;
    state.timerRunning = true;
    state.timerHandle = setInterval(function () {
      state.timerRemaining -= 1;
      if (state.timerRemaining <= 0) {
        state.timerRemaining = 0;
        stopTimer();
        if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
      }
      renderTimerOnly();
    }, 1000);
    render();
  }

  function fmtTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
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

  function statusBar(showDots) {
    var dots = el("div", { class: "dots" });
    if (showDots) {
      for (var i = 0; i < state.numPlayers; i++) {
        var cls = "";
        if (i < state.currentIndex) cls = "done";
        else if (i === state.currentIndex) cls = "now";
        dots.appendChild(el("span", { class: cls }));
      }
    }
    return el("div", { class: "statusbar" }, [
      text("div", "chan", t("channel")),
      dots
    ]);
  }

  function attachHold(wrapEl, circleEl, btnEl, durationMs, onComplete) {
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

  function screenSetup() {
    var body = el("div", { class: "screen" });
    body.appendChild(el("div", { class: "setup-header" }, [
      text("div", "eyebrow", t("setupEyebrow")),
      langToggle()
    ]));
    body.appendChild(text("h1", "", t("title")));
    body.appendChild(text("p", "lede", t("lede")));

    // players stepper
    var playersField = el("div", { class: "field" });
    playersField.appendChild(text("div", "field-label", t("playersLabel")));
    var pOut = el("output", {}, [document.createTextNode(String(state.numPlayers))]);
    var pMinus = el("button", { onclick: function () {
      state.numPlayers = Math.max(3, state.numPlayers - 1);
      state.numImpostors = Math.min(state.numImpostors, maxImpostors(state.numPlayers));
      render();
    } }, [document.createTextNode("–")]);
    var pPlus = el("button", { onclick: function () {
      state.numPlayers = Math.min(15, state.numPlayers + 1);
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
    body.appendChild(el("button", { class: "btn btn-primary", onclick: beginBriefing }, [document.createTextNode(t("beginBriefing"))]));
    return body;
  }

  function screenHandoff() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", state.lang === "es"
      ? ("JUGADOR " + (state.currentIndex + 1) + " DE " + state.numPlayers)
      : ("PLAYER " + (state.currentIndex + 1) + " OF " + state.numPlayers)));
    body.appendChild(text("h2", "", (state.lang === "es" ? "Pasa el dispositivo al " : "Pass the device to ") + t("playerWord") + " " + (state.currentIndex + 1)));
    body.appendChild(text("p", "", t("handoffLede")));

    var wrap = el("div", { class: "hold-wrap" });
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 168 168");
    var track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    track.setAttribute("class", "track"); track.setAttribute("cx", "84"); track.setAttribute("cy", "84"); track.setAttribute("r", "78");
    var fill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fill.setAttribute("class", "fill"); fill.setAttribute("cx", "84"); fill.setAttribute("cy", "84"); fill.setAttribute("r", "78");
    svg.appendChild(track); svg.appendChild(fill);
    wrap.appendChild(svg);
    var holdBtn = el("div", { class: "hold-btn", tabindex: "0", role: "button" }, [document.createTextNode(t("holdToView"))]);
    wrap.appendChild(holdBtn);
    body.appendChild(wrap);

    setTimeout(function () {
      attachHold(wrap, fill, holdBtn, 550, function () {
        state.revealed = true;
        state.screen = "reveal";
        render();
      });
    }, 0);

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

    var wrap = el("div", { class: "hold-wrap" });
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 168 168");
    var track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    track.setAttribute("class", "track"); track.setAttribute("cx", "84"); track.setAttribute("cy", "84"); track.setAttribute("r", "78");
    var fill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fill.setAttribute("class", "fill"); fill.setAttribute("cx", "84"); fill.setAttribute("cy", "84"); fill.setAttribute("r", "78");
    svg.appendChild(track); svg.appendChild(fill);
    wrap.appendChild(svg);
    var holdBtn = el("div", { class: "hold-btn", tabindex: "0", role: "button" }, [document.createTextNode(t("holdToConceal"))]);
    wrap.appendChild(holdBtn);
    body.appendChild(wrap);

    setTimeout(function () {
      attachHold(wrap, fill, holdBtn, 550, nextAfterConceal);
    }, 0);

    return body;
  }

  function screenComplete() {
    var body = el("div", { class: "screen center" });
    body.appendChild(text("div", "eyebrow", t("completeEyebrow")));
    body.appendChild(text("h2", "", t("discussion")));
    body.appendChild(text("p", "lede", state.lang === "es"
      ? (pluralImpostor("es", state.numImpostors) + " escondido" + (state.numImpostors > 1 ? "s" : "") + " entre " + state.numPlayers + " jugadores. Discútanlo y luego voten.")
      : (pluralImpostor("en", state.numImpostors) + " hiding among " + state.numPlayers + " players. Talk it out, then vote.")));

    var ring = el("div", { class: "timer-ring" });
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    var track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    track.setAttribute("class", "track"); track.setAttribute("cx", "100"); track.setAttribute("cy", "100"); track.setAttribute("r", "92");
    var fillC = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fillC.setAttribute("class", "fill"); fillC.setAttribute("cx", "100"); fillC.setAttribute("cy", "100"); fillC.setAttribute("r", "92");
    var circumference = 2 * Math.PI * 92;
    fillC.style.strokeDasharray = circumference;
    var frac = state.timerTotal > 0 ? state.timerRemaining / state.timerTotal : 0;
    fillC.style.strokeDashoffset = circumference * (1 - frac);
    svg.appendChild(track); svg.appendChild(fillC);
    ring.appendChild(svg);
    ring.appendChild(el("div", { class: "timer-readout mono" }, [document.createTextNode(fmtTime(state.timerRemaining))]));
    body.appendChild(ring);
    window._timerFillEl = fillC;
    window._timerCircumference = circumference;

    var presets = el("div", { class: "presets" });
    [60, 180, 300, 480].forEach(function (secs) {
      presets.appendChild(el("button", {
        class: "chip" + (state.timerTotal === secs ? " active" : ""),
        onclick: function () { stopTimer(); state.timerTotal = secs; state.timerRemaining = secs; render(); }
      }, [document.createTextNode(Math.round(secs / 60) + " " + t("min"))]));
    });
    body.appendChild(presets);

    var controls = el("div", { class: "chips" });
    controls.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: function () { state.timerRunning ? stopTimer() : startTimer(); render(); }
    }, [document.createTextNode(state.timerRunning ? t("pause") : t("start"))]));
    controls.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: function () { stopTimer(); state.timerRemaining = state.timerTotal; render(); }
    }, [document.createTextNode(t("reset"))]));
    body.appendChild(controls);

    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn " + (state.confirmReveal ? "btn-danger" : "btn-ghost"),
      onclick: function () {
        if (state.confirmReveal) {
          stopTimer();
          state.screen = "answers";
          state.confirmReveal = false;
        } else {
          state.confirmReveal = true;
          setTimeout(function () { state.confirmReveal = false; render(); }, 3000);
        }
        render();
      }
    }, [document.createTextNode(state.confirmReveal ? t("tapAgainReveal") : t("revealAnswers"))]));

    return body;
  }

  function screenAnswers() {
    var resolved = resolveWord(state.wordPick, state.lang);
    var body = el("div", { class: "screen" });
    body.appendChild(text("div", "eyebrow", t("closedEyebrow")));
    body.appendChild(text("h2", "", (state.lang === "es" ? "La palabra era " : "The word was ") + resolved.word.toUpperCase()));
    body.appendChild(text("p", "", t("caseFileLabel") + ": " + resolved.label));

    var roster = el("div", { class: "roster" });
    for (var i = 0; i < state.numPlayers; i++) {
      var isImp = state.roles[i];
      roster.appendChild(el("div", { class: "roster-row" }, [
        text("span", "", t("playerWord") + " " + (i + 1)),
        el("span", { class: "player-tag " + (isImp ? "impostor" : "crew") }, [document.createTextNode(isImp ? t("impostorTag") : t("crewTag"))])
      ]));
    }
    body.appendChild(roster);

    body.appendChild(el("div", { class: "spacer" }));
    body.appendChild(el("button", {
      class: "btn btn-primary",
      onclick: function () {
        state.roles = assignRoles(state.numPlayers, state.numImpostors);
        state.wordPick = pickWord(state.categoryKey);
        state.currentIndex = 0;
        state.screen = "handoff";
        render();
      }
    }, [document.createTextNode(t("playAgain"))]));
    body.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: function () { state.screen = "setup"; render(); }
    }, [document.createTextNode(t("newSetup"))]));

    return body;
  }

  function renderTimerOnly() {
    var readout = document.querySelector(".timer-readout");
    if (readout) readout.textContent = fmtTime(state.timerRemaining);
    if (window._timerFillEl) {
      var frac = state.timerTotal > 0 ? state.timerRemaining / state.timerTotal : 0;
      window._timerFillEl.style.strokeDashoffset = window._timerCircumference * (1 - frac);
    }
  }

  function render() {
    document.documentElement.lang = state.lang;
    var device = document.getElementById("device");
    device.innerHTML = "";
    var showDots = state.screen === "handoff" || state.screen === "reveal";
    device.appendChild(statusBar(showDots));
    var screenEl;
    if (state.screen === "setup") screenEl = screenSetup();
    else if (state.screen === "handoff") screenEl = screenHandoff();
    else if (state.screen === "reveal") screenEl = screenReveal();
    else if (state.screen === "complete") screenEl = screenComplete();
    else screenEl = screenAnswers();
    device.appendChild(screenEl);
  }

  render();
})();
