import logo from './logo.svg';
import './App.css';
import { responseGenerator } from './chatgpt-nodejs/chat.js';
function App() {
  

  // var input = prompt("Type in a message: ");
  // var mood = prompt("What is your mood? ");


  // (async () => {
  //   x = (await responseGenerator(input, mood))
  //   console.log(x)
  // })()


  return (
    <div className="App">
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
