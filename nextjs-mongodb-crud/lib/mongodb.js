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

export async function saveParkingLotData(levels) {
  try {
    await dbConnect();

    for (const level of levels) {
        const { floor, spots } = level;
        console.log(`Floor ${floor}, Spots:`, spots);
      
        if (!Array.isArray(spots)) {
          console.warn(`⚠️ spots ไม่ใช่ array บนชั้น ${floor}`);
          continue;
        }
      
        for (const spot of spots) {
          const { spotId, row, spotNumber, spotSize, vehicle } = spot;
      
          const parkingLot = new ParkingLotSchema({
            spotId,
            level: floor,
            row,
            spotNumber,
            spotSize,
            vehicle,
          });
      
          await parkingLot.save();
        }
      }
      

    console.log('Parking lot data saved successfully!');
  } catch (error) {
    console.error('Error saving parking lot data:', error);
  }
}
