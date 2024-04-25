import { useEffect, useState } from "react";
import './App.css';
import Markdown from "./components/Markdown";

function App() {
  const [notes, setNotes] = useState(()=>{
    const savedData = localStorage.getItem("notes");
    const parsedData = JSON.parse(savedData);
    return parsedData || [];
  });

  function clickHandler(){
    setNotes((prevState) => {
        const newNote = {
            data : "# Enter the data here",
            showMarkdown : true
        }

        return([...prevState, newNote])
    })
  }

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes])


  return (

    <div id="container">

      {notes.length === 0 ? (

        <div id="empty-message-container">

          <p>You have no notes</p>
          <button onClick={clickHandler} className="btn" >Create one now</button>

        </div>

      ):(
        <div id="notes-container">
            <div id="create-new-notes">
                <h1>Notes</h1>
                <button onClick={clickHandler} className="btn" >Add new note</button>
            </div>
            {/* {console.log(notes)} */}
            {
                notes.map((elem, index) => {
                    return <Markdown key = {index} id = {index} mdStr={elem.data} notes = {notes} setNotes = {setNotes} showMarkdown = {elem.showMarkdown}  />
                })
            }
        </div>
      )}


    </div>

  );
}

export default App;
