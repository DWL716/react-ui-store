import React, { useCallback } from 'react';
import axios from 'axios'
import Upload from './components/Upload/upload'

function App() {
  axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => {
    console.log(res);
    
  }) 
  const upFileChang = useCallback((e) => {
    console.log(e.target.files);
    const files = e.target.files
    if (files) {
      const uploadeFile = files[0]
      const formData = new FormData()
      formData.append(uploadeFile.name, uploadeFile)
      axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        console.log(res);
        
      })
    }
  }, [])
  return (
    <div className="App">
      <input type="file" name="upFile" onChange={upFileChang}/>
      <Upload action="https://jsonplaceholder.typicode.com/posts" />
    </div>
  );
}

export default App;
