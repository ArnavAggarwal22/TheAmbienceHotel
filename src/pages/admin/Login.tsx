import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
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

            <div className="space-y-3 text-sm font-medium md:text-base">
              <p>Review reservation activity.</p>
              <p>Manage room availability.</p>
              <p>Keep your property workflow in one place.</p>
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
                <form className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@theambiencehotel.com"
                      className="border-white/10 bg-slate-800 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="border-white/10 bg-slate-800 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400">
                    Sign In
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
