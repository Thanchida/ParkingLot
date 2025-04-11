import ParkingLot from '@/models/ParkingLot';

let sharedParkingLot = null;

export default class ParkingService {
  constructor() {
    if (!sharedParkingLot) {
      sharedParkingLot = new ParkingLot();
    }
    this.lot = sharedParkingLot;
  }

  getAllSpots() {
    const spots = [];
    this.lot.levels.forEach((lvl) => {
        lvl.spots.forEach((spot) => {
          spots.push(spot);
        });
    });
    return spots;
  }

  getSpots(level) {
    const spots = [];
    this.lot.levels.forEach((lvl) => {
        if (level && lvl.floor !== level) return;
  
        lvl.spots.forEach((spot) => {
            spots.push(spot);
        });
    });
    return spots;
  }

  getAvailableSpots(type, level = null) {
    const spots = [];

    this.lot.levels.forEach((lvl) => {
      if (level && lvl.floor !== level) return;

      lvl.spots.forEach((spot) => {
        console.log('check spot',spot);
        if (spot.isAvailable() && type && spot.canFitVehicle(type)) {
          spots.push(spot);
        }
      });
    });

    return spots;
  }

  parkVehicle(vehicle, spot) {
    return spot.park(vehicle);
  }

  removeVehicle(vehicle, spot) {
    console.log("remove", spot);
    return spot.removeVehicle(vehicle);
  }
}
