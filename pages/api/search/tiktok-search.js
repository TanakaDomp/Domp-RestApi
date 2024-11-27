import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }

  try {
    const result = await tiktokSearch(q);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

async function tiktokSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
  const response = await axios({
    method: 'POST',
    url: 'https://tikwm.com/api/feed/search',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': 'current_language=en',
      'User -Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
    },
    data: {
      keywords: query,
      count: 50,
      cursor: 0,
      HD: 1
    }
  });

  const videos = response.data.data.videos;

  if (!videos || videos.length === 0) {
    throw new Error("Tidak ada video ditemukan.");
  }

  const randomIndex = Math.floor(Math.random() * videos.length);
  const videorndm = videos[randomIndex];

        const result = {
    title: videorndm.title,
    cover: videorndm.cover,
    origin_cover: videorndm.origin_cover,
    no_watermark: videorndm.play,
    watermark: videorndm.wmplay,
    music: videorndm.music
  };
   resolve({ creator: '@tanakadomp', status: true, result });  
  } catch (error) {
      reject(error);
    }
  });
}