import React from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantList from '../components/RestaurantList';

const Home: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  return (
    <div>
      <RestaurantList searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
