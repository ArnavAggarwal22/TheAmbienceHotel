import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { HOTEL_INFO } from '@/data/hotelData';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Rooms', href: '/#rooms' },
    { name: 'Banquet', href: '/banquet' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  const roomLinks = [
    { name: 'Super Deluxe Room', href: '/room/super-deluxe' },
    { name: 'Deluxe Room', href: '/room/deluxe' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-2xl font-serif font-bold text-white">THE AMBIENCE</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500">Hotel & Banquet</p>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Experience luxury and comfort at its finest. Your perfect getaway awaits at The Ambience Hotel.
            </p>
            <div className="flex gap-4">
  <a
    href="https://www.instagram.com/theambiencehotel"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition"
  >
    <Instagram size={18} />
  </a>

  <a
    href="https://www.facebook.com/share/1R2x1iSSR5/?mibextid=wwXIfr"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition"
  >
    <Facebook size={18} />
  </a>

  <a
    href="https://www.google.com/maps/place/The+Ambience+Hotel/@30.660226,76.8162361,17z/data=!3m1!4b1!4m9!3m8!1s0x390feb0063620adf:0x34bf118209d9d1e!5m2!4m1!1i2!8m2!3d30.660226!4d76.818811!16s%2Fg%2F11ww8951rj?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition"
  >
    <MapPin size={18} />
  </a>
</div>

          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Rooms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-bold mb-6">Our Rooms</h4>
            <ul className="space-y-3">
              {roomLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link 
                to="/banquet"
                className="text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
              >
                <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                Banquet Hall
              </Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{HOTEL_INFO.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 flex-shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="text-sm hover:text-amber-500 transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 flex-shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="text-sm hover:text-amber-500 transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} The Ambience Hotel. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
