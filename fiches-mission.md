# 🎵 Blind Test — Fiches de mission de l'équipe

> Jeu web de blind test musical. Base de code : un seul fichier `blindtest.html`.
> Thème de la JAM : la musique. Contraintes : référence pop culture · *Let's Groove* (Earth, Wind & Fire) en musique de menu · input micro **et** caméra.

---

## 🧩 Comment on travaille ensemble

Tout le jeu tourne autour d'un objet partagé `GAME` (dans la balise `<script>`). C'est notre **point de rendez-vous** : chaque module y lit et y écrit, plutôt que de s'appeler directement. Ça évite les conflits quand on bosse en parallèle.

```js
const GAME = {
  screen: 'menu',     // écran courant
  players: [],        // [{ name: 'Léa', score: 0 }, ...]
  recogIndex: 0,      // joueur en cours de reconnaissance caméra
  round: 1,           // manche en cours
  menuMusicOn: true,  // état de la musique de menu
};
```

Chacun remplace des fonctions « **stub** » (= bouchons qui simulent pour l'instant). Elles sont **déjà câblées** aux boutons : pas besoin de toucher au HTML, juste remplir la fonction. Cherchez les commentaires `>>> HOOK ... <<<` dans le code, ils nomment le responsable et l'action attendue.

**⚠️ Rappels valables pour tout le monde :**
- Micro et caméra ne marchent que sur **Chrome ou Edge**.
- La page doit tourner en `https://` ou `localhost` (sinon le navigateur bloque l'accès micro/caméra). → Utilisez l'extension **Live Server** de VS Code.
- On teste tôt et souvent, chacun peut valider son module **sans attendre les autres** grâce aux stubs.

---

## 👤 Membre 1 — Interface & navigation *(le squelette — déjà fait)*

**Rôle :** garant de la structure HTML/CSS, de la machine à états et de l'apparence générale. Tu as posé les fondations ; ton job en cours de route est d'aider les autres à brancher leur code et de garder l'UI cohérente.

**Ce qui est déjà livré :**
- Les 5 écrans (menu, paramètres, config joueurs, reconnaissance, jeu).
- La navigation `go('menu' | 'settings' | 'config' | 'recog' | 'game')`.
- La saisie du nombre de joueurs et des pseudos.
- Le thème rétro-disco.

**Ce qu'il te reste à surveiller :**
- Intégrer la **référence pop culture** une fois choisie par l'équipe (habillage d'une manche, écran de victoire, easter egg…).
- Soigner les transitions et l'écran de fin de partie quand le membre 4 aura branché le scoring.
- Régler les bugs d'affichage signalés par les autres.

---

## 👤 Membre 2 — Caméra & détection de gestes

**Rôle :** tout ce qui touche à la webcam et à la détection de la **main levée**, via **MediaPipe Hands** (Google).

**Librairie à charger** (dans le `<head>`) :
```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
```

**Fonctions à implémenter :**

1. `testCamera()` — bouton « Tester la caméra » de l'écran Paramètres.
   - Demander l'accès webcam (`navigator.mediaDevices.getUserMedia({ video: true })`).
   - Afficher le flux dans la div `#settingsCamPreview`.
   - Appeler `setStatus('camStatus', true)` si OK, `false` si refus/erreur.

2. **Phase de reconnaissance** (écran `recog`) — déclenchée après la config joueurs.
   - Afficher le flux caméra dans `#recogCam`.
   - Quand une **main levée** est détectée pour le joueur courant (`GAME.players[GAME.recogIndex]`), appeler `playerRecognized()`. Le squelette enchaîne tout seul sur le joueur suivant ou démarre le jeu.

3. **Pendant les manches** — détecter la main levée d'un joueur pour lui donner la parole.
   - Appeler `onPlayerBuzz(playerIndex)` (fonction gérée par le membre 4).

**Astuce détection « main levée » :** MediaPipe donne les coordonnées du poignet (`landmark[0]`) et du bout du majeur (`landmark[12]`). Une main est « levée » si le poignet est haut dans l'image (petit `y`) ou si les doigts pointent vers le haut. Commence simple : un seuil sur la position verticale du poignet suffit pour un premier jet.

**Pièges :**
- Le flux vidéo doit être miroir (effet selfie) pour que ce soit naturel : `transform: scaleX(-1)` en CSS.
- Prévoir un petit délai anti-rebond pour ne pas détecter 10 fois la même main levée.

---

## 👤 Membre 3 — Micro & reconnaissance vocale

**Rôle :** capter la réponse du joueur au micro et la transformer en texte, avec une **comparaison tolérante** au titre/artiste attendu.

**Techno :** la **Web Speech API** (intégrée à Chrome/Edge, rien à installer).
```js
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SR();
recognition.lang = 'fr-FR';
recognition.interimResults = false;
```

**Fonctions à implémenter :**

1. `testMic()` — bouton « Tester le micro » de l'écran Paramètres.
   - Demander l'accès micro (`getUserMedia({ audio: true })`).
   - Animer la largeur de la barre `#micLevel` selon le volume capté (via Web Audio `AnalyserNode`).
   - Appeler `setStatus('micStatus', true/false)`.

2. **Écoute pendant une manche** — quand un joueur a la parole (timer de 5 s lancé par le membre 4) :
   - Démarrer l'écoute, récupérer le texte transcrit.
   - Appeler `checkAnswer(transcript)` (le membre 4 fait le scoring derrière).

3. **Fonction de comparaison tolérante** — la pièce maîtresse. Elle doit dire si le texte capté correspond au **titre**, à l'**artiste**, aux **deux**, ou à rien.
   - **Normaliser** d'abord : minuscules, sans accents, sans ponctuation, espaces réduits.
     ```js
     const norm = s => s.toLowerCase()
       .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // retire accents
       .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
     ```
   - **Comparer en souple** avec une distance de Levenshtein (tolérer « bily jin » ≈ « billie jean »). Considère une correspondance valide si la distance est petite par rapport à la longueur du mot.

**Pièges :**
- La Web Speech API **ne marche pas sur Firefox/Safari** → tester sur Chrome.
- Elle peut transcrire phonétiquement n'importe comment → d'où l'importance de la tolérance.
- Un seul `recognition` à la fois : bien l'arrêter (`.stop()`) entre deux joueurs.

---

## 👤 Membre 4 — Logique de jeu, audio & scores *(chef d'orchestre)*

**Rôle :** assembler les briques des autres et faire tourner la partie : musiques, manches, timer, scores, et la musique de menu.

**Fonctions à implémenter :**

1. `playAudioClip()` — jouer un extrait du blind test (balise `<audio>` ou Web Audio API). Choisir une musique au hasard dans votre liste, jouer ~10-15 s.

2. `onPlayerBuzz(playerIndex)` — appelé par le membre 2 quand un joueur lève la main :
   - Mettre l'extrait en pause, afficher le nom du joueur (`#speakerName`).
   - Lancer un **timer de 5 s** (mettre à jour `#timer`).
   - Activer l'écoute micro (le membre 3 appellera `checkAnswer`).

3. `checkAnswer(transcript)` — recevoir le résultat de la comparaison du membre 3 et **scorer** :
   - **3 points** si titre seul **OU** artiste seul.
   - **5 points** si titre **ET** artiste.
   - Mettre à jour `GAME.players[i].score` puis appeler `renderScoreboard()`.

4. `toggleMenuMusic()` — brancher *Let's Groove* d'Earth, Wind & Fire :
   ```html
   <audio id="menuMusic" src="lets-groove.mp3" loop></audio>
   ```
   - `play()` / `pause()` selon `GAME.menuMusicOn`.
   - ⚠️ Les navigateurs bloquent l'autoplay : la musique ne peut démarrer **qu'après un clic** de l'utilisateur (ex. le bouton « Jouer »).

5. **Boucle de manche** — enchaîner : nouvel extrait → attente d'une main levée → réponse → score → manche suivante, jusqu'à la fin (nombre de manches à définir, ex. 10).

**La liste des musiques** (à décider en équipe) : un tableau d'objets, ex.
```js
const TRACKS = [
  { file: 'clips/01.mp3', title: 'Billie Jean', artist: 'Michael Jackson' },
  // ...
];
```

---

## ✅ Checklist d'intégration finale

- [ ] Le micro et la caméra passent au vert dans les Paramètres (Chrome).
- [ ] La reconnaissance des joueurs fonctionne (main levée → joueur suivant).
- [ ] Un extrait se lance, la main levée met en pause + lance le timer 5 s.
- [ ] La réponse vocale est correctement scorée (3 / 5 pts).
- [ ] *Let's Groove* tourne dans les menus (après le 1er clic).
- [ ] La référence pop culture est intégrée quelque part de visible.
- [ ] Test complet d'une partie de bout en bout sur la machine de démo.
