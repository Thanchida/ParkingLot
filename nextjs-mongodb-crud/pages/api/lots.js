import { getParkingLotData } from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const parkingData = await getParkingLotData();
    console.log(parkingData);
    res.status(200).json({ message: 'Saved successfully', data: parkingData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Saving failed' });
  }
}
