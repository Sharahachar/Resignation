import React from 'react';
import './StatusPage.css';

function StatusPage({ name, id, status }) {
  const getStatusClass = (currentStatus) => {
    if (status === 'submitted' && currentStatus === 'submitted') return 'completed';
    if (status === 'resignation_approved' && (currentStatus === 'submitted' || currentStatus === 'resignation_approved')) return 'completed';
    return 'pending';
  };

  return (
    <div className="status-page1">
      <p className='hg1'>Status of Your Resignation</p>
      <div className="employee-details">
        <p>Name: {name}</p>
        <p>ID Card Number: {id}</p>
      </div>
      <div className="progress-bar">
        <div className={`progress-step ${getStatusClass('submitted')}`}>
          <div className="circle"></div>
          <span className='cols'>Submission</span>
        </div>
        <div className="arrow-mark"></div>
        <div className={`progress-step ${getStatusClass('resignation_approved')}`}>
          <div className="circle"></div>
          <span className='cols'>Resignation Approved</span>
        </div>
      </div>
      <button className="back1-button" onClick={() => window.location.href = '/'}>Back to Home</button>
    </div>
  );
}

export default StatusPage;
