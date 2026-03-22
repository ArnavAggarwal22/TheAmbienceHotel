import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
            className="text-[150px] md:text-[200px] font-serif font-bold text-slate-200 leading-none select-none"
          >
            404
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center"
            >
              <Search size={48} className="text-amber-600" />
            </motion.div>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 text-lg mb-8"
        >
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-600/30"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-300 text-slate-700 rounded-full font-semibold hover:bg-slate-100 transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-200"
        >
          <p className="text-sm text-slate-500 mb-4">Popular pages you might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/room/super-deluxe" 
              className="px-4 py-2 bg-white rounded-full text-sm text-slate-600 hover:text-amber-600 hover:shadow-md transition-all"
            >
              Super Deluxe Room
            </Link>
            <Link 
              to="/room/deluxe" 
              className="px-4 py-2 bg-white rounded-full text-sm text-slate-600 hover:text-amber-600 hover:shadow-md transition-all"
            >
              Deluxe Room
            </Link>
            <Link 
              to="/banquet" 
              className="px-4 py-2 bg-white rounded-full text-sm text-slate-600 hover:text-amber-600 hover:shadow-md transition-all"
            >
              Banquet Hall
            </Link>
            <Link 
              to="/gallery" 
              className="px-4 py-2 bg-white rounded-full text-sm text-slate-600 hover:text-amber-600 hover:shadow-md transition-all"
            >
              Gallery
            </Link>
            <Link 
              to="/booking" 
              className="px-4 py-2 bg-white rounded-full text-sm text-slate-600 hover:text-amber-600 hover:shadow-md transition-all"
            >
              Book Now
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
