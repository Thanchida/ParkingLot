import dbConnect from '../../../lib/mongodb';
import ParkingSpotSchema from '@/models/ParkingSpotSchema';

export default async function handler(req, res) {
  const { query: { licensePlate }, method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const spot = await ParkingSpotSchema.aggregate([{ $match: { 'licensePlate': licensePlate } }]);
        if (!spot) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: spot });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedSpot = await ParkingSpotSchema.deleteOne({ 'licensePlate': licensePlate });
        if (!deletedSpot) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
