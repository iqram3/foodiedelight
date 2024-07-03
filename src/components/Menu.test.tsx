import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Menu from "./Menu";

describe("Menu Component", () => {
  const mockItems = [
    {
      id: 1,
      name: "Item 1",
      price: 10.99,
      description: "Description for Item 1",
    },
    {
      id: 2,
      name: "Item 2",
      price: 15.49,
      description: "Description for Item 2",
    },
  ];

  it("renders menu items correctly", () => {
    const { getByText } = render(<Menu items={mockItems} />);
    mockItems.forEach((item) => {
      const itemName = getByText(item.name);
      const itemDescription = getByText(item.description);
      const itemPrice = getByText(`$${item.price.toFixed(2)}`);

      expect(itemName).toBeInTheDocument();
      expect(itemDescription).toBeInTheDocument();
      expect(itemPrice).toBeInTheDocument();
    });
  });
});
