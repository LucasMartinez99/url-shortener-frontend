import { Link }      from 'react-router-dom'
import { Link2, LogOut } from 'lucide-react'
import { useAuth }   from '../../hooks/useAuth'
import { Button }    from '../ui/Button'

export function Navbar() {
  const { isAuthenticated, email, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 hover:text-brand-600 transition">
          <Link2 size={20} className="text-brand-600" />
          ShortURL
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-slate-500 mr-2">{email}</span>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
                <LogOut size={15} />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign up free</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
