require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/theambiencehotel')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Room Schema
const roomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  size: String,
  guests: String,
  maxGuests: Number,
  image: String,
  gallery: [String],
  features: [String],
  description: String,
  amenities: [String],
  bedType: String,
  view: String,
  rating: Number,
  reviews: Number
});

const Room = mongoose.model('Room', roomSchema);

// Calendar Schema
const calendarSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  price: Number,
  roomsLeft: Number,
  soldOut: Boolean,
  roomId: String
});

const Calendar = mongoose.model('Calendar', calendarSchema);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@theambiencehotel.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Auth
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid token' });
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
}

// Public endpoints (no auth required)
app.get('/public/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    // Convert basePrice to frontend format
    const formattedRooms = rooms.map(room => ({
      id: room.id,
      name: room.name,
      price: `₹${room.basePrice.toLocaleString('en-IN')}`,
      priceValue: room.basePrice,
      size: room.size,
      guests: room.guests,
      maxGuests: room.maxGuests,
      image: room.image,
      gallery: room.gallery,
      features: room.features,
      description: room.description,
      amenities: room.amenities,
      bedType: room.bedType,
      view: room.view,
      rating: room.rating,
      reviews: room.reviews
    }));
    res.json(formattedRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

app.get('/public/calendar', async (req, res) => {
  try {
    const calendar = await Calendar.find({});
    const rates = {};
    calendar.forEach(entry => {
      rates[entry.date] = {
        price: entry.price,
        roomsLeft: entry.roomsLeft,
        soldOut: entry.soldOut
      };
    });
    res.json({ rates });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

// Admin endpoints (require auth)
app.get('/rooms', verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find({});
    // Convert basePrice to frontend format
    const formattedRooms = rooms.map(room => ({
      id: room.id,
      name: room.name,
      price: `₹${room.basePrice.toLocaleString('en-IN')}`,
      priceValue: room.basePrice,
      size: room.size,
      guests: room.guests,
      maxGuests: room.maxGuests,
      image: room.image,
      gallery: room.gallery,
      features: room.features,
      description: room.description,
      amenities: room.amenities,
      bedType: room.bedType,
      view: room.view,
      rating: room.rating,
      reviews: room.reviews
    }));
    res.json(formattedRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

app.post('/rooms/update', verifyToken, async (req, res) => {
  try {
    const { id, basePrice, name } = req.body;
    if (!id) return res.status(400).json({ error: 'Room id is required' });

    const updateData = {};
    if (basePrice !== undefined) updateData.basePrice = Number(basePrice);
    if (name !== undefined) updateData.name = name;

    const room = await Room.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Return formatted room data
    const formattedRoom = {
      id: room.id,
      name: room.name,
      price: `₹${room.basePrice.toLocaleString('en-IN')}`,
      priceValue: room.basePrice,
      size: room.size,
      guests: room.guests,
      maxGuests: room.maxGuests,
      image: room.image,
      gallery: room.gallery,
      features: room.features,
      description: room.description,
      amenities: room.amenities,
      bedType: room.bedType,
      view: room.view,
      rating: room.rating,
      reviews: room.reviews
    };

    res.json({ ok: true, room: formattedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
});

app.get('/calendar', verifyToken, async (req, res) => {
  try {
    const calendar = await Calendar.find({});
    const rates = {};
    calendar.forEach(entry => {
      rates[entry.date] = {
        price: entry.price,
        roomsLeft: entry.roomsLeft,
        soldOut: entry.soldOut
      };
    });
    res.json({ rates });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

app.post('/calendar/update', verifyToken, async (req, res) => {
  try {
    const { date, price, roomsLeft, soldOut } = req.body;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const updateData = {};
    if (price !== undefined) updateData.price = Number(price);
    if (roomsLeft !== undefined) updateData.roomsLeft = Number(roomsLeft);
    if (soldOut !== undefined) updateData.soldOut = Boolean(soldOut);

    const calendarEntry = await Calendar.findOneAndUpdate(
      { date },
      updateData,
      { upsert: true, new: true }
    );

    res.json({ ok: true, calendar: calendarEntry });
  } catch (error) {
    console.error('Error updating calendar:', error);
    res.status(500).json({ error: 'Failed to update calendar' });
  }
});

app.get('/stats', verifyToken, async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const calendarEntries = await Calendar.find({ soldOut: true });
    const soldOutDates = calendarEntries.map(entry => entry.date);

    res.json({
      totalRooms,
      soldOutDates,
      upcomingAvailability: []
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Seed initial data
async function seedData() {
  try {
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      console.log('Seeding initial room data...');
      const initialRooms = [
        {
          id: "super-deluxe",
          name: "Super Deluxe Room",
          basePrice: 3099,
          size: "200 sq ft",
          guests: "2 Guests",
          maxGuests: 2,
          image: "/assets/sd1.jpeg",
          gallery: ["/assets/sd1.jpeg", "/assets/sd2.jpeg", "/assets/sd3.jpeg"],
          features: ["King Size Bed", "Breakfast Included", "City View", "Smart TV", "Rain Shower"],
          description: "Indulge in the epitome of luxury with our Super Deluxe Room...",
          amenities: ["Air Conditioning", "Mini Bar", "In-Room Safe", "Work Desk", "Coffee/Tea Maker", "Hair Dryer", "Bathrobes & Slippers", "Daily Housekeeping", "Room Service"],
          bedType: "King Size Bed",
          view: "City View",
          rating: 4.9,
          reviews: 128
        },
        {
          id: "deluxe",
          name: "Deluxe Room",
          basePrice: 2799,
          size: "180 sq ft",
          guests: "2 Guests",
          maxGuests: 2,
          image: "/assets/d1.jpeg",
          gallery: ["/assets/d1.jpeg", "/assets/d2.jpeg", "/assets/d3.jpeg"],
          features: ["Queen Size Bed", "Breakfast Included", "City View", "Smart TV"],
          description: "Experience comfort and elegance in our Deluxe Room...",
          amenities: ["Air Conditioning", "In-Room Safe", "Work Desk", "Coffee/Tea Maker", "Hair Dryer", "Daily Housekeeping"],
          bedType: "Queen Size Bed",
          view: "City View",
          rating: 4.7,
          reviews: 95
        }
      ];

      await Room.insertMany(initialRooms);
      console.log('Room data seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Initialize data seeding
seedData();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});