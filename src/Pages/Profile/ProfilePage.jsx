import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ProfilePage = () => {
    const {user} = useAuth()
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);  // State to handle the uploaded file
  const axiosSecure = useAxiosSecure();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get("/users"); // Adjust API endpoint
        setUserData(response.data);
        setFormData(response.data); // Initialize form with user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load profile data");
      }
    };
    fetchUserData();
  }, [axiosSecure]);

  // Handle input changes (name, email, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const updatedData = { ...formData };
      
      // If an image file is selected, send it to the server
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);  // Append the image to form data

        const uploadResponse = await axiosSecure.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming the backend returns the image URL
        updatedData.image = uploadResponse.data.imageUrl;
      }

      // Send the updated data to the server
      const response = await axiosSecure.patch("/users", updatedData); // Adjust API endpoint
      if (response.status === 200) {
        setUserData(response.data);
        setIsEditing(false);
        setImageFile(null); // Reset file state
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!userData) return <div>Loading...</div>;

  const userInfoFields = [
    { label: "Role", value: userData.role },
    { label: "Plan", value: userData.plan },
    { label: "Subscription End", value: new Date(userData.subscriptionEnd).toLocaleString() },
    { label: "Premium Taken", value: new Date(userData.premiumTaken).toLocaleString() },
  ];

  // Check if user email matches a specific condition
  const isSpecialUser = userData.email === userData.email; // Example email condition

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">My Profile</h1>
      <div className="card shadow-lg p-5 bg-white">
        <div className="flex items-center space-x-5">
          <img
            src={userData.image || "/placeholder-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered"
              />
            ) : (
              <h2 className="text-xl font-semibold">{userData.name}</h2>
            )}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered mt-2"
              />
            ) : (
              <p className="text-sm text-gray-500">{userData.email}</p>
            )}
          </div>
        </div>

        <div className="mt-5">
          {/* Dynamically render user info */}
          {userInfoFields.map((field, index) => (
            <p key={index}>
              <strong>{field.label}:</strong> {field.value}
            </p>
          ))}
        </div>

        {/* Conditional display based on email */}
        {isSpecialUser && (
          <div className="mt-5">
            <p className="text-sm text-green-500">Special user features unlocked!</p>
          </div>
        )}

        {isEditing && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">Update Profile Picture</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="input input-bordered w-full"
            />
          </div>
        )}

        <div className="mt-5">
          {isEditing ? (
            <div className="flex space-x-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-accent"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
