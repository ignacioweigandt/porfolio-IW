import type { Metadata } from 'next'
import { Exo_2, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const exo2 = Exo_2({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-exo-2'
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-plus-jakarta-sans'
})

export const metadata: Metadata = {
  title: 'Ignacio Weigandt - Portfolio',
  description: 'Portfolio website showcasing my work and skills',
  icons: {
    icon: '/img/logo-Web-Studio.svg',
    apple: '/img/logo-Web-Studio.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} ${plusJakartaSans.variable}`}>{children}</body>
    </html>
  )
}