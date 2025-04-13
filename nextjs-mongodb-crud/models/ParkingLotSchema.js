import mongoose from "mongoose";

const ParkingLotSchema = new mongoose.Schema({
    spotId: { 
        type: Number, 
        required: true
    },
    level: { 
        type: Number, 
        required: true 
    },
    row: {
        type: Number,
        required: true,
    },
    spotNumber: { 
        type: Number, 
        required: true 
    },
    spotSize: { 
        type: String, 
        required: true 
    },
    vehicle: { 
        type: String, 
        required: false,
        default: null,
    },
});

export default mongoose.models.ParkingLot || mongoose.model("ParkingLot", ParkingLotSchema);