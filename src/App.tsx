
import { useState } from "react";
import InputTodo from "./test/InputTodo";


const handleTest = (name: string) => {
  alert(`handle test with name: ${name}`);
}
function App() {
  const [listTodo, setListTodo] = useState(['']);
  return (
    <div>
        <InputTodo 
        TestFunction={handleTest}
        listTodo={listTodo}
        setListTodo={setListTodo} name={""} age={0} infos={{
          gender: "",
          address: ""
        }}        />
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
  );
}

export default App;
