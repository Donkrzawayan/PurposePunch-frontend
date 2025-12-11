import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateDecision from './pages/CreateDecision';
import ReflectionPage from './pages/ReflectionPage';
import RegisterPage from './pages/RegisterPage';
import CommunityFeed from './pages/CommunityFeed';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<CommunityFeed />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateDecision />} />
          <Route path="/decision/:id" element={<ReflectionPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
