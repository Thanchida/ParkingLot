import VehicleSize from './VehicleSize.js';
import Vehicle from './Vehicle.js';

class Bus extends Vehicle {
  constructor() {
    super('Bus', VehicleSize.Large);
    this.spotsNeeded = 5;
  }

  canFitInSpot(spot) {
    return spot.getSize() === VehicleSize.Large;
  }

  print() {
    console.log('B');
  }
}

export default Bus;
