import VehicleSize from './VehicleSize.js';
import Vehicle from './Vehicle.js';

class Motorcycle extends Vehicle {
  constructor() {
    super('Motorcycle', VehicleSize.Motorcycle);
    this.spotsNeeded = 1;
  }

  canFitInSpot(spot) {
    return true; // Motorcycle can park anywhere
  }

  print() {
    console.log('M');
  }
}

export default Motorcycle;
