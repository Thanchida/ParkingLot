import mongoose from "mongoose";
import ParkingSpot from "./ParkingSpot";

const ParkingSpotSchema = new mongoose.Schema({
    licensePlate: { 
        type: String, 
        required: true
    },
    spotSize: { 
        type: String, 
        required: true 
    },
    level: { 
        type: Number, 
        required: true 
    },
    spotNumber: { 
        type: Number, 
        required: true 
    },
    carType: { 
        type: String, 
        required: true,
    },
});

export default mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", ParkingSpotSchema);
