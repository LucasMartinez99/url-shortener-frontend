import { useNavigate }   from 'react-router-dom'
import { useAuthStore }  from '../../../../infrastructure/store/authStore'
import { authService }   from '../../../../infrastructure/di/container'
import toast             from 'react-hot-toast'

export function useAuth() {
  const store    = useAuthStore()
  const navigate = useNavigate()

  async function login(email: string, password: string) {
    const auth = await authService.login(email, password)
    store.login(auth.token, auth.email)
    navigate('/dashboard')
  }

  async function register(email: string, password: string) {
    const auth = await authService.register(email, password)
    store.login(auth.token, auth.email)
    navigate('/dashboard')
  }

  function logout() {
    store.logout()
    toast.success('Logged out')
    navigate('/')
  }

  return {
    isAuthenticated: store.isAuthenticated,
    email:           store.email,
    login,
    register,
    logout,
  }
}
