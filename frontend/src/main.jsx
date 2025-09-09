import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './Store/store';
import './index.css';
import App from './App.jsx';
import  Login from "./pages/login";
import Signup from './pages/Signup.jsx';
import EmailVerification from './pages/EmailVerification.jsx';
import Profile from './pages/profile.jsx';
import { Chat } from './pages/chat/chat';
import { SocketProvider } from './Socket/socketContext.jsx';
import { Home } from './pages/home.jsx';
// Define the router properly
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element:<Home/>, 
      },
      {
        path: "/login",
        element: <Login />,
      },{
        path:"/signup",
        element:<Signup/>
      },{
        path:"/email-verify",
        element:<EmailVerification/>
      },{
        path:"/profile",
        element:<Profile/>
      },{
        path:"/chat",
        element: <Chat/>
      }
    ],
  },
]);

// Correctly render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider> 
        <RouterProvider router={router} />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
