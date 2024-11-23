import axios from "axios"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ error: q.msg.qUrl })
  }
  const result = await openai(q, `Kamu adalah Lilychanj yang di kembangkan oleh TanakaDomp`);
  if (result.status === "error") {
    return res.status(500).json(result)
  }
  res.status(200).json(result)
}

async function openai(text, logic) {
        // Membuat fungsi openai untuk dipanggil
        let response = await axios.post("https://chateverywhere.app/api/chat/", {
            "model": {
                "id": "gpt-4",
                "name": "GPT-4",
                "maxLength": 32000, // Sesuaikan token limit jika diperlukan
                "tokenLimit": 8000, // Sesuaikan token limit untuk model GPT-4
                "completionTokenLimit": 5000, // Sesuaikan jika diperlukan
                "deploymentName": "gpt-4"
            },
            "messages": [
                {
                    "pluginId": null,
                    "content": text,
                    "role": "user"
                }
            ],
            "prompt": logic,
            "temperature": 0.5
        }, {
            headers: {
                "Accept": "/*/",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
            }
        });

        let result = response.data;
         return {
            creator: '@sensei#404',
            status: true,
            message: result           
        };
    }