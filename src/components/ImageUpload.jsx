import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
          isDragActive ? 'border-mooody-green bg-mooody-yellow bg-opacity-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {currentImage ? (
          <img src={URL.createObjectURL(currentImage)} alt="Uploaded" className="mx-auto max-h-48 object-contain" />
        ) : (
          <p>{isDragActive ? t.dropImageHere : t.dragDropImage}</p>
        )}
      </div>
      <Button onClick={() => document.querySelector('input[type="file"]').click()} className="mt-2 w-full">
        {currentImage ? t.changeImage : t.uploadImage}
      </Button>
    </div>
  );
};

export default ImageUpload;