import React, { ReactNode, useState } from 'react'

export default function InputTodo() {

  const [text, setText] = useState('');
  const [listTodo, setListTodo] = useState(['']);

  
  const handleOnclick = () => {
    if(!text){
      alert('Empty todo');
      return;
    }
    setListTodo([...listTodo, text]);
    setText('');
  }
  return (
    <div>
        <h1>Add new todo: </h1>
        <h2>{}</h2>
        <input type='text' value={text} 
          onChange={(event) => setText(event.target.value)}
        >
          </input> <></> &nbsp;
        <button style={{cursor: "pointer"}} onClick={() => handleOnclick()}> Save</button>
        <br />
        <div className="">
          <ul>
            {listTodo.map((item, index) =>{
              return (
                <li key={index}>{item}</li>
              )
            } )}
          </ul>
        </div>
    </div>
  )
}
