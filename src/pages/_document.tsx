import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='flex min-h-screen flex-col bg-gradient-to-b from-[#362f3d] to-[#15162c] text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
