import React from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <div className="menu">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-gray-800 font-semibold">
              RS {item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
