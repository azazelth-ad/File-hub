import { list, del } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { blobs } = await list();
      return res.status(200).json(blobs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { url } = req.query;
      if (!url) return res.status(400).json({ error: 'URL required' });
      await del(url);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
