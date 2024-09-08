import React, { ReactNode, useState } from 'react'
interface IProps {
  name: string,
  age: number,
  infos:{
    gender: string,
    address: string,
  },
  abc?: string,
  TestFunction: (value: string) => void,
  listTodo: string[],
  setListTodo: (v: string[]) => void
}

export default function InputTodo(props: IProps) {

  const {setListTodo, listTodo} = props;
  const [text, setText] = useState('');
  

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
       
    </div>
  )
}
