import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import AppartmentPage from './AppartmentPage'
import WishlistPage from './WishlistPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'appartments/:id',
    element: <AppartmentPage />,
  },
  { path: 'wishlist', element: <WishlistPage /> },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
