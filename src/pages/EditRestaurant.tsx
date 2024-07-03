import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RestaurantForm from "../components/RestaurantForm";

const EditRestaurant: React.FC = () => {
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

  const handleUpdate = async (data: any) => {
    try {
      await axios.put(`http://localhost:5000/restaurants/${id}`, data);
      toast.success("Restaurant updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update restaurant");
    }
  };

  if (!restaurant) {
    return <div className="text-xl m-8">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Edit Restaurant</h2>
      <RestaurantForm
        initialData={restaurant}
        onSubmit={handleUpdate}
        isEditMode
      />
    </div>
  );
};

export default EditRestaurant;
