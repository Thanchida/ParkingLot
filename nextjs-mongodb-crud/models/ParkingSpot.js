export default class ParkingSpot {
    static nextId = 1;
    constructor(level, row, spotNumber, spotSize) {
      this.spotId = ParkingSpot.nextId++;
      this.level = level;
      this.row = row;
      this.spotNumber = spotNumber;
      this.spotSize = spotSize;
      this.vehicle = null;
    }
  
    isAvailable() {
      console.log("Checking isAvailable:", this.vehicle);
      return this.vehicle === null;
    }
  
    canFitVehicle(vehicle) {
      console.log('check', vehicle);
      console.log(this);
      console.log(this.isAvailable());
      console.log(vehicle.canFitInSpot(this));
      return this.isAvailable() && vehicle.canFitInSpot(this);
    }
  
    park(vehicle) {
      console.log('park');
      if (!this.canFitVehicle(vehicle)) {
        return false;
      }
      this.vehicle = vehicle;
      vehicle.parkInSpot(this);
      console.log('parked', this);
      return true;
    }
  
    removeVehicle() {
      this.level.spotFreed();
      this.vehicle = null;
    }
  
    getSize() {
      return this.spotSize;
    }

    getLevel() {
      console.log(this.level);
      return this.level;
    }
  
    print() {
      if (this.vehicle === null) {
        if (this.spotSize === 'Compact') {
          process.stdout.write('c');
        } else if (this.spotSize === 'Large') {
          process.stdout.write('l');
        } else if (this.spotSize === 'Motorcycle') {
          process.stdout.write('m');
        }
      } else {
        this.vehicle.print();
      }
    }
  
    getRow() {
      return this.row;
    }
  
    getSpotNumber() {
      return this.spotNumber;
    }
  }