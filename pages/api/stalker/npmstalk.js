import axios from "axios"
import * as cheerio from "cheerio"

export default async function handler(req, res) {
  if (req.method === "POST") {
  
    const { text } = req.body

    try {
      const result = await npmstalk(text);
      res.status(200).json({status: true, data: result})
    } catch (error) {
      res.status(500).json({status: false, error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({status: false, error: "Method Not Allowed" })
  }
}

async function npmstalk(packageName) {
  let stalk = await axios.get("https://registry.npmjs.org/"+packageName)
  let versions = stalk.data.versions
  let allver = Object.keys(versions)
  let verLatest = allver[allver.length-1]
  let verPublish = allver[0]
  let packageLatest = versions[verLatest]
  return {
    name: packageName,
    versionLatest: verLatest,
    versionPublish: verPublish,
    versionUpdate: allver.length,
    latestDependencies: Object.keys(packageLatest.dependencies).length,
    publishDependencies: Object.keys(versions[verPublish].dependencies).length,
    publishTime: stalk.data.time.created,
    latestPublishTime: stalk.data.time[verLatest]
  }
}