import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import './App.css'

function fileSizeValidator(file) {
    if (file.size > 2000000) {
        return {
            code: "file-too-large",
            message: `File is larger than 2MB`
        }
    }
    return null
}

export default function ProfilePhoto({ setUserProfilePic }) {
    const [file, setFile] = useState(null);
    const [errMessage, setErrMessage] = useState();
    const [previewDataUrl, setPreviewDataUrl] = useState();

    const onDrop = useCallback((files, rejectedFiles) => {
        let file = files[0];

        if (rejectedFiles.length > 0) {
            setErrMessage(rejectedFiles[0].errors[0].message);
            return;
        }

        setFile(file);
        setErrMessage('');

        let fileReader = new FileReader();

        if (file) {
            fileReader.readAsDataURL(file)
        }

        fileReader.onloadend = function () {
            setPreviewDataUrl(fileReader.result)
        }
    },[])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        validator: fileSizeValidator,
        accept: {
            'image/jpeg': ['.jpeg'],
            'image/png': ['.png']
          },
          onDrop
    })



    async function uploadFile() {
        const formData = new FormData();
        formData.append('profile', file);
        let res = await fetch('http://localhost:3000/users/upload-profile', {
            method: 'POST',
            body: formData
        });
        let resData = await res.json();

        console.log(resData)
        setUserProfilePic(resData.url)
        setUrl(resData.url)
    }

    
    function stopPropagation(e) {
        e.stopPropagation();
    }

    return (
        <>
            <section className="profile-photo">
                <label htmlFor="">Profile Picture</label>
                <div {...getRootProps()} className={"dropBox "+ (isDragActive ? "dragging" : null)}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                    <em>(Only *.jpeg and *.png images will be accepted, 
                        File size max 2MB)</em>
                </div>
                {errMessage && <p>{errMessage}</p>}
                <div>
                    {previewDataUrl ? <img src={previewDataUrl} className="preview" /> : null}
                </div>
                {file && !errMessage ? <button onClick={uploadFile}>Upload</button> : null}
            </section>

        </>
    )
}