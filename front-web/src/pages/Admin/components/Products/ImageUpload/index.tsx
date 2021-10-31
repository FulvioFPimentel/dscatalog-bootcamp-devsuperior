import React, { useState } from 'react';
import { ReactComponent as UploadPlaceholder } from 'core/assets/images/upload-placeholder.svg'
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

type Props = {
    onUploadSuccess: (imgURL: string) => void;
    productImgUrl: string
}

const ImageUpload = ({ onUploadSuccess, productImgUrl }: Props ) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const imgUrl = uploadedImgUrl || productImgUrl

    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

        setUploadProgress(progress);
    }

    const uploadImage = (selectImage: File) => {
        const payload = new FormData();
        payload.append('file', selectImage);

        makePrivateRequest({ 
            url: '/products/image', 
            method:'POST',
            data: payload,
            onUploadProgress
        })
        .then(response => {
            setUploadedImgUrl(response.data.uri);
            onUploadSuccess(response.data.uri);
        })
        .catch(() => {
            toast.error('Erro ao enviar arquivo')
        })
        .finally(() => setUploadProgress(0))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const selectImage = event.target.files?.[0];  // select the image without giving errors if the return is zero
        
       if (selectImage) {
            uploadImage(selectImage);
       }
    }
    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input 
                        type="file"
                        id="upload"
                        accept="image/jpeg, image/png"
                        onChange={handleChange}
                        hidden
                        />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    A imagem deve ser JPG ou PNG e não deve ultrapassar <strong>5 mb</strong>.
                </small>
            </div>
            <div className="upload-placeholder">
                {uploadProgress > 0 && (
                    <>
                        <UploadPlaceholder />
                        <div className="upload-progress-container">
                            <div 
                                className="upload-progress" 
                                style={{ width: `${uploadProgress}%` }}
                            >
                            </div>
                        </div>
                    </>
                )}
                {(imgUrl && uploadProgress === 0) && (
                    <img 
                    src={imgUrl} 
                    alt={imgUrl}
                    className="uploaded-image"
                    /> 
                )}

            </div>
            
        </div>
    )
}

export default ImageUpload;