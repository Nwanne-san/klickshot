"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/data";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCategoryClick = (category: string) => {
    router.push(`/search?category=${category}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm transition-transform duration-300 ease-in-out z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Klickshot</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/placeholder.svg?height=40&width=40"
                alt="Klickshot"
              />
            </Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <NavigationMenuLink asChild>
                          <a
                            onClick={() => handleCategoryClick(category)}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                          >
                            {category}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <Link
              href="/search"
              className="whitespace-nowrap text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
            <Link
              href="/profile"
              className="whitespace-nowrap text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <User className="h-5 w-5" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
