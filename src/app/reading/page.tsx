import React from 'react';
import PalmReading from '../../components/PalmReading';
import ImageUpload from '../../components/ImageUpload';

const ReadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h1 className="text-4xl font-bold mb-6">Palm Reading Insights</h1>
            <ImageUpload />
            <PalmReading />
        </div>
    );
};

export default ReadingPage;