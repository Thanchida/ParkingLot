import Level from "./Level";

class ParkingLot {
    constructor() {
        this.NUM_LEVELS = 5;
        this.levels = [];
        
        for (let i = 1; i <= this.NUM_LEVELS; i++) {
            this.levels.push(new Level(i, 20));
        }
    }

    parkVehicle(vehicle) {
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i].parkVehicle(vehicle)) {
                return true;
            }
        }
        return false;
    }
}
export default ParkingLot;