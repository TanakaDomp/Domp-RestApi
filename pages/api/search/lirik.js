import axios from "axios"
import cheerio from "cheerio"
import fetch from "node-fetch"


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ error: q.msg.qUrl })
  }
  const result = await songSearch(q);
  if (result.status === "error") {
    return res.status(500).json(result)
  }
  res.status(200).json(result)
}



async function songSearch(query) {
        try {
            const { data } = await axios.get("https://songsear.ch/q/" + query);
            const $ = cheerio.load(data);
            
            const result = {
                title: $("div.results > div:nth-child(1) > .head > h3 > b").text() +
                       " - " +
                       $("div.results > div:nth-child(1) > .head > h2 > a").text(),
                album: $("div.results > div:nth-child(1) > .head > p").text(),
                number: $("div.results > div:nth-child(1) > .head > a")
                    .attr("href")
                    .split("/")[4],
                thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src"),
            };

            const { data: lyricData } = await axios.get(
                `https://songsear.ch/api/song/${result.number}?text_only=true`
            );
            const lyrics = lyricData.song.text_html
                .replace(/<br\/>/g, "\n")
                .replace(/&#x27;/g, "'");

            return {
                status: true,
                title: result.title,
                album: result.album,
                thumb: result.thumb,
                lyrics: lyrics,
            };
        } catch (err) {
            console.log(err);
            return {
                status: false,
                error: "Unknown error occurred",
            };
        }
}