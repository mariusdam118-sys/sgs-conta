'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Submit error:', err);
      setError('A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-royal/10 text-center flex flex-col items-center gap-6 border border-slate-100"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="text-royal w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-navy mb-2 uppercase tracking-tight">Mesaj Trimis!</h3>
          <p className="text-navy/60 italic">
            Vă mulțumim pentru interes. Un consultant vă va contacta în cel mai scurt timp posibil.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="bg-navy text-white px-8 py-3 rounded-full font-semibold hover:bg-royal transition-all"
        >
          Trimite alt mesaj
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-royal/10 border border-slate-100">
      <h3 className="text-3xl font-black text-navy mb-8 uppercase tracking-tighter">Trimite-ne un mesaj</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Nume Complet</label>
            <input
              required
              type="text"
              placeholder="Ex: Ion Popescu"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all placeholder:text-navy/20 text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Email</label>
            <input
              required
              type="email"
              placeholder="popescu@companie.ro"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all placeholder:text-navy/20 text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Telefon</label>
          <input
            required
            type="tel"
            placeholder="+40 7XX XXX XXX"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all placeholder:text-navy/20 text-sm"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Mesaj</label>
          <textarea
            required
            rows={4}
            placeholder="Cum vă putem ajuta?"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all placeholder:text-navy/20 text-sm resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-navy text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-royal transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-navy/10"
        >
          {loading ? 'Se trimite...' : 'Trimite Solicitarea'}
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
