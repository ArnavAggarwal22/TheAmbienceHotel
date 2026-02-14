import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, ArrowRight, ChevronRight,
  Star, Wifi, Car, Utensils, Coffee, Sparkles, Clock,
  Calendar, Users, Bed
} from 'lucide-react';
import { HOTEL_INFO, ROOMS, TESTIMONIALS, GALLERY_IMAGES, NEARBY_ATTRACTIONS } from '@/data/hotelData';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/hero3.jpeg";
import banner from "../assets/Banner.jpeg";
import { BANQUET } from "@/data/hotelData";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";



// Hero Section
const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [hero1, hero2, hero3];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      {backgrounds.map((bg, index) => (
        <motion.div
          key={bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentBg === index ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img src={bg} alt="" className="w-full h-full object-cover" />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/90 z-[1]" />

      <div className="container mx-auto px-6 relative z-10 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block py-2 px-4 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold tracking-widest uppercase mb-6"
          >
            Welcome to The Ambience Hotel
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold mb-6 leading-tight"
          >
            Experience <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              True Luxury
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-light"
          >
            {HOTEL_INFO.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link 
              to="/booking"
              className="group px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-600/40 flex items-center justify-center gap-2"
            >
              Book Your Stay
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href={`tel:${HOTEL_INFO.phone}`} 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Call Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBg(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentBg === index ? 'w-8 bg-amber-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent mx-auto mb-2" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

// Booking Widget
const BookingWidget = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-20 -mt-10 container mx-auto px-6"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end border border-slate-100">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Check In</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Check Out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-slate-400" size={18} />
            <select className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium appearance-none">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
            <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">
              <ChevronRight className="rotate-90" size={18} />
            </div>
          </div>
        </div>
        <Link 
          to="/booking"
          className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg text-center"
        >
          Check Availability
        </Link>
      </div>
    </motion.div>
  );
};

// About Section
const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                  src={banner}
                    alt="Hotel Banner"
                    className="w-full h-[500px] object-cover"
              />

              
            </div>
            
            <motion.div 
              style={{ y }}
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-100 rounded-full -z-0 blur-3xl opacity-50" 
            />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-slate-200 rounded-full -z-0 blur-3xl opacity-50" />
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Top Rated</h4>
                  <p className="text-xs text-slate-500">4.9/5 on Google</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 italic">"An unforgettable experience with world-class amenities."</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">About Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-6">
              Discover a Haven of <span className="text-amber-600">Comfort</span> & Elegance
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Located in the heart of Zirakpur, The Ambience Hotel is more than just a place to stay—it's a destination. Whether you're visiting for business or leisure, our meticulously designed spaces and attentive staff ensure a seamless experience.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Enjoy proximity to Chandigarh's top attractions like Sukhna Lake and Rock Garden, while retreating to the tranquility of our luxury suites.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Bed, text: "Luxury Rooms" },
                { icon: Clock, text: "24/7 Service" },
                { icon: Utensils, text: "Fine Dining" },
                { icon: Sparkles, text: "Event Spaces" }
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium text-slate-800">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Link 
              to="/booking"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all"
            >
              Book Your Stay <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Room Card Component
const RoomCard = ({ room, index }: { room: typeof ROOMS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={room.image}
        alt={room.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-sm font-bold text-slate-900 shadow-sm">
        {room.price} <span className="text-slate-500 font-normal">/ night</span>
      </div>
    </div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900">{room.name}</h3>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <Bed size={14} /> {room.size} • <Users size={14} /> {room.guests}
          </p>
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold">{room.rating}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {room.features.slice(0, 3).map((feature, idx) => (
          <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-md border border-slate-100">
            {feature}
          </span>
        ))}
        {room.features.length > 3 && (
          <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs rounded-md">
            +{room.features.length - 3} more
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <Link 
          to={`/room/${room.id}`}
          className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors text-center"
        >
          View Details
        </Link>
        <a 
          href="https://theambiencehotel.bookingjini.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
        >
          Book
        </a>
      </div>
    </div>
  </motion.div>
);

// Rooms Section
const Rooms = () => {
  return (
    <section id="rooms" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-bold tracking-widest uppercase text-sm"
          >
            Accommodations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-6"
          >
            Our Exquisite Rooms & Suites
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg"
          >
            Choose from our selection of premium rooms, each designed to provide the ultimate comfort and relaxation during your stay.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>

        {/* Banquet CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          <img 
            src={BANQUET.image}
            alt={BANQUET.name}
            className="w-full h-[400px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-lg">
                <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">Events & Celebrations</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4 mb-4">
                  Grand Banquet Hall
                </h3>
                <p className="text-slate-300 mb-6">
                  Host your dream wedding, corporate event, or special celebration in our elegant 3000 sq ft banquet hall with capacity for up to 120 guests.
                </p>
                <Link 
                  to="/banquet"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all"
                >
                  Explore Banquet <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Amenities Section
const Amenities = () => {
  const amenities = [
    { icon: Wifi, title: "High-Speed WiFi", desc: "Complimentary fiber internet throughout the property." },
    { icon: Car, title: "Valet Parking", desc: "Secure, on-site parking with valet service available." },
    { icon: Utensils, title: "Fine Dining", desc: "Award-winning restaurant serving local and global cuisine." },
    { icon: Coffee, title: "24/7 Room Service", desc: "Gourmet meals delivered to your room at any hour." },
    { icon: Sparkles, title: "Spa & Wellness", desc: "Rejuvenating treatments and massages available." },
    { icon: Clock, title: "Concierge", desc: "Personalized assistance for travel and bookings." },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-800 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Facilities</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
              World Class Amenities
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We provide everything you need for a perfect stay. From high-speed internet to gourmet dining, experience luxury at every touchpoint.
            </p>
            <Link 
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-slate-900 transition-all"
            >
              Book Your Stay <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm group"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Preview Section
const GalleryPreview = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4">
              Explore Our Hotel
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-amber-600 transition-all"
            >
              View All Photos <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.slice(0, 5).map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${
                idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  idx === 0 ? 'min-h-[400px]' : 'min-h-[200px]'
                }`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <p className="text-xs uppercase tracking-wider text-amber-400">{img.category}</p>
                <h4 className="font-bold">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-bold tracking-widest uppercase text-sm"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4"
          >
            What Our Guests Say
          </motion.h2>
        </div>

        <div className="relative">
          <Carousel opts={{ loop: true }} className="relative">
            <CarouselContent className="flex">
              {TESTIMONIALS.slice(0, 10).map((item, index) => (
                <CarouselItem key={item.id} className="pl-4 pr-4 md:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-slate-50 p-8 rounded-2xl relative group hover:shadow-xl transition-all h-full"
                  >
                    <div className="flex gap-1 text-amber-400 mb-6">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-slate-700 italic mb-6 leading-relaxed">"{item.text}"</p>
                    <div className="mt-4">
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

// Nearby Attractions
const NearbyAttractions = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-bold tracking-widest uppercase text-sm"
          >
            Location
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4"
          >
            Nearby Attractions
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEARBY_ATTRACTIONS.map((attraction, index) => (
            <motion.div
              key={attraction.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  {attraction.distance}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{attraction.name}</h3>
                <p className="text-slate-600 text-sm">{attraction.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_avjhb44",     // your service ID
        "template_xvlfler",    // your template ID
        {
          name: contactData.firstName + " " + contactData.lastName,
          email: contactData.email,
          message: contactData.message,
        },
        "y5Q9Jl7o6AobzoP59"     // your public key
      );

      toast.success("Message sent successfully!");

      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Side Info */}
          <div>
            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">
              Contact Us
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
              Get In Touch
            </h2>

            <p className="text-slate-400 mb-10 max-w-md">
              Have questions about your booking or need special arrangements?
              Our team is here to help you 24/7.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold">Phone</h4>
                <a
                  href="tel:8288077631"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  +91 82880 77631
                </a>
              </div>

              <div>
                <h4 className="font-bold">Email</h4>
                <a
                  href="mailto:info@theambiencehotel.com"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  info@theambiencehotel.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={contactData.firstName}
                  onChange={(e) =>
                    setContactData({ ...contactData, firstName: e.target.value })
                  }
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={contactData.lastName}
                  onChange={(e) =>
                    setContactData({ ...contactData, lastName: e.target.value })
                  }
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                value={contactData.message}
                onChange={(e) =>
                  setContactData({ ...contactData, message: e.target.value })
                }
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 resize-none"
              />

              <button
                type="submit"
                className="w-full py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-amber-200 selection:text-amber-900">
      <Hero />
      <BookingWidget />
      <About />
      <Rooms />
      <Amenities />
      <GalleryPreview />
      <Testimonials />
      <NearbyAttractions />
      <Contact />
    </div>
  );
};

export default Home;
