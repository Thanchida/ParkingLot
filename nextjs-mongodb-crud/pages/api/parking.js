import { dbConnect } from '@/lib/mongodb';
import ParkingSpotSchema from '@/models/ParkingSpotSchema';

export default async function handler(req, res) {
  console.log('----------');
  await dbConnect();
  console.log('db connected!');

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const spots = await ParkingSpotSchema.find({});
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      console.log("req", req.body);
      try {
        const spots = await ParkingSpotSchema.create(req.body);
        console.log(spots);
        res.status(201).json({ success: true, data: spots });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}