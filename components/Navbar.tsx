import React, { useState } from 'react';
import { Menu, X, School, BookOpen, GraduationCap, Users, Phone, Newspaper, Lock } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  schoolName: string;
  schoolLogo?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, schoolName, schoolLogo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Beranda', icon: <School size={18} /> },
    { id: 'profile', label: 'Profil', icon: <Users size={18} /> },
    { id: 'academic', label: 'Akademik', icon: <BookOpen size={18} /> },
    { id: 'admissions', label: 'SPMB', icon: <GraduationCap size={18} /> },
    { id: 'news', label: 'Berita', icon: <Newspaper size={18} /> },
    { id: 'contact', label: 'Kontak', icon: <Phone size={18} /> },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-white p-1.5 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
               {schoolLogo ? (
                 <img src={schoolLogo} alt="Logo" className="w-full h-full object-contain" />
               ) : (
                 <School className="text-primary" size={24} />
               )}
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight">{schoolName}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                  currentPage === item.id
                    ? 'bg-blue-800 text-secondary'
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="h-6 w-px bg-blue-700 mx-2"></div>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                currentPage === 'admin'
                  ? 'bg-red-900 text-white'
                  : 'hover:bg-red-800 text-red-200'
              }`}
            >
              <Lock size={16} />
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-blue-950 text-secondary'
                    : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
             <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium text-red-200 hover:bg-red-900`}
              >
                <Lock size={18} />
                Admin Dashboard
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};