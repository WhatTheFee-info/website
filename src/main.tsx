import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Templates from './ui/pages/Templates.tsx';
import './index.css';
import About from './ui/pages/About.tsx';
import CustomTX from './ui/pages/CustomTX.tsx';
import Home from './ui/pages/Home.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/templates',
        element: <Templates />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/custom-tx',
        element: <CustomTX />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
