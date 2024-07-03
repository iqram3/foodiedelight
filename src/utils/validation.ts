export const validateRestaurant = (data: any) => {
  if (!data.name) return "Name is required";
  if (!data.description) return "Description is required";
  if (!data.location) return "Location is required";

  if (!data.menu || data.menu.length === 0)
    return "Menu must have at least one item";

  for (const item of data.menu) {
    if (!item.name || !item.price || !item.description) {
      return "All menu items must have a name, price, and description";
    }
  }

  return null;
};
