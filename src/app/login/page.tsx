import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1117]">
      <Suspense
        fallback={
          <div className="w-full max-w-sm rounded-xl bg-[#151722] border border-[#2a2d3e] p-8 animate-pulse">
            <div className="h-8 w-40 bg-[#2a2d3e] rounded mb-4" />
            <div className="h-4 w-56 bg-[#2a2d3e] rounded mb-6" />
            <div className="h-10 w-full bg-[#2a2d3e] rounded mb-4" />
            <div className="h-10 w-full bg-[#2a2d3e] rounded mb-4" />
            <div className="h-10 w-full bg-[#2a2d3e] rounded" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  )
}
