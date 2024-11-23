// pages/api/stalk/ttstalk.js

import fetch from "node-fetch"
import * as cheerio from "cheerio"
import q from "../../../app/declaration/config.js"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  const { username } = req.query
  if (!username) {
    return res.status(400).json({ error: q.msg.qUsername })
  }
  const result = await stalk(username)
  if (result.status === "error") {
    return res.status(500).json(result)
  }
  res.status(200).json(result)
}

async function stalk(user) {
  try {
    const response = await fetch(`https://tiktok.com/@${user}`, {
      headers: {
        "User-Agent": "PostmanRuntime/7.32.2",
      },
    })
    if (!response.ok) {
      return {
        status: "error",
        message: `Failed to fetch: ${response.statusText}`,
      }
    }
    const html = await response.text()
    const $ = cheerio.load(html)
    const data = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").text()
    if (!data) {
      return {
        status: "error",
        message: "Failed to retrieve data!",
      }
    }
    const result = JSON.parse(data)
    if (result["__DEFAULT_SCOPE__"]?.["webapp.user-detail"]?.statusCode !== 0) {
      return {
        status: "error",
        message: "User not found!",
      }
    }
    const userInfo = result["__DEFAULT_SCOPE__"]["webapp.user-detail"]["userInfo"]
    return {
      status: "success",
      data: userInfo,
    }
  } catch (err) {
    console.error("Error:", err.message)
    return {
      status: "error",
      message: err.message,
    }
  }
}