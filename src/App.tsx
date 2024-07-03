import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <div className="flex flex-col min-h-screen bg-[#e5e7eb3d] shadow-md rounded-lg w-full xl:w-[75%] md:w-[75%] sm:w-[80%]">
    <Router>
      <Header />
      <main className="flex-grow">
        <AppRoutes />
        <ToastContainer />
      </main>
      <Footer />
    </Router>
  </div>
);

export default App;
