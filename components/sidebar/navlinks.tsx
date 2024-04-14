import { LineChart, Package, ShoppingCart, Turtle } from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: <Turtle />,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LineChart />,
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
