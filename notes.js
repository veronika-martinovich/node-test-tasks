const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const notesJSON = bufferData.toString();
    return JSON.parse(notesJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const addNote = (title, body) => {
  const notes = getNotes();
  //const duplicatedNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note saved successfully"));
  } else {
    console.log(chalk.red.inverse("Note can not be saved"));
  }
};

const removeNote = (title) => {
  const notes = getNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note removed successfully"));
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const listNotes = () => {
  const notes = getNotes();
  console.log(chalk.blue("Notes list"));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = getNotes();
  const noteToRead = notes.find((note) => note.title === title);

  if (noteToRead) {
    console.log(chalk.blue(noteToRead.title), ": ", noteToRead.body);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
