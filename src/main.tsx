import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import Login from "@/screens/Auth/Login";
import axios from 'axios'
import Companies from './screens/Companies'
import Signup from '@/screens/Auth/Signup'
import Dashboard from './screens/Dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20
    }
  }
})

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Companies />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/dashboard/:companyId",
    element: <Dashboard />
  }
])




ReactDOM.createRoot(document.getElementById('root')!).render(
  < React.StrictMode >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode >,
)
