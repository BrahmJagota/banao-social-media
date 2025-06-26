import { useEffect, useState } from "react";
import Navbar from "../../components/ui/navbar";
import axiosInstance from "../../axios";

interface Hobby {
  name: string;
  description?: string;
}

interface UserType {
  _id: string;
  fullName: string;
  email: string;
  hobbies: Hobby[];
}

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [hobbyFilter, setHobbyFilter] = useState<string>("All");
  const [allHobbies, setAllHobbies] = useState<string[]>([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/get-users");
      const userData: UserType[] = response.data;

      // Set all users and filtered users
      setUsers(userData);
      setFilteredUsers(userData);

      // Extract unique hobbies from all users
      const hobbiesSet = new Set<string>();
      userData.forEach((user) => {
        user.hobbies?.forEach((hobby) => {
          if (hobby.name) {
            hobbiesSet.add(hobby.name);
          }
        });
      });

      setAllHobbies(["All", ...Array.from(hobbiesSet)]);
    } catch (error: any) {
      console.error(error);
      setError("Failed to fetch users.");
    }
  };

  // Handle hobby filter change
  const handleFilterChange = (selectedHobby: string) => {
    setHobbyFilter(selectedHobby);

    if (selectedHobby === "All") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.hobbies?.some((hobby) => hobby.name === selectedHobby)
      );
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Users & Their Hobbies</h1>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">Filter by Hobby:</label>
          <select
            value={hobbyFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            {allHobbies.map((hobby) => (
              <option key={hobby} value={hobby}>
                {hobby}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Users */}
        {filteredUsers.length === 0 ? (
          <p className="text-gray-600">No users found for selected hobby.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-sm rounded-md p-4 mb-4 border border-gray-200"
            >
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="mt-2">
                <h3 className="font-medium text-gray-700 mb-1">Hobbies:</h3>
                {user.hobbies?.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {user.hobbies.map((hobby, index) => (
                      <li key={index}>
                        <span className="font-semibold">{hobby.name}</span>
                        {hobby.description && (
                          <span className="text-gray-500"> - {hobby.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No hobbies listed.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default User;
