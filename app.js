const express = require('express');
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public")
const datefns = require('date-fns');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const links = [
    { href: "/", text: "Home" },
    { href: "new", text: "New Message" },
];

const users = ["Bill", "Amy", "Bob", "Jane", "Chris", "Trevor", "Max", "Brigitte"];

const messages = [
    { id: 0, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Bob", added: datefns.format(new Date(), "dd/MM/yyyy") },
    { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Amy", added: datefns.format(new Date(), "dd/MM/yyyy") },
    { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Chris", added: datefns.format(new Date(), "dd/MM/yyyy") },
    { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Trevor", added: datefns.format(new Date(), "dd/MM/yyyy") },
    { id: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Bob", added: datefns.format(new Date(), "dd/MM/yyyy") },
    { id: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Max", added: datefns.format(new Date(), "dd/MM/yyyy") },
    { id: 6, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum", user: "Bob", added: datefns.format(new Date(), "dd/MM/yyyy") },
]

app.get("/", (req, res) => {
    const latestFirstMessages = messages.slice().reverse();
    res.render("index", { title: 'Home Page', links: links, users: users, messages: latestFirstMessages });
});

app.get("/new", (req, res) => {
    res.render("form", { title: 'New Message', links: links });
});

app.post("/new", (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    messages.push({ id: messages.length, text: messageText, user: messageUser, added: datefns.format(new Date(), "dd/MM/yyyy") })
    res.redirect('/')
});

app.get('/message/:id', (req, res) => {
    const id = req.params.id;
    res.render('single', { title: 'Single Message', messageData: messages[id], links: links })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404', links: links })
});

app.use(express.static(assetsPath))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});