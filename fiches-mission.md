# 🎵 Breaking Track — Fiches de mission de l'équipe

> Jeu web de blind test musical. Base de code : un seul fichier `blindtest.html`.
> Thème de la JAM : la musique. Contraintes : référence pop culture (✅ Saul Goodman / Breaking Bad) · *Let's Groove* en musique de menu · input micro **et** caméra.

---

## 🧩 Comment on travaille ensemble

Tout le jeu tourne autour d'un objet partagé `GAME`. C'est notre **point de rendez-vous** : chaque module y lit et y écrit.

```js
const GAME = {
  screen:        'menu',  // écran courant
  players:       [],      // [{ name: 'Léa', score: 0 }, ...]
  recogIndex:    0,       // joueur en cours de reconnaissance caméra
  round:         1,       // manche en cours
  totalRounds:   5,       // défini dans la config joueurs
  menuMusicOn:   true,    // état de la musique de menu
  selectedTheme: null,    // thème choisi — accès aux musiques via GAME.selectedTheme.tracks
};
```

**Navigation :** `go('menu' | 'settings' | 'config' | 'theme' | 'recog' | 'game' | 'result' | 'end')`

Il y a **8 écrans** : menu, paramètres, config joueurs, choix du thème, reconnaissance, jeu, résultat de manche, fin de partie.

Cherchez les commentaires `>>> HOOK ... <<<` dans le code pour savoir où intervenir.

**⚠️ Rappels pour tout le monde :**
- Micro et caméra ne marchent que sur **Chrome ou Edge**.
- La page doit tourner en `localhost` → utilisez **Live Server** de VS Code (clic droit sur `blindtest.html` → *Open with Live Server*).
- Ne pas ouvrir en `file://`, ça bloque le micro, la caméra et les requêtes réseau.

---

## 👤 Membre 1 — Interface & navigation ✅ *FAIT*

Tout le squelette est livré et fonctionnel. Résumé de ce qui est en place :

- 8 écrans avec navigation et animations
- Thème visuel **Breaking Track** (Breaking Bad) : menu avec image de fond Walter White, overlay Saul Goodman sur bonne/mauvaise réponse (`showSaul(true/false)`), Hank dans les paramètres (`setHankMood(true/false)`)
- Config joueurs : saisie des pseudos + validation + compteur de manches (1 à 10)
- Écran de sélection de thème : 15 catégories avec 30+ musiques chacune
- **Banque de musiques** `THEMES` : Populaires, 80/90/2000/2010/2020, Pop, Rock, Rap, Jazz, Électro, Jeux vidéo, Séries TV, Films, Animé/Manga, Dessins animés, Hardcore Mix
- Écran de jeu : vinyle animé (`#vinyl` + `.spinning`), timer (`#timer` + `.urgent`), scoreboard (`bumpScore(i)`)
- Écran résultat inter-manche : `showRoundResult(track, scorerIndex, points)` — à appeler depuis le membre 4
- Écran de fin : classement, confettis — déclenché par `endGame()`
- Overlay règles, barre de debug

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
- Quand une main levée est détectée pour `GAME.players[GAME.recogIndex]`, appeler **`playerRecognized()`**.

### 3. Pendant les manches (écran `game`)
- Appeler **`onPlayerBuzz(playerIndex)`** quand un joueur lève la main (implémenté par le membre 4).

**Astuce :** `landmark[0].y < 0.4` sur le poignet suffit pour un premier jet.

**Pièges :**
- Flux vidéo en miroir : `transform: scaleX(-1)` sur l'élément vidéo.
- Anti-rebond : délai de ~1s entre deux détections.

---

## 👤 Membre 3 — Micro & reconnaissance vocale

**Rôle :** capter la réponse du joueur et appeler `checkAnswer(transcript)`.

**Techno :** Web Speech API (intégrée à Chrome/Edge).

```js
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SR();
recognition.lang = 'fr-FR';
recognition.interimResults = false;
```

**Fonctions à implémenter :**

### 1. `testMic()` — écran Paramètres
- Accès micro, animer `#micLevel`, appeler `setStatus('micStatus', true/false)`.

### 2. Écoute pendant une manche
- Démarrer l'écoute quand le membre 4 donne la parole (`onPlayerBuzz` est déclenché).
- Appeler **`checkAnswer(transcript)`** avec le texte transcrit.

**Pièges :**
- Web Speech API ne marche pas sur Firefox/Safari.
- Un seul `recognition` à la fois : `.stop()` entre deux joueurs.
- Ne démarrer l'écoute **qu'après** `onPlayerBuzz()`.

---

## 👤 Membre 4 — Logique de jeu, audio & scores *(chef d'orchestre)*

**Rôle :** faire tourner la partie. La banque de musiques et les écrans sont prêts — il faut câbler l'audio et la boucle de jeu.

### Ce qui est fourni (ne pas réimplémenter)
- `GAME.selectedTheme.tracks` — tableau des musiques du thème choisi, format `{ title, artist }`
- `showRoundResult(track, scorerIndex, points)` — affiche l'écran résultat inter-manche
- `bumpScore(playerIndex)` — anime le chip de score du joueur
- `showSaul(correct)` — affiche Saul content ou déçu
- `endGame()` — affiche le classement final
- `renderScoreboard()` — met à jour les scores affichés
- `#vinyl` — ajouter/retirer `.spinning` pour l'animation du vinyle
- `#timer` — afficher le countdown, ajouter `.urgent` sous 3s
- `#speakerName`, `#gameStatus` — textes de l'écran de jeu

### 1. `playAudioClip()` — jouer un extrait

Utilise l'**API Deezer** via `corsproxy.io` pour récupérer un MP3 de 30s :

```js
async function playAudioClip() {
  const tracks = GAME.selectedTheme.tracks;
  // Choisir un track non encore joué
  const available = tracks.filter(t => !t.previewUrl || true); // adapter selon ta logique
  const track = available[Math.floor(Math.random() * available.length)];

  // Charger la preview si pas encore fait
  if (!track.previewUrl) {
    const q = encodeURIComponent(`${track.title} ${track.artist}`);
    const res = await fetch(`https://corsproxy.io/?https://api.deezer.com/search?q=${q}&limit=1`);
    const data = await res.json();
    track.previewUrl = data.data?.[0]?.preview;
  }

  GAME.currentTrack = track;
  const audio = document.getElementById('gameAudio');
  audio.src = track.previewUrl;
  audio.play();
  document.getElementById('vinyl').classList.add('spinning');
}
```

⚠️ **Autoplay** : `audio.play()` doit être déclenché dans un handler de clic. Montre un bouton "C'est parti !" après le chargement, et lance `startRound()` au clic.

⚠️ **iTunes ne fonctionne pas** : leur API retourne un format `.plus.aac.p.m4a` non lu par Chrome.

### 2. `onPlayerBuzz(playerIndex)` — joueur qui prend la parole

```js
function onPlayerBuzz(playerIndex) {
  document.getElementById('gameAudio').pause();
  document.getElementById('vinyl').classList.remove('spinning');
  document.getElementById('speakerName').textContent = GAME.players[playerIndex].name;
  document.getElementById('gameStatus').textContent  = 'Réponds au micro !';
  GAME.buzzerIndex = playerIndex;

  let t = 10;
  document.getElementById('timer').textContent = t;
  const interval = setInterval(() => {
    t--;
    document.getElementById('timer').textContent = t;
    if (t <= 3) document.getElementById('timer').classList.add('urgent');
    if (t <= 0) {
      clearInterval(interval);
      showRoundResult(GAME.currentTrack, playerIndex, 0);
    }
  }, 1000);
}
```

### 3. `checkAnswer(transcript)` — vérifier la réponse

```js
function checkAnswer(transcript) {
  const track = GAME.currentTrack;
  // Normalisation
  const norm = s => s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  // Levenshtein ou includes simple
  const matchTitle  = norm(transcript).includes(norm(track.title));
  const matchArtist = norm(transcript).includes(norm(track.artist));

  let points = 0;
  if (matchTitle && matchArtist) points = 5;
  else if (matchTitle || matchArtist) points = 3;

  if (points > 0) {
    GAME.players[GAME.buzzerIndex].score += points;
    bumpScore(GAME.buzzerIndex);
  }
  showSaul(points > 0);
  setTimeout(() => showRoundResult(track, GAME.buzzerIndex, points), 2200);
}
```

### 4. `nextRound()` — passer à la manche suivante

```js
function nextRound() {
  GAME.round++;
  if (GAME.round > GAME.totalRounds) {
    endGame();
  } else {
    go('game');
    renderScoreboard();
    startRound(); // ta fonction qui lance l'extrait
  }
}
```

### 5. `toggleMenuMusic()` — Let's Groove en fond de menu

```html
<!-- Ajouter dans le HTML avant </div>.app -->
<audio id="menuMusic" src="assets/musics/lets-groove.mp3" loop></audio>
```

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

---

## ✅ Checklist d'intégration finale

- [ ] Live Server lancé sur Chrome (pas `file://`)
- [ ] Caméra et micro passent au vert dans les Paramètres
- [ ] Hank réagit à la main levée dans les Paramètres
- [ ] Reconnaissance des joueurs fonctionne (main levée → joueur suivant)
- [ ] Écran de thème → sélection → partie se lance
- [ ] Un extrait Deezer se lance au démarrage de manche
- [ ] Main levée pendant le jeu → pause audio + timer 10s
- [ ] Réponse vocale → score 3 ou 5 pts + Saul s'affiche
- [ ] Écran résultat inter-manche s'affiche avec le bon titre/artiste
- [ ] *Let's Groove* tourne dans les menus
- [ ] Écran de fin avec classement et confettis
- [ ] Test complet d'une partie de bout en bout sur la machine de démo
