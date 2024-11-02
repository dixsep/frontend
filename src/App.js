import React, { useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async () => {

    if(!file){
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      
      const response = await axios.post("http://localhost:8800/upload", formData);

      console.log(response);
      setData(response.data);
      setError(null);
    } catch(err) {
      setError("Failed to extract Data");
      setData(null);
    }
  }

  return (
    <div className = "App" style = {{padding : "10px" ,border : "1px solid lightgray" , height : "250px"}}>
      <input type = 'file' onChange = {handleFileChange} style = {{}}/>
      <button onClick = {handleSubmit} style = {{padding : "10px", background: "white", border : '1px solid white', borderRadius : "5px", cursor : "pointer", color : "white", background: "lightcoral", fontWeight : "bold", fontSize : "1rem"}}>Upload Document</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style = {{margin : "10px", padding : "10px", display : "flex", flexDirection : "column", gap : "5px"}}>
           <p> <span style = {{fontSize : "1.5rem", fontWeight : "bold" ,color : "lightcoral", fontFamily : "monospace"}}>Name:</span> <span style = {{fontSize : "1.5rem", fontWeight : "light",}}>{data.Name}</span></p>
           <p> <span style = {{fontSize : "1.5rem", fontWeight : "bold", color : "lightcoral", fontFamily : "monospace"}}>License Number:</span> <span style = {{fontSize : "1.5rem", fontWeight : "light"}}>{data.LicenseNo}</span></p>
           <p> <span style = {{fontSize : "1.5rem", fontWeight : "bold", color : "lightcoral", fontFamily : "monospace"}}>Expiry Date:</span> <span style = {{fontSize : "1.5rem", fontWeight : "light"}}>{data.ExpiryDate}</span></p>
        </div>
      )}

    </div>
  );
}

export default App;
