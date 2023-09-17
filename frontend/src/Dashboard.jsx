import React from 'react'

import { useState } from 'react';

import { useParams } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Emergency Preview</div>
                <div className="space-x-4">
                    <a href="#" className="text-white">Home</a>
                    <a href="#" className="text-white">About</a>
                    <a href="#" className="text-white">Contact</a>
                </div>
            </div>
        </nav>
    )
}






const ProfilePage = () => {
    // Sample profile data

    const { id } = useParams();

    React.useEffect(() => {
        console.log(id);
    }, [id])

    const profile = {
      name: 'John Doe',
      phoneNumber: '123-456-7890',
      address: '123 Main St, City, Country',
      // Add more personal information as needed
    };
  
    // Sample initial emergency information (set to null)
    const initialEmergencyInfo = {
      location: null,
      natureOfEmergency: null,
      descriptionOfSituation: null,
      victimInformation: null,
      safetyInformation: null,
      suspectInformation: null,
      vehicleInformation: null,
      specialInstructions: null,
      updatesAndChanges: null,
      // Add more emergency information as needed
    };
  
    const [emergencyInfo, setEmergencyInfo] = useState(initialEmergencyInfo);
  
    const handleEmergencyInfoChange = (key, value) => {
      // Animate the appearance of the information when it's set
      setEmergencyInfo((prevInfo) => ({
        ...prevInfo,
        [key]: value,
      }));
    };
  
    return (
      <div className="container mx-auto p-4">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 p-4">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.phoneNumber}</p>
              <p className="text-gray-600">{profile.address}</p>
              {/* Add more personal information here */}
            </div>
          </div>
  
          {/* Right Section */}
          <div className="w-3/4 p-4">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Emergency Information</h2>
            <div className="bg-white p-4 rounded shadow-md flex gap-5 flex-col">
              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.location ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Location:</strong> {emergencyInfo.location}
              </div>
              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.natureOfEmergency ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Nature of Emergency:</strong> {emergencyInfo.natureOfEmergency}
              </div>
              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.descriptionOfSituation ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Description of Situation:</strong> {emergencyInfo.descriptionOfSituation}
              </div>
              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.safetyInformation ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Safety Information:</strong> {emergencyInfo.safetyInformation}
              </div>



              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.suspectInformation ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Suspect Information:</strong> {emergencyInfo.suspectInformation}
              </div>

              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.vehicleInformation ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Vehicle Information:</strong> {emergencyInfo.vehicleInformation}
              </div>

              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.specialInstructions ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Special Instruction:</strong> {emergencyInfo.specialInstructions}
              </div>
              <div className={`transition-opacity duration-500 ease-in-out ${emergencyInfo.updatesAndChanges ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Updates and Changes</strong> {emergencyInfo.updatesAndChanges}
              </div>



            </div>


            <div className="mt-4">
            <input
              type="text"
              placeholder="Location"
              className="border p-2"
              onChange={(e) => handleEmergencyInfoChange('location', e.target.value)}
            />
            <input
              type="text"
              placeholder="Nature of Emergency"
              className="border p-2 mt-2"
              onChange={(e) => handleEmergencyInfoChange('natureOfEmergency', e.target.value)}
            />
            <input
              type="text"
              placeholder="Description of Situation"
              className="border p-2 mt-2"
              onChange={(e) => handleEmergencyInfoChange('descriptionOfSituation', e.target.value)}
            />
            </div>
            
            
            </div>
          </div>
        </div>
    //   </div>
    );
  };
  




const Dashboard = () => {
    return (
        <div>

            <Navbar />
            <ProfilePage />
        </div>
    )
}

export default Dashboard;


export { Navbar };