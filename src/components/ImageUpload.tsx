import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
            setError('');
        } else {
            setError('Please select a valid image file.');
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            setError('Please select an image to upload.');
            return;
        }

        // Implement the upload logic here
        // For example, you can call an API to upload the image
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">Upload Your Palm Image</h2>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="mb-4"
            />
            {selectedImage && <img src={selectedImage} alt="Selected palm" className="mb-4 w-64 h-64 object-cover" />}
            {error && <p className="text-red-500">{error}</p>}
            <button 
                onClick={handleUpload} 
                className="bg-green-500 text-white py-2 px-4 rounded"
            >
                Upload
            </button>
        </div>
    );
};

export default ImageUpload;