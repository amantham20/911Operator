import React from 'react'


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
  const profile = {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    // Add more personal information as needed
  };

  // Sample critical information
  const criticalInfo = {
    medicalHistory: 'No known medical conditions',
    allergies: 'None',
    emergencyContact: 'Jane Doe (555-555-5555)',
    // Add more critical information as needed
  };

  // Sample emergency information
  const emergencyInfo = {
    location: '123 Park Ave, City, Country',
    natureOfEmergency: 'Medical Emergency',
    descriptionOfSituation: 'Injured in a car accident',
    victimInformation: 'Injured person - John Doe, Age: 30',
    safetyInformation: 'Stay away from the accident site',
    suspectInformation: 'No suspects reported',
    vehicleInformation: 'Vehicle involved - Red Sedan, License Plate: ABC123',
    specialInstructions: 'Call 911 immediately',
    updatesAndChanges: 'No updates at the moment',
    // Add more emergency information as needed
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
          <h2 className="text-2xl font-semibold mb-4">Critical Information</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <div>
              <strong>Medical History:</strong> {criticalInfo.medicalHistory}
            </div>
            <div>
              <strong>Allergies:</strong> {criticalInfo.allergies}
            </div>
            <div>
              <strong>Emergency Contact:</strong> {criticalInfo.emergencyContact}
            </div>
            {/* Add more critical information here */}
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Emergency Information</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <div>
              <strong>Location:</strong> {emergencyInfo.location}
            </div>
            <div>
              <strong>Nature of Emergency:</strong> {emergencyInfo.natureOfEmergency}
            </div>
            <div>
              <strong>Description of Situation:</strong> {emergencyInfo.descriptionOfSituation}
            </div>
            <div>
              <strong>Victim Information:</strong> {emergencyInfo.victimInformation}
            </div>
            <div>
              <strong>Safety Information:</strong> {emergencyInfo.safetyInformation}
            </div>
            <div>
              <strong>Suspect Information:</strong> {emergencyInfo.suspectInformation}
            </div>
            <div>
              <strong>Vehicle Information:</strong> {emergencyInfo.vehicleInformation}
            </div>
            <div>
              <strong>Special Instructions:</strong> {emergencyInfo.specialInstructions}
            </div>
            <div>
              <strong>Updates and Changes:</strong> {emergencyInfo.updatesAndChanges}
            </div>
            {/* Add more emergency information here */}
          </div>
        </div>
      </div>
    </div>
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

export default Dashboard