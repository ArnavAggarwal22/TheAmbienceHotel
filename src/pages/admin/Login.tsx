import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_ADMIN_API_URL || 'https://theambiencehotel.onrender.com';

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${apiUrl}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ store token
        localStorage.setItem("admin_token", data.token);

        alert("Login successful ✅");

        // 👉 redirect
        navigate("/admin/dashboard");
      } else {
        alert(data.error || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur md:grid-cols-[1.15fr_0.85fr]">

          <section className="flex flex-col justify-between bg-gradient-to-br from-amber-500 via-amber-400 to-orange-500 p-8 text-slate-950 md:p-12">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em]">
                The Ambience Hotel
              </p>
              <h1 className="max-w-md text-4xl font-serif font-bold leading-tight md:text-5xl">
                Admin access for bookings, rooms, and hotel operations.
              </h1>
            </div>
          </section>

          <section className="flex items-center p-6 md:p-10">
            <Card className="w-full border-white/10 bg-slate-900/90 text-white shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
                <CardDescription className="text-slate-300">
                  Sign in to access the hotel admin dashboard.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-amber-500 text-slate-950">
                    {loading ? "Logging in..." : "Sign In"}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Login;
