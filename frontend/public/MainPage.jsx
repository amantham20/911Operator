import React from 'react'

import { Navbar } from './Dashboard';

const CurrentEmergency = () => {
    return (
        <div>
            
        </div>
    )
}

const MainPage = () => {
  return (
    <div>
        <Navbar />

        <div className="flex justify-center">
            <div className="w-1/2 text-center">
                <div className="text-4xl font-bold mb-4">Welcome to Automated Emergency Center</div>
                <div>Preview</div>


                <div className="mt-4">
                    <CurrentEmergency />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainPage