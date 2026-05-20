import { Navbar }    from '../components/layout/Navbar'
import { UrlTable }  from '../components/url/UrlTable'

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <UrlTable />
      </main>
    </div>
  )
}
