import Layout from '@/page/Layout'
import Login from '@/page/Login'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />
  }
])

export default router