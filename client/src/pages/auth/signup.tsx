import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

interface Hobby {
  _id: string;
  name: string;
}

interface SignupData {
  email: string;
  fullName: string;
  password: string;
  hobbies: string[];
}

const Signup = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [availableHobbies, setAvailableHobbies] = useState<Hobby[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const res = await axiosInstance.get('/hobby/get');
        setAvailableHobbies(res.data);
      } catch (err) {
        console.error('Failed to fetch hobbies', err);
      }
    };

    fetchHobbies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 

    const payload: SignupData = {
      email,
      fullName,
      password,
      hobbies,
    };

    try {
      const res = await axiosInstance.post('/auth/register', payload);
      login(res.data.token);
      setMessage('User created successfully!');
      setEmail('');
      setFullName('');
      setPassword('');
      setHobbies([]);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create user.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Hobbies</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {availableHobbies.map((hobby) => (
                <label
                  key={hobby._id}
                  className="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={hobby._id}
                    checked={hobbies.includes(hobby._id)}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      if (e.target.checked) {
                        setHobbies([...hobbies, selectedId]);
                      } else {
                        setHobbies(hobbies.filter((id) => id !== selectedId));
                      }
                    }}
                  />
                  <span>{hobby.name}</span>
                </label>
              ))}
            </div>

            {hobbies.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {hobbies
                  .map((id) => availableHobbies.find((h) => h._id === id)?.name)
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 font-semibold rounded-md transition ${
                isSubmitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
          )}
        </form>

        {/* Login link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
