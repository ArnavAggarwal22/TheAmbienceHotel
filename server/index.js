require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const ROOMS_FILE = path.join(DATA_DIR, 'rooms.json');
const CAL_FILE = path.join(DATA_DIR, 'calendar.json');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'arnavaggarwal3095@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'HiEveryone1';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'dev_secret';

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return null; }
}
function writeJSON(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

// ensure data files
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(ROOMS_FILE)) writeJSON(ROOMS_FILE, []);
if (!fs.existsSync(CAL_FILE)) writeJSON(CAL_FILE, { rates: {} });

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
  res.json(rooms);
});

app.get('/rooms/:id', verifyToken, (req, res) => {
  const rooms = readJSON(ROOMS_FILE) || [];
  const r = rooms.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({});
  res.json(r);
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
