import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NavbarLink } from './NavbarLink';
import { t } from '../../textResources';
import { Button } from '../common/Button';

const Layout = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl text-blue-600">{t.common.name}</span>
              </Link>
              {isAuthenticated && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavbarLink to="/dashboard">{t.layout.dashboard}</NavbarLink>
                  <NavbarLink to="/">{t.layout.community}</NavbarLink>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  {t.layout.logout}
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="secondary" size="sm">{t.login.loginButton}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
