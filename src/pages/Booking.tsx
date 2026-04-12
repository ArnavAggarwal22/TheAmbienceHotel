import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Calendar, Users, Bed, Check, ArrowRight,
  CreditCard, Shield, Clock, Star, Phone, Mail, MapPin
} from 'lucide-react';
import { ROOMS, HOTEL_INFO } from '@/data/hotelData';
import { toast } from 'sonner';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedRoom, _setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<typeof ROOMS>([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/public/rooms`);
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        } else {
          // Fallback to static data if API fails
          setRooms(ROOMS);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        // Fallback to static data if API fails
        setRooms(ROOMS);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request submitted! We will contact you shortly to confirm.');
  };

  const selectedRoomData = rooms.find(r => r.id === selectedRoom);

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 1;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    if (!selectedRoomData) return 0;
    return selectedRoomData.priceValue * calculateNights();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading booking options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="pt-24 pb-6 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">Book Your Stay</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Select Room' },
              { num: 2, label: 'Your Details' },
              { num: 3, label: 'Confirmation' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex flex-col items-center ${
                  step >= s.num ? 'text-amber-600' : 'text-slate-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-1 ${
                    step >= s.num 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > s.num ? <Check size={20} /> : s.num}
                  </div>
                  <span className="text-xs font-medium">{s.label}</span>
                </div>
                {idx < 2 && (
                  <div className={`w-24 h-1 mx-4 ${
                    step > s.num ? 'bg-amber-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 1: Select Room */}
      {step === 1 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                Select Your Room
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Choose from our selection of premium rooms designed for your comfort and relaxation.
              </p>
            </motion.div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-12 max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Check In
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                      type="date" 
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
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
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
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
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 font-medium appearance-none"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Room Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {ROOMS.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-sm font-bold text-slate-900">
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
                    
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-md">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href="https://theambiencehotel.bookingjini.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors text-center"
                      >
                        Select Room
                      </a>
                      <Link 
                        to={`/room/${room.id}`}
                        className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Guest Details */}
      {step === 2 && selectedRoomData && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="text-amber-600 font-medium mb-6 hover:underline"
                >
                  ← Back to room selection
                </button>
                
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                  Guest Information
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={bookingData.name}
                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <input 
                        type="text"
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Special Requests
                    </label>
                    <textarea 
                      rows={4}
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Any special requests or preferences..."
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <input 
                      type="checkbox" 
                      id="terms"
                      required
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-600">
                      I agree to the <Link to="/" className="text-amber-600 hover:underline">Terms & Conditions</Link> and <Link to="/" className="text-amber-600 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Review <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>

              {/* Booking Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h3>
                  
                  <div className="flex gap-4 mb-6">
                    <img 
                      src={selectedRoomData.image} 
                      alt={selectedRoomData.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedRoomData.name}</h4>
                      <p className="text-sm text-slate-500">{selectedRoomData.size}</p>
                      <div className="flex items-center gap-1 text-amber-500 mt-1">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm">{selectedRoomData.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Check-in</span>
                      <span className="font-medium">{bookingData.checkIn || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Check-out</span>
                      <span className="font-medium">{bookingData.checkOut || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Guests</span>
                      <span className="font-medium">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Nights</span>
                      <span className="font-medium">{calculateNights()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-600">{selectedRoomData.price} x {calculateNights()} nights</span>
                      <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Taxes & Fees</span>
                      <span className="font-medium">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-amber-600">
                      ₹{Math.round(calculateTotal() * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && selectedRoomData && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
                  Review Your Booking
                </h2>
                <p className="text-slate-600 mb-8">
                  Please review your booking details before confirming.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                  <div className="flex gap-4 mb-6">
                    <img 
                      src={selectedRoomData.image} 
                      alt={selectedRoomData.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedRoomData.name}</h4>
                      <p className="text-sm text-slate-500">{selectedRoomData.size} • {selectedRoomData.guests}</p>
                      <p className="text-amber-600 font-bold mt-1">{selectedRoomData.price} / night</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Check-in</p>
                      <p className="font-medium">{bookingData.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Check-out</p>
                      <p className="font-medium">{bookingData.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Guests</p>
                      <p className="font-medium">{bookingData.guests}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Nights</p>
                      <p className="font-medium">{calculateNights()}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600">Subtotal</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600">Taxes (18%)</span>
                      <span>₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
                      <span>Total Amount</span>
                      <span className="text-amber-600">₹{Math.round(calculateTotal() * 1.18).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Edit Details
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-1 py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Confirm Booking
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Shield size={16} /> Secure Payment
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} /> Instant Confirmation
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Call us</p>
                <a href={`tel:${HOTEL_INFO.phone}`} className="font-bold text-slate-900 hover:text-amber-600">
                  {HOTEL_INFO.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email us</p>
                <a href={`mailto:${HOTEL_INFO.email}`} className="font-bold text-slate-900 hover:text-amber-600">
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Visit us</p>
                <span className="font-bold text-slate-900">Zirakpur, Punjab</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
