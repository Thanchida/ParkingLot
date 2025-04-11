import VehicleSize from './VehicleSize.js';
import Vehicle from './Vehicle.js';

class Motorcycle extends Vehicle {
  constructor() {
    super('Motorcycle', VehicleSize.Motorcycle);
    this.spotsNeeded = 1;
  }

  canFitInSpot(spot) {
    console.log('check');
    return true;
  }

  print() {
    console.log('M');
  }
}

export default Motorcycle;
