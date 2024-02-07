import React from 'react';
import './sidebar.css';
import NoteEditor from './NoteEditor';
import { FaTrash } from 'react-icons/fa'

function Sidebar() {
  const [currentId, setCurrentId] = React.useState(null);
  const [weeks, setWeeks] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [hoverTitleId, setHoverTitleId] = React.useState(null);
  const [value, setValue] = React.useState(true);
  

  // when click on titles changes the currentId and addNotes as well
  function idChanger(id) {
    setCurrentId(id);
  }

  // saves topic's title in title for naming addWeeks func correctly
  function changer(e) {
    const newInput = e.target.value;
    setTitle(newInput);
  }

  // sets title and then clears inputs value
  function addWeeks() {
    if (!title.trim()) {
      alert("Please enter a title before adding a note.");
      return;
    }

    const newId = weeks.length > 0 ? weeks[weeks.length - 1].id + 1 : 0;

    setWeeks((prevWeeks) => [
      ...prevWeeks,
      { id: newId, title: title },
    ]);

    idChanger(newId);
    setTitle('');
  }

  
  function trashTurnOn(id) {
    setHoverTitleId(id);
  }

  
  function trashTurnOff() {
    setHoverTitleId(null);
  }
   
  // deletes note(weeks) which is clicked on

  function deleteNote(number) {
    setWeeks(prevWeek => prevWeek.filter(week => week.id !== number));
    setValue(prev => !prev);
  }

  // confirmation function about delete week's note or not

  function showDeleteConfirmation(num) {
    const confirmDelete = window.confirm('Do you want to delete this note?');
    if (confirmDelete) {
      deleteNote(num);
      weeks.length === 1 && idChanger(null);
      currentId === hoverTitleId && idChanger(null);
    }
  }

  return (
    <div className="main">
      <div className="sidebar">
        <nav className="navbar">
          <input
            className="title-input"
            type="text"
            placeholder="title..."
            value={title}
            onChange={changer}
          />
          <div className="addnotes">
            <h1>Add Note</h1>
            <button className="add" onClick={addWeeks}>
              +
            </button>
          </div>
        </nav>

        <div className="weekenddays">
          {weeks.map((week) => (
            <h1
              className={`notes-title ${
                currentId === week.id ? 'select' : ''
              }`}
              onClick={() => idChanger(week.id)}
              key={week.id}
              onMouseEnter={() => trashTurnOn(week.id)}
              onMouseLeave={trashTurnOff}
            >
              {week.title}
              {hoverTitleId === week.id && (
              <FaTrash
                className='trash-icon'
                onClick={(e) => {
                  e.stopPropagation();
                  showDeleteConfirmation(hoverTitleId);
                }}
              />)}
            </h1>
          ))}
        </div>
      </div>
      <NoteEditor 
      currentId={currentId} 
      deletedId={value}
      hoverTitleId={hoverTitleId} 
      />
      {console.log("currendId: " + currentId)}
    </div>
  );
}

export default Sidebar;
