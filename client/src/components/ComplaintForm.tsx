import React, { useState, FormEvent, ChangeEvent } from 'react';

const ComplaintForm: React.FC = () => {
  const [complainOn, setComplainOn] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send complaint data to server
      const response = await fetch('https://prajjwal-bhai-test-be.asaurav.com.np/user/complains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ complainOn, description })
      });

      if (response.ok) {
        // Clear form fields
        setComplainOn('');
        setDescription('');
        // Show success message
        alert('Complaint submitted successfully!');
      } else {
        // Handle error
        alert('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const handleComplainOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComplainOn(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Submit a New Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="complainOn" className="block text-sm font-medium text-gray-700">Complain On</label>
          <input type="text" id="complainOn" value={complainOn} onChange={handleComplainOnChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
