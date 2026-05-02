import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, CheckCircle, Loader2, Search, Phone, User, Hash } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { MENU_ITEMS, MENU_CATEGORIES } from '@/data/menuData';
import { MENU_IMAGES, DEFAULT_IMAGE } from '@/data/menuImages';

const EMAILJS_SERVICE_ID = 'service_jsnpe99';
const EMAILJS_TEMPLATE_ID = 'template_uqrtfgq'; // ← replace with your template ID after saving
const EMAILJS_PUBLIC_KEY = 'zkwYlZjCe_7-coXrd';
const WHATSAPP_NUMBER = '918289099436';
const NOTIFY_EMAILS = ['arnavaggarwal3095@gmail.com', 'info@theambiencehotel.com'];

type CartMap = Record<string, number>;
type CartItem = { id: string; name: string; price: number; qty: number };

// ─── Veg indicator ───────────────────────────────────────────────────────────
const VegDot = ({ isVeg }: { isVeg: boolean }) => (
  <span className={`inline-block w-3 h-3 rounded-full flex-shrink-0 ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
);

// ─── Item Card (Swiggy-style) ─────────────────────────────────────────────────
const ItemCard = ({
  item, qty, onAdd, onRemove,
}: {
  item: typeof MENU_ITEMS[0]; qty: number;
  onAdd: () => void; onRemove: () => void;
}) => {
  const img = MENU_IMAGES[item.id] || DEFAULT_IMAGE;
  return (
    <div className="flex gap-3 bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
      {/* Image */}
      <div className="relative w-28 h-28 flex-shrink-0">
        <img
          src={img}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={e => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 py-3 pr-3 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start gap-1.5 mb-1">
            <VegDot isVeg={item.isVeg} />
            <p className="text-sm font-semibold text-gray-800 leading-snug">{item.name}</p>
          </div>
          {item.description && (
            <p className="text-xs text-gray-400 mb-1 line-clamp-1">{item.description}</p>
          )}
          <p className="text-sm font-bold text-amber-600">₹{item.price}</p>
        </div>

        {/* Controls */}
        <div className="flex justify-end mt-2">
          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="px-5 py-1.5 rounded-xl border-2 border-amber-500 text-amber-600 text-xs font-bold hover:bg-amber-500 hover:text-white active:scale-95 transition-all"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-amber-500 rounded-xl overflow-hidden">
              <button onClick={onRemove} className="w-7 h-7 flex items-center justify-center text-white font-bold active:bg-amber-700">
                <Minus size={13} />
              </button>
              <span className="text-white font-bold text-sm w-5 text-center">{qty}</span>
              <button onClick={onAdd} className="w-7 h-7 flex items-center justify-center text-white font-bold active:bg-amber-700">
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Order Modal ──────────────────────────────────────────────────────────────
const OrderModal = ({
  cartItems, total, onClose, onSuccess,
}: {
  cartItems: CartItem[]; total: number;
  onClose: () => void; onSuccess: () => void;
}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 10) { toast.error('Enter a valid phone number'); return; }
    setLoading(true);

    const orderLines = cartItems.map(i => `• ${i.name} x${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const orderRowsHtml = cartItems.map(i =>
      `<tr>
        <td style="padding:10px 16px;border-bottom:1px solid #FEF3C7;color:#1e293b;font-size:14px;">${i.name}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #FEF3C7;color:#64748b;font-size:14px;text-align:center;">×${i.qty}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #FEF3C7;color:#d97706;font-size:14px;font-weight:700;text-align:right;">₹${i.price * i.qty}</td>
      </tr>`
    ).join('');
    const waMsg = `🍽️ *New Order from Room ${room}*\n👤 Name: ${name}\n📞 Phone: ${phone}\n\n*Order:*\n${orderLines}\n\n💰 *Total: ₹${total}*\n_The Ambience Hotel_`;

    // Send to BOTH emails (failure of either doesn't block WhatsApp)
    const templateParams = {
      to_name: 'The Ambience Hotel Team',
      from_name: name,
      room_number: room,
      phone,
      order_details: orderLines,
      order_rows_html: orderRowsHtml,
      total: `₹${total}`,
      message: `New room order from Room ${room}. Guest: ${name}, Phone: ${phone}`,
    };

    try {
      await Promise.allSettled(
        NOTIFY_EMAILS.map(email =>
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
            { ...templateParams, to_email: email },
            EMAILJS_PUBLIC_KEY)
        )
      );
    } catch { /* email failure won't block WhatsApp */ }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
    setLoading(false);
    onSuccess();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-gray-800">Review & Place Order</h2>
            <p className="text-xs text-gray-400">Room service · The Ambience Hotel</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-5">
          {/* Summary */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Your Order</p>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {cartItems.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate pr-2">{i.name} <span className="text-gray-400">×{i.qty}</span></span>
                  <span className="font-semibold text-gray-800 flex-shrink-0">₹{i.price * i.qty}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-amber-200 mt-3 pt-3 flex justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-amber-600 text-lg">₹{total}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handlePlace} className="space-y-3">
            {[
              { icon: User, placeholder: 'Your Full Name *', value: name, setter: setName, type: 'text' },
              { icon: Hash, placeholder: 'Room Number *', value: room, setter: setRoom, type: 'text' },
              { icon: Phone, placeholder: 'Phone Number *', value: phone, setter: setPhone, type: 'tel' },
            ].map(({ icon: Icon, placeholder, value, setter, type }) => (
              <div key={placeholder} className="relative">
                <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={type} placeholder={placeholder} value={value} required
                  onChange={e => setter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-60 text-white font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-200">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Placing…</> :
                <><ShoppingCart size={18} /> Place Order</>}
            </button>
            <p className="text-center text-xs text-gray-400">WhatsApp will open · Our team confirms & delivers</p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onReset }: { onReset: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6 text-center">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 18, stiffness: 200, delay: 0.1 }}
      className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-5">
      <CheckCircle size={52} className="text-green-500" />
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="text-2xl font-bold text-gray-800 mb-2">Order Sent! 🎉</motion.h2>
    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="text-gray-500 text-sm max-w-xs mb-8">
      Your order was sent via WhatsApp. We'll deliver to your room shortly!
    </motion.p>
    <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      onClick={onReset}
      className="px-8 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-bold rounded-2xl transition-all">
      Order More
    </motion.button>
  </motion.div>
);

// ─── Main Menu ────────────────────────────────────────────────────────────────
export default function Menu() {
  const [cart, setCart] = useState<CartMap>({});
  const [activeCategory, setActiveCategory] = useState('All Day Breakfast');
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const catNavRef = useRef<HTMLDivElement>(null);

  const addItem = (id: string) => setCart(p => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  const removeItem = (id: string) => setCart(p => {
    const n = { ...p };
    if ((n[id] ?? 0) > 1) n[id]--; else delete n[id];
    return n;
  });

  const cartItems: CartItem[] = useMemo(() =>
    MENU_ITEMS.filter(i => (cart[i.id] ?? 0) > 0).map(i => ({ id: i.id, name: i.name, price: i.price, qty: cart[i.id] })),
    [cart]);
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  // Search + filter logic
  const searchActive = search.trim().length > 0;
  const searchResults = useMemo(() => {
    if (!searchActive) return [];
    const q = search.toLowerCase();
    return MENU_ITEMS.filter(i => {
      const matchText = i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
      const matchVeg = vegFilter === 'all' || (vegFilter === 'veg' ? i.isVeg : !i.isVeg);
      return matchText && matchVeg;
    });
  }, [search, vegFilter]);

  const categoryItems = useMemo(() =>
    MENU_ITEMS.filter(i =>
      i.category === activeCategory &&
      (vegFilter === 'all' || (vegFilter === 'veg' ? i.isVeg : !i.isVeg))
    ), [activeCategory, vegFilter]);

  // Scroll active category pill into view
  useEffect(() => {
    const el = catNavRef.current?.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeCategory]);

  const handleReset = () => { setCart({}); setShowSuccess(false); setShowCart(false); };

  const displayItems = searchActive ? searchResults : categoryItems;

  return (
    <div className="min-h-screen bg-orange-50">
      {/* ── Header ── */}
      <div className="bg-gradient-to-b from-amber-500 to-amber-400 px-4 pt-8 pb-5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-900/70 mb-1">The Ambience Hotel</p>
        <h1 className="text-2xl font-bold text-white mb-0.5">Room Service Menu</h1>
        <p className="text-amber-100 text-xs mb-4">Order fresh · Delivered to your room</p>

        {/* Search */}
        <div className="relative max-w-sm mx-auto">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Search dishes or categories…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl pl-9 pr-10 py-2.5 text-sm text-gray-700 placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Veg filter ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex gap-2 justify-center">
        {(['all', 'veg', 'nonveg'] as const).map(f => (
          <button key={f} onClick={() => setVegFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${vegFilter === f ? 'bg-amber-500 text-white border-amber-500' : 'text-gray-500 border-gray-200 hover:border-amber-300'}`}>
            {f === 'all' ? 'All' : f === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
          </button>
        ))}
      </div>

      {/* ── Category Nav (hidden when searching) ── */}
      {!searchActive && (
        <div ref={catNavRef} className="bg-white border-b border-gray-100 px-3 py-2.5 flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}>
          {MENU_CATEGORIES.map(cat => (
            <button key={cat} data-cat={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-amber-500 text-white shadow-md shadow-amber-200' : 'bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Items ── */}
      <div className="px-3 py-4 pb-32 max-w-2xl mx-auto">
        {searchActive && (
          <p className="text-xs text-gray-400 mb-3 px-1">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<span className="text-amber-600 font-semibold">{search}</span>"
          </p>
        )}
        {!searchActive && (
          <h2 className="text-base font-bold text-gray-700 mb-3 px-1">{activeCategory}
            <span className="text-xs text-gray-400 font-normal ml-1">({categoryItems.length} items)</span>
          </h2>
        )}

        {displayItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-3xl mb-2">🍽️</p>
            <p className="text-sm">No items found</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {displayItems.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  <ItemCard item={item} qty={cart[item.id] ?? 0} onAdd={() => addItem(item.id)} onRemove={() => removeItem(item.id)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Cart Bar ── */}
      <AnimatePresence>
        {totalItems > 0 && !showCart && !showSuccess && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
            <div className="max-w-lg mx-auto">
              <button onClick={() => setShowCart(true)}
                className="w-full flex items-center justify-between bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-white font-bold rounded-2xl px-5 py-4 shadow-xl shadow-amber-300/50 transition-all">
                <div className="flex items-center gap-3">
                  <span className="bg-white/25 text-white text-xs font-black px-2.5 py-1 rounded-lg">{totalItems}</span>
                  <span className="text-sm">View Cart</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-black">₹{totalPrice}</span>
                  <ShoppingCart size={18} />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showCart && !showSuccess && (
          <OrderModal cartItems={cartItems} total={totalPrice}
            onClose={() => setShowCart(false)}
            onSuccess={() => { setShowCart(false); setShowSuccess(true); }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSuccess && <SuccessScreen onReset={handleReset} />}
      </AnimatePresence>
    </div>
  );
}
