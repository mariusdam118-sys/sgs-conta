'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: resetError } = await supabase.auth.updateUser({
        password: password
      });

      if (resetError) throw resetError;
      setSuccess(true);
      setTimeout(() => router.push('/admin'), 3000);
    } catch (err: any) {
      setError(err.message || 'Eroare la resetarea parolei');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-ice/50">
        <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl text-center space-y-6 border border-gray-100">
          <div className="inline-flex w-16 h-16 bg-green-50 rounded-2xl items-center justify-center">
            <CheckCircle2 className="text-green-500 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Parolă Resetată!</h1>
          <p className="text-navy/60 italic">Veți fi redirecționat către pagina de autentificare în câteva secunde...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-ice/50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-navy rounded-2xl items-center justify-center shadow-2xl shadow-navy/20">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-navy uppercase tracking-tight">Resetare Parolă</h1>
          <p className="text-navy/40 text-sm font-semibold uppercase tracking-widest leading-none">Introduceți noua parolă</p>
        </div>

        <form onSubmit={handleReset} className="bg-white p-10 rounded-[40px] shadow-2xl shadow-royal/10 border border-gray-100 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-navy/40 ml-4">Noua Parolă</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20" />
                <input
                  required
                  type="password"
                  minLength={6}
                  className="w-full bg-ice/50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-navy text-white px-8 py-4 rounded-2xl font-bold hover:bg-royal transition-all disabled:opacity-50 shadow-xl shadow-navy/10 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Actualizează Parola'}
          </button>
        </form>
      </div>
    </main>
  );
}
