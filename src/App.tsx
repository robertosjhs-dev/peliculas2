import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import MovieEditor from './pages/Movies/MovieEditor';
import MovieDetails from './pages/Movies/MovieDetails';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Layout from './components/Layout/Layout';

const PrivateRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/explore" element={<Layout><Explore /></Layout>} />
          <Route path="/movies/:id" element={<Layout><MovieDetails /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          } />

          <Route path="/movies/new" element={
            <PrivateRoute>
              <Layout><MovieEditor /></Layout>
            </PrivateRoute>
          } />

          <Route path="/movies/:id/edit" element={
            <PrivateRoute>
              <Layout><MovieEditor /></Layout>
            </PrivateRoute>
          } />

          <Route path="/admin" element={
            <PrivateRoute adminOnly>
              <Layout><AdminDashboard /></Layout>
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
