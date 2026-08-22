import { useState } from "react";

const User = (props) => {
  const { userDetails, onDelete, onUpdate } = props;
  const { name, email, id } = userDetails;

  const [isEditing, setIsEditing] = useState(false);
  const [name2, setName] = useState(name);
  const [email2, setEmail] = useState(email);

  const editBtnClicked = () => {
    setIsEditing(true);
  };

  const saveChanges = async () => {
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name2,
          email: email2,
        }),
      };

      const response = await fetch(
        `http://localhost:3000/api/users/${id}`,
        options,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      const updatedUser = {
        id,
        name: name2,
        email: email2,
      };

      onUpdate(updatedUser);

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const delBtnClicked = async () => {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(
        `http://localhost:3000/api/users/${id}`,
        options,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      console.log(data);
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      {isEditing ? (
        /* ================= EDIT MODE ================= */
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              value={name2}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2
                         text-slate-800 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email2}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2
                         text-slate-800 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex gap-3 pt-2">
            {/* Save */}
            <button
              type="button"
              onClick={saveChanges}
              className="rounded-lg bg-green-600 px-4 py-2
                         text-sm font-medium text-white
                         transition hover:bg-green-700
                         focus:outline-none focus:ring-2
                         focus:ring-green-300"
            >
              Save
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg bg-slate-200 px-4 py-2
                         text-sm font-medium text-slate-700
                         transition hover:bg-slate-300
                         focus:outline-none focus:ring-2
                         focus:ring-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ================= VIEW MODE ================= */
        <div className="flex items-center justify-between gap-4">
          {/* User information */}
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-800">
              {name2}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500">{email2}</p>
          </div>

          {/* Buttons */}
          <div className="flex shrink-0 gap-2">
            {/* Edit */}
            <button
              type="button"
              onClick={editBtnClicked}
              className="rounded-lg border border-blue-200
                         bg-blue-50 px-4 py-2
                         text-sm font-medium text-blue-600
                         transition hover:bg-blue-100
                         focus:outline-none focus:ring-2
                         focus:ring-blue-200"
            >
              Edit
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={delBtnClicked}
              className="rounded-lg border border-red-200
                         bg-red-50 px-4 py-2
                         text-sm font-medium text-red-600
                         transition hover:bg-red-100
                         focus:outline-none focus:ring-2
                         focus:ring-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
