import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import Home from '@/screens/Home'
import Login from "@/screens/Auth/Login";
import Singup from "@/screens/Auth/Signup";
import App from './App'
import axios from 'axios'
const queryClient = new QueryClient()

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Singup />
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  < React.StrictMode >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode >,
)
