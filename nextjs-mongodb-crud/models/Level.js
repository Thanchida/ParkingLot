import ParkingSpot from "./ParkingSpot";

export default class Level {
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
  
    spotFreed() {
      this.availableSpots++;
    }
  }
  