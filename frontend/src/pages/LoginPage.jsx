import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('admin')
  const heroImage =
    '/Users/halvitikankanamgegihan/.cursor/projects/Users-halvitikankanamgegihan-fuchsius-pos/assets/Body-d0fbf145-fe9b-4d28-b8e3-8523027b05d9.png'

  return (
    <div className="min-h-screen bg-[#f4f2fa] px-8 py-4">
      <header className="mx-auto mb-4 w-full max-w-[1020px]">
        <div className="inline-flex items-center gap-2 text-[32px] font-medium text-[#20253f]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#4f46e5] text-[10px] text-white">
            ▣
          </span>
          <span>Fuchsius POS</span>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1020px] overflow-hidden rounded-xl border border-[#ececf3] bg-white shadow-[0_18px_40px_rgba(37,31,115,0.14)] lg:grid-cols-[1fr_1fr]">
        <div
          className="relative min-h-[675px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,30,0.08)_52%,rgba(4,8,28,0.86)_100%)]" />
          <div className="relative flex h-full items-end">
            <div className="max-w-[360px] px-10 pb-10 text-white">
              <h2 className="text-[48px] leading-[1.15] font-semibold">
                Precision curated for modern commerce.
              </h2>
              <p className="mt-3 text-[16px] leading-[1.45] text-slate-200/95">
                Join 500+ editorial retail spaces managing their inventory with
                Fuchsius.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white px-12 py-12">
          <div>
            <h1 className="text-[52px] leading-none font-semibold tracking-[-0.02em] text-[#202330]">
              Welcome Back
            </h1>
            <p className="mt-3 max-w-[350px] text-[17px] leading-[1.35] text-[#63697d]">
              Please select your role and enter your details to continue.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 rounded-xl border border-[#ececf3] bg-[#f3f4f8] p-1">
            {['admin', 'manager', 'cashier'].map((itemRole) => (
              <button
                key={itemRole}
                type="button"
                className={`rounded-[10px] px-3 py-2.5 text-[15px] font-medium capitalize transition ${
                  role === itemRole
                    ? 'bg-white text-[#4f46e5] shadow-[0_2px_12px_rgba(15,23,42,0.08)]'
                    : 'text-[#666b80] hover:text-[#343957]'
                }`}
                onClick={() => setRole(itemRole)}
              >
                {itemRole}
              </button>
            ))}
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              navigate('/sales')
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[14px] font-medium text-[#353b54]">
                Email address
              </span>
              <div className="flex min-h-14 items-center gap-2 rounded-xl border border-[#e8e8ef] bg-[#f2f1f8] px-4 transition focus-within:border-[#6560e8] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]">
                <span className="text-base text-[#8e92a7]">✉</span>
                <input
                  type="email"
                  className="w-full border-0 bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#a8adbe]"
                  placeholder="e.g. curator@fuchsius.com"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[14px] font-medium text-[#353b54]">
                Password
              </span>
              <div className="flex min-h-14 items-center gap-2 rounded-xl border border-[#e8e8ef] bg-[#f2f1f8] px-4 transition focus-within:border-[#6560e8] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]">
                <span className="text-base text-[#8e92a7]">🔒</span>
                <input
                  type="password"
                  className="w-full border-0 bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#a8adbe]"
                  placeholder="••••••••"
                  required
                />
                <span className="text-sm text-[#8e92a7]">◉</span>
              </div>
            </label>

            <div className="space-y-3 pt-1">
              <button
                type="submit"
                className="min-h-[50px] w-full rounded-xl bg-[#4f46e5] px-4 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(79,70,229,0.26)] transition hover:brightness-105"
              >
                Sign In
              </button>
              <button
                type="button"
                className="block w-full text-center text-[15px] font-medium text-[#4f46e5] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1 border-t border-[#f0f1f5] pt-6 text-[14px] text-[#73788b]">
              <span>New terminal setup?</span>
              <button
                type="button"
                className="text-[14px] font-medium text-[#4f46e5] hover:underline"
              >
                Contact Support
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="mt-8 text-center text-[13px] text-[#8c90a0]">
        © 2024 The Editorial POS. All rights reserved.
      </footer>
    </div>
  )
}

export default LoginPage
