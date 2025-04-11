import VehicleSize from './VehicleSize.js';
import Vehicle from './Vehicle.js';

class Car extends Vehicle {
  constructor() {
    super('Car', VehicleSize.Compact);
    this.spotsNeeded = 1;
  }

  canFitInSpot(spot) {
    return (
      spot.getSize() === VehicleSize.Large ||
      spot.getSize() === VehicleSize.Compact
    );
  }

  print() {
    console.log('C');
  }
}

export default Car;