import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = req.query.filename || 'file';
    const blob = await put(filename, req, {
      access: 'public',
    });
    return res.status(200).json(blob);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
