import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import Search from './routes/Search/Search'
import MyShelves from './routes/MyShelves/MyShelves'
import MyBooks from './routes/MyBooks/myBooks'
import Profile from './routes/Profile/Profile'
import SignIn from './routes/SignIn/SignIn'
import SignUp from './routes/SignUp/SignUp'
import SignOut from './routes/SignOut/SignOut'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: 'search',
        element: <Search/>
      },
      {
        path: 'myShelves',
        element: <MyShelves/>
      },
      {
        path: 'myBooks',
        element: <MyBooks/>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'signIn',
        element: <SignIn/>
      },
      {
        path: 'signUp',
        element: <SignUp/>
      },
      {
        path: 'signOut',
        element: <SignOut/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
