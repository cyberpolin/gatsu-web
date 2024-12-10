import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Entries from './views/tasks/Entries';
import Clients from './views/clients/Clients';
import Index from './views/Index';
import AdminDashboard from './views/admin/AdminDashboard';
import Login from './views/Login';
import Recovery from './views/Recovery';
import NotFound from './views/NotFound';
import useAuth from './utils/hooks/UseAuth';
import Logout from './views/Logout';

const ProtectedRoute = (props: any) => {
  const { redirectPath = '/login', children } = props;
  const { user } = useAuth();
  console.log('user P', user);
  const { pathname, search } = useLocation();

  const redirectPathWithQuery = `${redirectPath}?redirect=${pathname}${search}`;

  useEffect(() => {
    console.log('user', user);
    if (user?.loaded && !user?.user) {
      console.log('redirect');
      window.location.href = redirectPathWithQuery;
    }
  }, [user, redirectPathWithQuery]);

  return children;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/tasks" element={<Entries />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/logout'} element={<Logout />} />
        <Route path={'/recovery-password'} element={<Recovery />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
      {/* <RouterProvider router={router} /> */}
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
