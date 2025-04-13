// lib/mongodb.js
import mongoose from 'mongoose';
import ParkingLotSchema from '@/models/ParkingLotSchema';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function saveParkingLotData(spot) {
  try {
    await dbConnect();
    const parkingLot = new ParkingLotSchema(spot);
    await parkingLot.save();
    console.log('Parking lot data saved successfully!');
    }catch (error) {
    console.error('Error saving parking lot data:', error);
  }
}

export async function getParkingLotData() {
  try {
    const parkingLot = await ParkingLotSchema.find();
    console.log('Parking lot data loaded successfully!');
    
    if (!parkingLot || parkingLot.length === 0) {
      return null;
    }

    return parkingLot;
  } catch (error) {
    console.error('Error loading parking lot data:', error);
    return null;
  }
}

