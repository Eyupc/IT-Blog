// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Search } from './Search';
import { useDarkMode } from '../hooks/useDarkmode';

type NavLink = {
  href: string;
  label: string;
};

export const Navbar: React.FC = () => {
  // Initialize state with undefined to prevent hydration mismatch
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isDarkMode, toggleDarkMode, mounted } = useDarkMode();


  const NavLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/programming', label: 'Programming' },
    { href: '/data-science', label: 'Data Science' },
    { href: '/design', label: 'Design' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 
                    bg-white/90 dark:bg-gray-900/90 
                    backdrop-blur-md shadow-md 
                    transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-gray-900 dark:text-white
                              hover:text-blue-600 dark:hover:text-blue-400
                              transition-colors">
          IT Blog
        </a>

        <ul className="hidden md:flex items-center space-x-6">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} 
                 className="text-gray-700 dark:text-gray-300
                           hover:text-blue-600 dark:hover:text-blue-400
                           transition-colors font-medium">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
        <Search />
        <button 
  onClick={toggleDarkMode}
  className="text-gray-600 dark:text-gray-300
            hover:text-blue-600 dark:hover:text-blue-400
            transition-colors"
  aria-label="Toggle Dark Mode"
>
          {isDarkMode ? (
            <Sun strokeWidth={1.5} className="w-5 h-5" />
          ) : (
            <Moon strokeWidth={1.5} className="w-5 h-5" />
          )}
        </button>

          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-600 dark:text-gray-300
                      hover:text-blue-600 dark:hover:text-blue-400
                      transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X strokeWidth={1.5} className="w-6 h-6" />
            ) : (
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px]
                       backdrop-blur-md z-40">
          <ul className="flex flex-col items-center space-y-6 py-4 bg-white/95 dark:bg-gray-900/95">
            {NavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}
                   onClick={() => setIsMenuOpen(false)}
                   className="text-xl font-medium
                            text-gray-900 dark:text-white
                            hover:text-blue-600 dark:hover:text-blue-400
                            transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};