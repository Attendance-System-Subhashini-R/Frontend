import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditModal = ({ isOpen, onRequestClose, initialData, onSave }) => {
  const [inTime, setInTime] = useState(new Date());
  const [outTime, setOutTime] = useState(new Date());
  const[date, setDate] = useState(new Date())
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setInTime(initialData.inTime ? new Date(initialData.inTime) : new Date());
      setOutTime(initialData.outTime ? new Date(initialData.outTime) : new Date());
      setDate(initialData.date ?new Date(initialData.date) : new Date() )
    }
  }, [initialData]);

  const validateTimes = () => {
    const now = new Date();
  
    if (inTime > now) {
      setError('Clock-in time cannot be in the future.');
      return false;
    }
    if (outTime > now) {
      setError('Clock-out time cannot be in the future.');
      return false;
    }
    if (outTime <= inTime) {
      setError('Clock-out time must be after clock-in time.');
      return false;
    }
    if (inTime.toDateString() !== outTime.toDateString()) {
      setError('Clock-in and clock-out times must be on the same day.');
      return false;
    }
  
    setError('');
    return true;
  };
  

  const handleSave = () => {
    if (validateTimes()) {
        onSave({ 
            inTime: inTime.toISOString(), 
            outTime: outTime.toISOString(), 
            date: inTime.toISOString().split('T')[0] 
          });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Edit Times</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="flex gap-8">
          <div>
            <label className="block text-blue-800 font-medium mb-2">Clock In Time:</label>
            <DatePicker
              selected={inTime}
              onChange={(date) => setInTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-blue-800 font-medium mb-2">Clock Out Time:</label>
            <DatePicker
              selected={outTime}
              onChange={(date) => setOutTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
