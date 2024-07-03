import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => (
  <div className="p-4 text-center">
    <h2 className="text-2xl mb-4">Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-500">Go back to Home</Link>
  </div>
);

export default PageNotFound;
