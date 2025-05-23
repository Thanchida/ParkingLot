export default class Vehicle {
    constructor(type, size, licensePlate) {
      this.type = type;
      this.size = size;
      this.licensePlate = licensePlate;
    }
  
    canFitInSpot(spot) {
      return this.size === spot.getSize() || this.size === 'Motorcycle';
    }
  
    parkInSpot(spot) {
      console.log(`${this.type} parked in spot ${spot.getSpotNumber()}`);
    }
}