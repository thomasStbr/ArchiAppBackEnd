var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Variable globale pour stocker les messages
var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

// 1. Récupérer un message par son numéro
app.get('/msg/get/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= allMsgs.length) {
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, msg: allMsgs[id] });
    }
});

// 2. Récupérer TOUS les messages
app.get('/msg/getAll', (req, res) => {
    res.json(allMsgs);
});

// 3. Récupérer le nombre de messages postés
app.get('/msg/nber', (req, res) => {
    res.json(allMsgs.length);
});

// 4. Ajouter un message à la liste
app.get('/msg/post/:msg', (req, res) => {
    // On récupère et on décode le message (exemple : %20 pour les espaces)
    const msg = unescape(req.params.msg);
    allMsgs.push(msg);
    // Retourne le numéro du message (index dans le tableau)
    res.json(allMsgs.length - 1);
});

app.get("/", function(req, res) {
    res.send("Hello")
  })
  
// 5. Effacer un message de la liste
app.get('/msg/del/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= allMsgs.length) {
        res.json({ code: 0 });
    } else {
        // On supprime le message à l'indice indiqué
        allMsgs.splice(id, 1);
        res.json({ code: 1 });
    }
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
