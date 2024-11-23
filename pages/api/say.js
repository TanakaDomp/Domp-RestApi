// https://nextjs.org/docs

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Aoa Jir' })
  }  
  const { q } = req.query  
  if (!q) {
    return res.status(400).json({ error: "Aoa Jir" })
  }
  res.status(200).json({ menyapa_dunia: q})
}