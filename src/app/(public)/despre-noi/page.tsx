'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  CheckCircle, 
  Clock, 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  Heart 
} from 'lucide-react';
import Image from 'next/image';
import { getSiteContent } from '@/src/lib/actions';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Ani Experiență', value: '15+', icon: Clock },
  { label: 'Clienți Activi', value: '100+', icon: Users },
  { label: 'Experți CCF', value: '3', icon: ShieldCheck },
  { label: 'Rata Retenție', value: '98%', icon: Heart },
];

const values = [
  {
    title: 'Integritate',
    description: 'Ne ghidăm după principii etice solide și transparență totală în toate interacțiunile noastre.',
    icon: ShieldCheck,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'Profesionalism',
    description: 'Expertiza noastră autorizată CCF garantează soluții corecte și conforme cu legislația actuală.',
    icon: Landmark,
    color: 'bg-indigo-500/10 text-indigo-600',
  },
  {
    title: 'Inovație',
    description: 'Utilizăm cele mai noi instrumente digitale pentru a eficientiza procesele contabile.',
    icon: TrendingUp,
    color: 'bg-cyan-500/10 text-cyan-600',
  },
];

export default function DespreNoi() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(res => {
      if (res.success) setContent(res.content.about);
    });
  }, []);

  return (
    <main className="pt-32 pb-24 bg-ice/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-royal font-bold tracking-[0.2em] uppercase text-sm"
            >
              Cine Suntem
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-navy leading-none tracking-tighter"
            >
              {content?.hero_title || 'Partenerul Tău de Încredere în Succes Financiar.'}
            </motion.h1>
            <p className="text-navy/60 text-lg leading-relaxed max-w-xl italic">
              {content?.mission_desc || 'SGS Conta nu este doar o firmă de contabilitate; suntem partenerii strategici ai afacerii tale. Cu o experiență de peste 15 ani în domeniu și o echipă de experți autorizați CCF, ne dedicăm succesului și stabilității tale financiare.'}
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden flex items-center justify-center text-navy/20 font-bold text-xs uppercase tracking-widest">
                    P{i}
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold text-navy flex flex-col justify-center">
                <span>Echipa noastră de experți</span>
                <span className="text-royal/60 font-medium">Autorizați CCF & CECCAR</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-navy rounded-[3rem] overflow-hidden relative shadow-2xl"
            >
              {/* Placeholder for About Image */}
              <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black text-8xl uppercase tracking-tighter select-none rotate-12">
                SGS CONTA
              </div>
              <div className="absolute inset-0 bg-linear-to-tr from-navy to-royal/20 mix-blend-overlay" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20">
                <p className="text-white text-lg font-bold italic leading-tight">
                  "Excelența în contabilitate este fundamentul oricărei afaceri de succes."
                </p>
              </div>
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-royal/10 blur-[100px] rounded-full" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 blur-[100px] rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-royal/5 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-royal">
                <stat.icon size={24} />
              </div>
              <div className="text-4xl font-black text-navy tracking-tighter">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-navy/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center mb-20 space-y-4">
            <h4 className="text-royal font-bold tracking-[0.2em] uppercase text-sm">Valorile Noastre</h4>
            <h2 className="text-4xl md:text-5xl font-black text-navy uppercase tracking-tighter">Ce Ne Definește</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-royal/5 hover:shadow-royal/10 transition-all text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform`}>
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4 uppercase tracking-tight">{value.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed italic">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-navy rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Misiunea Noastră</h2>
              <p className="text-blue-100/60 text-lg italic leading-relaxed">
                Misiunea SGS Conta este de a oferi claritate și siguranță financiară clienților noștri. Ne propunem să fim pilonul pe care afacerea ta se sprijină pentru a crește sănătos și sustenabil.
              </p>
            </div>
            <div className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-royal rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Standarde Inalte</h4>
                  <p className="text-white/40 text-sm italic">Respectăm cele mai stricte standarde de audit și raportare financiară.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-royal rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Echipa Dedicată</h4>
                  <p className="text-white/40 text-sm italic">Fiecare client beneficiază de atenție personalizată și expertiză directă.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
