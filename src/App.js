import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./App.css";
import testPdf from "./test.pdf";



const localURL = `http://localhost:5000`

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function App() {
  const [message, setMessage] = useState(`Nothing`);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    axios
      .get(`${localURL}/api/pitches`)
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile)
    setIsFilePicked(true);
  };
  
  const handleSubmission = (e) => {
    const data = new FormData();
    
    
    data.append('file',selectedFile);

    console.log(data);

    axios.post(`${localURL}/api/pitches`,data)
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err)
      });
    setMessage("File upload complete")
    setIsFilePicked(false)
    setSelectedFile()
  };

  return (
    <div className="App">
      <header className="App-header">
        {message ? <h1>{message}</h1> : `nothing`}
        <input type="file" name="file" onChange={changeHandler} formEncType="multipart/form-data"/>
        {isFilePicked ? (
          <div>
            <p>File name:{selectedFile.name}</p>
            <p>File type:{selectedFile.type}</p>
          </div>
        ) : (
          <p>select a file to show details</p>
        )}
        <button onClick={handleSubmission}>Submit pitch</button>
      <div>
          <Document file = {testPdf}>
            <Page pageNumber={1}/>
            </Document>
      </div>
      </header>
    </div>
  );
}

export default App;
