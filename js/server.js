var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes
app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "notes.html"));
});

//API Route
app.get("/api/notes", function(req, res) {
return res.json(____);
});