var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express
const cors = require('cors');  // Import CORS middleware
// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

class Message {
    constructor(msg, pseudo, date = new Date()) {
        this.msg = msg;
        this.pseudo = pseudo;
        this.date = date;
    }

    getFormattedDate() {
        return this.date.toLocaleString();
    }

    getFullMessage() {
        return `<strong>${this.pseudo}</strong> (${this.getFormattedDate()}): ${this.msg}`;
    }
}

var allMsgs = [
    new Message("Hello World", "Alice"),
    new Message("foobar", "Bob"),
    new Message("CentraleSupelec Forever", "Charlie")
];

app.get('/msg/get/:id', (req, res) => {
    const id = parseInt(    req.params.id);
    if (isNaN(id) || id < 0 || id >= allMsgs.length) {
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, msg: allMsgs[id] });
    }
});

app.get('/msg/getAll', (req, res) => {
    res.json(allMsgs);
});

app.get('/msg/nber', (req, res) => {
    res.json(allMsgs.length);
});

app.get('/msg/post', (req, res) => {
    const { msg, pseudo } = req.body;
    if (!msg || !pseudo) {
        return res.json({ code: 0, error: "Message and pseudo are required" });
    }
    
    const newMessage = new Message(msg, pseudo);
    allMsgs.push(newMessage);
    
    res.json({ code: 1, id: allMsgs.length - 1, message: newMessage });
});

app.get('/msg/del/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= allMsgs.length) {
        res.json({ code: 0 });
    } else {
        allMsgs.splice(id, 1);
        res.json({ code: 1 });
    }
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
