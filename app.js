const fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');

const notes=require('./notes.js');

const titleOptions={
	    describe: 'Title of note',
		demand: true,
		alias: 't'
};
const bodyOptions={
	    describe:'Body of note',
        demand: true,
        alias: 'b'
}

const argv=yargs
.command('add','Add a new note',{
	title:titleOptions,
	body:bodyOptions
})
.command('list','List all notes')
.command('read','Reading the note',{
	title:titleOptions
})
.command('remove','Removing the note',{
	title:titleOptions
})
.help()
.argv;

var command=argv._[0]; 




if(command === 'add'){
	
	var note=notes.addNote(argv.title,argv.body);
	if(note){
		console.log('Note Created');
		notes.logNote(note);
	}
	else{
		console.log('Note title taken !! Try new One.');
	}
}else if(command === 'list'){
	var allNotes=notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note)=>notes.logNote(note));

}else if(command === 'read'){
	var rNote=notes.readNote(argv.title);
    if(rNote){
    	console.log('Reading Note');
    	notes.logNote(rNote);
    }else{
    	console.log('Note Not Found!!');
    }
	
}else if(command === 'remove'){
	var noteRemove=notes.removeNote(argv.title); 
	var message=noteRemove ?'Note was removed':'Note not Found';
	console.log(message);
}else{
	console.log('command not Recognized');
}
