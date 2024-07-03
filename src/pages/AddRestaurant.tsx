import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RestaurantForm from "../components/RestaurantForm";

const AddRestaurant: React.FC = () => {
  const navigate = useNavigate();

  const handleAdd = async (data: any) => {
    try {
      await axios.post("http://localhost:5000/restaurants", data);
      toast.success("Restaurant added");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add restaurant");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Add Restaurant</h2>
      <RestaurantForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddRestaurant;
