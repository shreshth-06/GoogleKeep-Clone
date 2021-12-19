
const addButton = document.querySelector('#add');

const updateLSData = () => {

const textAreaData = document.querySelectorAll('textarea'); //--->> This would be an array.
const notes = [];

textAreaData.forEach((note) => {  //--->> To get the data from an array we use forEach().

    return notes.push(note.value)

})

// localStorage.set/getItems( 'key', 'stringValue' )
localStorage.setItem('notes', JSON.stringify(notes));  //--->> Method of adding data in the local storage. We can only pass string, not array. That's why we used JSON.stringify.

}

const addNewNote = (text = '') => {

    const note = document.createElement('div');  // --->> We are creating our 'div' with class = "note" with JS.
        note.classList.add('note');
        
        const htmlData = `
        
        <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i></button>
        <button class="delete"> <i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main  ${text ? "" : "hidden"}" > </div>
        <textarea class="  ${text ? "hidden" : "" } "></textarea>  `;

note.insertAdjacentHTML('afterbegin', htmlData)
// console.log(note)


// Getting the references of 'edit' and 'delete' icons from the 'operation' class :

const editButton = note.querySelector('.edit'); //--->> We wrote (note.) instead of (document.) as we are now playing with the "note" div.
const delButton = note.querySelector('.delete');
const mainDiv = note.querySelector('.main');
const textArea = note.querySelector('textarea'); // --->> "textarea" is neither a class nor an id.

// Deleting the note :

delButton.addEventListener('click', () => {
    note.remove();
    updateLSData();
})

// Toggle using edit button :

textArea.value = text;
mainDiv.innerHTML = text;

editButton.addEventListener('click', () => {
    mainDiv.classList.toggle('hidden');
    textArea.classList.toggle('hidden')
})

textArea.addEventListener('change', (event) => {
    const value = event.target.value;
    // console.log(value)
    mainDiv.innerHTML = value;



// After this, we have to see the working of local storage so that our data could not get erased after reload.

// The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.
// The localStorage object stores data with no expiration date. The data will not be deleted when 
// the browser is closed, and will be available the next day, week or year.



updateLSData(); //--->> We have defined this function at the very top.

})

document.body.appendChild(note) //--->> It appends/adds a node as the last child of a node.

}

// Getting back the data from local storage after reloading.

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => addNewNote(note))
}


addButton.addEventListener('click', () => addNewNote())
