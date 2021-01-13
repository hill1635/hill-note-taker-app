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
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API Route
app.get("/api/notes", function (req, res) {
    //Reads JSON file
    var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
        if (err) throw (err);
        console.log(data);
    });
    notes = JSON.parse(notes);
    //Returns all saved notes as JSON
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    const newNote = req.body;

    var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
        if (err) throw (err);
        console.log(data);
    });

    notes = JSON.parse(notes);
    notes.push(newNote);
    //Assign ID numbers
    for (i = 0; i < notes.length; i++) {
        var note = notes[i];
        note.id = i;
        console.log(note);
    }
    console.log("notes: ", notes);

    const writeFile = () => {
        notes = JSON.stringify(notes);
        fs.writeFileSync(outputPath, notes, (err) => {
            if (err) throw err;
        });
    }
    writeFile();
    //Returns new note to client
    return res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    //Receive query parameter containing ID of note to delete
    var chosenID = req.params.id;
    console.log(chosenID);
    //Each note needs unique ID
    //Need to read all notes from db.json (for loop), and remove note with given ID
    var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
        if (err) throw (err);
        console.log(data);
    });
    notes = JSON.parse(notes);
    console.log(notes);

    for (i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (note.id == chosenID) {
            notes.splice(note.id, 1);
        }
    }
    console.log("notes after removal: ", notes);
    notes = JSON.stringify(notes);
    //Rewrite the notes to db.json file
    // const writeFile = () => {
    //     notes = JSON.stringify(notes);
    fs.writeFileSync(outputPath, notes, (err) => {
        if (err) throw (err);
    });
    // }
    // writeFile();
    return res.json(notes);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});