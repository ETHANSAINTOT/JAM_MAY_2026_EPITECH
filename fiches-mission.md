# 🎵 Breaking Track — Fiches de mission de l'équipe

> Jeu web de blind test musical. Base de code : un seul fichier `blindtest.html`.
> Thème de la JAM : la musique. Contraintes : référence pop culture (✅ Saul Goodman / Breaking Bad) · *Let's Groove* en musique de menu · input micro **et** caméra.

---

## 🧩 Comment on travaille ensemble

Tout le jeu tourne autour d'un objet partagé `GAME`. C'est notre **point de rendez-vous** : chaque module y lit et y écrit.

```js
const GAME = {
  screen:      'menu',  // écran courant
  players:     [],      // [{ name: 'Léa', score: 0 }, ...]
  recogIndex:  0,       // joueur en cours de reconnaissance caméra
  round:       1,       // manche en cours
  totalRounds: 5,       // défini dans la config joueurs
  menuMusicOn: true,    // état de la musique de menu
};
```

**Navigation :** `go('menu' | 'settings' | 'config' | 'recog' | 'game' | 'end')`

Il y a **6 écrans** : menu, paramètres, config joueurs, reconnaissance, jeu, fin de partie.

Cherchez les commentaires `>>> HOOK ... <<<` dans le code pour savoir où intervenir.

**⚠️ Rappels pour tout le monde :**
- Micro et caméra ne marchent que sur **Chrome ou Edge**.
- La page doit tourner en `localhost` → utilisez **Live Server** de VS Code (clic droit sur `blindtest.html` → *Open with Live Server*).
- Ne pas ouvrir en `file://`, ça bloque le micro, la caméra et les requêtes réseau.

---

## 👤 Membre 1 — Interface & navigation ✅ *FAIT*

Tout le squelette est livré et fonctionnel. Résumé de ce qui est en place :

- 6 écrans avec navigation et animations
- Thème visuel **Breaking Track** (Breaking Bad) : menu avec image de fond Walter White, overlay Saul Goodman sur bonne/mauvaise réponse (`showSaul(true/false)`), Hank dans les paramètres (`setHankMood(true/false)`)
- Config joueurs : saisie des pseudos + validation (pseudos vides ou doublons bloqués) + compteur de manches (1 à 10)
- Écran de jeu : vinyle animé (`#vinyl` + classe `.spinning`), timer (`#timer` + classe `.urgent`), scoreboard avec animation (`bumpScore(playerIndex)`)
- Écran de fin : classement trié avec médailles 🥇🥈🥉 — déclenché par `endGame()`
- Liste `TRACKS` de 10 musiques prête dans le code
- Barre de debug visible sur l'écran de jeu

---

## 👤 Membre 2 — Caméra & détection de gestes

**Rôle :** webcam et détection de la **main levée** via **MediaPipe Hands**.

**Librairies à ajouter dans le `<head>` :**
```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
```

**Fonctions à implémenter :**

### 1. `testCamera()` — écran Paramètres
- Demander l'accès webcam (`navigator.mediaDevices.getUserMedia({ video: true })`).
- Afficher le flux dans `#settingsCamPreview`.
- Appeler `setStatus('camStatus', true/false)`.
- En temps réel, appeler **`setHankMood(true)`** quand une main est détectée, **`setHankMood(false)`** sinon.

### 2. Phase de reconnaissance (écran `recog`)
- Afficher le flux caméra dans `#recogCam`.
- Quand une main levée est détectée pour `GAME.players[GAME.recogIndex]`, appeler **`playerRecognized()`**. Le jeu enchaîne automatiquement.

### 3. Pendant les manches (écran `game`)
- Détecter la main levée d'un joueur et appeler **`onPlayerBuzz(playerIndex)`** (implémenté par le membre 4).

**Astuce détection :** `landmark[0].y < 0.4` sur le poignet suffit pour un premier jet.

**Pièges :**
- Flux vidéo en miroir : `transform: scaleX(-1)` sur l'élément vidéo.
- Anti-rebond : délai de ~1s entre deux détections.

---

## 👤 Membre 3 — Micro & reconnaissance vocale

**Rôle :** capter la réponse du joueur et appeler `checkAnswer(transcript)`.

**Techno :** Web Speech API (intégrée à Chrome/Edge, rien à installer).

```js
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SR();
recognition.lang = 'fr-FR';
recognition.interimResults = false;
```

**Fonctions à implémenter :**

### 1. `testMic()` — écran Paramètres
- Demander l'accès micro (`getUserMedia({ audio: true })`).
- Animer la largeur de `#micLevel` selon le volume (via `AnalyserNode`).
- Appeler `setStatus('micStatus', true/false)`.

### 2. Écoute pendant une manche
- Quand `onPlayerBuzz()` est appelé par le membre 2, le membre 4 lance un timer de **10 secondes**.
- Pendant ce temps, démarrer l'écoute et appeler **`checkAnswer(transcript)`** avec le texte transcrit.
- `checkAnswer` est géré par le membre 4 côté scoring — tu n'as qu'à lui passer le texte.

**Comparaison tolérante** (à implémenter dans `checkAnswer` avec le membre 4) :
```js
const norm = s => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
```
Utiliser une distance de Levenshtein pour tolérer les erreurs de transcription.

**Pièges :**
- Web Speech API ne marche pas sur Firefox/Safari → Chrome uniquement.
- Un seul `recognition` à la fois : appeler `.stop()` avant d'en relancer un.
- Ne démarrer l'écoute **qu'après** que le membre 4 ait donné la parole au joueur.

---

## 👤 Membre 4 — Logique de jeu, audio & scores *(chef d'orchestre)*

**Rôle :** faire tourner la partie. C'est le plus gros morceau — tout le reste dépend de toi.

### État global à enrichir

Ajoute ces champs dans l'objet `GAME` :
```js
currentTrack: null,   // { title, artist, previewUrl } en cours
usedTracks:   [],     // indices déjà joués pour ne pas répéter
buzzerIndex:  -1,     // index du joueur qui a buzzé
gamePhase:    'idle', // 'listening' | 'answering' | 'result'
answerTimer:  null,   // setInterval du countdown
```

### 1. `playAudioClip()` — jouer un extrait

On utilise l'**API Deezer** pour récupérer des previews MP3 de 30s automatiquement — pas de fichiers à télécharger. Son API a des restrictions CORS, on passe par `corsproxy.io` pour la requête :
```js
const q = encodeURIComponent(`${track.title} ${track.artist}`);
const res = await fetch(`https://corsproxy.io/?https://api.deezer.com/search?q=${q}&limit=1`);
const data = await res.json();
track.previewUrl = data.data[0].preview; // URL MP3 directe
```
- ⚠️ L'audio doit être lancé **dans un handler de clic** (pas après un `await`) sinon Chrome bloque l'autoplay. Montre un bouton "C'est parti !" après le chargement des URLs.
- ⚠️ **iTunes ne fonctionne pas** : leur API retourne un format `.plus.aac.p.m4a` non supporté par Chrome.

```js
function playAudioClip() {
  const available = TRACKS.map((_, i) => i).filter(i => !GAME.usedTracks.includes(i));
  if (!available.length) { endGame(); return; }
  const idx = available[Math.floor(Math.random() * available.length)];
  GAME.usedTracks.push(idx);
  GAME.currentTrack = TRACKS[idx];

  const audio = document.getElementById('gameAudio');
  audio.src = GAME.currentTrack.previewUrl;
  audio.play().catch(() => {});
  document.getElementById('vinyl').classList.add('spinning');
}
```

### 2. `onPlayerBuzz(playerIndex)` — joueur qui prend la parole

Appelé par le membre 2 quand une main est levée pendant une manche.

```js
function onPlayerBuzz(playerIndex) {
  if (GAME.gamePhase !== 'listening') return;
  GAME.gamePhase   = 'answering';
  GAME.buzzerIndex = playerIndex;

  document.getElementById('gameAudio').pause();
  document.getElementById('vinyl').classList.remove('spinning');
  document.getElementById('speakerName').textContent = GAME.players[playerIndex].name;
  document.getElementById('gameStatus').textContent  = 'Réponds au micro !';

  let timeLeft = 10;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('timer').classList.remove('urgent');

  clearInterval(GAME.answerTimer);
  GAME.answerTimer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 3) document.getElementById('timer').classList.add('urgent');
    if (timeLeft <= 0) {
      clearInterval(GAME.answerTimer);
      nextRound(); // ou afficher un résultat "temps écoulé"
    }
  }, 1000);
}
```

### 3. `checkAnswer(transcript)` — vérifier la réponse

Appelé par le membre 3 avec le texte capté au micro.

- **3 points** si titre seul **OU** artiste seul.
- **5 points** si titre **ET** artiste.
- Appeler `bumpScore(GAME.buzzerIndex)` pour animer le score.
- Appeler `showSaul(points > 0)` pour afficher Saul content ou déçu.

```js
function checkAnswer(transcript) {
  clearInterval(GAME.answerTimer);
  GAME.gamePhase = 'result';

  const track       = GAME.currentTrack;
  const matchTitle  = fuzzyMatch(transcript, track.title);   // à implémenter
  const matchArtist = fuzzyMatch(transcript, track.artist);  // avec Levenshtein

  let points = 0;
  if (matchTitle && matchArtist) points = 5;
  else if (matchTitle || matchArtist) points = 3;

  if (points > 0) {
    GAME.players[GAME.buzzerIndex].score += points;
    bumpScore(GAME.buzzerIndex);
  }
  showSaul(points > 0);
  setTimeout(nextRound, 2500);
}
```

### 4. Boucle de manches

```js
function startRound() {
  GAME.gamePhase   = 'listening';
  GAME.buzzerIndex = -1;
  document.getElementById('roundNum').textContent   = GAME.round;
  document.getElementById('roundTotal').textContent = GAME.totalRounds;
  document.getElementById('timer').textContent      = '–';
  document.getElementById('timer').classList.remove('urgent');
  document.getElementById('speakerName').textContent = 'En attente d\'une main levée…';
  document.getElementById('gameStatus').textContent  = 'Écoute bien l\'extrait…';
  playAudioClip();
}

function nextRound() {
  GAME.round++;
  if (GAME.round > GAME.totalRounds) endGame();
  else startRound();
}
```

Appeler `startRound()` dans `startGame()` (cherche le `>>> HOOK Membre 4 <<<`).

### 5. `toggleMenuMusic()` — Let's Groove en fond de menu

1. Ajouter dans le HTML (avant `</div>` de `.app`) :
```html
<audio id="menuMusic" src="assets/musics/lets-groove.mp3" loop></audio>
```
2. Déposer le fichier dans `assets/musics/`.
3. Remplacer le stub `toggleMenuMusic()` :
```js
function toggleMenuMusic() {
  GAME.menuMusicOn = !GAME.menuMusicOn;
  const pill = document.getElementById('audioPill');
  pill.classList.toggle('muted', !GAME.menuMusicOn);
  document.getElementById('audioLabel').textContent =
    'Musique : ' + (GAME.menuMusicOn ? 'ON' : 'OFF');
  const music = document.getElementById('menuMusic');
  if (GAME.menuMusicOn) music.play().catch(() => {});
  else music.pause();
}
```
4. Démarrer la musique dès le premier clic (bouton Jouer ou Paramètres), et la couper quand la partie commence.

---

## ✅ Checklist d'intégration finale

- [ ] Live Server lancé sur Chrome (pas `file://`)
- [ ] Caméra et micro passent au vert dans les Paramètres
- [ ] Hank réagit à la main levée dans les Paramètres
- [ ] Reconnaissance des joueurs fonctionne (main levée → joueur suivant)
- [ ] Un extrait se lance au démarrage de manche
- [ ] Main levée pendant le jeu → pause audio + timer 10s
- [ ] Réponse vocale → score 3 ou 5 pts + Saul s'affiche
- [ ] *Let's Groove* tourne dans les menus
- [ ] Écran de fin avec classement correct
- [ ] Test complet d'une partie de bout en bout sur la machine de démo
