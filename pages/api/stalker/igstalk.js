// pages/api/igstalk.js

import axios from "axios"
import q from "../../../app/declaration/config.js"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { username } = req.body
  if (!username) {
    return res.status(400).json({ error: q.msg.qUsername })
  }

  const result = await igStalk(username)
  if (result.status === false) {
    return res.status(500).json(result)
  }

  res.status(200).json(result)
}

async function igStalk(username) {
  try {
    const { data } = await axios.get(
      `https://igram.world/api/ig/userInfoByUsername/${username}`,
      {
        headers: {
          "User-Agent": "PostmanRuntime/7.37.0",
        },
      }
    )

    const user = data.result.user
    const pronouns = user.pronouns.length === 0 ? "" : user.pronouns.join("/")

    return {
      status: true,
      creator: "IFTXH || supported by s.e.k.s",
      result: {
        username: user.username,
        fullName: user.full_name,
        followers: user.follower_count,
        following: user.following_count,
        pronouns: pronouns,
        verified: user.is_verified,
        private: user.is_private,
        totalPosts: user.media_count,
        bio: user.biography,
        externalUrl: user.external_url,
        urlAcc: `https://instagram.com/${username}`,
        profilePic: user.hd_profile_pic_url_info.url,
        pkId: user.pk_id,
      },
    }
  } catch (error) {
    return {
      status: false,
      creator: "IFTXH || supported by s.e.k.s",
      message: "Username not found.",
    }
  }
}