// app/page.js
// https://nextjs.org/docs/app/getting-started/installation

import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>Welcome To My Rest Api!!!</h1>
      <Link href="/docs">Try the api docs!</Link>
    </div>
  )
}
