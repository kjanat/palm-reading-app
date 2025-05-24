import React from 'react';
import Navigation from '../../components/Navigation';
import PalmReading from '../../components/PalmReading';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <Navigation />
            <h1 className="dashboard-title">Your Palm Reading Dashboard</h1>
            <PalmReading />
        </div>
    );
};

export default DashboardPage;