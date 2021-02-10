var express = require("express");
var path = require("path");
var fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
    if (err) throw err;
  });
  notes = JSON.parse(notes);
  return res.json(notes);
});

app.post("/api/notes", function (req, res) {
  const newNote = req.body;

  var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
    if (err) throw err;
  });

  notes = JSON.parse(notes);
  notes.push(newNote);
  for (i = 0; i < notes.length; i++) {
    var note = notes[i];
    note.id = i;
  }

  const writeFile = () => {
    notes = JSON.stringify(notes);
    fs.writeFileSync(outputPath, notes, (err) => {
      if (err) throw err;
    });
  };
  writeFile();
  return res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
  var chosenID = req.params.id;
  var notes = fs.readFileSync(outputPath, "utf8", (err, data) => {
    if (err) throw err;
  });
  notes = JSON.parse(notes);

  for (i = 0; i < notes.length; i++) {
    var note = notes[i];
    if (note.id == chosenID) {
      notes.splice(note.id, 1);
    }
  }
  notes = JSON.stringify(notes);

  fs.writeFileSync(outputPath, notes, (err) => {
    if (err) throw err;
  });

  return res.json(notes);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
