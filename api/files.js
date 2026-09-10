import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // GET: ดึงรายการไฟล์ทั้งหมด
  if (req.method === 'GET') {
    try {
      const files = await kv.get('azhub_files') || [];
      return res.status(200).json(files);
    } catch (error) {
      return res.status(200).json([]);
    }
  }

  // POST: เพิ่มรายการลิงก์ดาวน์โหลดใหม่
  if (req.method === 'POST') {
    try {
      const { title, downloadUrl, coverUrl, audioPreview } = req.body;
      const files = await kv.get('azhub_files') || [];
      
      const newFile = {
        id: Date.now().toString(),
        title,
        downloadUrl,
        coverUrl: coverUrl || '',
        audioPreview: audioPreview || '',
        createdAt: new Date().toISOString()
      };

      files.unshift(newFile);
      await kv.set('azhub_files', files);
      return res.status(200).json(newFile);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE: ลบรายการ
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      let files = await kv.get('azhub_files') || [];
      files = files.filter(item => item.id !== id);
      await kv.set('azhub_files', files);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
