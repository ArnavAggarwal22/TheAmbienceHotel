import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/hero3.jpeg";
import hero4 from "../assets/hero4.jpeg";
import banner from "../assets/Banner.jpeg";
import toplobby from "../assets/toplobby.jpeg";
import aminities from "../assets/aminities.jpeg";
import Restaurantbest from "../assets/Restaurantbest.jpeg";
import Restaurant from "../assets/Restaurant.jpeg";

import sd1 from "../assets/hero2.jpeg";
import sd2 from "../assets/sd1.jpeg";
import sd3 from "../assets/sd2.jpeg";
import sd4 from "../assets/sd3.jpeg";

import d1 from "../assets/hero4.jpeg";
import d2 from "../assets/d1.jpeg";
import d3 from "../assets/d2.jpeg";
import d4 from "../assets/d3.jpeg";

import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b3 from "../assets/b3.jpeg";
import b4 from "../assets/b4.jpeg";

import sukhnalake from "../assets/Sukhnalake.jpg";
import rockgarden from "../assets/RockGarden.jpg";
import rosegarden from "../assets/RoseGarden.jpg";
import elantemall from "../assets/ElanteMall.jpg";


export const HOTEL_INFO = {
  name: "The Ambience Hotel",
  tagline: "A Unit Of Divine Paradise",
  location: "Near Unicity Homes, Zirakpur, Chandigarh, Punjab 140603",
  phone: "+91 82880 77631",
  email: "info@theambiencehotel.com",
  description: "Experience the perfect blend of luxury, comfort, and modern elegance. The Ambience Hotel offers an unparalleled stay with state-of-the-art amenities, exquisite dining, and a serene atmosphere designed for the discerning traveler.",
  social: {
    instagram: "https://instagram.com/theambiencehotel",
    facebook: "https://facebook.com/theambiencehotel",
    twitter: "https://twitter.com/theambiencehotel"
  }
};

export interface Room {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  size: string;
  guests: string;
  maxGuests: number;
  image: string;
  gallery: string[];
  features: string[];
  description: string;
  amenities: string[];
  bedType: string;
  view: string;
  rating: number;
  reviews: number;
}

export const ROOMS: Room[] = [
  {
  id: "super-deluxe",
  name: "Super Deluxe Room",
  price: "₹3,099",
  priceValue: 3099,
  size: "200 sq ft",
  guests: "2 Guests",
  maxGuests: 2,

  image: sd1,   // ✅ changed

  gallery: [    // ✅ changed
    sd1,
    sd2,
    sd3,
    sd4
  ],

  features: ["King Size Bed", "Breakfast Included", "City View", "Smart TV", "Rain Shower"],
  description: "Indulge in the epitome of luxury...",
  amenities: [
    "Air Conditioning",
    "Mini Bar",
    "In-Room Safe",
    "Work Desk",
    "Coffee/Tea Maker",
    "Hair Dryer",
    "Bathrobes & Slippers",
    "Daily Housekeeping",
    "Room Service"
  ],
  bedType: "King Size Bed",
  view: "City View",
  rating: 4.9,
  reviews: 128
},
  {
  id: "deluxe",
  name: "Deluxe Room",
  price: "₹2,799",
  priceValue: 2799,
  size: "170 sq ft",
  guests: "2 Guests",
  maxGuests: 2,

  image: d1,   // ✅ changed

  gallery: [   // ✅ changed
    d1,
    d4,
    d3,
    d2
  ],

  features: ["Queen Size Bed", "Free WiFi", "Work Desk", "Mini Bar", "24/7 Service"],
  description: "Our Deluxe Room offers a perfect blend of comfort...",
  amenities: [
    "Air Conditioning",
    "Mini Bar",
    "In-Room Safe",
    "Work Desk",
    "Coffee/Tea Maker",
    "Hair Dryer",
    "Premium Toiletries",
    "Daily Housekeeping",
    "Room Service"
  ],
  bedType: "Queen Size Bed",
  view: "Garden View",
  rating: 4.8,
  reviews: 96
}

];

export const BANQUET = {
  id: "banquet",
  name: "Grand Banquet Hall",
  price: "Custom Quote",
  size: "3000 sq ft",
  capacity: "120 Guests",
  image: b1,
  gallery: [b1, b2, b3, b4],

  features: ["120 Guest Capacity", "Catering Service", "Audio/Visual Equipment", "Custom Decor", "Ample Parking"],
  description: "Make your special occasions truly memorable in our Grand Banquet Hall. With a capacity of up to 120 guests, this elegant 3000 sq ft venue is perfect for weddings, corporate events, birthday celebrations, and more. Our dedicated event planning team ensures every detail is perfect.",
  amenities: [
    "Stage Setup",
    "Dance Floor",
    "Projector & Screen",
    "Sound System",
    "Lighting Control",
    "Bridal Room",
    "Catering Kitchen",
    "Valet Parking",
    "Event Coordinator",
    "DJ Setup"
  ],
  eventTypes: [
    "Weddings & Receptions",
    "Corporate Events",
    "Birthday Parties",
    "Anniversary Celebrations",
    "Conferences & Seminars",
    "Product Launches"
  ],
  packages: [
    {
      name: "Silver Package",
      price: "₹1,50,000",
      features: ["4-hour venue rental", "Basic decor", "Standard sound system", "Parking included"]
    },
    {
      name: "Gold Package",
      price: "₹2,50,000",
      features: ["8-hour venue rental", "Premium decor", "Advanced AV equipment", "Catering for 50 guests", "Valet service"]
    },
    {
      name: "Platinum Package",
      price: "₹4,00,000",
      features: ["Full day rental", "Luxury decor", "Professional lighting", "Catering for 100 guests", "Dedicated event manager", "Bridal suite"]
    }
  ]
};

export const AMENITIES = [
  { 
    icon: "Wifi", 
    title: "High-Speed WiFi", 
    desc: "Complimentary fiber internet throughout the property with speeds up to 500 Mbps.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop"
  },
  { 
    icon: "Car", 
    title: "Valet Parking", 
    desc: "Secure, on-site parking with professional valet service available 24/7.",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop"
  },
  { 
    icon: "Utensils", 
    title: "Fine Dining", 
    desc: "Award-winning restaurant serving authentic local and international cuisine.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop"
  },
  { 
    icon: "Coffee", 
    title: "24/7 Room Service", 
    desc: "Gourmet meals and beverages delivered to your room at any hour of the day.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop"
  },
  { 
    icon: "Sparkles", 
    title: "Spa & Wellness", 
    desc: "Rejuvenating spa treatments, massages, and wellness therapies available.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
  },
  { 
    icon: "Clock", 
    title: "Concierge Service", 
    desc: "Personalized assistance for travel arrangements, bookings, and local recommendations.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Shreya Kapoor",
    date: "Jan 2026",
    text: "True to its name, the place has a beautiful ambience. The food was delicious and the stay was very comfortable. The hospitality of the staff was very impressive.",
    rating: 5
  },
  {
    id: 2,
    name: "Rohit Arora",
    date: "Dec 2025",
    text: "The Ambience Hotel went above and beyond! Everything about our stay was flawless, from the friendly greeting at check-in to the spotless accommodation.",
    rating: 5
  },
  {
    id: 3,
    name: "Dinesh Sharma",
    date: "Oct 2025",
    text: "The rooms are thoughtfully designed, complemented by professional hospitality and courteous staff. A lavish breakfast is served with a warm smile.",
    rating: 5
  },
  {
    id: 4,
    name: "Priya Sharma",
    date: "Dec 2025",
    text: "Celebrated our anniversary here and it was magical. The staff arranged a beautiful surprise for us. Will definitely return!",
    rating: 5
  },
  {
    id: 5,
    name: "Amit Verma",
    date: "Nov 2025",
    text: "Excellent service and very clean rooms. The staff was attentive and helped us plan local sightseeing. Highly recommended.",
    rating: 5
  },
  {
    id: 6,
    name: "Sneha Gupta",
    date: "Oct 2025",
    text: "Loved the breakfast spread and the cozy ambience. The location is convenient and the rooms are very comfortable.",
    rating: 5
  },
  {
    id: 7,
    name: "Vikram Singh",
    date: "Sep 2025",
    text: "Great value for money. The staff went out of their way to make our stay pleasant. Will stay again on our next trip.",
    rating: 5
  },
  {
    id: 8,
    name: "Neha Kapoor",
    date: "Aug 2025",
    text: "Spotless rooms, delicious food, and a welcoming team. The ambience truly lives up to its name.",
    rating: 5
  },
  {
    id: 9,
    name: "Rajesh Patel",
    date: "Jul 2025",
    text: "Perfect for both business and leisure. Fast check-in and very helpful staff. The in-house dining was fantastic.",
    rating: 5
  },
  {
    id: 10,
    name: "Kavita Rao",
    date: "Jun 2025",
    text: "A delightful stay with attention to every detail. The rooms were spotless and the service was exceptional.",
    rating: 5
  }
];

export const GALLERY_IMAGES = [
  { src: hero1, category: "Interior", title: "Grand Lobby" },
  { src: hero2, category: "Rooms", title: "Super Deluxe Room" },
  { src: hero3, category: "Events", title: "Banquet" },
  { src: hero4, category: "Rooms", title: "Deluxe Room" },
  { src: d3, category: "Rooms", title: "Deluxe Room" },
  { src: Restaurantbest, category: "Dinning", title: "Restaurant" },
  { src: toplobby, category: "Interior", title: "Lobby" },
  { src: banner, category: "Exterior", title: "Banner" },
  { src: sd3, category: "Rooms", title: "Deluxe Room" },
  { src: aminities, category: "Amenities", title: "Wellness" },
  { src: b2, category: "Events", title: "Banquet" },
  { src: d2, category: "Restroom", title: "Washroom" },
  { src: b3, category: "Events", title: "Banquet" },
  { src: b4, category: "Events", title: "Banquet" },
  { src: Restaurant, category: "Dinning", title: "Restaurant" }
];

export const NEARBY_ATTRACTIONS = [
  {
    name: "Sukhna Lake",
    distance: "8 km",
    description: "A beautiful man-made lake perfect for evening walks and boating.",
    image: sukhnalake
  },
  {
    name: "Rock Garden",
    distance: "10 km",
    description: "Unique sculpture garden created from industrial and home waste.",
    image: rockgarden
  },
  {
    name: "Rose Garden",
    distance: "9 km",
    description: "Asia's largest rose garden with over 50,000 rose bushes.",
    image: rosegarden
  },
  {
    name: "Elante Mall",
    distance: "6 km",
    description: "Premium shopping destination with international brands.",
    image: elantemall
  }                   
];
