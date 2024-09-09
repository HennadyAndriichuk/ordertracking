import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExpensesPage from './pages/ExpensesPage';
import MetricsPage from './pages/MetricsPage';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/expenses" element={<PrivateRoute element={ExpensesPage} />} />
          <Route path="/metrics" element={<PrivateRoute element={MetricsPage} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
