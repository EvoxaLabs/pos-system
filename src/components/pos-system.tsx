import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HomeIcon,
  BarChartIcon,
  TagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
  RefreshCwIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";

const theme = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-100 text-gray-800",
  accent: "bg-orange-500 text-white",
  neutral: "bg-white text-gray-800",
  "neutral-content": "text-gray-600",
};

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Deep Fried Wonton",
    price: 15.0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Stir-Fried Noodles",
    price: 21.0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Spicy Chicken Tendon",
    price: 31.0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Fried Rice with Pork",
    price: 40.0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Sausages",
    price: 15.0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Lambreta Burger",
    price: 30.0,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export function PosSystem() {
  const [cart, setCart] = useState<(MenuItem & { quantity: number })[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Menu");
  const [activeSidebarItem, setActiveSidebarItem] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const discount = 10;
  const total = subtotal + tax - discount;

  const sidebarItems = [
    { id: "home", icon: HomeIcon },
    { id: "analytics", icon: BarChartIcon },
    { id: "tags", icon: TagIcon },
    { id: "back", icon: ArrowLeftIcon },
    { id: "forward", icon: ArrowRightIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-16 bg-white shadow-md flex-col items-center py-4 space-y-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            className={`w-10 h-10 ${
              activeSidebarItem === item.id
                ? theme.primary
                : theme["neutral-content"]
            }`}
            onClick={() => setActiveSidebarItem(item.id)}
          >
            <item.icon className="w-6 h-6" />
            <span className="sr-only">{item.id}</span>
          </Button>
        ))}
        <div className="mt-auto space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className={`w-10 h-10 ${theme["neutral-content"]}`}
          >
            <SettingsIcon className="w-6 h-6" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-red-500"
          >
            <LogOutIcon className="w-6 h-6" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <MenuIcon className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Admin POS</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-800">Admin Daboy</p>
              <p className="text-sm text-gray-500">Cashier 01</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className={`${
                  activeCategory === "Dine In" ? theme.primary : theme.secondary
                }`}
              >
                Dine In
              </Badge>
              <Badge variant="outline" className={theme["neutral-content"]}>
                Take Away
              </Badge>
              <Badge variant="outline" className={theme["neutral-content"]}>
                Deliver
              </Badge>
              <Badge variant="outline" className={theme["neutral-content"]}>
                Cancel
              </Badge>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Menu Items (51)
                </h2>
                <div className="flex w-full sm:w-auto space-x-2">
                  <Input placeholder="Search..." className="w-full sm:w-64" />
                  <Button
                    variant="outline"
                    size="icon"
                    className={theme["neutral-content"]}
                  >
                    <SearchIcon className="w-4 h-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={theme["neutral-content"]}
                  >
                    <RefreshCwIcon className="w-4 h-4" />
                    <span className="sr-only">Refresh</span>
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "All Menu",
                    "Meals",
                    "Soups",
                    "Beverages",
                    "Appetizer",
                    "Side Dish",
                  ].map((category) => (
                    <Badge
                      key={category}
                      variant={
                        activeCategory === category ? "secondary" : "outline"
                      }
                      className={`cursor-pointer ${
                        activeCategory === category
                          ? theme.primary
                          : theme["neutral-content"]
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                        <Button
                          className={`w-full mt-2 ${theme.primary}`}
                          onClick={() => addToCart(item)}
                        >
                          Choose
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="lg:w-1/3">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Order Summary
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Total Items ({totalItems})
                  </p>
                  <ScrollArea className="h-[calc(100vh-500px)]">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-gray-600">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <p>Tax (10%)</p>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <p>Discount</p>
                      <p>-${discount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-800">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button className={`w-full mt-4 ${theme.primary}`}>
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <aside className="w-64 h-full bg-white shadow-md py-4 px-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start mb-2 ${
                  activeSidebarItem === item.id
                    ? theme.primary
                    : theme["neutral-content"]
                }`}
                onClick={() => {
                  setActiveSidebarItem(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </Button>
            ))}
            <div className="mt-auto space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${theme["neutral-content"]}`}
              >
                <SettingsIcon className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500"
              >
                <LogOutIcon className="w-5 h-5 mr-2" />
                Log out
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
