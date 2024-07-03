// useForm.ts
import { useState, useEffect } from "react";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const useForm = (initialData: any) => {
  const [formData, setFormData] = useState<any>({
    ...initialData,
    menu: initialData?.menu || [],
  });

  useEffect(() => {
    if (!formData.menu) {
      setFormData((prevData: any) => ({
        ...prevData,
        menu: [],
      }));
    }
  }, [formData.menu]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMenuChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedMenuItems = [...formData.menu];
    updatedMenuItems[index] = {
      ...updatedMenuItems[index],
      [name]: name === "price" ? parseFloat(value) : value,
    };
    setFormData((prevData: any) => ({
      ...prevData,
      menu: updatedMenuItems,
    }));
  };

  const addMenuItem = () => {
    const newMenuItem: MenuItem = {
      id: formData.menu.length + 1,
      name: "",
      price: 0,
      description: "",
    };
    setFormData((prevData: any) => ({
      ...prevData,
      menu: [...prevData.menu, newMenuItem],
    }));
  };

  const removeMenuItem = (index: number) => {
    const updatedMenuItems = formData.menu.filter(
      (item: MenuItem, i: number) => i !== index
    );
    setFormData((prevData: any) => ({
      ...prevData,
      menu: updatedMenuItems,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleMenuChange,
    addMenuItem,
    removeMenuItem,
  };
};
