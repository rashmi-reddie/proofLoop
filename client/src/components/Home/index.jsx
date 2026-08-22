import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import User from "../User";
import "./index.css";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [nameErrMsg, setNameErrMsg] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();

        const formattedData = data.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
        }));

        setUsers(formattedData);
      } catch (error) {
        console.error(error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleDelete = (deletedId) => {
    const filteredUsers = users.filter((user) => user.id !== deletedId);
    setUsers(filteredUsers);
  };

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const emailInvalid = !email || !isValidEmail(email);
    setEmailErrMsg(emailInvalid);

    if (!name) {
      setNameErrMsg(true);
    } else {
      setNameErrMsg(false);
    }

    if (!name || emailInvalid) {
      return;
    }

    setIsCreating(true);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      };
      const response = await fetch("http://localhost:3000/api/users", options);
      const user = await response.json();
      const formattedData = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      console.log(formattedData);
      setUsers((prevState) => [...prevState, formattedData]);
      setName("");
      setEmail("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreating(false);
    }
  };

  const updateSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">ProofLoop</h1>

          <p className="text-slate-500 mt-2">Create and manage users</p>
        </div>

        {/* Create User Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Create User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={changeName}
                placeholder="Enter your name"
                className="w-full border border-slate-300 rounded-lg px-4 py-3
                         outline-none
                         focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500"
              />

              {nameErrMsg && (
                <p className="text-sm text-red-500 mt-2">
                  Please enter your name
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="text"
                value={email}
                onChange={changeEmail}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-lg px-4 py-3
                         outline-none
                         focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500"
              />

              {emailErrMsg && (
                <p className="text-sm text-red-500 mt-2">
                  Please enter a valid email
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isCreating}
              className="w-full bg-blue-600 text-white font-medium
                       py-3 rounded-lg
                       hover:bg-blue-700
                       transition
                       disabled:bg-blue-300
                       disabled:cursor-not-allowed"
            >
              {isCreating ? "Creating..." : "Create User"}
            </button>
          </form>
        </div>

        <input
          type="search"
          value={searchTerm}
          onChange={updateSearch}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3
               text-slate-800 placeholder-slate-400
               outline-none
               transition
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Users */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Users</h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <BeatLoader />
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <User
                  key={user.id}
                  userDetails={user}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
