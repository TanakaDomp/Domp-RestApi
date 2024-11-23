// app/layout.js
// https://nextjs.org/docs/app/getting-started/installation

export const metadata = {
  title: "Domp - RestApi's!",
  description: "free rest api!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}