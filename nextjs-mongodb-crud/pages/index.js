import { useState, useEffect, use } from 'react';
import ParkingLot from '@/models/ParkingLot';
import Level from '@/models/Level';
import ParkingSpot from '@/models/ParkingSpot';
import Vehicle from '@/models/Vehicle';
import Motorcycle from '@/models/Motorcycle';
import Car from '@/models/Car';
import Bus from '@/models/Bus';

const PARKING_URL = 'api/parking/';

export default function Home() {
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [vehicle, setVehicle] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState();
  const [selectedSpot, setSelectedSpot] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  useEffect(() => {
    console.log("vehicle type has changed!")
    createVehicle(type);
  }, [type]);

  useEffect(() => {
    console.log("vehicle has changed!");
  }, [vehicle]);

  useEffect(() => {
    console.log("license plate has changed!");
  }, [licensePlate]);

  useEffect(() => {

  },[filteredSpots])

  useEffect(() => {
    const lot = new ParkingLot();
    const allSpots = [];

    lot.levels.forEach((level) => {
      level.spots.forEach((spot) => {
        allSpots.push({
          spotObj: spot,
          level: level.floor,
          row: spot.getRow(),
          spotNumber: spot.getSpotNumber(),
          spotSize: spot.getSize(),
          isAvailable: spot.isAvailable(),
        });
      });
    });

    setSpots(allSpots);
    setFilteredSpots(allSpots);
    fetchItems();
  }, []);

  useEffect(() => {
    console.log(level);
    if (level) {
      const filtered = spots.filter((spot) => spot.level === level);
      setFilteredSpots(filtered);
    } else {
      setFilteredSpots(spots);
    }
  }, [level, spots]);
  
  const createVehicle = (type) => {
    let v;
    if (type === 'Motorcycle') {
      v = new Motorcycle();
    } else if (type === 'Car') {
      v = new Car();
    } else if (type === 'Bus') {
      v = new Bus();
    } else {
      v = new Vehicle(type);
    }
    setVehicle(v);
  };

  const handlePark = async (selectedSpot) => {
    if (!selectedSpot) return;
  
    // Extract necessary properties from the selected spot to avoid circular references
    const { spotNumber, level, spotSize } = selectedSpot;
  
    // Check if vehicle can fit the spot (assuming canFitVehicle is a method of ParkingSpot)
    if (!selectedSpot.spotObj.canFitVehicle(vehicle)) {
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
          licensePlate: vehicle.licensePlate, // Use vehicle's license plate
          spotSize: spotSize,
          level: level, // Only send the level number, not the entire level object
          spotNumber: spotNumber, // Send spot number, not the entire spot object
          carType: vehicle.type, // Vehicle type (e.g., Car, Motorcycle, etc.)
        }),
      });
  
      if (res.ok) {
        console.log('Vehicle parked successfully!');
        // Reset the selected spot after parking
        setSelectedSpot('');
      } else {
        console.log('Failed to park the vehicle.');
      }
    } catch (error) {
      console.log('Error parking vehicle:', error);
    }
  };
  

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      fetchItems();
      setForm({ name: '', description: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const groupedByRow = filteredSpots.reduce((acc, spot) => {
    if (!acc[spot.row]) {
      acc[spot.row] = [];
    }
    acc[spot.row].push(spot);
    return acc;
  }, {});
  

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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🅿️ Available Parking Spots</h2>
          <div className="flex flex-wrap gap-6">
            {Object.keys(groupedByRow)
              .sort((a, b) => Number(a) - Number(b))
              .map((row) => (
                <div key={row} className="w-full mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Row {row}</h3>
                  <div className="flex flex-wrap gap-4">
                    {groupedByRow[row].map((spot, index) => (
                      <button
                        key={index}
                        className={`p-4 border rounded-lg ${
                          spot.spotObj.canFitVehicle(vehicle)
                            ? 'border-green-300 bg-green-50'
                            : 'border-red-300 bg-red-50'
                        } shadow-sm flex-grow ${spot.spotObj == selectedSpot ? "bg-green-300": ""}`}
                        onClick={() => setSelectedSpot(spot.spotObj)}
                      >
                        <p>{spot.spotNumber}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-[#03C755] text-white rounded-lg px-25 py-3 text-lg shadow-md hover:bg-[#00b544] transition-all duration-300"
              onClick={() => handlePark(selectedSpot)}
              disabled={!selectedSpot}
            >
              Park
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
