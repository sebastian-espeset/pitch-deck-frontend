import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const localURL = `http://localhost:8000`
function App() {
  const [message, setMessage] = useState(`Nothing`);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    axios
      .get(localURL)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    
    setIsFilePicked(true);
  };
  
  const handleSubmission = (e) => {
    const formData = new FormData();
      
    formData.append('file',selectedFile);
    
    axios.post(`${localURL}/upload`,formData)
      .then(res=>{
        console.log(res.statusText);
      })
      .catch(err=>{
        console.log(err)
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {message ? <h1>{message}</h1> : `nothing`}
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div>
            <p>Filename:{selectedFile.name}</p>
            <p>Filename:{selectedFile.type}</p>
          </div>
        ) : (
          <p>select a file to show details</p>
        )}
        <button onClick={handleSubmission}>Submit pitch</button>
      </header>
    </div>
  );
}

export default App;
