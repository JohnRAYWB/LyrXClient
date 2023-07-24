import React, {useRef, useState} from 'react';
import {message} from "antd";

interface UploadParam {
    setFile: Function,
    setStatus: Function,
    type: string
    children
}

const FileUpload: React.FC<UploadParam> = ({setFile, setStatus, type, children}) => {

    const [loading, setLoading] = useState(false)
    const ref = useRef<HTMLInputElement>()

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
        setStatus(true)
        setLoading(true)
        message.success('Avatar upload successfully')
    }

    return (
        <>
            {!loading ?
                <div onClick={() => ref.current.click()}>
                    <input
                        style={{display: "none"}}
                        type={'file'}
                        onChange={handleUpload}
                        accept={`${type}/*`}
                        ref={ref}
                    />
                    {children}
                </div>
                :
                <div>
                    {children}
                </div>
            }
        </>
    );
};

export default FileUpload;