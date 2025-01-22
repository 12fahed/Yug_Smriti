import "@/app/globals.css"
import { Cinzel } from "next/font/google"
import Script from "next/script"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })

export const metadata = {
  title: "Chronos Chronicles",
  description: "Journey through time and explore the fascinating stories of our past",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cinzel.variable}>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js" />
      </body>
    </html>
  )
}


