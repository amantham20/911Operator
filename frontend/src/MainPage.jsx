import React from 'react'

import { QuerySnapshot, collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "./firebase";

import { Link } from 'react-router-dom';
import { Navbar } from './Dashboard';

const CurrentEmergency = () => {


    const [caseData, setCaseData] = useState([]);

    useEffect(() => {
      const q = query(collection(db, 'cases'))
  
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let casesArr = []
        QuerySnapshot.forEach((doc) => {
          console.log(doc.data());
          casesArr.push({...doc.data(), id: doc.id})
        });
        // caseData.reverse();
        setCaseData(casesArr);
      })
  
      return () => unsubscribe()
    }, []);
    return (
        <div className='flex flex-col-reverse'>
{caseData.reverse().map((caseItem) => (
  <div key={caseItem.id} className="bg-white shadow-md rounded-md p-4 mb-4">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold">Case ID: {caseItem.id}</h2>
      <Link to={`/911Operator/emergency/${caseItem.id}`} className="bg-blue-500 text-white rounded-full px-2 py-1">
        Open Case
      </Link>
    </div>
    <ul className="list-disc list-inside text-left">
      <li>
        <span className="font-semibold">Location:</span> {caseItem.location}
      </li>
      <li>
        <span className="font-semibold">Dispatch:</span> {caseItem.dispatched}
      </li>
      <li>
        <span className="font-semibold">Situation:</span> {caseItem.situation}
      </li>
    </ul>
  </div>
))}

        </div>
    )
}

const MainPage = () => {
  return (
    <div>
        <Navbar />

        <div className="flex justify-center">
            <div className="w-1/2 text-center">
                <div className="text-5xl font-bold mb-4">Welcome to SurgeSOS</div>
                <div className='text-2xl'>an automated 911 operatior during caller traffic overload </div>


                <div className="mt-4">
                    <CurrentEmergency />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainPage