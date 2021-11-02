import logo from "./logo.svg";
import { useState } from "react";
import { create } from "ipfs-http-client";
import "./App.css";

const client = create("https://ipfs.infura.io:5001/api/v0");

function App() {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);
  const retrieveFile = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr((prev) => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(urlArr, "urlArr");

  return (
    <div className="App">
      <h1>IPFS EXAMPLE</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" name="data" onChange={retrieveFile} />
        <button type="submit" className="btn">
          Upload file
        </button>
      </form>
      {urlArr.length !== 0 ? (
        urlArr.map((el) => <img src={el} alt="nfts" />)
      ) : (
        <h3>Upload data</h3>
      )}
    </div>
  );
}

export default App;
