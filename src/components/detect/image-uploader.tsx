'use client';

import { UploadCloud } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
}

export function ImageUploader({ onFileSelect, previewUrl }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors
      ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <div className="flex h-full items-center gap-4">
            <Image src={previewUrl} alt="Image preview" width={64} height={64} className="h-16 w-16 rounded-md object-contain" />
            <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Image selected.</p>
                <p>Drop another image or click to replace.</p>
            </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 text-muted-foreground">
          <UploadCloud className="h-10 w-10" />
          <div className="flex flex-col">
            <p className="font-medium text-foreground">
              {isDragActive ? 'Drop the image here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-xs">PNG, JPG, JPEG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
