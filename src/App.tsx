import "./App.css";
import List from "./components/List";

function App({ firstName, age }: any) {
  return (
    <div>
      <h1>
        Welcome! myself {firstName} age {age} 
      </h1>
      <List />
    </div>
  );
}

export default App;
