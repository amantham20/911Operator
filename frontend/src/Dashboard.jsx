import React from 'react'

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { db } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { string } from 'prop-types';


import Face  from './face.png'

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">SurgeSOS</div>
                <div className="space-x-4">
                    <Link to="/911Operator" className="text-white">Home</Link>
                    <Link to="/911Operator/About" className="text-white">About</Link>

                </div>
            </div>
        </nav>
    )
}


function Hashing(inputString) {
  let hash = 5381; // Initial hash value
  inputString = String(inputString);
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash * 33) ^ char; // DJB2 hash formula
  }

  return hash >>> 0; // Ensure the result is a positive integer
}


const profiles = [
  {
    id: 1,
    name: 'Alice Johnson',
    phoneNumber: '555-123-4567',
    address: '123 Oak Street, Townsville, USA',
  },
  {
    id: 2,
    name: 'Bob Smith',
    phoneNumber: '555-987-6543',
    address: '456 Elm Avenue, Cityville, USA',
  },
  {
    id: 3,
    name: 'Eve Anderson',
    phoneNumber: '555-555-5555',
    address: '789 Pine Road, Villagetown, USA',
  },
  {
    id: 0,
    name: 'Charlie Brown',
    phoneNumber: '555-321-6789',
    address: '101 Maple Lane, Hamletville, USA',
  },
];


const ProfilePage = () => {
    // Sample profile data

    const { pageID } = useParams();

    // React.useEffect(() => {
    //     console.log(id);
    // }, [id])

    // const profile = {
    //   name: 'John Doe',
    //   phoneNumber: '123-456-7890',
    //   address: '123 Main St, City, Country',
    //   // Add more personal information as needed
    // };
    const hashedId = Hashing(pageID);
    const selectedProfileIndex = hashedId % profiles.length;
    const profile = profiles[selectedProfileIndex];

  
    // Sample initial emergency information (set to null)
    const initialEmergencyInfo = {
      location: "123 Main Street, Cityville, State",
      natureOfEmergency: "Fire",
      descriptionOfSituation: "There is a fire in a residential building.",
      victimInformation: "No information available at this time.",
      safetyInformation: "Please evacuate the area immediately and call 911.",
      suspectInformation: "No suspects reported at this time.",
      vehicleInformation: "No vehicles involved in the incident.",
      specialInstructions: "Stay low to the ground and cover your nose and mouth with a cloth.",
      updatesAndChanges: "No updates or changes to report currently.",
    };
    

    const [caseData, setCaseData] = useState([]);
    // const initialEmergencyInfo = {
    //   location: null,
    //   dispatched: null,
    //   situation: null,
    // };
    const [emergencyInfo, setEmergencyInfo] = useState(initialEmergencyInfo);
  


    useEffect(() => {
      const q = query(collection(db, 'cases'))
  
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let casesArr = []
        QuerySnapshot.forEach((doc) => {
          console.log(doc.data());
          casesArr.push({...doc.data(), id: doc.id})
        });
        setCaseData(casesArr);
      })
  
      return () => unsubscribe()
    }, []);

    // // Function to update emergencyInfo state based on user input
    // const handleEmergencyInfoChange = (key, value) => {
    //   // Animate the appearance of the information when it's set
    //   setEmergencyInfo((prevInfo) => ({
    //     ...prevInfo,
    //     [key]: value,
    //   }));
    // };
  


    // useEffect(() => {
    //   // Define your document ID here
    //   const documentId = id;
  
    //   // const db = firebase.firestore();

    //   console.log("documentId: ", documentId)
  
    //   async function getEmergencyData() {
    //     try {
    //       const docRef = db.collection('cases').doc(documentId);
    //       const docSnapshot = await docRef.get();
  
    //       if (docSnapshot.exists) {
    //         // Document exists, you can access its data
    //         const data = docSnapshot.data();
  
    //         // Update the emergencyInfo state with the retrieved data
    //         setEmergencyInfo({
    //           location: data.location || null,
    //           natureOfEmergency: data.dispached || null,
    //           descriptionOfSituation: data.situation || null,
    //           victimInformation: data.victimInformation || null,
    //           safetyInformation: data.safetyInformation || null,
    //           suspectInformation: data.suspectInformation || null,
    //           vehicleInformation: data.vehicleInformation || null,
    //           specialInstructions: data.specialInstructions || null,
    //           updatesAndChanges: data.updatesAndChanges || null,
    //         });
    //       } else {
    //         // Document does not exist
    //         console.log('Document not found.');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching document:', error);
    //     }
    //   }
  
    //   // Fetch the emergency data when the component mounts
    //   getEmergencyData();
    // }, []);
  



  

  
    return (
      <div className="container mx-auto p-4">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 p-4">
            <div className="text-center">
              <h1 className='text-2xl text-bold mb-5'>Caller</h1>
              <img
                src={Face}
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
            <h2 className="text-2xl font-semibold mt-8 mb-4">Emergency Information {pageID}</h2>
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
                {/* {caseData.map((data) => {
                  data.id === pageID ? 
                
              (<>
              <div className={`transition-opacity duration-500 ease-in-out ${caseData.dispatched ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Vehicle Information:</strong> {caseData.dispatched}
              </div>

              <div className={`transition-opacity duration-500 ease-in-out ${caseData.location ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Special Instruction:</strong> {caseData.location}
              </div>
              <div className={`transition-opacity duration-500 ease-in-out ${caseData.situation ? 'opacity-100' : 'opacity-0'}`}>
                <strong>Vehicle Information:</strong> {caseData.situation}
              </div>
              </> ): <></>
              })} */}



            </div>


            {/* <div className="mt-4">
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
            </div> */}
            
            
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