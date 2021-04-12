import React, { useCallback } from 'react';
import axios from 'axios';
import Upload from './components/Upload/upload';
function App() {
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(function (res) {
        console.log(res);
    });
    var upFileChang = useCallback(function (e) {
        console.log(e.target.files);
        var files = e.target.files;
        if (files) {
            var uploadeFile = files[0];
            var formData = new FormData();
            formData.append(uploadeFile.name, uploadeFile);
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(function (res) {
                console.log(res);
            });
        }
    }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement("input", { type: "file", name: "upFile", onChange: upFileChang }),
        React.createElement(Upload, { action: "https://jsonplaceholder.typicode.com/posts" })));
}
export default App;
