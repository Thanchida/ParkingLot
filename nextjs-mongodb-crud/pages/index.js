import { useState, useEffect } from 'react';
import ParkingService from '@/services/ParkingService';
import VehicleFactory from '@/services/VehicleFactory';

const PARKING_URL = 'api/parking';

export default function Home() {
  const service = new ParkingService();
  const factory = new VehicleFactory();
  const [allSpots, setAllSpots] = useState([]);
  const [availableSpots, setAvailableSpots] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState();
  const [selectedSpot, setSelectedSpot] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [exitData, setExitData] = useState('');

  useEffect(() => {
    if (type) {
      const v = factory.create(type);
      setLicensePlate(licensePlate);
      setVehicle(v);
    }
  }, [type]);

  useEffect(() => {
    if (!level) return;
    console.log("level has changed!");
    getAllSpots();
  }, [level]);

  useEffect(() => {
    if (!vehicle || !level) return;
    console.log("vehicle has changed!");
    getAvailableSpots();
  }, [vehicle, level]);
  

  useEffect(() => {
    console.log("license plate has changed!");
  }, [licensePlate]);

  useEffect(() => {
    console.log("Exit data:", exitData);
  }, [exitData])


  const getAllSpots = () => {
    if (!level) return;
    console.log("vehicle", vehicle);
    console.log("level", level);
    const spots = service.getSpots(level);
    console.log("spots: ", spots);
    setAllSpots(spots);
  }

  const getAvailableSpots = () => {
    if (!vehicle || !level) return;
    console.log("vehicle", vehicle);
    console.log("level", level);
    const spots = service.getAvailableSpots(vehicle, level);
    console.log("spots: ", spots);
    setAvailableSpots(spots);
  };
  

  const handlePark = async (selectedSpot) => {
    console.log('id', selectedSpot);

    const level = selectedSpot.level.floor;
    const spotSize = selectedSpot.spotSize;
    const spotNumber = selectedSpot.spotNumber;
  
    if (!selectedSpot.canFitVehicle(vehicle)) {
      console.log("This vehicle cannot fit in the selected spot.");
      return;
    }
  
    try {
      const res = await fetch(PARKING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licensePlate: licensePlate,
          spotSize: spotSize,
          level: level,
          spotNumber: spotNumber,
          carType: vehicle.type,
        }),
      });
  
      if (res.ok) {
        service.parkVehicle(vehicle, selectedSpot);
        console.log('Vehicle parked successfully!');

        const updatedAvailableSpots = availableSpots.filter(
          (spot) => spot.spotNumber !== selectedSpot.spotNumber
        );
        setAvailableSpots(updatedAvailableSpots);
  
        console.log('Vehicle parked successfully!');
        setSelectedSpot('');
      } else {
        console.log('Failed to park the vehicle.');
      }
    } catch (error) {
      console.log('Error parking vehicle:', error);
    }
  };


  const groupedByRow = allSpots.reduce((acc, spot) => {
    if (!acc[spot.row]) {
      acc[spot.row] = [];
    }
    acc[spot.row].push(spot);
    return acc;
  }, {});
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const res = await fetch(`/api/parking/${licensePlate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const result = await res.json();
        console.log("Exit Data:", result.data);
        setExitData(result.data);
      } else {
        const err = await res.json();
        alert(err.message || "Car not found.");
      }
    } catch (error) {
      console.error("Error fetching exit data:", error);
    }
  };
  
  
  const handleLeave = async (event) => {
    event.preventDefault();
  
    try {
      const res = await fetch(`/api/parking/${licensePlate}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const result = await res.json();
        console.log("Exit Data:", result.data);
        setExitData(result.data);
      } else {
        const err = await res.json();
        alert(err.message || "Car not found.");
      }
    } catch (error) {
      console.error("Error fetching exit data:", error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          🚗 Parking Spot Selector
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Enter Vehicle Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="plate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="w-full rounded-lg p-4 border border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
              placeholder="Enter Car Plate"
            />

            <select className="w-full rounded-lg p-4 text-gray-700 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}>
              <option value="" disabled>Pick a Vehicle Type</option>
              {['Motorcycle', 'Car', 'Bus'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <select className="w-full mt-3 rounded-lg p-4 text-gray-700 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}>
            <option value="" disabled>Pick a Level</option>
            {[1, 2, 3, 4, 5].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">⛔️ Leave the Parking Spot</h2>
          <div className='flex justify-between'>
            <div>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  name="plate"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="flex-1 rounded-lg px-90 p-4 border border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter Car Plate"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-6 py-3 text-lg shadow-md hover:bg-red-500 transition-all duration-300"
                >
                  Enter
                </button>
              </div>
            </form>
            <div className='bg-white rounded-lg shadow-lg mt-4 p-4'>
            {exitData && exitData.length > 0 ? 
            <div>
              <p className='text-gray-700 text-lg font-semibold'>Level: {exitData[0].level}</p>
              <p>Plate: {exitData[0].licensePlate}</p>
              <p>Spot No: {exitData[0].spotNumber}</p>
              <p>Car Type: {exitData[0].carType}</p>
              <button
                onClick={handleLeave}
                className="bg-red-600 text-white rounded-lg px-4 py-2 text-lg shadow-md hover:bg-red-500 transition-all duration-300"
                >
                Leave
            </button>
            </div> : null}
            </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🅿️ Available Parking Spots</h2>
          <div className="flex flex-wrap gap-6">
            {Object.keys(groupedByRow)
              .sort((a, b) => Number(a) - Number(b))
              .map((row) => (
                <div key={row} className="w-full mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Row {row}</h3>
                  <div className="flex flex-wrap gap-4">
                  {groupedByRow[row].map((spot, index) => {
                    const isSpotAvailable = availableSpots.some(s => s.spotNumber === spot.spotNumber);
                    return (
                      <button
                        key={index}
                        className={`p-4 border rounded-lg ${isSpotAvailable
                          ? 'border-green-300 bg-green-50'
                          : 'border-red-300 bg-red-50'
                        } shadow-sm flex-grow ${spot === selectedSpot ? "bg-green-300" : ""}`}
                        onClick={() => setSelectedSpot(spot)}
                      >
                        <p>{spot.spotNumber}</p>
                      </button>
                    );
                  })}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-6">
            {selectedSpot ? <button
              className="bg-[#03C755] text-white rounded-lg px-25 py-3 text-lg shadow-md hover:bg-[#00b544] transition-all duration-300"
              onClick={() => handlePark(selectedSpot)}
              disabled={!selectedSpot}
            >
              Park
            </button>: ""}
          </div>
        </div>
      </div>
    </div>
  );
}
