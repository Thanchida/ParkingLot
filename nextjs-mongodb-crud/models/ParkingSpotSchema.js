import mongoose from "mongoose";

const ParkingSpotSchema = new mongoose.Schema({
    licensePlate: { 
        type: String, 
        required: false 
    },
    spotSize: { 
        type: String, 
        enum: ['Motorcycle', 'Compact', 'Large'], 
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
        enum: ['Motorcycle', 'Car', 'Bus'], 
        required: false 
    }
});

export default mongoose.model("ParkingSpot", ParkingSpotSchema);
