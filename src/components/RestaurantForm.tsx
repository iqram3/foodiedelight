import React from "react";
import { validateRestaurant } from "../utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useForm, MenuItem } from "../hooks/useForm";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
}

const FormField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  required?: boolean;
  rows?: number;
}> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  rows,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-xl mb-2">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md py-2 px-3 w-full"
        rows={rows}
        required={required}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md py-2 px-3 w-full"
        required={required}
      />
    )}
  </div>
);

const MenuItemInput: React.FC<{
  menuItem: MenuItem;
  index: number;
  handleMenuChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  removeMenuItem: (index: number) => void;
  isEditMode: boolean;
}> = ({ menuItem, index, handleMenuChange, removeMenuItem, isEditMode }) => (
  <div className="flex mb-2">
    <input
      type="text"
      id={`menu-${index}`}
      name="name"
      value={menuItem.name}
      onChange={(e) => handleMenuChange(e, index)}
      className="border border-gray-300 rounded-md py-2 px-3 w-1/3 mr-2"
      placeholder="Item Name"
      required
    />
    <input
      type="number"
      id={`price-${index}`}
      name="price"
      value={menuItem.price}
      onChange={(e) => handleMenuChange(e, index)}
      className="border border-gray-300 rounded-md py-2 px-3 w-1/4 mr-2"
      placeholder="Price"
      min="0"
      step="0.01"
      required
    />
    <input
      type="text"
      id={`description-${index}`}
      name="description"
      value={menuItem.description}
      onChange={(e) => handleMenuChange(e, index)}
      className="border border-gray-300 rounded-md py-2 px-3 w-1/2"
      placeholder="Description"
      required
    />
    {isEditMode && (
      <button
        type="button"
        className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
        onClick={() => removeMenuItem(index)}
      >
        Remove
      </button>
    )}
  </div>
);

const RestaurantForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  isEditMode = false,
}) => {
  const {
    formData,
    handleChange,
    handleMenuChange,
    addMenuItem,
    removeMenuItem,
  } = useForm(initialData);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      menu: formData.menu.map((item: MenuItem) => ({
        name: item.name.trim(),
        price: item.price,
        description: item.description.trim(),
      })),
    };
    const validationError = validateRestaurant(dataToSend);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    onSubmit(dataToSend);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <FormField
        id="name"
        label="Name"
        value={formData.name || ""}
        onChange={handleChange}
        required
      />
      <FormField
        id="description"
        label="Description"
        value={formData.description || ""}
        onChange={handleChange}
        type="textarea"
        rows={4}
        required
      />
      <FormField
        id="location"
        label="Location"
        value={formData.location || ""}
        onChange={handleChange}
        required
      />
      <div className="mb-4">
        <label htmlFor="menu" className="block text-xl mb-2">
          Menu:
        </label>
        {formData.menu.map((menuItem: MenuItem, index: number) => (
          <MenuItemInput
            key={index}
            menuItem={menuItem}
            index={index}
            handleMenuChange={handleMenuChange}
            removeMenuItem={removeMenuItem}
            isEditMode={isEditMode}
          />
        ))}
        {!isEditMode && (
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={addMenuItem}
          >
            Add Menu Item
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 mr-4 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleBack}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back
      </button>
    </form>
  );
};

export default RestaurantForm;
