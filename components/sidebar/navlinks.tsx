import { Package, ShoppingCart, Turtle } from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: <Turtle />,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: <ShoppingCart />,
  },
  {
    name: "Products",
    href: "/products",
    icon: <Package />,
  },
];
