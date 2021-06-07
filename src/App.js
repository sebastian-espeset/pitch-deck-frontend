import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [message,setMessage]=useState(`Nothing`)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then((res) => {
        setMessage(res.data.message)
        console.log(res)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {message ? <h1>{message}</h1>:`nothing`}
      </header>
    </div>
  );
}

export default App;
