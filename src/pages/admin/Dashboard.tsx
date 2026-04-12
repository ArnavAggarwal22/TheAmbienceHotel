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

const Dashboard = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const [roomsRes, statsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_ADMIN_API_URL}/rooms`, { headers }),
          fetch(`${import.meta.env.VITE_ADMIN_API_URL}/stats`, { headers }),
        ]);

        if (roomsRes.status === 401 || statsRes.status === 401) {
          localStorage.removeItem('admin_token');
          navigate('/admin/login');
          return;
        }

        if (!roomsRes.ok || !statsRes.ok) {
          const roomsError = await roomsRes.text();
          const statsError = await statsRes.text();
          setError(`Unable to load dashboard data: ${roomsError || statsError}`);
          return;
        }

        const roomsData = await roomsRes.json();
        const statsData = await statsRes.json();

        setRooms(roomsData || []);
        setStats(statsData || null);
      } catch (err) {
        console.error(err);
        setError('Unable to connect to backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  console.log('Dashboard loaded');

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-slate-900/90 p-8 shadow-2xl shadow-black/30 ring-1 ring-white/5">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white">Admin Dashboard 🚀</h1>
            <p className="mt-3 text-sm text-slate-400">
              Live hotel admin data from the backend. Rooms and stats are loaded from the Render API.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-slate-950/80 p-8 text-center text-slate-300">
              Loading dashboard data...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-rose-500/10 border border-rose-500/20 p-6 text-rose-100">
              {error}
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-3">
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
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;