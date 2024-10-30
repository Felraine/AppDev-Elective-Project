import React from 'react';
import './Progress.css';

const Progress = () => {
    return (
        <div className="progress-container">
            <h1 className="progress-title">Progress Tracker</h1>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: '70%' }}></div>
            </div>
            <div className="progress-details">
                <p>Tasks Completed: 14</p>
                <p>Total Tasks: 20</p>
                <p>Progress: 70%</p>
            </div>
        </div>
    );
};

export default Progress;
