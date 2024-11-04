import React from 'react';
import './Progress.css';

const Progress = () => {
    // Define completed and total tasks
    const completedTasks = 14; // You can set this value as needed
    const totalTasks = 20;     // Adjust as necessary

    // Calculate progress percentage
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="progress-container">
            <h1 className="progress-title">Progress Tracker</h1>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-details">
                <p>Tasks Completed: {completedTasks}</p>
                <p>Total Tasks: {totalTasks}</p>
                <p>Progress: {progress.toFixed(1)}%</p>
            </div>
            {/* Display a message based on the progress percentage */}
            {progress === 100 ? (
                <p className="completion-message">🎉 Congratulations! You've completed all tasks!</p>
            ) : (
                <p className="incomplete-message">🔄 Keep going! You’re {progress.toFixed(1)}% done. Almost there!</p>
            )}
        </div>
    );
};

export default Progress;
