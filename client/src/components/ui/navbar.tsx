import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Navbar() {
  const {isAuthenticated, logout} = useAuth()
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  const handleLogin = () => {
    console.log("User logged in");
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo or brand */}
        <div className="text-xl font-semibold text-gray-800">
          MyApp
        </div>

        {/* Auth actions */}
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-800 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="text-sm font-medium text-gray-800 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Login
              </button>
              <button
                onClick={() => alert("Redirect to signup")}
                className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
