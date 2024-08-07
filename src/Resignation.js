import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusPage from './StatusPage';
import { useNavigate } from 'react-router-dom';
import './Resignation.css';
import { IoReturnDownBackSharp } from "react-icons/io5";
import { SiStatuspage } from "react-icons/si";

function Resignation() {
  const [name] = useState('John Doe');
  const [id] = useState('123456');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [domain, setDomain] = useState('');
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    if (showStatusPage) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
          setStatus(response.data.status);
        } catch (error) {
          console.error('Error checking status:', error);
          toast.error('Failed to check status');
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showStatusPage, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-resignation', {
        name,
        id,
        domain,
        reason: reasonForLeaving,
        managerEmail: 'sharathachar55@gmail.com'
      });

      toast.success('Resignation submitted successfully.');
      setStatus('submitted');
      setShowStatusPage(true);
    } catch (error) {
      toast.error('Failed to submit resignation.');
      console.error('Error submitting resignation:', error);
    }
  };

  const handleDiscussWithManager = async () => {
    try {
      await axios.post('http://localhost:5000/send-discussion-notification', {
        name,
        id,
        managerEmail: 'sharathachar55@gmail.com'
      });

      toast.success('Notification sent to manager for discussion.');
    } catch (error) {
      toast.error('Failed to send notification.');
      console.error('Error sending notification:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleStatusCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
      setStatus(response.data.status);
      setShowStatusPage(true); // Set showStatusPage to true to display the StatusPage
      toast.success('Status updated.');
    } catch (error) {
      toast.error('Failed to check status.');
      console.error('Error checking status:', error);
    }
  };

  return (
    <div className="resignation-container1">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!showStatusPage ? (
        <div className="form-container12">
          <div className="status-check-icon" onClick={handleStatusCheck}>
          <SiStatuspage />
          </div>
          <h2 className='thg'>Resignation Application Form</h2>
          
          <div className="employee-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>ID Number:</strong> {id}</p>
          </div>
        
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reasonForLeaving">Reason for Leaving:</label>
              <textarea
                id="reasonForLeaving"
                value={reasonForLeaving}
                onChange={(e) => setReasonForLeaving(e.target.value)}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="button" className="button button-discuss" onClick={handleDiscussWithManager}>Discuss with Manager</button>
              <button type="button" className="button button-back" onClick={handleBack}><IoReturnDownBackSharp /></button>
              <button type="submit" className="button button-submit">Proceed</button>
            </div>
          </form>
        </div>
      ) : (
        <StatusPage name={name} id={id} status={status} />
      )}
    </div>
  );
}

export default Resignation;
