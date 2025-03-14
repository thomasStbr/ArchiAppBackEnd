# **📌 Messagerie Simple - Backend**  

🔗 **Application Backend Déployée** : [https://archiappbackend.onrender.com/](https://archiappbackend.onrender.com/)  

---

## **📝 Description**  
Ce projet est le **backend** d’une application de messagerie simple permettant aux utilisateurs d’envoyer et de récupérer des messages en temps réel via une API REST.  

L’API est développée en **Node.js** avec le framework **Express.js** et gère la communication avec le frontend.  

---

## **🚀 Fonctionnalités**
✅ **Récupérer tous les messages disponibles**.  
✅ **Récupérer un message spécifique par son ID**.  
✅ **Obtenir le nombre total de messages stockés**.  
✅ **Envoyer un nouveau message avec un pseudo**.  
✅ **Supprimer un message en fonction de son ID**.  
✅ **Gestion des CORS** pour permettre les requêtes AJAX depuis le frontend.  

---

## **📂 Structure des fichiers**
- **index.js** → Contient le serveur Express et les routes de l’API.  
- **package.json** → Dépendances du projet (Express, CORS, etc.).  

---

## **🛠 Explication des Fonctions Clés**
### **📜 Classe `Message` - Représentation d'un message**
```javascript
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
```
✅ **Stocke un message avec un pseudo et une date**.  
✅ **Possède des méthodes pour formater la date et afficher le message**.  

---

### **📩 `GET /msg/getAll` - Récupérer tous les messages**
```javascript
app.get('/msg/getAll', (req, res) => {
    res.json(allMsgs);
});
```
✅ **Renvoie la liste complète des messages** sous forme de tableau JSON.  

---

### **📜 `GET /msg/get/:id` - Récupérer un message par son ID**
```javascript
app.get('/msg/get/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= allMsgs.length) {
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, msg: allMsgs[id] });
    }
});
```
✅ **Renvoie le message correspondant à l’ID** donné en paramètre.  
✅ **Retourne `{ code: 0 }` si l’ID est invalide**.  

---

### **📜 `POST /msg/post` - Ajouter un nouveau message**
```javascript
app.post('/msg/post', (req, res) => {
    const { msg, pseudo } = req.body;
    if (!msg || !pseudo) {
        return res.json({ code: 0, error: "Message and pseudo are required" });
    }

    const newMessage = new Message(msg, pseudo);
    allMsgs.push(newMessage);

    res.json({ code: 1, id: allMsgs.length - 1, message: newMessage });
});
```
✅ **Ajoute un message à la liste et le stocke en mémoire**.  
✅ **Vérifie que le message et le pseudo sont bien fournis**.  
✅ **Retourne un objet JSON avec l'ID du message ajouté**.  

---

### **📜 `DELETE /msg/del/:id` - Supprimer un message par ID**
```javascript
app.delete('/msg/del/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= allMsgs.length) {
        res.json({ code: 0 });
    } else {
        allMsgs.splice(id, 1);
        res.json({ code: 1 });
    }
});
```
✅ **Supprime un message de la liste en fonction de son ID**.  
✅ **Renvoie `{ code: 0 }` si l’ID n’existe pas**.  

---

## **📌 Installation & Exécution**
### **1️⃣ Installer les dépendances**
Assurez-vous d’avoir **Node.js** installé, puis exécutez :  
```sh
npm install
```

### **2️⃣ Démarrer le serveur**
```sh
npm  start
```
Le serveur écoute par défaut sur **http://localhost:8080**.  

---

## **🌐 Déploiement**
L’API backend est hébergée sur **Render.com** à l’adresse suivante :  
🔗 [https://archiappbackend.onrender.com](https://archiappbackend.onrender.com)  

---

## **📌 Comment Tester l'API ?**
### **📜 Récupérer tous les messages**
```sh
GET https://archiappbackend.onrender.com/msg/getAll
```
📌 **Réponse JSON :**
```json
[
    { "msg": "Hello World", "pseudo": "Alice", "date": "2025-03-14T10:00:00.000Z" },
    { "msg": "foobar", "pseudo": "Bob", "date": "2025-03-14T10:01:00.000Z" }
]
```

### **📜 Ajouter un message**
```sh
POST https://archiappbackend.onrender.com/msg/post
Content-Type: application/json

{
  "msg": "Mon premier message",
  "pseudo": "Jean"
}
```
📌 **Réponse JSON :**
```json
{
  "code": 1,
  "id": 2,
  "message": {
    "msg": "Mon premier message",
    "pseudo": "Jean",
    "date": "2025-03-14T12:30:00.000Z"
  }
}
```

### **📜 Supprimer un message**
```sh
DELETE https://archiappbackend.onrender.com/msg/del/1
```
📌 **Réponse JSON :**
```json
{ "code": 1 }
```

