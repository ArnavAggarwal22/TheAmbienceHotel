import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Maximize, Check, Star, ChevronLeft, ChevronRight,
  Calendar, Phone, Mail, X, Music, Utensils, Car, Sparkles,
  Camera, Lightbulb, Heart, Briefcase
} from 'lucide-react';
import { BANQUET, HOTEL_INFO } from '@/data/hotelData';
import { toast } from 'sonner';
import emailjs from "@emailjs/browser";

const Banquet = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guests: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % BANQUET.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + BANQUET.gallery.length) % BANQUET.gallery.length);
  };

const handleInquiry = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 1️⃣ Send Email via EmailJS
    await emailjs.send(
      "service_avjhb44",
      "template_bi8fs3y",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        guests: formData.guests,
        eventType: formData.eventType,
      },
      "y5Q9Jl7o6AobzoP59"
    );

    // 2️⃣ Prepare WhatsApp Message
    const message = `
New Banquet Inquiry:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Event Date: ${formData.eventDate}
Guests: ${formData.guests}
Event Type: ${formData.eventType}
    `;

    // 3️⃣ Open WhatsApp (ONLY 8288077631)
    window.open(
      `https://wa.me/918288077631?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    toast.success("Inquiry sent successfully!");

  } catch (error) {
    toast.error("Something went wrong. Please try again.");
  }
};


  const eventTypeIcons: Record<string, React.ElementType> = {
    'Weddings & Receptions': Heart,
    'Corporate Events': Briefcase,
    'Birthday Parties': Sparkles,
    'Anniversary Celebrations': Heart,
    'Conferences & Seminars': Users,
    'Product Launches': Lightbulb
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
              src={BANQUET.gallery[currentImage]}
              alt={BANQUET.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
            
            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {BANQUET.gallery.map((_, idx) => (
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
            <span className="text-slate-900 font-medium">Banquet Hall</span>
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
            src={BANQUET.gallery[currentImage]} 
            alt={BANQUET.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4"
              >
                Events & Celebrations
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4"
              >
                {BANQUET.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-200 max-w-2xl mx-auto"
              >
                Host your dream events in our elegant and spacious venue
              </motion.p>
            </div>
          </div>
          
          {/* Gallery Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {BANQUET.gallery.map((_, idx) => (
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

      {/* Quick Stats */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: BANQUET.capacity, label: 'Guest Capacity' },
              { icon: Maximize, value: BANQUET.size, label: 'Space' },
              { icon: Star, value: '4.9', label: 'Rating' },
              { icon: Calendar, value: '24/7', label: 'Availability' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon size={32} className="mx-auto mb-3 text-amber-500" />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">About the Venue</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-6">
                Perfect for Every <span className="text-amber-600">Occasion</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {BANQUET.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {BANQUET.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                      <Check size={16} />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {BANQUET.eventTypes.map((type, idx) => {
                const Icon = eventTypeIcons[type] || Sparkles;
                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-50 p-6 rounded-2xl text-center group hover:bg-amber-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{type}</h4>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Facilities</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4">
              Venue Amenities
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {BANQUET.amenities.map((amenity, idx) => {
              const icons: Record<string, React.ElementType> = {
                'Stage Setup': Music,
                'Dance Floor': Music,
                'Projector & Screen': Camera,
                'Sound System': Music,
                'Lighting Control': Lightbulb,
                'Bridal Room': Heart,
                'Catering Kitchen': Utensils,
                'Valet Parking': Car,
                'Event Coordinator': Users,
                'DJ Setup' : Music
              };
              const Icon = icons[amenity] || Check;
              
              return (
                <motion.div
                  key={amenity}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-medium text-slate-900 text-sm">{amenity}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>




      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
                Request a Quote
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Tell us about your event and we'll create a customized package just for you. Our event planning team is ready to make your vision a reality.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Call Us</h4>
                    <a href={`tel:${HOTEL_INFO.phone}`} className="text-slate-400 hover:text-amber-500 transition-colors">
                      {HOTEL_INFO.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <a href={`mailto:${HOTEL_INFO.email}`} className="text-slate-400 hover:text-amber-500 transition-colors">
                      {HOTEL_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white text-slate-900 p-8 rounded-2xl"
            >
              <form onSubmit={handleInquiry} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    placeholder="Event Date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                  >
                    <option value="">Expected Guests</option>
                    <option value="50">Up to 50</option>
                    <option value="100">Up to 100</option>
                    <option value="120">Up to 120</option>
                  </select>
                </div>
                <select 
                  value={formData.eventType}
                  onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                >
                  <option value="">Event Type</option>
                  {BANQUET.eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                
                {selectedPackage && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
                    <span className="text-amber-800 font-medium">Selected: {selectedPackage}</span>
                    <button 
                      type="button"
                      onClick={() => setSelectedPackage(null)}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                <div className="space-y-4">

  <button
    type="submit"
    className="w-full py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all shadow-lg"
  >
    Send Inquiry
  </button>

  <div className="grid grid-cols-2 gap-4">

    <a
      href="tel:8288077631"
      className="text-center py-3 border border-amber-600 text-amber-600 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all"
    >
      📞 Call Now +91 8288077631
    </a>

    <a
      href="https://wa.me/918288077631"
      target="_blank"
      rel="noopener noreferrer"
      className="text-center py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
    >
      💬 WhatsApp
    </a>

  </div>

</div>

              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banquet;
