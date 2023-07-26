import React from 'react'
import Link from 'next/link'

export default function login() {
  return (
    <Link href="/api/auth/login">Login</Link>
  )
}
