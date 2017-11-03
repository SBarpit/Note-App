const fs=require('fs');


var fetchNotes=()=>{
	try{
	var notesString=fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
    }catch(e){
  // console.log('Something went wong!!');
   return [];
}

};

var saveNotes=(notes)=>{
fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote=(title, body) =>{
//console.log('Ading note', title,body);
var notes=fetchNotes();
var note={
	title,
	body
};
var duplicateNotes=notes.filter((note)=>note.title===title);

if(duplicateNotes.length==0){
notes.push(note);
saveNotes(notes);
return note;
}
};


// var dublicateNotes=notes.filter((note)=>{
// 	return note.title===title;
// });
//above code is same as below code in es6 error functions.


var getAll =()=>{
 return fetchNotes();
};

var readNote =(title)=>{
	 var notes=fetchNotes();
	 var note=notes.filter((note)=>note.title===title);
	 return  note[0];
};

var logNote=(note)=>{
console.log('---');
console.log(`Tittle : ${note.title}`);
console.log(`Body : ${note.body}`);
}

var removeNote=(title)=>{
	var note=fetchNotes();
	var filteredNotes=note.filter((note)=>note.title!==title);
	saveNotes(filteredNotes); 
	return note.length!==filteredNotes.length;
};

module.exports={
	addNote,
	getAll,
	readNote,
	removeNote,
	logNote
};
