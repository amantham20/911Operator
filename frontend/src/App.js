
import { QuerySnapshot, collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import { db } from "./firebase";


function App() {

  const [caseData, setCaseData] = useState([]);

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

  return (
    <div className="App">
      {caseData.map((caseItem) => (
        <div key={caseItem.id} className="case-rectangle">
          { caseItem.id  ? 
          (<><div className="case-id">Case ID: {caseItem.id}</div><div className="container">
              <div className="blue-rectangle"></div> {/* Blue rectangle */}
              <ul>
                <li>Location: {caseItem.location}</li>
                <li>Dispatch: {caseItem.dispatched}</li>
                <li>Situation: {caseItem.situation}</li>
              </ul>
            </div></>) : <></>}
        </div> 
      ))}
    </div>
  );
}

export default App;