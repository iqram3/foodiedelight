import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "./Menu";

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/restaurants/${id}`
        );
        setRestaurant(response.data);
      } catch (error) {
        toast.error("Failed to load restaurant details");
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  if (!restaurant) {
    return <div className="text-xl m-8">Loading...</div>;
  }
  const menuItems = Array.isArray(restaurant.menu) ? restaurant.menu : [];

  return (
    <>
      <h1 className="text-2xl m-4">Restaurant Details</h1>
      <div className="max-w-[90%] mx-auto overflow-hidden my-8">
        <div className="p-4 border-2 border-gray-200">
          <div className="mb-4">
            <h2 className="text-xl mb-2">Name:</h2>
            <p className="text-gray-800">{restaurant.name}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl mb-2">Description:</h2>
            <p className="text-gray-800">{restaurant.description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl mb-2">Location:</h2>
            <p className="text-gray-800">{restaurant.location}</p>
          </div>

          <Menu items={menuItems} />
          <div className="mt-4 flex">
            <Link
              to={`/restaurant/${id}/edit`}
              className="bg-blue-500 mr-4 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </Link>
            <button
              onClick={handleBack}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetail;
