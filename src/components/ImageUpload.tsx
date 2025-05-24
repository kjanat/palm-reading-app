'use client';

import React, { useState, useCallback } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Upload, X, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
    onImageUpload: (imageUrl: string) => void;
    maxSize?: number; // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
    onImageUpload, 
    maxSize = 10 
}) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const { user } = useAuth();

    const handleFiles = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0 || !user) return;

        const file = files[0];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB.`);
            return;
        }

        setUploading(true);

        try {
            // Create preview
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // Upload to Firebase
            const fileName = `palms/${user.uid}/${uuidv4()}_${file.name}`;
            const storageRef = ref(storage, fileName);
            
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            
            onImageUpload(downloadURL);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    }, [user, maxSize, onImageUpload]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const clearPreview = () => {
        setPreview(null);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div 
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragActive 
                        ? 'border-purple-400 bg-purple-400/10' 
                        : 'border-purple-300/50 hover:border-purple-400 hover:bg-purple-400/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {preview ? (
                    <div className="relative">
                        <img 
                            src={preview} 
                            alt="Palm preview" 
                            className="max-w-full h-48 object-cover rounded-lg mx-auto"
                        />
                        <button
                            onClick={clearPreview}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <>
                        <Upload className="mx-auto h-12 w-12 text-purple-300 mb-4" />
                        <p className="text-lg font-medium text-purple-200 mb-2">
                            Upload Your Palm Image
                        </p>
                        <p className="text-sm text-purple-300 mb-4">
                            Drag and drop or click to select
                        </p>
                        <p className="text-xs text-purple-400">
                            Max size: {maxSize}MB • Formats: JPG, PNG, WebP
                        </p>
                    </>
                )}
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                
                {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2 text-purple-300" />
                            <p className="text-purple-200">Uploading...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
