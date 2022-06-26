const noteList = document.querySelector('#note-list')



eventlisteners();
function eventlisteners(){
    //form submission
    document.querySelector('#form').addEventListener('submit',newNote)//submit event

    //remove note
    document.querySelector('#note-list').addEventListener('click',removeNote)

    //get data from localstorage when loaded
    document.addEventListener('DOMContentLoaded',localStorageOnLoad)
    
}


function newNote(e){
     //when click on submit , dont send a request in url
    e.preventDefault()    

    //create li tag with value of input
    const note = document.querySelector('#note').value;
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

        //add li to the note-list (div)
    noteList.appendChild(li);

    //create remove elemnt
    const removeBtn= document.createElement('a');
    removeBtn.textContent='X';

        //add remove elemnt to the li
    li.appendChild(removeBtn);
    removeBtn.classList.add('remove-note')

    addNoteToLocalStorage(note)

}

//remove note from list
function removeNote(e){

    if(e.target.classList.contains('remove-note')){
        e.target.parentElement.remove();

        //also remove the note from local storage
        removeNoteLocalStorage(e.target.parentElement.textContent)

    }


}

//add note to the local storage
function addNoteToLocalStorage(value){
    //get notes from local storage
    const notes = getNotesFromLocalStorage();

    //add new note to the notes array
    notes.push(value);

    //add new notes array to the localstorage
    localStorage.setItem('notes',JSON.stringify(notes))

    console.log(notes);

}

//get notes from local storage
function getNotesFromLocalStorage(){
    let notes;

    //get previos notes from localstorage
    let getFromLS=localStorage.getItem('notes');

    if(getFromLS == null){
        //if note exists note,create empty array
        notes=[]
    }else{
        //if exists note,convert to the array
        notes = JSON.parse(getFromLS)
    }

    return notes;
}

//get data from localstorage on load
function localStorageOnLoad(){
    const notes = getNotesFromLocalStorage()
    
    
    // print each item of array
    notes.forEach(note => {

        //create li tag with a and removeBtn
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(note))
    
            //add li to the note-list (div)
        noteList.appendChild(li);
    
            //create remove elemnt
        const removeBtn= document.createElement('a');
        removeBtn.textContent='X';
    
            //add remove elemnt to the li
        li.appendChild(removeBtn);
        removeBtn.classList.add('remove-note')
    });
}

//remove note from localstorage
function removeNoteLocalStorage(noteContent){
    //delete x from the content
    const note = noteContent.substring(0,noteContent.length-1)
    console.log(note);


}