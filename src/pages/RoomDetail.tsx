import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Bed, Users, Maximize, Check, Star,
  Coffee, Utensils, Wind, Shield, Sparkles,
  Calendar, Phone, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { ROOMS } from '@/data/hotelData';
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail } from 'lucide-react';



const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const room = ROOMS.find(r => r.id === roomId);
  
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [userEmail, setUserEmail] = useState('');
const [userPhone, setUserPhone] = useState('');


  useEffect(() => {
    if (!room) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [room, navigate]);

  if (!room) return null;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
  };

const handleBooking = async () => {
  if (!checkIn || !checkOut || !userEmail || !userPhone) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    await emailjs.send(
      "service_jsnpe99",
      "template_x4oqukk",
      {
        roomName: room.name,
        price: room.price,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        userEmail: userEmail,
        userPhone: userPhone,
      },
      "zkwYlZjCe_7-coXrd"
    );

    toast.success("Redirecting to booking page...");

    window.open(
      "https://theambiencehotel.bookingjini.in/",
      "_blank"
    );

  } catch (error) {
    toast.error("Something went wrong. Please try again.");
  }
};



  const amenityIcons: Record<string, React.ElementType> = {
    'Air Conditioning': Wind,
    'Mini Bar': Coffee,
    'In-Room Safe': Shield,
    'Work Desk': Check,
    'Coffee/Tea Maker': Coffee,
    'Hair Dryer': Wind,
    'Bathrobes & Slippers': Sparkles,
    'Premium Toiletries': Sparkles,
    'Daily Housekeeping': Check,
    'Room Service': Utensils
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
          >
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
            >
              <X size={32} />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>
            
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={room.gallery[currentImage]}
              alt={room.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
            
            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {room.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImage === idx ? 'w-8 bg-amber-500' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/#rooms" className="hover:text-amber-600 transition-colors">Rooms</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">{room.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Gallery */}
      <section className="relative h-[60vh] lg:h-[70vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-full"
        >
          <img 
            src={room.gallery[currentImage]} 
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          
          {/* Gallery Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {room.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImage === idx ? 'w-8 bg-amber-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          {/* Lightbox Toggle */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-8 right-8 px-4 py-2 bg-white/90 backdrop-blur text-slate-900 rounded-full text-sm font-medium hover:bg-white transition-colors"
          >
            View Gallery
          </button>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">
                    {room.name}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Bed size={16} /> {room.bedType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize size={16} /> {room.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} /> Up to {room.maxGuests} guests
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-900">{room.rating}</span>
                  <span className="text-slate-500 text-sm">({room.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {room.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Room Features</h3>
                <div className="flex flex-wrap gap-3">
                  {room.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Room Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity, idx) => {
                    const Icon = amenityIcons[amenity] || Check;
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                          <Icon size={18} />
                        </div>
                        <span className="text-slate-700 text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* View */}
              

              {/* Thumbnail Gallery */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Gallery</h3>
                <div className="grid grid-cols-4 gap-3">
                  {room.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentImage(idx);
                        setLightboxOpen(true);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden ${
                        currentImage === idx ? 'ring-2 ring-amber-500' : ''
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${room.name} ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Booking Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-slate-900">{room.price}</span>
                    <span className="text-slate-500"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold">{room.rating}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Check In
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Check Out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="date" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 text-slate-400" size={18} />
                      <select 
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium appearance-none"
                      >
                        {[...Array(room.maxGuests)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
    Your Email
  </label>
  <div className="relative">
    <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
    <input
  type="email"
  value={userEmail}
  onChange={(e) => setUserEmail(e.target.value)}
  placeholder="Enter your email"
  required
  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
           focus:outline-none focus:ring-2 focus:ring-amber-500 
           text-slate-700 font-medium 
           placeholder:text-slate-700 placeholder:font-medium"

/>

  </div>
</div>


<div>
  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
    Your Phone Number
  </label>
  <div className="relative">
    <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
    <input
  type="tel"
  value={userPhone}
  onChange={(e) => setUserPhone(e.target.value)}
  placeholder="Enter your phone number"
  required
  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
           focus:outline-none focus:ring-2 focus:ring-amber-500 
           text-slate-700 font-medium 
           placeholder:text-slate-700 placeholder:font-medium"


/>

  </div>
</div>


                </div>

                <button 
                  onClick={handleBooking}
                  className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors mb-4"
                >
                  Book Now
                </button>

                <a 
                  href="tel:8288077631"

                  className="w-full py-4 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Call to Book
                </a>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-500 text-center">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Rooms */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Explore Other Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROOMS.filter(r => r.id !== room.id).map((otherRoom) => (
              <Link 
                key={otherRoom.id}
                to={`/room/${otherRoom.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={otherRoom.image} 
                    alt={otherRoom.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900">
                    {otherRoom.price} <span className="text-slate-500 font-normal">/ night</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{otherRoom.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{otherRoom.size} • {otherRoom.guests}</p>
                  <div className="flex items-center text-amber-600 font-semibold">
                    View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetail;
