import mongoose from "mongoose";

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
    spotId: {
        type: Number,
        required: true,
    }
});

export default mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", ParkingSpotSchema);
