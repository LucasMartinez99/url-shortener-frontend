import { useState }    from 'react'
import { Link }        from 'react-router-dom'
import { Navbar }      from '../components/layout/Navbar'
import { Button }      from '../components/ui/Button'
import { useAuthStore } from '../../../../infrastructure/store/authStore'
import {
  Link2, BarChart2, Shield, Clock,
  ArrowRight, Zap, Globe, CheckCircle2,
} from 'lucide-react'

const FEATURES = [
  { icon: Zap,        title: 'Instant shortening',  desc: 'Generate a short link in milliseconds with our Base62 engine.' },
  { icon: BarChart2,  title: 'Click analytics',      desc: 'Track every click — IP, User-Agent, timestamps, and click count.' },
  { icon: Shield,     title: 'Secure by design',     desc: 'JWT auth, bcrypt passwords, rate limiting, and security headers.' },
  { icon: Clock,      title: 'Link expiration',      desc: 'Set an expiry date on any link. Expired links return 410 Gone.' },
  { icon: Globe,      title: 'Custom aliases',       desc: 'Use /my-brand instead of a random code. Your choice.' },
  { icon: Link2,      title: 'Always available',     desc: 'Built on Spring Boot + PostgreSQL, deployed in a Virtual Private Server.' },
]

export function LandingPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [url, setUrl] = useState('')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-slate-50 to-white">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-medium mb-6">
          <CheckCircle2 size={13} />
          Open source portfolio project · Built with Spring Boot + React
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl leading-[1.1]">
          Shorten links.{' '}
          <span className="gradient-text">Track everything.</span>
        </h1>

        <p className="mt-5 text-lg text-slate-500 max-w-xl">
          A production-grade URL shortener with click analytics, custom aliases,
          and link expiration — built to show what real backend engineering looks like.
        </p>

        {/* CTA input */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-xl">
          <input
            type="url"
            placeholder="https://your-very-long-url.com/paste/here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900
              placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
              shadow-sm"
          />
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button size="lg" className="w-full sm:w-auto rounded-xl">
              {isAuthenticated ? 'Go to Dashboard' : 'Get started free'}
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Free to use · No credit card required · All analytics included
        </p>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-3">
            Everything you need
          </h2>
          <p className="text-center text-slate-500 mb-12 max-w-lg mx-auto">
            Built with hexagonal architecture, Testcontainers, and production security practices.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="inline-flex p-2 rounded-xl bg-brand-50 text-brand-600 mb-4 group-hover:bg-brand-100 transition">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-brand-600 to-violet-600 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Start shortening for free
        </h2>
        <p className="text-brand-100 mb-8 max-w-md mx-auto">
          Create an account and get full access to analytics, custom aliases, and link management.
        </p>
        <Link to="/register">
          <Button
            size="lg"
            className="bg-gray text-brand-600 hover:bg-brand-50 focus:ring-white rounded-xl"
          >
            Create free account
            <ArrowRight size={16} />
          </Button>
        </Link>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-white font-medium">
          <Link2 size={16} className="text-brand-500" />
          ShortURL
        </div>
        <p className="text-xs">
          Portfolio project by{' '}
          <a
            href="https://www.linkedin.com/in/lucas-software-engineer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 transition"
          >
            Lucas Martinez
          </a>
          {' '}· Built with Java 21, Spring Boot 3, React, and Tailwind CSS
        </p>
      </footer>
    </div>
  )
}
