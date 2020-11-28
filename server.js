var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

//API Route
app.get("/api/notes", function (req, res) {
    //Reads JSON file
    //Returns all saved notes as JSON
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    //Receives new note to save on body
    //Adds to db.json file
    //Returns new note to client
});

app.delete("/api/notes/:id", function (req, res) {
    //Receive query parameter containing ID of note to delete
    //Each note needs unique ID
    //Need to read all notes from db.json (for loop), and remove note with given ID
    //Rewrite the notes to db.json file
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});