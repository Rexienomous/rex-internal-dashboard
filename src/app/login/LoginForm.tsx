'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from './actions'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="w-full max-w-sm rounded-xl bg-[#151722] border border-[#2a2d3e] p-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#7f77dd] text-3xl font-bold">R</span>
        <span className="text-[#e2e8f0] text-lg font-semibold tracking-tight">
          exienomous
        </span>
      </div>
      <h1 className="text-xl font-semibold text-[#e2e8f0] mb-1">
        Sign in to Rexienomous
      </h1>
      <p className="text-sm text-[#8892a4] mb-6">
        Internal dashboard — team members only
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form action={signIn} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#8892a4] mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg bg-[#0f1117] border border-[#2a2d3e] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#8892a4] outline-none focus:border-[#7f77dd] transition-colors"
            placeholder="you@rexienomous.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#8892a4] mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg bg-[#0f1117] border border-[#2a2d3e] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#8892a4] outline-none focus:border-[#7f77dd] transition-colors"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#7f77dd] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6b63c9]"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
