const films = [
 {
  "id": "278742",
  "title": "Dune : Deuxième partie",
  "year": 2024,
  "genre": "Science-fiction",
  "director": "Denis Villeneuve",
  "runtime": "2 h 46",
  "about": "Sur Arrakis, Paul Atréides rejoint Chani et les Fremen. Entre vengeance et fidélité, il doit choisir quel avenir donner à la planète.",
  "poster": "assets/278742.webp"
 },
 {
  "id": "255238",
  "title": "Parasite",
  "year": 2019,
  "genre": "Thriller",
  "director": "Bong Joon-ho",
  "runtime": "2 h 12",
  "about": "À Séoul, un cours particulier ouvre à la famille Kim les portes de la somptueuse maison des Park.",
  "poster": "assets/255238.webp"
 },
 {
  "id": "207825",
  "title": "The Grand Budapest Hotel",
  "year": 2014,
  "genre": "Comédie",
  "director": "Wes Anderson",
  "runtime": "1 h 40",
  "about": "Un concierge et son jeune protégé se retrouvent mêlés à la disparition d’un tableau dans un palace d’Europe centrale.",
  "poster": "assets/207825.webp"
 },
 {
  "id": "225953",
  "title": "Whiplash",
  "year": 2014,
  "genre": "Drame",
  "director": "Damien Chazelle",
  "runtime": "1 h 47",
  "about": "Un jeune batteur de jazz décroche une place dans l’orchestre d’un professeur aux méthodes brutales.",
  "poster": "assets/225953.webp"
 },
 {
  "id": "114782",
  "title": "Interstellar",
  "year": 2014,
  "genre": "Science-fiction",
  "director": "Christopher Nolan",
  "runtime": "2 h 49",
  "about": "Alors que la Terre devient inhabitable, un père pilote une mission spatiale qui pourrait offrir un avenir à ses enfants.",
  "poster": "assets/114782.webp"
 },
 {
  "id": "37485",
  "title": "Le Voyage de Chihiro",
  "year": 2001,
  "genre": "Animation",
  "director": "Hayao Miyazaki",
  "runtime": "2 h 05",
  "about": "Dans un établissement de bains fréquenté par les esprits, Chihiro cherche le moyen de délivrer ses parents.",
  "poster": "assets/37485.webp"
 },
 {
  "id": "229490",
  "title": "La La Land",
  "year": 2016,
  "genre": "Comédie musicale",
  "director": "Damien Chazelle",
  "runtime": "2 h 08",
  "about": "À Los Angeles, une actrice et un pianiste de jazz tentent de faire une place à leur histoire dans deux carrières naissantes.",
  "poster": "assets/229490.webp"
 },
 {
  "id": "265621",
  "title": "Portrait de la jeune fille en feu",
  "year": 2019,
  "genre": "Drame",
  "director": "Céline Sciamma",
  "runtime": "2 h 02",
  "about": "Une peintre observe en secret la jeune femme dont elle doit réaliser le portrait de mariage.",
  "poster": "assets/265621.webp"
 },
 {
  "id": "211012",
  "title": "The Batman",
  "year": 2022,
  "genre": "Thriller",
  "director": "Matt Reeves",
  "runtime": "2 h 56",
  "about": "À Gotham, une série de crimes conduit Batman à enquêter sur les liens qui unissent les puissants de la ville.",
  "poster": "assets/211012.webp"
 },
 {
  "id": "226509",
  "title": "Premier Contact",
  "year": 2016,
  "genre": "Science-fiction",
  "director": "Denis Villeneuve",
  "runtime": "1 h 56",
  "about": "Une linguiste est appelée à déchiffrer le langage des occupants de mystérieux vaisseaux.",
  "poster": "assets/226509.webp"
 },
 {
  "id": "314885",
  "title": "Perfect Days",
  "year": 2023,
  "genre": "Drame",
  "director": "Wim Wenders",
  "runtime": "2 h 04",
  "about": "Entre travail, cassettes et photographies des arbres, Hirayama compose son quotidien à Tokyo.",
  "poster": "assets/314885.webp"
 },
 {
  "id": "143692",
  "title": "Inception",
  "year": 2010,
  "genre": "Science-fiction",
  "director": "Christopher Nolan",
  "runtime": "2 h 28",
  "about": "Une équipe capable d’entrer dans les rêves accepte une mission délicate : implanter une idée.",
  "poster": "assets/143692.webp"
 },
 {
  "id": "27063",
  "title": "Le Fabuleux Destin d’Amélie Poulain",
  "year": 2001,
  "genre": "Comédie",
  "director": "Jean-Pierre Jeunet",
  "runtime": "2 h 02",
  "about": "À Montmartre, une serveuse imagine de petits stratagèmes pour changer la vie de ses voisins.",
  "poster": "assets/27063.webp"
 }
];
const releases = [
 {
  "id": "1000016814",
  "title": "Mon beau-père, ma belle-fille et moi",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Comédie",
  "director": "John Hamburg",
  "cast": [
   "Robert De Niro",
   "Ben Stiller",
   "Owen Wilson"
  ]
 },
 {
  "id": "312529",
  "title": "Billie, à la croisée des mondes",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Animation",
  "director": "Fawn Veerasunthorn, Jason Hand, Josie Trinidad",
  "cast": [
   "Chloé Jouannet",
   "Hailee Steinfeld",
   "Valérie Siclay"
  ]
 },
 {
  "id": "1000028064",
  "title": "Forty Love",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "Pierre-Ange Carlotti",
  "cast": [
   "Paul Kircher",
   "Romeo Beckham",
   "Guillaume Canet"
  ]
 },
 {
  "id": "1000027620",
  "title": "Un bon petit soldat",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "Stéphane Brizé",
  "cast": [
   "Alba Rohrwacher",
   "Vincent Lindon",
   "Sharif Andoura"
  ]
 },
 {
  "id": "1000014559",
  "title": "Paper Tiger",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "James Gray",
  "cast": [
   "Adam Driver",
   "Scarlett Johansson",
   "Miles Teller"
  ]
 },
 {
  "id": "1000004190",
  "title": "Demain je tombe amoureux",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Comédie",
  "director": "Martin Provost",
  "cast": [
   "Fabrice Luchini",
   "Emmanuelle Devos",
   "Chiara Mastroianni"
  ]
 },
 {
  "id": "1000041096",
  "title": "Le Noël d'Ernest et Célestine",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Animation",
  "director": "Aurélie Raphaël",
  "cast": []
 },
 {
  "id": "1000043822",
  "title": "Congo Boy",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "Rafiki Fariala",
  "cast": [
   "Bradley Fiomona",
   "Dieufera Sana",
   "Hubert Ngbolo"
  ]
 },
 {
  "id": "1000052290",
  "title": "Gruffalo, de père en fils",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Animation",
  "director": "Jakob Schuh, Max Lang, Johannes Weiland",
  "cast": [
   "Zabou Breitman"
  ]
 },
 {
  "id": "1000037949",
  "title": "Le Sabre des gardiens",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Action",
  "director": "Yuen Woo-Ping",
  "cast": [
   "Jing Wu",
   "Nicholas Tse",
   "Yosh Yu"
  ]
 },
 {
  "id": "1000044062",
  "title": "Merci d'être venu",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Documentaire",
  "director": "Alain Cavalier",
  "cast": []
 },
 {
  "id": "1000012306",
  "title": "La libertad doble",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "Lisandro Alonso",
  "cast": [
   "Misael Saavedra",
   "Catalina Saavedra"
  ]
 },
 {
  "id": "1000023042",
  "title": "3670",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "Joon-ho Park",
  "cast": [
   "Youhyun Cho",
   "Hyeonmok Kim",
   "Dae-Hae Cho"
  ]
 },
 {
  "id": "1000009924",
  "title": "Le dernier repas",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Drame",
  "director": "Maryse Legagneur",
  "cast": [
   "Gilbert Laumord",
   "Marie-Evelyne Lessard",
   "Fabrice Yvanoff Sénat"
  ]
 },
 {
  "id": "1000054743",
  "title": "Fractures - mémoire et souvenir",
  "date": "2026-11-25",
  "year": 2026,
  "genre": "Divers",
  "director": "Jérôme Lévy, Eduardo Carretié, Raphaël Jouzeau",
  "cast": []
 },
 {
  "id": "1000044473",
  "title": "“Des K-soss” comme vous dites",
  "date": "2026-11-26",
  "year": 2026,
  "genre": "Documentaire",
  "director": "Bertrand Vinsu, Alexis Amiotte",
  "cast": []
 },
 {
  "id": "1000044518",
  "title": "Yeh Prem Mol Liya",
  "date": "2026-11-27",
  "year": 2026,
  "genre": "Comédie",
  "director": "Sooraj R. Barjatya",
  "cast": [
   "Ayushmann Khurrana",
   "Sharvari Wagh",
   "Anupam Kher"
  ]
 },
 {
  "id": "1000047833",
  "title": "Sathyavin Savithri",
  "date": "2026-11-27",
  "year": 2026,
  "genre": "Drame",
  "director": "",
  "cast": [
   "Mysskin",
   "Keerthy Suresh",
   "Maala Parvathi"
  ]
 },
 {
  "id": "1000027246",
  "title": "Gunmaaster G9",
  "date": "2026-11-27",
  "year": 2026,
  "genre": "Action",
  "director": "",
  "cast": []
 },
 {
  "id": "1000042502",
  "title": "Concert de Noël 2026 d'André Rieu : Let it snow !",
  "date": "2026-12-01",
  "year": 2026,
  "genre": "Concert",
  "director": "André Rieu",
  "cast": [
   "André Rieu"
  ]
 },
 {
  "id": "1000022517",
  "title": "Casse-Noisette (The Royal Ballet)",
  "date": "2026-12-01",
  "year": 2026,
  "genre": "Opéra",
  "director": "Peter Wright",
  "cast": [
   "Mayara Magri",
   "Reece Clarke"
  ]
 },
 {
  "id": "313265",
  "title": "Astérix - Le Royaume de Nubie",
  "date": "2026-12-02",
  "year": 2026,
  "genre": "Animation",
  "director": "Alexandre Heboyan",
  "cast": [
   "Christian Clavier",
   "François-Xavier Demaison",
   "Bernard Alane"
  ]
 },
 {
  "id": "1000031164",
  "title": "Fatherland",
  "date": "2026-12-02",
  "year": 2026,
  "genre": "Drame",
  "director": "Pawel Pawlikowski",
  "cast": [
   "Hanns Zischler",
   "Sandra Hüller",
   "August Diehl"
  ]
 },
 {
  "id": "302095",
  "title": "Du fioul dans les artères",
  "date": "2026-12-02",
  "year": 2026,
  "genre": "Drame",
  "director": "Pierre Le Gall",
  "cast": [
   "Alexis Manenti",
   "Julian Swiezewski",
   "Armindo Alves"
  ]
 },
 {
  "id": "1000018371",
  "title": "Changer l'eau des fleurs",
  "date": "2026-12-09",
  "year": 2026,
  "genre": "Drame",
  "director": "Jean-Pierre Jeunet",
  "cast": [
   "Leïla Bekhti",
   "Matthias Schoenaerts",
   "Melvil Poupaud"
  ]
 },
 {
  "id": "269068",
  "title": "Avengers: Doomsday",
  "date": "2026-12-16",
  "year": 2026,
  "genre": "Action",
  "director": "Joe Russo, Anthony Russo",
  "cast": [
   "Robert Downey Jr.",
   "Chris Evans",
   "Chris Hemsworth"
  ]
 },
 {
  "id": "324508",
  "title": "Dune : Troisième partie",
  "date": "2026-12-16",
  "year": 2026,
  "genre": "Action",
  "director": "Denis Villeneuve",
  "cast": [
   "Timothée Chalamet",
   "Zendaya",
   "Jason Momoa"
  ]
 },
 {
  "id": "1000024810",
  "title": "La Bola Negra",
  "date": "2026-12-16",
  "year": 2026,
  "genre": "Drame",
  "director": "Javier Calvo, Javier Ambrossi",
  "cast": [
   "Guitarricadelafuente",
   "Miguel Bernardeau",
   "Carlos González"
  ]
 },
 {
  "id": "1000026607",
  "title": "Mystik",
  "date": "2027-02-17",
  "year": 2027,
  "genre": "Comédie",
  "director": "Azedine Kasri, Raphaël Quenard",
  "cast": [
   "Raphaël Quenard",
   "François Cluzet",
   "Magalie Lépine Blondeau"
  ]
 }
];
