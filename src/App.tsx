import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// --- Placeholder -------------------------------- TODO: (src/pages/) ---
const RegisterPage = () => <div className="p-8">Register Page (TODO)</div>;
const Dashboard = () => <div className="p-4">My Private Decisions (TODO)</div>;
const CommunityFeed = () => <div className="p-4">Public Community Feed (TODO)</div>;
const CreateDecision = () => <div className="p-4">Create New Decision (TODO)</div>;
// -----------------------------------------------------------------------

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<Layout />}>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateDecision />} />
        </Route>
        <Route path="/community" element={<CommunityFeed />} />
        
      </Route>
    </Routes>
  );
}

export default App;
