import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import UPLOAD_URL from "./constants/constant.js"
function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [htmlContent, setHtmlContent] = useState();
  const [progress, setProgress] = useState(1)

  const handleFileChange = (event) => {
    // console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
    setProgress(15)
  };

  // upload file function
  const handleUpload = async () => {
    setProgress(60)
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);
      setProgress(80)

      try {
        const response = await axios.post(`${UPLOAD_URL.UPLOAD_URL}`, formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })

        // console.log(response.data)

        setProgress(90)
        setHtmlContent(response.data)
        setSelectedFile(null)
      }
      catch (err) {
        console.log('err')
        alert('Error Occured!! Please Try Again')
      }
    }
    else {
      alert('Please attach a file to upload')
    }

  };

  useEffect(() => {
    if (selectedFile) {
      setProgress(40)
      setTimeout(() => {
        handleUpload()
      }, 1000)
    }
  }, [selectedFile])
  return (
    <div className="App" style={{ textAlign: 'center' }}>

      <h1>Welcome to File Share</h1>
      <p>With our platform, you can effortlessly share any file over the internet with just a few clicks. Whether it's documents, images, videos, or any other file type, we've got you covered.</p>
      <p>Whether you're collaborating on projects, sharing memories with friends and family, or distributing important documents, File Share simplifies the process and ensures your files are securely accessible.</p>
      <p>Start sharing your files today and experience the convenience of seamless file sharing with File Share!</p>

      {/* <input
        type='file'
        onChange={handleFileChange}
        style={{ backgroundImage: `url("/public/backgroundImg.jpg")` }}
      />

      <br></br>
      <img
        src="/upload.png"
        alt="Upload"
        onClick={handleUpload}
        style={{
          width: '100px',
          height: '100px'
        }}
      /> */}



      {<label htmlFor="file-input" style={{ cursor: "pointer" }}>
        <img src="/upload.png" alt="Upload" style={{
          width: '250px',
          height: '250px'
        }} />
        <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
      </label>}
      <br></br>
      {selectedFile ? <progress value={progress} max={100} /> : <></>}


      {htmlContent ? <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> : <></>}
    </div>
  );
}

export default App;
