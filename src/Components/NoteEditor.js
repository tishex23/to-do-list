import React, { useState, useEffect } from 'react'
import './noteeditor.css'

// learn differencies between class and function components in react !!!!!!!
// think about useEffect to re-render this component !!!!!!

function NoteEditor({ currentId, deletedId, hoverTitleId }) {
  
  const [notes, setNotes] = useState([{id: currentId, body: ""}])

  const hoverId = hoverTitleId;

  // when current id changes add new note or return existing notes.id value
   useEffect(() => {
    const idExist = notes.some((note) => note.id === currentId);
    if(idExist){
       currentValue();
    }else{
      setNotes(prevnotes => [...prevnotes, {id: currentId, body: ''}])
    }  
    

  },[currentId]) 
  

  // when trash icon is clicked  deletes notes[currentId] element from massive
  useEffect(() => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== hoverId));
    
  },[deletedId])


  // figure out which note is clicked and return that note's value
  const currentValue = function (){
    for(let i = 0; i < notes.length; i++){
      if(notes[i].id === currentId){
        return notes[i].body;
      }
    } 
  }


  // updating and saving notes.body when note's value is changing 
  function handleNoteChange (e){
    // Update the local state
    const updatedNotes = notes.map((note) =>
      note.id === currentId ? { ...note, body: e.target.value } : note
    );
    setNotes(updatedNotes);
  }

  return (
    <div className='noteEditor'>

        <textarea
          className='textarea' 
          placeholder='write notes...' 
          value={currentValue()} 
          onChange={handleNoteChange}
        /> 
        
        
      
    </div>
  )
}

export default NoteEditor;