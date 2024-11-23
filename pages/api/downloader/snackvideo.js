import axios from "axios"
import * as cheerio from "cheerio"
import * as fetch from "node-fetch"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ error: q.msg.qUrl })
  }
  const result = await snack(url)
  if (result.status === "error") {
    return res.status(500).json(result)
  }
  res.status(200).json(result)
}

async function snack(urls) {
  const res = await fetch(urls)
  const body = await res.text()
  const $ = cheerio.load(body)
  const video = $("div.video-box").find("a-video-player")
  const author = $("div.author-info")
  const attr = $("div.action")
  
  const data = {
  creator: "@tanakadomp",
    title: $(author).find("div.author-desc > span").children("span").eq(0).text().trim(),
    thumbnail: $(video).parent().siblings("div.background-mask").children("img").attr("src"),
    media: $(video).attr("src"),
    author: $("div.author-name").text().trim(),
    authorImage: $(attr).find("div.avatar > img").attr("src"),
    like: $(attr).find("div.common").eq(0).text().trim(),
    comment: $(attr).find("div.common").eq(1).text().trim(),
    share: $(attr).find("div.common").eq(2).text().trim(),
  }
  return data
}