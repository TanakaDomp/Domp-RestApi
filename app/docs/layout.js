// app/docs/layout.js
// custom

export const metadata = {
  title: "Docs!!",
  description: "Welcome to my Rest Api's!",
  keywords: "I'm TanakaDomp",
  openGraph: {
    title: "DOMP - REST API Documentation",
    description:
      "My partner and I are planning to make a REST API FREE for everyone, please remember please do not DDoS Attack.",
    url: "https://www.tanakadomp.biz.id",
    type: "website",
    images: [
      {
        url: "https://nyimpen.vercel.app/component/logoku.png",
        width: 800,
        height: 600,
        alt: "Domp Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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