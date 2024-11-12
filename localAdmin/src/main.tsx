import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/auth/Auth.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import { Toaster } from './components/ui/toaster.tsx'
const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/auth",
        element : <Auth/>
      },
      {
        path : "/",
        element : <Dashboard/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router}/>
  <Toaster/>
  </StrictMode>
)

