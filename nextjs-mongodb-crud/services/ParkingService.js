import ParkingLot from '@/models/ParkingLot';

export default class ParkingService {
  constructor() {
    this.lot = new ParkingLot();
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
}
