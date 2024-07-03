import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import AddRestaurant from "../pages/AddRestaurant";
import EditRestaurant from "../pages/EditRestaurant";
import RestaurantDetail from "../components/RestaurantDetail";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/add" element={<AddRestaurant />} />
    <Route path="/restaurant/:id" element={<RestaurantDetail />} />
    <Route path="/restaurant/:id/edit" element={<EditRestaurant />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
