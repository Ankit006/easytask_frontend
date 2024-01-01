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
import ErrorPage from './screens/Error'
import { Provider } from "react-redux"
import { store } from './store/store'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
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
    path: "/dashboard/:companyId/:tab",
    element: <Dashboard />,
    errorElement: <ErrorPage />
  }
])




ReactDOM.createRoot(document.getElementById('root')!).render(
  < React.StrictMode >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode >,
)
