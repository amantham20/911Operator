import React, { useState } from 'react';

const EmergencyCallForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    locationInfo: '', // Corrected field name
    natureOfEmergency: '',
    dispatch: 'medical',
    callerName: '',
    descriptionOfSituation: '',
    victimInformation: '',
    safetyInformation: '',
    suspectInformation: '',
    vehicleInformation: '',
    specialInstructions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to Firebase
    console.log(formData);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Emergency Call Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Add form fields here */}
        {/* Example: Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block font-semibold">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Location Information */}
        <div>
          <label htmlFor="locationInfo" className="block font-semibold">
            Location Information:
          </label>
          <input
            type="text"
            id="locationInfo"
            name="locationInfo" // Corrected field name
            value={formData.locationInfo} // Corrected field name
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Repeat this pattern for other form fields */}

        
        {/* Location Information */}
        <div>
          <label htmlFor="nature_of_emergency" className="block font-semibold">
            Nature of Emergency:
          </label>
          <input
            type="text"
            id="nature_of_emergency"
            name="nature_of_emergency" // Corrected field name
            value={formData.locationInfo} // Corrected field name
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Repeat this pattern for other form fields */}

        
        {/* Location Information */}
        <div>
          <label htmlFor="dispatch" className="block font-semibold">
            Dispatch:
          </label>
          <input
            type="text"
            id="dispatch"
            name="dispatch" // Corrected field name
            value={formData.locationInfo} // Corrected field name
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Repeat this pattern for other form fields */}

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyCallForm;
