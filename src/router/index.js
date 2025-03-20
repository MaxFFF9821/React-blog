import Layout from '@/page/Layout'
import Login from '@/page/Login'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
// import Home from '@/page/Home'
// import Article from '@/page/Article'
// import Publish from '@/page/Publish'
import { lazy, Suspense } from 'react'

const Home = lazy(()=> import ('@/page/Home'))
const Article = lazy(()=> import ('@/page/Article'))
const Publish = lazy(()=> import ('@/page/Publish'))

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
        element: <Suspense fallback={'loading'}><Home></Home></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'loading'}><Article /></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'loading'}><Publish /></Suspense>
      }
    ]
  }
])

export default router