import { useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

const localURL = `http://localhost:5000`;
const URL = `https://sebastian-pitch-deck.herokuapp.com`;

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function App() {
  const [message, setMessage] = useState(`Please upload a pdf to upload`);
  const [selectedFile, setSelectedFile] = useState("");
  const [pdfPath, setPdfPath] = useState();
  const [numPages, setNumPages] = useState(null);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmission = (e) => {
    const data = new FormData();
    data.append("file", selectedFile);
    axios
      .post(`${URL}/api/pitches`, data)
      .then((res) => {
        setPdfPath(res.data.file);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage("File upload complete");
    setSelectedFile(null);
  };

  return (
    <div className="container is-fluid">
      <section className="hero is-primary ">
        <div className="hero-body">
          <p className="title">A company's name</p>
          <p className="subtitle">And, like, a cool sub-title</p>
          <input
            className="button is-dark"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <button className="button is-light" onClick={handleSubmission}>
            Submit pitch
          </button>
        </div>
      </section>
      <div className="container">
        {pdfPath ? (
          <Document
            className="content"
            file={{
              url: `${URL}/api/pitches${pdfPath}`,
            }}
            loading="loading pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => (
                <Page pageNumber={page} />
              ))}
          </Document>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
