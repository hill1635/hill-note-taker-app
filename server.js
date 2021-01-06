var express = require("express");
var path = require("path");
var fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

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
    var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
        if (err) throw (err);
        console.log(data);
    });
    console.log(notes);
    //Returns all saved notes as JSON
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    //Receives new note to save on body
    //Adds to db.json file
    fs.writeFile(path.join(outputPath, "db.json"));
    //Returns new note to client
    return res.json(note);
});

app.delete("/api/notes/:id", function (req, res) {
    //Receive query parameter containing ID of note to delete
    //Each note needs unique ID
    //Need to read all notes from db.json (for loop), and remove note with given ID
    //Rewrite the notes to db.json file
    fs.writeFile(path.join(outputPath, "db.json"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});