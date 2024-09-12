import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import UsersPage from './screens/users.page.tsx'
// import './index.css'

const router = createBrowserRouter([{
    path: '/',
    element: <App />
  },
  {
    path: '/users',
    element: <UsersPage />
  },
  {
    path: '/tracks',
    element: <div className="">manage tracks</div>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
