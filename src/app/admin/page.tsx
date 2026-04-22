'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { Landmark, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Eroare la autentificare');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-ice/50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-navy rounded-2xl items-center justify-center shadow-2xl shadow-navy/20">
            <Landmark className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-navy uppercase tracking-tight">Portal Admin</h1>
          <p className="text-navy/40 text-sm font-semibold uppercase tracking-widest leading-none">Acces Restricționat</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] shadow-2xl shadow-royal/10 border border-gray-100 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-navy/40 ml-4">Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20" />
                <input
                  required
                  type="email"
                  className="w-full bg-ice/50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-navy/40 ml-4">Parolă</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20" />
                <input
                  required
                  type="password"
                  className="w-full bg-ice/50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-navy text-white px-8 py-4 rounded-2xl font-bold hover:bg-royal transition-all disabled:opacity-50 shadow-xl shadow-navy/10"
          >
            {loading ? 'Se procesează...' : 'Autentificare'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={async () => {
                if (!email) {
                  setError('Vă rugăm să introduceți adresa de email mai întâi.');
                  return;
                }
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: `${window.location.origin}/admin/reset-password`,
                });
                if (resetError) setError(resetError.message);
                else alert('Un email pentru resetarea parolei a fost trimis.');
              }}
              className="text-xs text-royal font-bold hover:underline"
            >
              Am uitat parola
            </button>
          </div>

          <p className="text-center text-xs text-navy/30 italic">
            Accesul este permis doar personalului autorizat SGS Conta.
          </p>
        </form>
      </div>
    </main>
  );
}
