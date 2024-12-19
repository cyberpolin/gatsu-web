import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Entries from './views/tasks/Entries';
import Index from './views/Index';
import AdminDashboard from './views/admin/AdminDashboard';
import Login from './views/Login';
import Recovery from './views/Recovery';
import NotFound from './views/NotFound';
import useAuth from './utils/hooks/UseAuth';
import Logout from './views/Logout';
import AddMember from './views/AddMember';
import BillTable from './views/BillTable';
import TeamTable from './views/TeamTable';
import Clients from './views/clients/Clients';

const ProtectedRoute = (props: any) => {
  const { redirectPath = '/login', children } = props;
  const { user } = useAuth();
  const { pathname, search } = useLocation();

  const redirectPathWithQuery = `${redirectPath}?redirect=${pathname}${search}`;
  console.log('redirectPathWithQuery', redirectPathWithQuery);
  useEffect(() => {
    console.log('user root', user);
    if (user?.loaded && !user?.user) {
      // TODO redirect to login
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
          <Route path="/team" element={<TeamTable />} />
          <Route path="/tasks" element={<Entries />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path={'/bill-details'} element={<BillTable />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/logout'} element={<Logout />} />
        <Route path={'/recovery-password'} element={<Recovery />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
