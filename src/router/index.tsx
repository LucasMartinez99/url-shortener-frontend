import { createBrowserRouter } from 'react-router-dom'
import { LandingPage }         from '../adapter/in/web/pages/LandingPage'
import { LoginPage }           from '../adapter/in/web/pages/LoginPage'
import { RegisterPage }        from '../adapter/in/web/pages/RegisterPage'
import { DashboardPage }       from '../adapter/in/web/pages/DashboardPage'
import { ProtectedRoute }      from '../adapter/in/web/components/layout/ProtectedRoute'

export const router = createBrowserRouter([
  { path: '/',          element: <LandingPage /> },
  { path: '/login',     element: <LoginPage /> },
  { path: '/register',  element: <RegisterPage /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
])
