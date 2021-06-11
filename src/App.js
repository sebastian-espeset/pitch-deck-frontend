import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./App.css";

const localURL = `http://localhost:5000`;

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function App() {
  const [message, setMessage] = useState(`Nothing`);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [pdfDisplay, setPdfDisplay] = useState();
  const [pdfPath, setPdfPath] = useState();
  let [pdfPage,setPdfPage]=useState(1)


  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (e) => {
    const data = new FormData();
    data.append("file", selectedFile);
    console.log(data);
    axios
      .post(`${localURL}/api/pitches`, data)
      .then((res) => {
        setPdfPath(res.data.file);
        console.log("pdf path", pdfPath);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage("File upload complete");
    setIsFilePicked(false);
    setSelectedFile();
  };
  
  const incPage=(e)=>{
    setPdfPage(pdfPage++)
    console.log(pdfPage)
  }
  const decPage=(e)=>{
   setPdfPage(pdfPage--)
   console.log(pdfPage)
  }
  return (
    <div className="App">
      <header className="App-header">
        {message ? <h1>{message}</h1> : `nothing`}
        <input type="file" name="file" onChange={changeHandler} />
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
          {pdfPath?<Document
            file={{
              url: `${localURL}/api/pitches${pdfPath}`,
            }}
            loading="loading pdf"
          >
            <Page pageNumber={pdfPage} />
            <button onClick={incPage}>Page ++</button>
            <button onClick={decPage}>Page --</button>
          </Document>:<div>Please upload a Document</div>}
        </div>
      </header>
    </div>
  );
}

export default App;
