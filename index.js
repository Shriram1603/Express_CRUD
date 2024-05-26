const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require('method-override')
const { v4: uuid } = require('uuid');


var comments = [
    { id: uuid(), username: 'shriram', comment: "hello boss" },
    { id: uuid(), username: 'Tarunes', comment: "hello bro" },
    { id: uuid(), username: 'GJ', comment: "Okavie kotho" },
    { id: uuid(), username: 'pragadessh', comment: "done !!" },
];


app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/comment", (req, res) => {
    res.render("home", { comments });
});

app.get("/comment/new", (req, res) => {
    res.render("new");
});

app.post("/comment", (req, res) => {
    const { username, comment } = req.body;
    const id = uuid();
    comments.push({ username, comment, id });
    res.redirect("/comment");
});

app.get("/comment/show/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    if (!comment) {
        return res.status(404).send('Comment not found');
    }

    res.render("show", { comment });
});

app.get("/comment/show/:id/edit",(req,res)=>{
    const {id}=req.params;
    const i = comments.find(c => c.id === id);
    res.render("update",{i})
})

app.patch("/comment/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    console.log(newCommentText);
    const foundComment = comments.find(c => c.id === id);

    if (!foundComment) {
        return res.status(404).send('Comment not found');
    }

    foundComment.comment = newCommentText;
    res.redirect("/comment");
});

app.delete("/comment/:id",(req,res)=>{
    const {id}=req.params;
    comments = comments.filter(c => c.id !=id)
    res.redirect("/comment")
})


app.get("/hello",(req,res)=>{
    const {name,number}=req.query;
    res.send(`name= ${name} ,number= ${number}`)
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
