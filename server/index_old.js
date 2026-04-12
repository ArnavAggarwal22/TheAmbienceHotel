require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');

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

const DATA_DIR = path.join(__dirname, 'data');
const ROOMS_FILE = path.join(DATA_DIR, 'rooms.json');
const CAL_FILE = path.join(DATA_DIR, 'calendar.json');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'dev_secret';

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return null; }
}
function writeJSON(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

// ensure data files
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(ROOMS_FILE)) writeJSON(ROOMS_FILE, []);
if (!fs.existsSync(CAL_FILE)) writeJSON(CAL_FILE, { rates: {} });

// Public endpoints (no auth required)
app.get('/public/rooms', (req, res) => {
  const rooms = readJSON(ROOMS_FILE) || [];
  // Convert basePrice to frontend format
  const formattedRooms = rooms.map(room => ({
    ...room,
    price: `₹${room.basePrice.toLocaleString('en-IN')}`,
    priceValue: room.basePrice
  }));
  res.json(formattedRooms);
});

app.get('/public/calendar', (req, res) => {
  const calendar = readJSON(CAL_FILE) || { rates: {} };
  res.json(calendar);
});

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

// Rooms
app.get('/rooms', verifyToken, (req, res) => {
  const rooms = readJSON(ROOMS_FILE) || [];
  // Convert basePrice to frontend format
  const formattedRooms = rooms.map(room => ({
    ...room,
    price: `₹${room.basePrice.toLocaleString('en-IN')}`,
    priceValue: room.basePrice
  }));
  res.json(formattedRooms);
});

app.get('/rooms/:id', verifyToken, (req, res) => {
  const rooms = readJSON(ROOMS_FILE) || [];
  const r = rooms.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({});
  // Convert basePrice to frontend format
  const formattedRoom = {
    ...r,
    price: `₹${r.basePrice.toLocaleString('en-IN')}`,
    priceValue: r.basePrice
  };
  res.json(formattedRoom);
});

app.post('/rooms', verifyToken, (req, res) => {
  const rooms = readJSON(ROOMS_FILE) || [];
  const room = req.body;
  if (!room.id) {
    room.id = String(Date.now()) + '-' + Math.floor(Math.random()*10000);
    rooms.push(room);
    writeJSON(ROOMS_FILE, rooms);
    return res.json({ ok: true, id: room.id });
  }
  const idx = rooms.findIndex(r => r.id === room.id);
  if (idx >= 0) rooms[idx] = { ...rooms[idx], ...room };
  else rooms.push(room);
  writeJSON(ROOMS_FILE, rooms);
  res.json({ ok: true });
});

app.post('/rooms/update', verifyToken, (req, res) => {
  const { id, basePrice, name } = req.body;
  if (!id) return res.status(400).json({ error: 'Room id is required' });
  const rooms = readJSON(ROOMS_FILE) || [];
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Room not found' });

  // Update the room
  rooms[idx] = {
    ...rooms[idx],
    ...(basePrice !== undefined ? { basePrice: Number(basePrice) } : {}),
    ...(name !== undefined ? { name } : {}),
  };

  writeJSON(ROOMS_FILE, rooms);

  // Return formatted room data
  const updatedRoom = rooms[idx];
  const formattedRoom = {
    ...updatedRoom,
    price: `₹${updatedRoom.basePrice.toLocaleString('en-IN')}`,
    priceValue: updatedRoom.basePrice
  };

  res.json({ ok: true, room: formattedRoom });
});

app.delete('/rooms/:id', verifyToken, (req, res) => {
  const rooms = (readJSON(ROOMS_FILE) || []).filter(r => r.id !== req.params.id);
  writeJSON(ROOMS_FILE, rooms);
  res.json({ ok: true });
});

// Stats
app.get('/stats', verifyToken, (req, res) => {
  const rooms = readJSON(ROOMS_FILE) || [];
  res.json({ totalRooms: rooms.length, soldOutDates: [], upcomingAvailability: rooms.map(r => ({ id: r.id, name: r.name, available: true })) });
});

app.get('/calendar', verifyToken, (req, res) => {
  const calendar = readJSON(CAL_FILE) || { rates: {} };
  res.json(calendar);
});

app.post('/calendar/update', verifyToken, (req, res) => {
  const { date, price, roomsLeft, soldOut, applyToAll, roomId } = req.body;
  if (!date) return res.status(400).json({ error: 'Date is required' });

  const cal = readJSON(CAL_FILE) || { rates: {} };
  const day = cal.rates[date] || {};

  const updates = {};
  if (price !== undefined) updates.price = price;
  if (roomsLeft !== undefined) updates.roomsLeft = roomsLeft;
  if (soldOut !== undefined) updates.soldOut = soldOut;

  if (applyToAll) {
    day._applyAll = {
      ...day._applyAll,
      ...updates,
    };
  } else if (roomId) {
    day[roomId] = {
      ...day[roomId],
      ...updates,
    };
  } else {
    return res.status(400).json({ error: 'roomId or applyToAll is required' });
  }

  cal.rates[date] = day;
  writeJSON(CAL_FILE, cal);
  res.json({ ok: true, rate: day });
});

// Calendar bulk update
app.post('/calendar/bulk', verifyToken, (req, res) => {
  // payload: { from, to, rooms: { roomId: { price?, soldOut?, roomsLeft? } }, applyToAll?: boolean }
  const body = req.body;
  const cal = readJSON(CAL_FILE) || { rates: {} };
  const from = new Date(body.from);
  const to = new Date(body.to);
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return res.status(400).json({ error: 'Invalid dates' });
  for (let d = new Date(from); d <= to; d.setDate(d.getDate()+1)) {
    const key = d.toISOString().slice(0,10);
    cal.rates[key] = cal.rates[key] || {};
    if (body.applyToAll) {
      // set same rule for all rooms
      cal.rates[key]._applyAll = body.rooms || {};
    } else {
      Object.keys(body.rooms || {}).forEach(roomId => {
        cal.rates[key][roomId] = { ...(cal.rates[key][roomId]||{}), ...body.rooms[roomId] };
      });
    }
  }
  writeJSON(CAL_FILE, cal);
  res.json({ ok: true });
});

// File upload (image)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10*1024*1024 } });

app.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file' });
    // If CLOUDINARY_URL present, attempt to upload there
    if (process.env.CLOUDINARY_URL) {
      const cloudinary = require('cloudinary').v2;
      cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
      const tmpPath = path.join(__dirname, 'data', 'tmp-' + Date.now() + '.bin');
      fs.writeFileSync(tmpPath, file.buffer);
      const result = await cloudinary.uploader.upload(tmpPath, { folder: 'hotel-admin' });
      fs.unlinkSync(tmpPath);
      return res.json({ url: result.secure_url });
    }
    // fallback: return data url
    const base64 = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64}`;
    res.json({ url: dataUrl });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Upload failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Admin backend listening on', PORT));
