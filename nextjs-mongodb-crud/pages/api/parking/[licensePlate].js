import { dbConnect } from '@/lib/mongodb';
import ParkingSpotSchema from '@/models/ParkingSpotSchema';
import ParkingSpot from '@/models/ParkingSpot';

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
          const deletedSpot = await ParkingSpotSchema.findOneAndDelete({ licensePlate: licensePlate });
          if (!deletedSpot) {
            return res.status(400).json({ success: false, message: 'Spot not found' });
          }
          res.status(200).json({ success: true, data: { deletedSpot } });
        } catch (error) {
          console.error(error);
          res.status(400).json({ success: false, message: 'Deletion failed' });
        }
        break;      

    default:
      res.status(400).json({ success: false });
      break;
  }
}
