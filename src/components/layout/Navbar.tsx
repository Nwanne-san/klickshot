"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo, LogoDark } from "../../../public";
import { useRouter } from "next/navigation";
import { Search, User, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
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
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
    setIsCategoryOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 bg-indigo-50 w-full dark:bg-black shadow-sm transition-transform duration-300 ease-in-out z-50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <Image
                  src={Logo || "/placeholder.svg"}
                  alt=""
                  className="dark:hidden"
                  width={180}
                  height={50}
                />
                <Image
                  src={LogoDark || "/placeholder.svg"}
                  alt=""
                  className="dark:block hidden"
                  width={180}
                  height={50}
                />
              </Link>
            </div>
            <NavigationMenu className="hidden sm:flex">
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
                  <Link
                    href="/search"
                    className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
                  >
                    Trending
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={toggleCategoryMenu}
                    className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                  >
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
                <NavigationMenuItem>
                  <Link
                    href="/search"
                    className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
                  >
                    Browse
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden sm:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
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
            <div className="flex sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 dark:text-gray-300"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-50"
              onClick={toggleMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[70%] bg-white dark:bg-gray-800 z-50 shadow-lg"
            >
              <div className="p-4 flex justify-between items-center border-b w-full">
                <div className="flex items-center justify-between space-x-32 w-full">
                  <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Link href="/profile">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    </Link>
                  </div>
                  <X
                    onClick={toggleMobileMenu}
                    className="h-6 w-6 text-gray-500 dark:text-white"
                  />
                </div>
              </div>
              <nav className="mt-4 px-2">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/search"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Trending
                </Link>
                <Link
                  href="/search"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Browse
                </Link>
                <div className="px-4 py-2">
                  <button
                    onClick={toggleCategoryMenu}
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Categories
                    {isCategoryOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 space-y-1 overflow-hidden"
                      >
                        {categories.map((category) => (
                          <a
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className="block px-2 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            {category}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
