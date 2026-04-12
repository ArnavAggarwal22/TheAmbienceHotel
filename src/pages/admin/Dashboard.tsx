import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Room = {
  id: string;
  name: string;
  basePrice: number;
  [key: string]: any;
};

type Stats = {
  totalRooms: number;
  soldOutDates: string[];
  upcomingAvailability: Array<{ id: string; name: string; available: boolean }>;
};

type CalendarData = {
  rates: Record<string, any>;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [newRoomPrice, setNewRoomPrice] = useState('');
  const [calendarDate, setCalendarDate] = useState('');
  const [calendarPrice, setCalendarPrice] = useState('');
  const [calendarRoomsLeft, setCalendarRoomsLeft] = useState('');
  const [calendarSoldOut, setCalendarSoldOut] = useState(false);
  const apiUrl = import.meta.env.VITE_ADMIN_API_URL || 'https://theambiencehotel.onrender.com';

  const fetchDashboardData = async (token: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [roomsRes, statsRes, calendarRes] = await Promise.all([
        fetch(`${apiUrl}/rooms`, { headers }),
        fetch(`${apiUrl}/stats`, { headers }),
        fetch(`${apiUrl}/calendar`, { headers }),
      ]);

      if (roomsRes.status === 401 || statsRes.status === 401 || calendarRes.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
        return;
      }

      if (!roomsRes.ok || !statsRes.ok || !calendarRes.ok) {
        const roomsError = await roomsRes.text();
        const statsError = await statsRes.text();
        const calendarError = await calendarRes.text();
        setError(`Unable to load dashboard data: ${roomsError || statsError || calendarError}`);
        return;
      }

      setRooms(await roomsRes.json());
      setStats(await statsRes.json());
      setCalendar(await calendarRes.json());
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchDashboardData(token);
  }, [navigate]);

  const refreshDashboard = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setLoading(true);
    await fetchDashboardData(token);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleUpdateRoom = async () => {
    if (!selectedRoomId || !newRoomPrice) {
      setError('Select a room and enter a new price.');
      return;
    }

    const price = Number(newRoomPrice);
    if (Number.isNaN(price) || price <= 0) {
      setError('Enter a valid price.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/rooms/update`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedRoomId, basePrice: price }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update room.');
      } else {
        setMessage('Room updated successfully.');
        setError('');
        setNewRoomPrice('');
        await refreshDashboard();
      }
    } catch (err) {
      console.error(err);
      setError('Unable to update room.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCalendar = async () => {
    if (!calendarDate || !calendarPrice) {
      setError('Enter a date and price for calendar update.');
      return;
    }

    const price = Number(calendarPrice);
    const roomsLeft = calendarRoomsLeft ? Number(calendarRoomsLeft) : undefined;

    if (Number.isNaN(price) || price <= 0) {
      setError('Enter a valid calendar price.');
      return;
    }
    if (calendarRoomsLeft && Number.isNaN(roomsLeft)) {
      setError('Enter a valid rooms left number.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/calendar/update`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: calendarDate,
          price,
          roomsLeft,
          soldOut: calendarSoldOut,
          applyToAll: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update calendar.');
      } else {
        setMessage('Calendar updated successfully.');
        setError('');
        setCalendarPrice('');
        setCalendarRoomsLeft('');
        setCalendarSoldOut(false);
        await refreshDashboard();
      }
    } catch (err) {
      console.error(err);
      setError('Unable to update calendar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 rounded-[2rem] bg-slate-900/90 p-8 shadow-2xl shadow-black/30 ring-1 ring-white/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">Admin Dashboard 🚀</h1>
              <p className="mt-3 text-sm text-slate-400">
                Live hotel admin data from the backend. Rooms, stats, and calendar are loaded from the Render API.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Logout
            </button>
          </div>

          {message && (
            <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-100">
              {message}
            </div>
          )}
          {error && (
            <div className="rounded-3xl bg-rose-500/10 border border-rose-500/20 p-4 text-rose-100">
              {error}
            </div>
          )}

          {loading ? (
            <div className="rounded-3xl bg-slate-950/80 p-8 text-center text-slate-300">
              Loading dashboard data...
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-4">
                <div className="rounded-3xl bg-slate-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Total rooms</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{stats?.totalRooms ?? rooms.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Upcoming availability</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{stats?.upcomingAvailability.length ?? 0}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Sold out dates</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{stats?.soldOutDates.length ?? 0}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Calendar entries</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{Object.keys(calendar?.rates || {}).length}</p>
                </div>
              </div>

              <section className="mt-10 rounded-[2rem] bg-slate-950/80 p-6">
                <h2 className="text-2xl font-semibold text-white">Rooms</h2>
                <div className="mt-6 space-y-4">
                  {rooms.length === 0 ? (
                    <p className="text-slate-400">No rooms found.</p>
                  ) : (
                    rooms.map((room) => (
                      <div key={room.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-sm shadow-black/10">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-lg font-semibold text-white">{room.name}</p>
                            <p className="text-sm text-slate-500">ID: {room.id}</p>
                          </div>
                          <p className="text-xl font-semibold text-amber-400">₹{room.basePrice}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="mt-10 rounded-[2rem] bg-slate-950/80 p-6">
                <h2 className="text-2xl font-semibold text-white">Edit Room Price</h2>
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <label className="text-sm font-medium text-slate-300">Room</label>
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                    >
                      <option value="">Select room</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <label className="text-sm font-medium text-slate-300">New price</label>
                    <input
                      value={newRoomPrice}
                      onChange={(e) => setNewRoomPrice(e.target.value)}
                      type="number"
                      min="0"
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                      placeholder="Enter new price"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleUpdateRoom}
                    className="rounded-3xl bg-amber-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                  >
                    Update price
                  </button>
                </div>
              </section>

              <section className="mt-10 rounded-[2rem] bg-slate-950/80 p-6">
                <h2 className="text-2xl font-semibold text-white">Update Calendar Pricing</h2>
                <div className="mt-6 grid gap-4 lg:grid-cols-4">
                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <label className="text-sm font-medium text-slate-300">Date</label>
                    <input
                      type="date"
                      value={calendarDate}
                      onChange={(e) => setCalendarDate(e.target.value)}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <label className="text-sm font-medium text-slate-300">Price</label>
                    <input
                      type="number"
                      min="0"
                      value={calendarPrice}
                      onChange={(e) => setCalendarPrice(e.target.value)}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                      placeholder="₹"
                    />
                  </div>

                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <label className="text-sm font-medium text-slate-300">Rooms left</label>
                    <input
                      type="number"
                      min="0"
                      value={calendarRoomsLeft}
                      onChange={(e) => setCalendarRoomsLeft(e.target.value)}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <label className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <input
                        type="checkbox"
                        checked={calendarSoldOut}
                        onChange={(e) => setCalendarSoldOut(e.target.checked)}
                        className="h-5 w-5 rounded border-white/10 bg-slate-950 text-amber-400"
                      />
                      Sold out
                    </label>
                    <button
                      type="button"
                      onClick={handleUpdateCalendar}
                      className="mt-6 w-full rounded-3xl bg-amber-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                    >
                      Update calendar
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
