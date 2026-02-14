import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomsDropdown, setRoomsDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { 
      name: 'Rooms', 
      href: '/#rooms',
      dropdown: [
        { name: 'Super Deluxe Room', href: '/room/super-deluxe' },
        { name: 'Deluxe Room', href: '/room/deluxe' }
      ]
    },
    { name: 'Banquet', href: '/banquet' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isTransparent 
          ? 'bg-transparent py-6' 
          : 'bg-white/95 backdrop-blur-xl shadow-lg py-3'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start group">
          <motion.span 
            className={`text-2xl font-serif font-bold tracking-wide transition-colors ${
              isTransparent ? 'text-white' : 'text-slate-900'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            THE AMBIENCE
          </motion.span>
          <span className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
            isTransparent ? 'text-amber-400' : 'text-amber-600'
          }`}>
            Hotel & Banquet
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <div
                  onMouseEnter={() => setRoomsDropdown(true)}
                  onMouseLeave={() => setRoomsDropdown(false)}
                  className="relative"
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 ${
                      isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform ${roomsDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {roomsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : link.href.startsWith('/#') ? (
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 ${
                    isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 ${
                    isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          
          <Link 
            to="/booking" 
            className="ml-4 px-6 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-600/30 hover:scale-105"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isTransparent ? 'text-white' : 'text-slate-900'
          }`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.href.startsWith('/#') ? (
                    <button
                      onClick={() => {
                        scrollToSection(link.href);
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-slate-800 font-medium hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-slate-800 font-medium hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                  
                  {link.dropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-amber-600 rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
                >
                  <Phone size={18} />
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
