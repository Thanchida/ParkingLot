// pages/api/save.js
import { saveParkingLotData } from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { levels } = req.body;
    await saveParkingLotData(levels);
    res.status(200).json({ message: 'Saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Saving failed' });
  }
}
