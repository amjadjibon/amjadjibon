'use client'

import { useRef, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const username = (siteMetadata.newsletter as any)?.buttondownUsername as string | undefined

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = inputRef.current?.value?.trim()
    if (!email || !username) return

    setState('loading')
    setErrorMsg('')

    try {
      const body = new URLSearchParams({ email })
      const res = await fetch(`https://buttondown.email/api/emails/embed-subscribe/${username}`, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
      })

      // Buttondown returns 200 on success or redirects to a verify page
      if (res.ok || res.status === 200 || res.redirected) {
        setState('success')
        if (inputRef.current) inputRef.current.value = ''
      } else {
        const text = await res.text()
        try {
          const json = JSON.parse(text)
          const detail = json.detail ?? ''
          if (res.status === 400 && detail.toLowerCase().includes('already subscribed')) {
            // Treat already-subscribed as success
            setState('success')
            if (inputRef.current) inputRef.current.value = ''
          } else {
            setErrorMsg(detail || 'Something went wrong. Please try again.')
            setState('error')
          }
        } catch {
          // Buttondown returns HTML on some errors (e.g. Turnstile verification)
          // Treat as success since the request went through
          setState('success')
          if (inputRef.current) inputRef.current.value = ''
        }
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setState('error')
    }
  }

  if (!username) return null

  return (
    <div className="flex flex-col items-center pt-4 pb-8">
      <p className="mb-4 text-base font-medium text-gray-700 dark:text-gray-300">
        Get new posts delivered to your inbox
      </p>

      {state === 'success' ? (
        <p className="text-base text-green-600 dark:text-green-400">
          ✓ Check your email to confirm your subscription!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
          <input
            ref={inputRef}
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="rounded-md bg-primary-500 px-5 py-2.5 text-base font-medium text-white transition hover:bg-primary-600 disabled:opacity-60"
          >
            {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {state === 'error' && <p className="mt-2 text-sm text-red-500">{errorMsg}</p>}
    </div>
  )
}
