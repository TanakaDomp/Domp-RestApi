// app/docs/page.js
// custom

"use client"
import { useEffect } from "react"
import axios from "axios"
import o from "../declaration/createScript"
import v from "../declaration/createLink"

export default function ApiDocs() {
  useEffect(() => {
    const docs = async () => {
      const linkStyle = v("https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css")
      document.head.appendChild(linkStyle)

      const customStyle = document.createElement("style")
      const a = await axios.get("/style.css")
      customStyle.innerHTML = a.data
      document.head.appendChild(customStyle)

      const scriptBundle = o("https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js")
      const scriptPreset = o("https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js")
      document.body.appendChild(scriptBundle)
      document.body.appendChild(scriptPreset)

      scriptBundle.onload = () => {
        if (window.SwaggerUIBundle && window.SwaggerUIStandalonePreset) {
          window.SwaggerUIBundle({
            url: "/swg.json",
            dom_id: "#swagger-ui",
            presets: [
              window.SwaggerUIBundle.presets.apis,
              window.SwaggerUIStandalonePreset,
            ],
            layout: "StandaloneLayout",
          })
        }
      }
    }

    docs()

    // Optional cleanup function (currently empty)
    return () => {}
  }, [])

  return <div id="swagger-ui" style={{ height: "100vh" }}/>
}