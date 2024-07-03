import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

interface RestaurantListProps {
  searchQuery: string;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ searchQuery }) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const restaurantsPerPage = 6;
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/restaurants");
        setRestaurants(response.data.reverse());
        setDataLoaded(true);
        setLoadError(false);
      } catch (error) {
        setLoadError(true);
        setDataLoaded(true);
        toast.error("Failed to load restaurants");
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchFilteredRestaurants = async () => {
      try {
        const sanitizedQuery = searchQuery.replace(/[^a-zA-Z0-9 ]/g, "");
        const response = await axios.get("http://localhost:5000/restaurants");
        const filteredRestaurants = sanitizedQuery
          ? response.data.filter((restaurant: any) =>
              restaurant.name
                .toLowerCase()
                .includes(sanitizedQuery.toLowerCase())
            )
          : response.data;

        setRestaurants(filteredRestaurants.reverse());
        setDataLoaded(true);
        setLoadError(false);
      } catch (error) {
        setLoadError(true);
        setDataLoaded(true);
        toast.error("Failed to load restaurants");
      }
    };

    fetchFilteredRestaurants();
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      toast.success("Restaurant deleted");
    } catch (error) {
      toast.error("Failed to delete restaurant");
    }
  };

  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  const startIndex = (currentPage - 1) * restaurantsPerPage;
  const endIndex = startIndex + restaurantsPerPage;
  const currentRestaurants = restaurants.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!dataLoaded) {
    return <p className="text-xl m-8">Restaurants Loading...</p>;
  }

  if (loadError) {
    return (
      <p className="text-xl m-8 text-[#ff0000]">Failed to load restaurants.</p>
    );
  }

  if (restaurants.length === 0) {
    return (
      <p className="text-xl m-8 text-[#ff0000]">No restaurants available.</p>
    );
  }

  return (
    <div className="p-4 flex flex-col min-h-[82vh] overflow-y-auto relative">
      <h2 className="text-2xl mb-4">Restaurants</h2>
      <ul>
        {currentRestaurants.map((restaurant: any) => (
          <li key={restaurant.id} className="mb-2 p-2 border-b">
            <Link to={`/restaurant/${restaurant.id}`}>
              <h3 className="text-xl">{restaurant.name}</h3>
            </Link>
            <button
              onClick={() => handleDelete(restaurant.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex grow justify-around items-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RestaurantList;
