import Layout from '@/page/Layout'
import Login from '@/page/Login'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Home from '@/page/Home'
import Article from '@/page/Article'
import Publish from '@/page/Publish'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <AuthRoute> <Layout /> </AuthRoute>,
    children: [
      {
        index:true,
        element: <Home></Home>
      },
      {
        path: 'article',
        element: <Article />
      },
      {
        path: 'publish',
        element: <Publish />
      }
    ]
  }
])

export default router