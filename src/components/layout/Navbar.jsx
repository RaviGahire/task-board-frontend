import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  IconMoon, 
  IconSun, 
  IconMenu2, 
  IconX 
} from '@tabler/icons-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg transition-transform group-hover:scale-105">
                <span className="text-xl font-bold px-1">VB</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">
                VarBoard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-all hover:translate-y-[-1px] ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all active:scale-95"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <IconSun size={20} stroke={2} /> : <IconMoon size={20} stroke={2} />}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'} absolute w-full md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-all duration-200 ease-in-out`}>
        <div className="px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Appearance</span>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              {isDark ? <><IconSun size={18} /> Light</> : <><IconMoon size={18} /> Dark</>}
            </button>
          </div>
          
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isActive(link.path)
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};