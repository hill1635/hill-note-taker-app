# Note-Taker App

## Table of Contents
* Purpose
* Database
* API Routes
* Future Development
* Screenshots

## Purpose
The purpose of this assignment was to create the back-end of a note taker app based on the front-end files that were provided.  Using express for the server and file-save to access the db.json file that stores the note information, the goal was to connect the two so notes were saved in db.json.  In addition to that, API routes needed to be created to be able to create new notes, and retrieve, view, and delete previous notes.

## Database
The file-save npm was primarily used to connect the web app with the db.json database.  GET routes were created for the homepage (index.html) and the notes page (notes.html).  Directory paths were created to locate the files in the directory and sendFile methods were executed to return the pages in the web app.

## API Routes
An API GET route was created to initially return all notes saved in the database to the front-end.  This was accomplished using the fs.readFileSync method for the db.json file and returned after parsing the JSON file.

To create a new note, the note information was captured into a variable from the API request body in a POST method.  A readFile method was created to collect all the currently saved notes, parsed out, and then the new note information was pushed into the array.  A for loop was added to cycle through the notes and add ID numbers, and then a writeFile method was made to re-write the file with the new array of notes and the created note was returned using res.json().

Finally, the DELETE method was created to be able to delete any previous notes based on ID number.  The ID was captured from the request parameters body from the API delete request and the previous notes were collected with a readFileSync method and parsed out.  To located the note that the user wanted to delete, a for loop was added to cycle through the list of notes and splice out the index (note) that matched with the requested note ID number.  Notes were converted back to strings and the db.json was re-wrote with a writeFileSync method and returned as res.json.

## Future Developments
One of the first future developements to tackle for this assignment is sorting out the js and css linking to the html file.  I couldn't for the life of me get them to link properly despite multiple attempts to reconfigure the directory and try to link them in different ways.  In order to get it to work properly, js and css were hard coded into the html file.  In addition to this, separating out the html and api routes into separate files to clean up server.js needs to be done.

Next step in development process is cutting down on repetitive bloat.  The fs.sendFile, fs.readFile, and fs.writeFile methods are used multiple times throughout the API routing and I'm sure there is a much more efficient way to go about that.

## Screenshots
Homepage:
<img width="723" alt="homepage" src="https://user-images.githubusercontent.com/68754392/105609797-dc5d0e00-5d68-11eb-953d-9e7dc09b586a.png">

Notes Page with Imported Test Note:
<img width="727" alt="note-page" src="https://user-images.githubusercontent.com/68754392/105609809-f991dc80-5d68-11eb-8d37-ad06902627d2.png">

Creating a New Note:
<img width="724" alt="create-note" src="https://user-images.githubusercontent.com/68754392/105609816-06aecb80-5d69-11eb-9ce0-f7e155bdd7b3.png">

Saving the Note:
<img width="725" alt="note-saved" src="https://user-images.githubusercontent.com/68754392/105609819-10383380-5d69-11eb-92de-4fa67f7b78ac.png">

Viewing the Note:
<img width="1440" alt="view-note" src="https://user-images.githubusercontent.com/68754392/105609827-18906e80-5d69-11eb-8743-52b8b94c18d5.png">

Deleting the Note:
<img width="466" alt="note-deleted" src="https://user-images.githubusercontent.com/68754392/105609831-20e8a980-5d69-11eb-98df-b867b5085878.png">
