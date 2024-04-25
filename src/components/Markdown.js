import React, { useEffect, useState } from "react";
import '../App.css';
import MarkdownEditor from "@uiw/react-markdown-editor";


const Markdown = ({ mdStr, id, notes, setNotes , showMarkdown }) => {
    function clickHandler() {

        setNotes((prevState)=>{
            prevState[id].showMarkdown = !showMarkdown;
            const data = [...prevState]
            
            return data
        })
      }
    
      function deleteHandler(e){
       
        setNotes((prevState)=>{
            prevState.splice(id,1);
            const updatedState = [...prevState];
            return updatedState;
        })
    
      }
  return (
    <div className='markdown-card' >
      <div className='markdown-header-container'>
        <h2 onClick={clickHandler} >
          {/\n/.exec(mdStr) ? mdStr.slice(0, /\n/.exec(mdStr).index) : mdStr}
        </h2>
        <button onClick={deleteHandler} className='btn'>Delete</button>
      </div>

      {showMarkdown && (
        <MarkdownEditor
          value={mdStr}
          height="500px"
          onChange={(value, viewUpdate) => {
            setNotes((prevState) => {
              const newData = {
                data: value,
                showMarkdown: showMarkdown
              };

              prevState.splice(id, 1, newData);
              const data = [...prevState];
              // console.log(data)
              return data;
            });
          }}
        />
      )}
    </div>
  )
}

export default Markdown