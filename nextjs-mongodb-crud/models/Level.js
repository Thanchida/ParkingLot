import ParkingSpot from "./ParkingSpot";

class Level {
    constructor(flr, numberSpots) {
        this.floor = flr;
        this.spots = [];
        this.availableSpots = 0;
        this.SPOTS_PER_ROW = 10;
      
        const largeSpots = Math.floor(numberSpots / 4);
        const bikeSpots = Math.floor(numberSpots / 4);
        const compactSpots = numberSpots - largeSpots - bikeSpots;
      
        let rowCount = 1;
        let spotsInRow = 0;
      
        for (let i = 1; i <= numberSpots; i++) {
          let size = 'Motorcycle';
          if (i < largeSpots) size = 'Large';
          else if (i < largeSpots + compactSpots) size = 'Compact';
      
          if (spotsInRow >= this.SPOTS_PER_ROW) {
            rowCount++;
            spotsInRow = 0;
          }
      
          this.spots.push(new ParkingSpot(this, rowCount, i, size));
          spotsInRow++;
      
        }
      
        this.availableSpots = numberSpots;
      }
      
  
    availableSpotsCount() {
      return this.availableSpots;
    }
  
    parkVehicle(vehicle) {
      if (this.availableSpotsCount() < vehicle.getSpotsNeeded()) return false;
  
      const spotNumber = this.findAvailableSpots(vehicle);
      if (spotNumber < 0) return false;
  
      return this.parkStartingAtSpot(spotNumber, vehicle);
    }
  
    parkStartingAtSpot(spotNumber, vehicle) {
      vehicle.clearSpot();
      let success = true;
  
      for (let i = spotNumber; i < spotNumber + vehicle.spotsNeeded; i++) {
        success &= this.spots[i].park(vehicle);
      }
  
      this.availableSpots -= vehicle.spotsNeeded;
      return success;
    }
  
    findAvailableSpots(vehicle) {
      const spotsNeeded = vehicle.getSpotsNeeded();
      let lastRow = -1;
      let spotsFound = 0;
  
      for (let i = 0; i < this.spots.length; i++) {
        const spot = this.spots[i];
        if (lastRow !== spot.getRow()) {
          spotsFound = 0;
          lastRow = spot.getRow();
        }
  
        if (spot.canFitVehicle(vehicle)) {
          spotsFound++;
        } else {
          spotsFound = 0;
        }
  
        if (spotsFound === spotsNeeded) {
          return i - (spotsNeeded - 1);
        }
      }
  
      return -1;
    }
  
    print() {
      let lastRow = -1;
      for (let i = 0; i < this.spots.length; i++) {
        const spot = this.spots[i];
        if (spot.getRow() !== lastRow) {
          console.log('');
          lastRow = spot.getRow();
        }
        spot.print();
      }
    }
  
    spotFreed() {
      this.availableSpots++;
    }
  }
export default Level;
  