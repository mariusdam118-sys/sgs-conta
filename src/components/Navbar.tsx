'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Landmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Acasă', path: '/' },
  { name: 'Servicii', path: '/#servicii' },
  { name: 'Despre Noi', path: '/#despre' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 px-8 py-4 flex items-center justify-between',
        scrolled ? 'backdrop-blur-md bg-white/70 border-b border-slate-200' : 'bg-transparent'
      )}
    >
      <div className="flex items-center gap-2 group">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-navy to-royal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight uppercase text-navy">
                sgs<span className="text-royal">conta</span>
              </span>
            </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                'text-sm font-semibold uppercase tracking-wider transition-colors hover:text-royal',
                pathname === link.path ? 'text-royal' : 'text-navy'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-navy text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-royal transition-all"
          >
            Solicita oferta
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-navy"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-lg font-medium text-navy border-b border-gray-50 pb-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-navy text-white px-6 py-3 rounded-xl text-center font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Contactează-ne
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
