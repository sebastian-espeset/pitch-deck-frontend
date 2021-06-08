import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const localURL = `http://localhost:5000/`
function App() {
  const [message, setMessage] = useState(`Nothing`);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    axios
      .get(localURL)
      .then((res) => {
        setMessage(res.data.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  
  const handleSubmission = (e) => {
    const formData = new FormData();
    formData.append('File', selectedFile);
    axios.post(`${localURL}/api/pitches`,formData)
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err)
      })
  };
  return (
    <div className="App">
      <header className="App-header">
        {message ? <h1>{message}</h1> : `nothing`}
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div>
            <p>Filename:{selectedFile.name}</p>
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
