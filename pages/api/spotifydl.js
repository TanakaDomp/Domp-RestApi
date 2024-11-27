import axios from "axios"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ error: q.msg.qUrl })
  }
  const result = await spotifydll(url)
  if (result.status === "error") {
    return res.status(500).json(result)
  }
  res.status(200).json(result)
}


async function spotifydll(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const kemii = await axios.get(
        `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            Referer: "https://spotifydownload.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      );
      const kemi = await axios.get(
        `https://api.fabdl.com/spotify/mp3-convert-task/${kemii.data.result.gid}/${kemii.data.result.id}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            Referer: "https://spotifydownload.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      );
      const result = {};
      result.title = kemii.data.result.name;
      result.type = kemii.data.result.type;
      result.artis = kemii.data.result.artists;
      result.durasi = kemii.data.result.duration_ms;
      result.image = kemii.data.result.image;
      result.download = "https://api.fabdl.com" + kemi.data.result.download_url;
      resolve({ creator: '@tanakadomp', status: true, result });
    } catch (error) {
      reject(error);
    }
  });
};