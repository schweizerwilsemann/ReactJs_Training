
import InputTodo from "./test/InputTodo";


const handleTest = (name: string) => {
  alert(`handle test with name: ${name}`);
}

function App() {
  return (
    <div>
        <InputTodo 
          TestFunction={handleTest}
        />
    </div>
  );
}

export default App;
