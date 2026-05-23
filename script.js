/* =========================================================================
   BANQUE DE MUSIQUES PAR THÈME
   previewUrl est rempli dynamiquement par fetchTrackPreviews() au lancement.
   ========================================================================= */
const THEMES = [
  {
    id: 'populaire', label: 'Populaires', emoji: '🎵',
    tracks: [
      { title: 'Billie Jean', artist: 'Michael Jackson' },
      { title: 'Bohemian Rhapsody', artist: 'Queen' },
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { title: 'Hotel California', artist: 'Eagles' },
      { title: 'Rolling in the Deep', artist: 'Adele' },
      { title: 'Shape of You', artist: 'Ed Sheeran' },
      { title: 'Superstition', artist: 'Stevie Wonder' },
      { title: 'Get Lucky', artist: 'Daft Punk' },
      { title: 'Blinding Lights', artist: 'The Weeknd' },
      { title: "Don't Stop Me Now", artist: 'Queen' },
      { title: 'Happy', artist: 'Pharrell Williams' },
      { title: 'Uptown Funk', artist: 'Mark Ronson' },
      { title: 'Someone Like You', artist: 'Adele' },
      { title: 'Thriller', artist: 'Michael Jackson' },
      { title: 'We Will Rock You', artist: 'Queen' },
      { title: 'Yesterday', artist: 'The Beatles' },
      { title: 'Hey Jude', artist: 'The Beatles' },
      { title: 'Purple Rain', artist: 'Prince' },
      { title: 'Imagine', artist: 'John Lennon' },
      { title: 'Bad Romance', artist: 'Lady Gaga' },
      { title: 'Titanium', artist: 'David Guetta' },
      { title: 'Diamonds', artist: 'Rihanna' },
      { title: 'Take On Me', artist: 'a-ha' },
      { title: 'Sweet Child O Mine', artist: 'Guns N Roses' },
      { title: 'Under the Bridge', artist: 'Red Hot Chili Peppers' },
      { title: 'Seven Nation Army', artist: 'The White Stripes' },
      { title: 'Mr. Brightside', artist: 'The Killers' },
      { title: 'Lose Yourself', artist: 'Eminem' },
      { title: 'Crazy in Love', artist: 'Beyonce' },
      { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
      { title: 'My Way', artist: 'Frank Sinatra' },
      { title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
      { title: 'La Vie en Rose', artist: 'Édith Piaf' },
      { title: 'Non je ne regrette rien', artist: 'Édith Piaf' },
      { title: 'Ne me quitte pas', artist: 'Jacques Brel' },
      { title: 'Aux Champs-Élysées', artist: 'Joe Dassin' },
      { title: 'La Javanaise', artist: 'Serge Gainsbourg' },
    ]
  },
  {
    id: 'annees80', label: 'Années 80', emoji: '📼',
    tracks: [
      { title: 'Take On Me', artist: 'a-ha' },
      { title: 'Girls Just Want to Have Fun', artist: 'Cyndi Lauper' },
      { title: 'Sweet Child O Mine', artist: 'Guns N Roses' },
      { title: 'Like a Prayer', artist: 'Madonna' },
      { title: 'Material Girl', artist: 'Madonna' },
      { title: 'Purple Rain', artist: 'Prince' },
      { title: 'Africa', artist: 'Toto' },
      { title: 'Every Breath You Take', artist: 'The Police' },
      { title: 'With or Without You', artist: 'U2' },
      { title: "Livin' on a Prayer", artist: 'Bon Jovi' },
      { title: 'Eye of the Tiger', artist: 'Survivor' },
      { title: 'Footloose', artist: 'Kenny Loggins' },
      { title: 'Wake Me Up Before You Go-Go', artist: 'Wham!' },
      { title: 'Careless Whisper', artist: 'George Michael' },
      { title: 'Billie Jean', artist: 'Michael Jackson' },
      { title: 'Thriller', artist: 'Michael Jackson' },
      { title: 'Beat It', artist: 'Michael Jackson' },
      { title: 'Never Gonna Give You Up', artist: 'Rick Astley' },
      { title: 'Jump', artist: 'Van Halen' },
      { title: 'Should I Stay or Should I Go', artist: 'The Clash' },
      { title: 'The Final Countdown', artist: 'Europe' },
      { title: 'Faith', artist: 'George Michael' },
      { title: "L'Aventurier", artist: 'Indochine' },
      { title: 'Voyage Voyage', artist: 'Desireless' },
      { title: 'Nuit de Folie', artist: 'Début de Soirée' },
      { title: 'Libertine', artist: 'Mylène Farmer' },
      { title: 'Femme Libérée', artist: 'Cookie Dingler' },
      { title: 'Un autre monde', artist: 'Téléphone' },
    ]
  },
  {
    id: 'annees90', label: 'Années 90', emoji: '💿',
    tracks: [
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { title: 'Come As You Are', artist: 'Nirvana' },
      { title: 'Wannabe', artist: 'Spice Girls' },
      { title: '...Baby One More Time', artist: 'Britney Spears' },
      { title: "Gangsta's Paradise", artist: 'Coolio' },
      { title: 'I Will Always Love You', artist: 'Whitney Houston' },
      { title: 'Killing Me Softly', artist: 'Fugees' },
      { title: 'Losing My Religion', artist: 'R.E.M.' },
      { title: 'Creep', artist: 'Radiohead' },
      { title: 'Black Hole Sun', artist: 'Soundgarden' },
      { title: 'Enter Sandman', artist: 'Metallica' },
      { title: 'Under the Bridge', artist: 'Red Hot Chili Peppers' },
      { title: 'Wonderwall', artist: 'Oasis' },
      { title: 'Bitter Sweet Symphony', artist: 'The Verve' },
      { title: 'Zombie', artist: 'The Cranberries' },
      { title: 'Macarena', artist: 'Los Del Rio' },
      { title: 'Hotel California', artist: 'Eagles' },
      { title: 'November Rain', artist: 'Guns N Roses' },
      { title: 'Nothing Else Matters', artist: 'Metallica' },
      { title: 'My Name Is', artist: 'Eminem' },
      { title: 'Informer', artist: 'Snow' },
      { title: 'La Tribu de Dana', artist: 'Manau' },
      { title: 'Je danse le Mia', artist: 'IAM' },
      { title: 'Caroline', artist: 'MC Solaar' },
      { title: 'Moi Lolita', artist: 'Alizée' },
    ]
  },
  {
    id: 'annees2000', label: 'Années 2000', emoji: '📱',
    tracks: [
      { title: 'Crazy in Love', artist: 'Beyonce' },
      { title: 'Hey Ya!', artist: 'OutKast' },
      { title: 'Lose Yourself', artist: 'Eminem' },
      { title: 'In the End', artist: 'Linkin Park' },
      { title: 'Numb', artist: 'Linkin Park' },
      { title: 'Boulevard of Broken Dreams', artist: 'Green Day' },
      { title: 'American Idiot', artist: 'Green Day' },
      { title: 'Helena', artist: 'My Chemical Romance' },
      { title: 'Welcome to the Black Parade', artist: 'My Chemical Romance' },
      { title: 'Since U Been Gone', artist: 'Kelly Clarkson' },
      { title: 'Toxic', artist: 'Britney Spears' },
      { title: 'Umbrella', artist: 'Rihanna' },
      { title: 'Beautiful Day', artist: 'U2' },
      { title: 'Clocks', artist: 'Coldplay' },
      { title: 'The Scientist', artist: 'Coldplay' },
      { title: 'Fix You', artist: 'Coldplay' },
      { title: 'Seven Nation Army', artist: 'The White Stripes' },
      { title: 'Harder Better Faster Stronger', artist: 'Daft Punk' },
      { title: 'Crazy', artist: 'Gnarls Barkley' },
      { title: 'Rehab', artist: 'Amy Winehouse' },
      { title: 'Some Unholy War', artist: 'Amy Winehouse' },
      { title: '99 Problems', artist: 'Jay-Z' },
      { title: 'Yeah!', artist: 'Usher' },
      { title: 'Hips Don\'t Lie', artist: 'Shakira' },
      { title: 'Mr. Brightside', artist: 'The Killers' },
      { title: 'Somebody Told Me', artist: 'The Killers' },
      { title: 'Poker Face', artist: 'Lady Gaga' },
      { title: 'Just Dance', artist: 'Lady Gaga' },
      { title: 'Gold Digger', artist: 'Kanye West' },
      { title: 'Stronger', artist: 'Kanye West' },
      { title: 'Beautiful', artist: 'Christina Aguilera' },
      { title: 'Vertigo', artist: 'U2' },
      { title: 'Moi Lolita', artist: 'Alizée' },
      { title: 'En apesanteur', artist: 'Calogero' },
      { title: 'Toi + Moi', artist: 'Grégoire' },
      { title: 'La Boulette', artist: "Diam's" },
    ]
  },
  {
    id: 'annees2010', label: 'Années 2010', emoji: '📷',
    tracks: [
      { title: 'Rolling in the Deep', artist: 'Adele' },
      { title: 'Someone Like You', artist: 'Adele' },
      { title: 'Happy', artist: 'Pharrell Williams' },
      { title: 'Uptown Funk', artist: 'Mark Ronson' },
      { title: 'Shape of You', artist: 'Ed Sheeran' },
      { title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
      { title: 'Get Lucky', artist: 'Daft Punk' },
      { title: 'Gangnam Style', artist: 'PSY' },
      { title: 'Alors on danse', artist: 'Stromae' },
      { title: 'Papaoutai', artist: 'Stromae' },
      { title: 'Formidable', artist: 'Stromae' },
      { title: 'Dernière danse', artist: 'Indila' },
      { title: 'Saint Claude', artist: 'Christine and the Queens' },
      { title: 'Closer', artist: 'The Chainsmokers' },
      { title: 'Despacito', artist: 'Luis Fonsi' },
      { title: 'Sorry', artist: 'Justin Bieber' },
      { title: 'Love Yourself', artist: 'Justin Bieber' },
      { title: 'Work', artist: 'Rihanna' },
      { title: 'Diamonds', artist: 'Rihanna' },
      { title: 'Shake It Off', artist: 'Taylor Swift' },
      { title: 'Blank Space', artist: 'Taylor Swift' },
      { title: "Can't Feel My Face", artist: 'The Weeknd' },
      { title: 'Starboy', artist: 'The Weeknd' },
      { title: "God's Plan", artist: 'Drake' },
      { title: 'One Dance', artist: 'Drake' },
      { title: 'Old Town Road', artist: 'Lil Nas X' },
      { title: 'Bad Guy', artist: 'Billie Eilish' },
      { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
      { title: 'Sicko Mode', artist: 'Travis Scott' },
      { title: 'Levels', artist: 'Avicii' },
      { title: 'Wake Me Up', artist: 'Avicii' },
    ]
  },
  {
    id: 'annees2020', label: 'Années 2020', emoji: '🔥',
    tracks: [
      { title: 'Blinding Lights', artist: 'The Weeknd' },
      { title: 'Levitating', artist: 'Dua Lipa' },
      { title: "Don't Start Now", artist: 'Dua Lipa' },
      { title: 'As It Was', artist: 'Harry Styles' },
      { title: 'Watermelon Sugar', artist: 'Harry Styles' },
      { title: 'drivers license', artist: 'Olivia Rodrigo' },
      { title: 'good 4 u', artist: 'Olivia Rodrigo' },
      { title: 'STAY', artist: 'The Kid LAROI' },
      { title: 'Montero', artist: 'Lil Nas X' },
      { title: 'Industry Baby', artist: 'Lil Nas X' },
      { title: 'Easy On Me', artist: 'Adele' },
      { title: 'Save Your Tears', artist: 'The Weeknd' },
      { title: 'Bad Habits', artist: 'Ed Sheeran' },
      { title: 'Flowers', artist: 'Miley Cyrus' },
      { title: 'About Damn Time', artist: 'Lizzo' },
      { title: 'Rich Flex', artist: 'Drake' },
      { title: 'Butter', artist: 'BTS' },
      { title: 'Peaches', artist: 'Justin Bieber' },
      { title: 'Shivers', artist: 'Ed Sheeran' },
      { title: 'Cold Heart', artist: 'Elton John' },
      { title: 'Djadja', artist: 'Aya Nakamura' },
      { title: 'Pookie', artist: 'Aya Nakamura' },
      { title: 'Balance ton quoi', artist: 'Angèle' },
      { title: 'Tout oublier', artist: 'Angèle' },
      { title: 'Jusqu\'au dernier gramme', artist: 'PNL' },
      { title: 'Running Up That Hill', artist: 'Kate Bush' },
      { title: 'Kill Bill', artist: 'SZA' },
      { title: 'Cruel Summer', artist: 'Taylor Swift' },
    ]
  },
  {
    id: 'pop', label: 'Pop', emoji: '⭐',
    tracks: [
      { title: 'Bad Romance', artist: 'Lady Gaga' },
      { title: 'Poker Face', artist: 'Lady Gaga' },
      { title: 'Born This Way', artist: 'Lady Gaga' },
      { title: 'Telephone', artist: 'Lady Gaga' },
      { title: 'Shake It Off', artist: 'Taylor Swift' },
      { title: 'Blank Space', artist: 'Taylor Swift' },
      { title: 'Anti-Hero', artist: 'Taylor Swift' },
      { title: 'Cruel Summer', artist: 'Taylor Swift' },
      { title: 'Levitating', artist: 'Dua Lipa' },
      { title: "Don't Start Now", artist: 'Dua Lipa' },
      { title: 'New Rules', artist: 'Dua Lipa' },
      { title: 'drivers license', artist: 'Olivia Rodrigo' },
      { title: 'As It Was', artist: 'Harry Styles' },
      { title: 'What Makes You Beautiful', artist: 'One Direction' },
      { title: 'Story of My Life', artist: 'One Direction' },
      { title: 'Stay With Me', artist: 'Sam Smith' },
      { title: 'Papaoutai', artist: 'Stromae' },
      { title: 'Alors on danse', artist: 'Stromae' },
      { title: 'Royals', artist: 'Lorde' },
      { title: 'Rolling in the Deep', artist: 'Adele' },
      { title: 'Hello', artist: 'Adele' },
      { title: 'Shape of You', artist: 'Ed Sheeran' },
      { title: 'Perfect', artist: 'Ed Sheeran' },
      { title: 'Happy', artist: 'Pharrell Williams' },
      { title: 'Uptown Funk', artist: 'Mark Ronson' },
      { title: 'Blinding Lights', artist: 'The Weeknd' },
      { title: 'Diamonds', artist: 'Rihanna' },
      { title: 'Djadja', artist: 'Aya Nakamura' },
      { title: 'Dernière danse', artist: 'Indila' },
      { title: 'Saint Claude', artist: 'Christine and the Queens' },
      { title: 'Balance ton quoi', artist: 'Angèle' },
      { title: 'I Kissed a Girl', artist: 'Katy Perry' },
      { title: 'Roar', artist: 'Katy Perry' },
      { title: 'Firework', artist: 'Katy Perry' },
      { title: 'Wrecking Ball', artist: 'Miley Cyrus' },
      { title: 'Moi Lolita', artist: 'Alizée' },
      { title: 'Libertine', artist: 'Mylène Farmer' },
      { title: 'Voyage Voyage', artist: 'Desireless' },
    ]
  },
  {
    id: 'rock', label: 'Rock', emoji: '🎸',
    tracks: [
      { title: 'Bohemian Rhapsody', artist: 'Queen' },
      { title: "Don't Stop Me Now", artist: 'Queen' },
      { title: 'We Will Rock You', artist: 'Queen' },
      { title: 'Somebody to Love', artist: 'Queen' },
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { title: 'Come As You Are', artist: 'Nirvana' },
      { title: 'Hotel California', artist: 'Eagles' },
      { title: 'Sweet Child O Mine', artist: 'Guns N Roses' },
      { title: 'Paradise City', artist: 'Guns N Roses' },
      { title: 'Welcome to the Jungle', artist: 'Guns N Roses' },
      { title: 'November Rain', artist: 'Guns N Roses' },
      { title: 'Enter Sandman', artist: 'Metallica' },
      { title: 'Nothing Else Matters', artist: 'Metallica' },
      { title: 'Master of Puppets', artist: 'Metallica' },
      { title: 'Under the Bridge', artist: 'Red Hot Chili Peppers' },
      { title: 'Californication', artist: 'Red Hot Chili Peppers' },
      { title: 'Seven Nation Army', artist: 'The White Stripes' },
      { title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
      { title: 'Whole Lotta Love', artist: 'Led Zeppelin' },
      { title: 'Back in Black', artist: 'AC/DC' },
      { title: 'Highway to Hell', artist: 'AC/DC' },
      { title: 'Thunderstruck', artist: 'AC/DC' },
      { title: 'Wonderwall', artist: 'Oasis' },
      { title: "Don't Look Back in Anger", artist: 'Oasis' },
      { title: 'Boulevard of Broken Dreams', artist: 'Green Day' },
      { title: 'American Idiot', artist: 'Green Day' },
      { title: 'Mr. Brightside', artist: 'The Killers' },
      { title: 'In the End', artist: 'Linkin Park' },
      { title: 'Numb', artist: 'Linkin Park' },
      { title: 'Eye of the Tiger', artist: 'Survivor' },
      { title: "L'Aventurier", artist: 'Indochine' },
      { title: '3ème Sexe', artist: 'Indochine' },
      { title: 'Le vent nous portera', artist: 'Noir Désir' },
      { title: 'Un autre monde', artist: 'Téléphone' },
    ]
  },
  {
    id: 'rap', label: 'Rap & Hip-Hop', emoji: '🎤',
    tracks: [
      { title: 'Lose Yourself', artist: 'Eminem' },
      { title: 'Slim Shady', artist: 'Eminem' },
      { title: 'Without Me', artist: 'Eminem' },
      { title: '99 Problems', artist: 'Jay-Z' },
      { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
      { title: 'Alright', artist: 'Kendrick Lamar' },
      { title: "God's Plan", artist: 'Drake' },
      { title: 'One Dance', artist: 'Drake' },
      { title: 'Hotline Bling', artist: 'Drake' },
      { title: 'Old Town Road', artist: 'Lil Nas X' },
      { title: 'Montero', artist: 'Lil Nas X' },
      { title: "Gangsta's Paradise", artist: 'Coolio' },
      { title: 'California Love', artist: '2Pac' },
      { title: 'Juicy', artist: 'The Notorious B.I.G.' },
      { title: 'Mo Money Mo Problems', artist: 'The Notorious B.I.G.' },
      { title: 'Gold Digger', artist: 'Kanye West' },
      { title: 'Stronger', artist: 'Kanye West' },
      { title: 'Sicko Mode', artist: 'Travis Scott' },
      { title: 'Goosebumps', artist: 'Travis Scott' },
      { title: 'Rockstar', artist: 'Post Malone' },
      { title: 'Congratulations', artist: 'Post Malone' },
      { title: 'Sunflower', artist: 'Post Malone' },
      { title: 'Rich Flex', artist: 'Drake' },
      { title: 'Mask Off', artist: 'Future' },
      { title: 'Nuthin But a G Thang', artist: 'Dr. Dre' },
      { title: 'Hypnotize', artist: 'The Notorious B.I.G.' },
      { title: 'Walk This Way', artist: 'Run-DMC' },
      { title: 'Kill Bill', artist: 'SZA' },
      { title: 'Jusqu\'au dernier gramme', artist: 'PNL' },
      { title: 'La Vie est Belle', artist: 'PNL' },
      { title: 'Foufoune', artist: 'Nekfeu' },
      { title: 'Millions', artist: 'Ninho' },
      { title: 'Bella', artist: 'Maître Gims' },
      { title: 'Macarena', artist: 'Damso' },
      { title: 'Autotune', artist: 'Damso' },
      { title: 'Morose', artist: 'Damso' },
      { title: 'Caroline', artist: 'MC Solaar' },
      { title: 'Qui sème le vent récolte le tempo', artist: 'MC Solaar' },
      { title: 'Je danse le Mia', artist: 'IAM' },
      { title: 'Seine-Saint-Denis Style', artist: 'NTM' },
      { title: 'La Boulette', artist: "Diam's" },
    ]
  },
  {
    id: 'jazz', label: 'Jazz', emoji: '🎷',
    tracks: [
      { title: 'Take Five', artist: 'Dave Brubeck' },
      { title: 'So What', artist: 'Miles Davis' },
      { title: 'Autumn Leaves', artist: 'Bill Evans' },
      { title: 'Round Midnight', artist: 'Thelonious Monk' },
      { title: 'Blue in Green', artist: 'Miles Davis' },
      { title: 'Fly Me to the Moon', artist: 'Frank Sinatra' },
      { title: 'The Way You Look Tonight', artist: 'Frank Sinatra' },
      { title: 'My Way', artist: 'Frank Sinatra' },
      { title: 'New York New York', artist: 'Frank Sinatra' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong' },
      { title: 'La Vie en Rose', artist: 'Louis Armstrong' },
      { title: 'Georgia on My Mind', artist: 'Ray Charles' },
      { title: 'Hit the Road Jack', artist: 'Ray Charles' },
      { title: 'Feeling Good', artist: 'Nina Simone' },
      { title: "Ain't Got No", artist: 'Nina Simone' },
      { title: 'Summertime', artist: 'Ella Fitzgerald' },
      { title: 'Dream a Little Dream of Me', artist: 'Ella Fitzgerald' },
      { title: 'Come Fly with Me', artist: 'Frank Sinatra' },
      { title: 'Watermelon Man', artist: 'Herbie Hancock' },
      { title: 'Cantaloupe Island', artist: 'Herbie Hancock' },
      { title: 'Chameleon', artist: 'Herbie Hancock' },
      { title: 'Birdland', artist: 'Weather Report' },
      { title: 'Giant Steps', artist: 'John Coltrane' },
      { title: 'A Love Supreme', artist: 'John Coltrane' },
      { title: 'My Favorite Things', artist: 'John Coltrane' },
      { title: 'Girl from Ipanema', artist: 'Stan Getz' },
      { title: 'Desafinado', artist: 'Joao Gilberto' },
      { title: 'Strange Fruit', artist: 'Billie Holiday' },
      { title: 'Misty', artist: 'Erroll Garner' },
      { title: 'Spain', artist: 'Chick Corea' },
      { title: 'Struttin With Some Barbecue', artist: 'Louis Armstrong' },
      { title: 'In a Mellow Tone', artist: 'Duke Ellington' },
    ]
  },
  {
    id: 'electro', label: 'Électro', emoji: '🎧',
    tracks: [
      { title: 'Get Lucky', artist: 'Daft Punk' },
      { title: 'Harder Better Faster Stronger', artist: 'Daft Punk' },
      { title: 'One More Time', artist: 'Daft Punk' },
      { title: 'Around the World', artist: 'Daft Punk' },
      { title: 'Da Funk', artist: 'Daft Punk' },
      { title: 'Sandstorm', artist: 'Darude' },
      { title: 'Clarity', artist: 'Zedd' },
      { title: 'Animals', artist: 'Martin Garrix' },
      { title: 'Lean On', artist: 'Major Lazer' },
      { title: 'Titanium', artist: 'David Guetta' },
      { title: 'Without You', artist: 'David Guetta' },
      { title: 'Turn Me On', artist: 'David Guetta' },
      { title: 'Levels', artist: 'Avicii' },
      { title: 'Wake Me Up', artist: 'Avicii' },
      { title: 'Hey Brother', artist: 'Avicii' },
      { title: 'Waiting For Love', artist: 'Avicii' },
      { title: "Don't You Worry Child", artist: 'Swedish House Mafia' },
      { title: 'Feel So Close', artist: 'Calvin Harris' },
      { title: 'Summer', artist: 'Calvin Harris' },
      { title: 'Promises', artist: 'Calvin Harris' },
      { title: 'Scary Monsters and Nice Sprites', artist: 'Skrillex' },
      { title: 'Bangarang', artist: 'Skrillex' },
      { title: 'Blue Da Ba Dee', artist: 'Eiffel 65' },
      { title: 'Kernkraft 400', artist: 'Zombie Nation' },
      { title: 'Ghosts n Stuff', artist: 'Deadmau5' },
      { title: 'Where Are U Now', artist: 'Skrillex' },
      { title: 'Midnight City', artist: 'M83' },
      { title: 'One', artist: 'Swedish House Mafia' },
      { title: 'D.A.N.C.E.', artist: 'Justice' },
      { title: 'Audio Video Disco', artist: 'Justice' },
      { title: 'Nightcall', artist: 'Kavinsky' },
      { title: 'Baby I\'m Yours', artist: 'Breakbot' },
    ]
  },
  {
    id: 'jeuxvideo', label: 'Jeux vidéo', emoji: '🎮',
    tracks: [
      { title: 'Megalovania', artist: 'Undertale' },
      { title: 'Bloody Tears', artist: 'Castlevania' },
      { title: 'Snake Eater', artist: 'Metal Gear Solid 3' },
      { title: 'Dragonborn', artist: 'Skyrim' },
      { title: 'Geralt of Rivia', artist: 'The Witcher' },
      { title: 'Toss a Coin to Your Witcher', artist: 'The Witcher' },
      { title: 'One Winged Angel', artist: 'Final Fantasy VII' },
      { title: 'To Zanarkand', artist: 'Final Fantasy X' },
      { title: 'Dearly Beloved', artist: 'Kingdom Hearts' },
      { title: 'Life Will Change', artist: 'Persona 5' },
      { title: 'Weight of the World', artist: 'Nier Automata' },
      { title: 'Sweden', artist: 'Minecraft' },
      { title: 'Subwoofer Lullaby', artist: 'Minecraft' },
      { title: 'Resurrections', artist: 'Celeste' },
      { title: 'City of Tears', artist: 'Hollow Knight' },
      { title: 'Corridor of Time', artist: 'Chrono Trigger' },
      { title: 'Ezios Family', artist: "Assassin's Creed" },
      { title: 'Still Alive', artist: 'Portal' },
      { title: 'Want You Gone', artist: 'Portal 2' },
      { title: 'Baba Yetu', artist: 'Civilization IV' },
      { title: 'Halo Main Theme', artist: 'Halo' },
      { title: 'Jump Up Super Star', artist: 'Super Mario Odyssey' },
      { title: 'Green Hill Zone', artist: 'Sonic the Hedgehog' },
      { title: 'Guren no Yumiya', artist: "L'Attaque des Titans" },
      { title: 'Unravel', artist: 'Tokyo Ghoul' },
      { title: 'A Cruel Angels Thesis', artist: 'Evangelion' },
      { title: 'Tank!', artist: 'Cowboy Bebop' },
      { title: 'Blue Bird', artist: 'Naruto' },
      { title: 'Again', artist: 'Fullmetal Alchemist Brotherhood' },
      { title: 'Pokémon Theme', artist: 'Pokemon' },
      { title: 'Star Wars Main Theme', artist: 'Star Wars' },
    ]
  },
  {
    id: 'series', label: 'Séries TV', emoji: '📺',
    tracks: [
      { title: 'Game of Thrones Main Theme', artist: 'Game of Thrones' },
      { title: 'Baby Blue', artist: 'Breaking Bad' },
      { title: "I'll Be There for You", artist: 'Friends' },
      { title: 'Red Right Hand', artist: 'Peaky Blinders' },
      { title: 'My Life Is Going On', artist: 'La Casa de Papel' },
      { title: 'Tuyo', artist: 'Narcos' },
      { title: 'Toss a Coin to Your Witcher', artist: 'The Witcher' },
      { title: 'Pink Soldiers', artist: 'Squid Game' },
      { title: 'All For Us', artist: 'Euphoria' },
      { title: 'Far From Any Road', artist: 'True Detective' },
      { title: 'This Life', artist: 'Sons of Anarchy' },
      { title: 'Goodbye', artist: 'Dark' },
      { title: 'Agatha All Along', artist: 'WandaVision' },
      { title: 'Long Long Time', artist: 'The Last of Us' },
      { title: 'Falling', artist: 'Twin Peaks' },
      { title: 'Succession Main Title', artist: 'Succession' },
      { title: 'Anyone Who Knows What Love Is', artist: 'Black Mirror' },
      { title: 'Woke Up This Morning', artist: 'Les Soprano' },
      { title: 'Get Some', artist: 'The Boys' },
      { title: 'Teardrop', artist: 'House M.D.' },
      { title: 'Chernobyl Main Theme', artist: 'Chernobyl' },
      { title: 'Main Title Dexter', artist: 'Dexter' },
      { title: 'Mandalorian Theme', artist: 'Le Mandalorien' },
      { title: 'Flower', artist: 'Sur Écoute' },
      { title: 'Paint It Black', artist: 'Westworld' },
      { title: 'Walking Dead Main Theme', artist: 'The Walking Dead' },
      { title: 'Sherlock Theme', artist: 'Sherlock' },
      { title: 'House of Cards Theme', artist: 'House of Cards' },
      { title: 'The Crown Theme', artist: 'The Crown' },
      { title: 'Ozark Main Theme', artist: 'Ozark' },
      { title: 'Killing Eve Theme', artist: 'Killing Eve' },
    ]
  },
  {
    id: 'films', label: 'Films', emoji: '🎬',
    tracks: [
      { title: 'Interstellar Main Theme', artist: 'Interstellar' },
      { title: 'Star Wars Main Theme', artist: 'Star Wars' },
      { title: "He's a Pirate", artist: 'Pirates des Caraïbes' },
      { title: 'Jurassic Park Theme', artist: 'Jurassic Park' },
      { title: 'Time', artist: 'Inception' },
      { title: 'Avengers Theme', artist: 'Avengers' },
      { title: 'The Good The Bad and The Ugly', artist: 'Le Bon la Brute et le Truand' },
      { title: 'Pink Panther Theme', artist: 'La Panthère Rose' },
      { title: 'Mission Impossible Theme', artist: 'Mission Impossible' },
      { title: 'Indiana Jones Theme', artist: 'Indiana Jones' },
      { title: 'Concerning Hobbits', artist: 'Le Seigneur des Anneaux' },
      { title: 'Beauty and the Beast', artist: 'La Belle et la Bête' },
      { title: 'Can You Feel the Love Tonight', artist: 'Le Roi Lion' },
      { title: "You'll Be in My Heart", artist: 'Tarzan' },
      { title: 'Now We Are Free', artist: 'Gladiator' },
      { title: 'Chariots of Fire', artist: 'Les Chariots de Feu' },
      { title: 'Godfather Love Theme', artist: 'Le Parrain' },
      { title: 'Married Life', artist: 'Là-haut' },
      { title: 'Let It Go', artist: 'La Reine des Neiges' },
      { title: 'Under the Sea', artist: 'La Petite Sirène' },
      { title: 'Circle of Life', artist: 'Le Roi Lion' },
      { title: 'Back to the Future Theme', artist: 'Retour vers le Futur' },
      { title: 'Jaws Theme', artist: 'Les Dents de la Mer' },
      { title: 'Cinema Paradiso', artist: 'Cinema Paradiso' },
      { title: 'Derezzed', artist: 'Tron Legacy' },
      { title: 'My Heart Will Go On', artist: 'Titanic' },
      { title: 'Ghostbusters', artist: 'SOS Fantômes' },
      { title: 'Danger Zone', artist: 'Top Gun' },
      { title: 'James Bond Theme', artist: 'James Bond' },
      { title: "Schindler's List Theme", artist: 'La Liste de Schindler' },
      { title: 'Eye of the Tiger', artist: 'Rocky' },
      { title: 'Superman Theme', artist: 'Superman' },
    ]
  },
  {
    id: 'anime', label: 'Animé / Manga', emoji: '⛩️',
    tracks: [
      { title: 'Guren no Yumiya', artist: "L'Attaque des Titans" },
      { title: 'The Rumbling', artist: "L'Attaque des Titans" },
      { title: 'Call of Silence', artist: "L'Attaque des Titans" },
      { title: 'A Cruel Angels Thesis', artist: 'Evangelion' },
      { title: 'Fly Me to the Moon', artist: 'Evangelion' },
      { title: 'Blue Bird', artist: 'Naruto' },
      { title: 'Silhouette', artist: 'Naruto' },
      { title: 'Tank!', artist: 'Cowboy Bebop' },
      { title: 'Unravel', artist: 'Tokyo Ghoul' },
      { title: 'Again', artist: 'Fullmetal Alchemist Brotherhood' },
      { title: 'Gurenge', artist: 'Demon Slayer' },
      { title: 'Peace Sign', artist: 'My Hero Academia' },
      { title: 'Odd Future', artist: 'My Hero Academia' },
      { title: 'We Are!', artist: 'One Piece' },
      { title: 'Crossing Field', artist: 'Sword Art Online' },
      { title: 'Resonance', artist: 'Soul Eater' },
      { title: 'Sugar Song and Bitter Step', artist: 'Kekkai Sensen' },
      { title: 'Hikaru Nara', artist: 'Your Lie in April' },
      { title: 'Kaikai Kitan', artist: 'Jujutsu Kaisen' },
      { title: 'The Hero', artist: 'One Punch Man' },
      { title: 'Cha-La Head-Cha-La', artist: 'Dragon Ball Z' },
      { title: 'Sadame', artist: 'Berserk' },
      { title: 'Renai Circulation', artist: 'Bakemonogatari' },
      { title: 'Pokémon Theme', artist: 'Pokémon' },
      { title: 'Digimon Adventure', artist: 'Digimon' },
      { title: 'Captain Tsubasa Theme', artist: 'Olive et Tom' },
      { title: 'Goldorak Theme', artist: 'Goldorak' },
      { title: 'Inner Universe', artist: 'Ghost in the Shell' },
      { title: 'Platinum', artist: 'Cardcaptor Sakura' },
      { title: 'Brave Shine', artist: 'Fate Stay Night' },
      { title: 'Crossing Fields', artist: 'Sword Art Online' },
      { title: 'Into the Night', artist: 'Fairy Tail' },
    ]
  },
  {
    id: 'cartoons', label: 'Dessins animés', emoji: '🐭',
    tracks: [
      { title: 'The Simpsons Theme', artist: 'Les Simpsons' },
      { title: 'Family Guy Theme', artist: 'Les Griffin' },
      { title: 'South Park Theme', artist: 'South Park' },
      { title: 'Futurama Theme', artist: 'Futurama' },
      { title: 'DuckTales Theme', artist: 'La Bande à Picsou' },
      { title: 'Teenage Mutant Ninja Turtles Theme', artist: 'Les Tortues Ninja' },
      { title: 'Batman Animated Series Theme', artist: 'Batman' },
      { title: 'Spider-Man Theme', artist: 'Spider-Man' },
      { title: 'X-Men Theme', artist: 'X-Men' },
      { title: 'Scooby-Doo Theme', artist: 'Scooby-Doo' },
      { title: 'Adventure Time Theme', artist: "L'Heure de l'Aventure" },
      { title: 'Gravity Falls Theme', artist: 'Gravity Falls' },
      { title: 'Steven Universe Theme', artist: 'Steven Universe' },
      { title: 'Avatar Theme', artist: 'Avatar le dernier maître de l\'air' },
      { title: 'Miraculous Ladybug Theme', artist: 'Miraculous Ladybug' },
      { title: 'Les Schtroumpfs Theme', artist: 'Les Schtroumpfs' },
      { title: 'Asterix Theme', artist: 'Astérix' },
      { title: 'Lucky Luke Theme', artist: 'Lucky Luke' },
      { title: 'Tintin Theme', artist: 'Tintin' },
      { title: 'Inspecteur Gadget Theme', artist: 'Inspecteur Gadget' },
      { title: 'Looney Tunes Theme', artist: 'Les Looney Tunes' },
      { title: 'Winnie the Pooh Theme', artist: "Winnie l'Ourson" },
      { title: 'Rick and Morty Theme', artist: 'Rick et Morty' },
      { title: 'Totally Spies Theme', artist: 'Totally Spies' },
      { title: 'Bluey Theme', artist: 'Bluey' },
      { title: 'Rugrats Theme', artist: 'Les Razmokets' },
      { title: 'Hey Arnold Theme', artist: 'Arnold' },
      { title: 'Recess Theme', artist: 'Recess' },
      { title: 'Kim Possible Theme', artist: 'Kim Possible' },
      { title: 'Phineas and Ferb Theme', artist: 'Phinéas et Ferb' },
      { title: 'Peppa Pig Theme', artist: 'Peppa Pig' },
      { title: 'Paw Patrol Theme', artist: "La Pat' Patrouille" },
    ]
  },
  {
    id: 'hardcore', label: 'Hardcore Mix', emoji: '☠️',
    tracks: [
      { title: 'Bohemian Rhapsody', artist: 'Queen' },
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
      { title: 'Interstellar Main Theme', artist: 'Hans Zimmer' },
      { title: 'Take Five', artist: 'Dave Brubeck' },
      { title: 'Megalovania', artist: 'Toby Fox' },
      { title: 'Game of Thrones Main Theme', artist: 'Ramin Djawadi' },
      { title: 'Get Lucky', artist: 'Daft Punk' },
      { title: "Gangsta's Paradise", artist: 'Coolio' },
      { title: 'Sandstorm', artist: 'Darude' },
      { title: 'Take On Me', artist: 'a-ha' },
      { title: 'Wannabe', artist: 'Spice Girls' },
      { title: 'Crazy in Love', artist: 'Beyonce' },
      { title: 'Blinding Lights', artist: 'The Weeknd' },
      { title: 'drivers license', artist: 'Olivia Rodrigo' },
      { title: 'Nothing Else Matters', artist: 'Metallica' },
      { title: 'Feeling Good', artist: 'Nina Simone' },
      { title: 'My Life Is Going On', artist: 'Cecilia Krull' },
      { title: 'Pink Soldiers', artist: 'Jung Jae-il' },
      { title: 'Star Wars Main Theme', artist: 'John Williams' },
      { title: 'One Dance', artist: 'Drake' },
      { title: 'Levels', artist: 'Avicii' },
      { title: 'Snake Eater', artist: 'Cynthia Harrell' },
      { title: 'My Way', artist: 'Frank Sinatra' },
      { title: 'Rolling in the Deep', artist: 'Adele' },
      { title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
      { title: 'Anti-Hero', artist: 'Taylor Swift' },
      { title: 'Harder Better Faster Stronger', artist: 'Daft Punk' },
      { title: 'California Love', artist: '2Pac' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong' },
      { title: 'My Heart Will Go On', artist: 'Celine Dion' },
      { title: 'Dragonborn', artist: 'Jeremy Soule' },
      { title: 'Crazy', artist: 'Gnarls Barkley' },
      { title: 'Let It Go', artist: 'Idina Menzel' },
      { title: 'Africa', artist: 'Toto' },
      { title: 'Old Town Road', artist: 'Lil Nas X' },
      { title: 'Chameleon', artist: 'Herbie Hancock' },
      { title: "I'll Be There for You", artist: 'The Rembrandts' },
      { title: 'Back in Black', artist: 'AC/DC' },
      { title: 'Bad Romance', artist: 'Lady Gaga' },
    ]
  },
];

/* =========================================================================
   ÉTAT GLOBAL DU JEU
   Toutes les briques lisent/écrivent dans cet objet partagé.
   ========================================================================= */
const GAME = {
  screen:       'menu',
  players:      [],
  recogIndex:   0,
  round:        1,
  totalRounds:  5,
  menuMusicOn:   true,
  selectedTheme: null, // thème choisi dans l'écran de sélection — tracks disponibles via GAME.selectedTheme.tracks
};

let _playedTrackTitles = new Set();
let _buzzTimerInterval = null;

/* =========================================================================
   CAMÉRA & DÉTECTION — variables module (Membre 2)
   ========================================================================= */
let _camStream    = null;   // stream getUserMedia partagé entre les écrans
let _mpHands      = null;   // instance MediaPipe Hands active
let _mpCamera     = null;   // instance Camera MediaPipe active
let _buzzCooldown = false;  // anti-rebond buzz en jeu
const _playerZones = [];    // coord x de la main de chaque joueur (phase recog)

async function _startRecogDetection() {
  const video = document.getElementById('recogVideo');
  if (!_camStream) {
    try {
      _camStream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
      console.error('[camera] getUserMedia échec (recog) :', err);
      return;
    }
  }
  video.srcObject = _camStream;

  let cooldown = false;
  _initHandDetection(video, (detected, landmarks) => {
    if (!detected || cooldown || GAME.screen !== 'recog') return;
    cooldown = true;
    _playerZones[GAME.recogIndex] = landmarks[0].x;
    playerRecognized();
    setTimeout(() => { cooldown = false; }, 1500);
  });
}

function _startGameDetection() {
  const video = document.getElementById('recogVideo');
  _initHandDetection(video, (detected, landmarks) => {
    if (!detected || _buzzCooldown || GAME.screen !== 'game') return;
    _buzzCooldown = true;

    let playerIndex = 0;
    if (_playerZones.length > 0 && landmarks) {
      const handX = landmarks[0].x;
      let minDist = Infinity;
      _playerZones.forEach((zx, i) => {
        const dist = Math.abs(zx - handX);
        if (dist < minDist) { minDist = dist; playerIndex = i; }
      });
    }

    onPlayerBuzz(playerIndex);
    setTimeout(() => { _buzzCooldown = false; }, 2000);
  });
}

function _stopHandDetection() {
  if (_mpCamera) {
    _mpCamera.stop();
    _mpCamera = null;
  }
  if (_mpHands) {
    _mpHands.close();
    _mpHands = null;
  }
}

// onHandResult(detected: bool, landmarks: array|null)
// detected = true si poignet (landmark 0) dans le demi-haut de l'image (y < 0.5)
function _initHandDetection(videoEl, onHandResult) {
  _stopHandDetection();

  _mpHands = new Hands({
    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
  });

  _mpHands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.45,
    minTrackingConfidence: 0.45
  });

  _mpHands.onResults(results => {
    const landmarks = results.multiHandLandmarks?.[0] ?? null;
    let detected = false;

    if (landmarks !== null) {
      const highestPoint = Math.min(...landmarks.map(point => point.y));

      detected = highestPoint < 0.75;
    }

    onHandResult(detected, landmarks);
  });

  _mpCamera = new Camera(videoEl, {
    onFrame: async () => {
      await _mpHands.send({ image: videoEl });
    },
    width: 640,
    height: 480
  });

  _mpCamera.start();
}

/* =========================================================================
   NAVIGATION ENTRE ÉCRANS (machine à états)
   go('menu' | 'settings' | 'config' | 'recog' | 'game')
   ========================================================================= */
function go(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screen).classList.add('active');
  GAME.screen = screen;
  if (screen === 'config') renderPlayerInputs();
  if (screen === 'theme')  renderThemeGrid();
  if (screen === 'end')    renderEndScreen();
  if (screen === 'menu') { const m = document.getElementById('menuMusic'); if (m && GAME.menuMusicOn) m.play().catch(() => {}); }
  document.getElementById('debugBar').style.display =
    (screen === 'game' || screen === 'result') ? 'flex' : 'none';
}

/* =========================================================================
   ÉCRAN PARAMÈTRES  —  helpers partagés
   setStatus('camStatus'|'micStatus', true/false) met à jour le badge.
   ========================================================================= */
function setStatus(id, ok) {
  const el = document.getElementById(id);
  el.classList.remove('ok', 'err');
  if (ok === true)  { el.classList.add('ok');  el.textContent = '✓ Fonctionne'; }
  else if (ok === false) { el.classList.add('err'); el.textContent = '✗ Problème d\'accès'; }
  else el.textContent = 'Non testé';
}

/* ----- STUBS à remplacer par les membres 2 et 3 ----- */
async function testCamera() {
  const video = document.getElementById('settingsVideo');

  try {
    _camStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    video.srcObject = _camStream;

    video.onloadedmetadata = () => {
      video.play();
      setStatus('camStatus', true);
      setHankMood(false);

      _initHandDetection(video, (detected) => {
        setHankMood(detected);
      });
    };
  } catch (err) {
    console.error('[camera] getUserMedia échec :', err);
    setStatus('camStatus', false);
    setHankMood(false);
  }
}

let _micStream = null;
let _micAudioContext = null;
let _micAnalyser = null;
let _micDataArray = null;
let _micAnimationFrame = null;

async function testMic() {
  const bar = document.getElementById('micLevel');
  const status = document.getElementById('micStatus');

  try {
    _stopMicTest();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('getUserMedia non disponible');
    }

    _micStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });

    const AudioCtx = window.AudioContext || window.webkitAudioContext;

    if (!AudioCtx) {
      throw new Error('AudioContext non disponible');
    }

    _micAudioContext = new AudioCtx();

    if (_micAudioContext.state === 'suspended') {
      await _micAudioContext.resume();
    }

    const source = _micAudioContext.createMediaStreamSource(_micStream);

    _micAnalyser = _micAudioContext.createAnalyser();
    _micAnalyser.fftSize = 2048;
    _micAnalyser.smoothingTimeConstant = 0.75;

    _micDataArray = new Uint8Array(_micAnalyser.fftSize);

    source.connect(_micAnalyser);

    setStatus('micStatus', true);

    if (status !== null) {
      status.textContent = '✓ Micro actif';
    }

    _animateMicLevel();
  } catch (err) {
    console.error('[micro] erreur exacte :', err);

    setStatus('micStatus', false);

    if (status !== null) {
      status.textContent = '✗ Problème micro : ' + err.name;
    }

    if (bar !== null) {
      bar.style.width = '0%';
    }
  }
}

function _animateMicLevel() {
  const bar = document.getElementById('micLevel');

  if (_micAnalyser === null || _micDataArray === null || bar === null) {
    return;
  }

  _micAnalyser.getByteTimeDomainData(_micDataArray);

  let sum = 0;

  for (let i = 0; i < _micDataArray.length; i++) {
    const value = (_micDataArray[i] - 128) / 128;

    sum += value * value;
  }

  const rms = Math.sqrt(sum / _micDataArray.length);
  let level = Math.round(rms * 350);

  if (level < 3) {
    level = 0;
  }

  if (level > 100) {
    level = 100;
  }

  bar.style.width = level + '%';

  _micAnimationFrame = requestAnimationFrame(_animateMicLevel);
}

function _stopMicTest() {
  const bar = document.getElementById('micLevel');

  if (_micAnimationFrame !== null) {
    cancelAnimationFrame(_micAnimationFrame);
    _micAnimationFrame = null;
  }

  if (_micStream !== null) {
    _micStream.getTracks().forEach(track => track.stop());
    _micStream = null;
  }

  if (_micAudioContext !== null && _micAudioContext.state !== 'closed') {
    _micAudioContext.close();
  }

  _micAudioContext = null;
  _micAnalyser = null;
  _micDataArray = null;

  if (bar !== null) {
    bar.style.width = '0%';
  }
}

/* =========================================================================
   ÉCRAN CONFIG JOUEURS
   ========================================================================= */
let pendingCount = 2;
function changePlayerCount(delta) {
  pendingCount = Math.max(2, Math.min(8, pendingCount + delta));
  document.getElementById('playerCount').textContent = pendingCount;
  renderPlayerInputs();
}

let pendingRounds = 5;
function changeRoundCount(delta) {
  pendingRounds = Math.max(1, Math.min(10, pendingRounds + delta));
  document.getElementById('roundCount').textContent = pendingRounds;
}
function renderPlayerInputs() {
  const list = document.getElementById('playersList');
  const existing = [...list.querySelectorAll('input')].map(i => i.value);
  list.innerHTML = '';
  for (let i = 0; i < pendingCount; i++) {
    const row = document.createElement('div');
    row.className = 'player-input';
    row.innerHTML = `<span class="num">${i + 1}</span>
      <input type="text" maxlength="16" placeholder="Pseudo du joueur ${i + 1}"
             value="${existing[i] || ''}">`;
    list.appendChild(row);
  }
}

/* =========================================================================
   PASSAGE CONFIG -> RECONNAISSANCE
   On fige la liste des joueurs dans GAME, puis on démarre la reconnaissance.
   ========================================================================= */
function startRecognition() {
  const inputs = [...document.querySelectorAll('#playersList input')];
  const errEl  = document.getElementById('configError');

  // Réinitialiser les erreurs visuelles
  inputs.forEach(inp => inp.closest('.player-input').classList.remove('error'));
  errEl.classList.remove('visible');

  // Détecter les noms vides
  const empty = inputs.filter(inp => !inp.value.trim());
  if (empty.length) {
    empty.forEach(inp => inp.closest('.player-input').classList.add('error'));
    errEl.textContent = 'Tous les joueurs doivent avoir un pseudo !';
    errEl.classList.add('visible');
    return;
  }

  // Détecter les doublons
  const names = inputs.map(inp => inp.value.trim());
  const seen = new Set();
  const dupes = [];
  names.forEach((n, i) => {
    const key = n.toLowerCase();
    if (seen.has(key)) dupes.push(i);
    else seen.add(key);
  });

  if (dupes.length) {
    dupes.forEach(i => inputs[i].closest('.player-input').classList.add('error'));
    errEl.textContent = 'Deux joueurs ont le même pseudo !';
    errEl.classList.add('visible');
    return;
  }

  GAME.players = names.map(name => ({ name, score: 0 }));
  GAME.recogIndex = 0;
  GAME.totalRounds = pendingRounds;
  go('theme');

  // >>> HOOK Membre 2 : démarrer ici le flux caméra dans #recogCam
  //     et écouter la main levée -> appeler playerRecognized() <<<
}
function showRecogPlayer() {
  const p = GAME.players[GAME.recogIndex];
  document.getElementById('recogName').textContent = p ? p.name : '—';
  document.getElementById('recogProgress').textContent =
    `Joueur ${GAME.recogIndex + 1} / ${GAME.players.length}`;
}
function playerRecognized() {
  GAME.recogIndex++;
  if (GAME.recogIndex >= GAME.players.length) {
    startGame();                    // tout le monde est reconnu
  } else {
    showRecogPlayer();
  }
}

/* =========================================================================
   SÉLECTION DU THÈME
   ========================================================================= */
function renderThemeGrid() {
  const grid = document.getElementById('themeGrid');
  grid.innerHTML = THEMES.map(t => `
    <div class="theme-card" onclick="selectTheme('${t.id}')">
      <span class="theme-emoji">${t.emoji}</span>
      <div class="theme-name">${t.label}</div>
      <div class="theme-count">${t.tracks.length} titres</div>
    </div>
  `).join('');
}

function selectTheme(themeId) {
  GAME.selectedTheme = THEMES.find(t => t.id === themeId);
  go('recog');
  showRecogPlayer();
  _startRecogDetection();
}

/* =========================================================================
   ÉCRAN DE JEU
   ========================================================================= */
function startGame() {
  GAME.round = 1;
  go('game');
  renderScoreboard();
  document.getElementById('roundNum').textContent   = GAME.round;
  document.getElementById('roundTotal').textContent = GAME.totalRounds;
  _startGameDetection();
  _playedTrackTitles = new Set();
  document.getElementById('startRoundBtn').style.display = 'block';
  document.getElementById('gameStatus').textContent = "Prêts ? Appuyez sur C'est parti !";
}
function renderScoreboard() {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = GAME.players
    .map((p, i) => `<span class="score-chip" id="chip-${i}">${p.name} <b>${p.score}</b></span>`)
    .join('');
}

function bumpScore(playerIndex) {
  renderScoreboard();
  const chip = document.getElementById('chip-' + playerIndex);
  if (!chip) return;
  chip.classList.remove('bump');
  void chip.offsetWidth; // force reflow pour relancer l'animation
  chip.classList.add('bump');
  chip.addEventListener('animationend', () => chip.classList.remove('bump'), { once: true });
}

/* =========================================================================
   OVERLAY RÈGLES
   ========================================================================= */
function toggleRules() {
  document.getElementById('rulesOverlay').classList.toggle('active');
}

/* =========================================================================
   CONFETTIS — appelé automatiquement par renderEndScreen()
   ========================================================================= */
function launchConfetti() {
  const wrap = document.getElementById('confettiWrap');
  wrap.innerHTML = '';
  const colors = ['#ffc23c','#ff6b1a','#d4537e','#534ab7','#7be0c0','#fff'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetto';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${10 + Math.random() * 8}px;
      animation-duration: ${1.8 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 1.2}s;
    `;
    wrap.appendChild(el);
  }
}

/* =========================================================================
   HANK FEEDBACK — écran paramètres
   Appelé par le membre 2 en temps réel pendant le test caméra.
   setHankMood(true) = main détectée, setHankMood(false) = rien détecté.
   ========================================================================= */
function setHankMood(detected) {
  document.getElementById('hankFeedback').classList.toggle('detected', detected);
  document.getElementById('hankImg').src = detected ? 'assets/images/hank-happy.png' : 'assets/images/hank-angry.png';
  document.getElementById('hankMsg').textContent = detected ? 'Main détectée, bien joué !' : 'Lève la main, bon sang !';
}

/* =========================================================================
   OVERLAY SAUL GOODMAN — référence pop culture
   Appeler showSaul(true) pour bonne réponse, showSaul(false) pour mauvaise.
   S'efface automatiquement après 2 secondes.
   ========================================================================= */
let _saulTimer = null;
function showSaul(correct) {
  const overlay = document.getElementById('saulOverlay');
  const img     = document.getElementById('saulImg');
  const label   = document.getElementById('saulLabel');

  img.src = correct ? 'assets/images/saul_good.jpg' : 'assets/images/saul_bad.jpg';
  label.textContent = correct ? 'Better Call Saul !' : 'It\'s all bad, man…';
  label.className = 'saul-label ' + (correct ? 'good' : 'bad');

  overlay.classList.add('active');
  clearTimeout(_saulTimer);
  _saulTimer = setTimeout(() => overlay.classList.remove('active'), 2000);
}

/* =========================================================================
   STUBS MEMBRE 4 — logique de jeu
   Ces fonctions sont des bouchons à remplacer. Voir fiches-mission.md.
   ========================================================================= */

async function playAudioClip() {
  const tracks = GAME.selectedTheme.tracks;
  const available = tracks.filter(t => !_playedTrackTitles.has(t.title));
  const pool = available.length > 0 ? available : tracks;
  const track = pool[Math.floor(Math.random() * pool.length)];
  _playedTrackTitles.add(track.title);

  if (!track.previewUrl) {
    try {
      const q = encodeURIComponent(`${track.title} ${track.artist}`);
      const res = await fetch(`https://corsproxy.io/?https://api.deezer.com/search?q=${q}&limit=1`);
      const data = await res.json();
      track.previewUrl = data.data?.[0]?.preview || null;
    } catch (e) {
      console.error('[deezer] fetch error', e);
    }
  }

  GAME.currentTrack = track;
  const audio = document.getElementById('gameAudio');
  if (track.previewUrl) {
    audio.src = track.previewUrl;
    audio.play().catch(e => console.error('[audio] play error', e));
    document.getElementById('vinyl').classList.add('spinning');
    document.getElementById('gameStatus').textContent = "Écoute bien l'extrait…";
  } else {
    document.getElementById('gameStatus').textContent = '⚠ Pas de preview — levez la main quand même !';
  }
}

function startRound() {
  document.getElementById('startRoundBtn').style.display = 'none';
  document.getElementById('roundNum').textContent = GAME.round;
  document.getElementById('roundTotal').textContent = GAME.totalRounds;
  document.getElementById('timer').textContent = '–';
  document.getElementById('timer').classList.remove('urgent');
  document.getElementById('speakerName').textContent = "En attente d'une main levée…";
  document.getElementById('gameStatus').textContent = 'Chargement…';
  playAudioClip();
}

function onPlayerBuzz(playerIndex) {
  // >>> Membre 4 : pausé l'audio, afficher le nom du joueur dans #speakerName,
  //     lancer un countdown 10s dans #timer (ajouter .urgent sous 3s), puis
  //     appeler showRoundResult() à la fin du timer. <<<
  console.log('[STUB] onPlayerBuzz()', playerIndex);
}

function checkAnswer(transcript) {
  // >>> Membres 3 & 4 : comparer transcript à GAME.currentTrack.title / .artist
  //     3 pts si titre OU artiste, 5 pts si les deux.
  //     Appeler bumpScore(playerIndex) si points > 0.
  //     Appeler showSaul(points > 0).
  //     Appeler showRoundResult(track, playerIndex, points). <<<
  console.log('[STUB] checkAnswer()', transcript);
}

function nextRound() {
  // >>> Membre 4 : incrémenter GAME.round, aller à endGame() si terminé,
  //     sinon recharger l'écran game et lancer startRound(). <<<
  console.log('[STUB] nextRound()');
}

// showRoundResult est fourni par le membre 1 — à appeler depuis checkAnswer() ou onPlayerBuzz()
function showRoundResult(track, scorerIndex, points) {
  document.getElementById('resultRound').textContent  = GAME.round;
  document.getElementById('resultTotal').textContent  = GAME.totalRounds;
  document.getElementById('resultTitle').textContent  = track ? track.title  : '—';
  document.getElementById('resultArtist').textContent = track ? track.artist : '—';

  const sc = document.getElementById('resultScorer');
  if (points > 0 && scorerIndex >= 0) {
    sc.innerHTML = `${GAME.players[scorerIndex].name}<br><span class="pts">+${points} pts</span>`;
  } else if (scorerIndex >= 0) {
    sc.innerHTML = `${GAME.players[scorerIndex].name} n'a pas trouvé…`;
  } else {
    sc.innerHTML = 'Personne n\'a répondu…';
  }

  go('result');

  const bar = document.getElementById('resultBar');
  bar.classList.remove('running');
  void bar.offsetWidth;
  bar.classList.add('running');
  // Le bouton "Suivant →" appelle nextRound() — pas d'auto-avance
}

/* =========================================================================
   AUDIO DES MENUS  —  Let's Groove (Membre 4 branche le vrai fichier)
   ========================================================================= */
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

/* =========================================================================
   QUITTER UNE PARTIE EN COURS
   ========================================================================= */
function quitGame() {
  // >>> HOOK Membre 4 : annuler ici les timers en cours <<<
  document.getElementById('gameAudio').pause();
  document.getElementById('vinyl').classList.remove('spinning');
  go('menu');
}

/* =========================================================================
   FIN DE PARTIE
   Appeler endGame() depuis la boucle de jeu (membre 4) quand les manches
   sont épuisées. renderEndScreen() construit le classement depuis GAME.players.
   ========================================================================= */
function endGame() {
  go('end');
}

function renderEndScreen() {
  launchConfetti();
  const sorted = [...GAME.players].sort((a, b) => b.score - a.score);
  const medals = ['🥇', '🥈', '🥉'];

  document.getElementById('winnerBanner').textContent =
    sorted[0].score > 0
      ? `${medals[0]} ${sorted[0].name} remporte la partie !`
      : 'Personne n\'a marqué de point…';

  document.getElementById('podium').innerHTML = sorted.map((p, i) => `
    <div class="podium-row ${i === 0 ? 'winner' : ''}">
      <span class="podium-rank">${medals[i] || i + 1}</span>
      <span class="podium-name">${p.name}</span>
      <span class="podium-score">${p.score} pts</span>
    </div>
  `).join('');
}

function replayGame() {
  GAME.players.forEach(p => p.score = 0);
  GAME.recogIndex = 0;
  GAME.round = 1;
  GAME.selectedTheme = null;
  go('theme');
}

/* ----- initialisation ----- */
renderPlayerInputs();