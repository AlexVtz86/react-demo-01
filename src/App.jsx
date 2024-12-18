import React from 'react';
import ReactDOM from 'react-dom';
import { JSDOM } from 'jsdom';

// Simulate the browser environment
const dom = new JSDOM('<!DOCTYPE html><div id="root"></div>');
global.document = dom.window.document;
global.window = dom.window;


// Functional Component with Props
function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

// Pure Component for performance optimization
const PureMessage = memo(function PureMessage({ message }) {
  console.log("PureMessage rendered");
  return <p>{message}</p>;
});

// Parent Component
function App() {
  // State management with useState
  const [name, setName] = useState("React Developer");
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("This is a static message.");

  // Ref to interact with the DOM
  const inputRef = useRef();

  // Event handler
  const handleButtonClick = () => {
    setName(inputRef.current.value || "React Developer");
    setCount(count + 1);
  };

  return (
    <div>
      {/* Component structure */}
      <h1>React Practice App</h1>

      {/* Passing properties into components */}
      <Greeting name={name} />

      {/* Using state to dynamically update data */}
      <p>You have clicked the button {count} times.</p>

      {/* Using Refs to access DOM elements */}
      <input ref={inputRef} type="text" placeholder="Enter your name" />
      <button onClick={handleButtonClick}>Update Name</button>

      {/* Rendering a pure component */}
      <PureMessage message={message} />

      {/* Simulating Virtual DOM by changing state */}
      <button onClick={() => setMessage(`Message updated at ${new Date().toLocaleTimeString()}`)}>
        Update Message
      </button>
    </div>
  );
}

// Render the React component into the virtual DOM
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// Debug: log the rendered HTML
console.log(rootElement.innerHTML);
