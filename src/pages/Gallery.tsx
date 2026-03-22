import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, ChevronLeft, Grid3X3, Image as ImageIcon } from 'lucide-react';
import { GALLERY_IMAGES } from '@/data/hotelData';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))];
  
  const filteredImages = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
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
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={filteredImages[currentImage].src}
                alt={filteredImages[currentImage].title}
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />
            </AnimatePresence>
            
            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={32} />
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="text-amber-400 text-sm uppercase tracking-wider mb-1">
                {filteredImages[currentImage].category}
              </p>
              <h4 className="text-xl font-bold">{filteredImages[currentImage].title}</h4>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2">
              {filteredImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    currentImage === idx ? 'ring-2 ring-amber-500' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
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
            <span className="text-slate-900 font-medium">Gallery</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Visual Tour</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mt-4 mb-6">
              Our Gallery
            </h1>
            <p className="text-slate-600 text-lg">
              Take a visual journey through our luxurious hotel, from elegant rooms to world-class amenities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category === 'All' && <Grid3X3 size={16} className="inline mr-2" />}
                {category !== 'All' && <ImageIcon size={16} className="inline mr-2" />}
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 0.98 }}
                  onClick={() => openLightbox(idx)}
                  className={`relative group overflow-hidden rounded-xl cursor-pointer ${
                    idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      idx % 5 === 0 ? 'min-h-[400px]' : 'min-h-[200px]'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="text-xs uppercase tracking-wider text-amber-400 mb-1">{img.category}</p>
                    <h4 className="font-bold text-lg">{img.title}</h4>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ImageIcon size={18} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Experience Luxury in Person
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Book your stay today and create unforgettable memories at The Ambience Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/booking"
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-600/40"
              >
                Book Your Stay
              </Link>
              <Link 
                to="/room/super-deluxe"
                className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                View Rooms
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
