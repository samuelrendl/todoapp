import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'To-Do App',
  description: 'My To-Do App project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
