import React from 'react';

const PalmReading = ({ readingResults }) => {
    return (
        <div className="palm-reading-container bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Your Palm Reading Results</h2>
            <div className="reading-results text-white">
                {readingResults ? (
                    <div>
                        <h3 className="text-2xl">Interpretations:</h3>
                        <p>{readingResults.interpretation}</p>
                        <h3 className="text-2xl mt-4">Insights:</h3>
                        <p>{readingResults.insights}</p>
                    </div>
                ) : (
                    <p className="text-lg">Please upload an image of your palm to receive your reading.</p>
                )}
            </div>
        </div>
    );
};

export default PalmReading;