import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import './App.css'

export default function ProfilePhoto({ setUserProfilePic }) {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState();
    const [previewDataUrl, setPreviewDataUrl] = useState();

    const onDrop =((acceptedFiles) => {
        let file = acceptedFiles.files[0];

        setFile(file);

        let fileReader = new FileReader();

        if (file) {
            fileReader.readAsDataURL(file)
        }

        fileReader.onloadend = function () {
            setPreviewDataUrl(fileReader.result)
        }
    },[])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})



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
            <section className="profile-photo" onClick={stopPropagation}>
                <label htmlFor="">Profile Picture</label>
                <div {...getRootProps()} >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                <div>
                    {previewDataUrl ? <img src={previewDataUrl} width='200' height='200' /> : null}
                </div>
                {file ? <button onClick={uploadFile}>Upload</button> : null}
            </section>

        </>
    )
}