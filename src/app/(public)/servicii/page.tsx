'use client';

import { motion } from 'framer-motion';
import { 
  Calculator, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  FileText, 
  Briefcase, 
  PieChart, 
  Scale 
} from 'lucide-react';
import { services as staticServices } from '@/src/lib/data';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { getSiteContent } from '@/src/lib/actions';
import { useEffect, useState } from 'react';

const iconMap: any = {
  'Contabilitate Generală': Calculator,
  'Consultanță Fiscală CCF': ShieldCheck,
  'Salarizare & HR': Users,
  'Analiză și Strategie': TrendingUp,
  'Audit Financiar': FileText,
  'Înființări Firme': Briefcase,
};

const colorMap: any = {
  'Contabilitate Generală': 'bg-blue-500/10 text-blue-600',
  'Consultanță Fiscală CCF': 'bg-indigo-500/10 text-indigo-600',
  'Salarizare & HR': 'bg-cyan-500/10 text-cyan-600',
  'Analiză și Strategie': 'bg-emerald-500/10 text-emerald-600',
  'Audit Financiar': 'bg-orange-500/10 text-orange-600',
  'Înființări Firme': 'bg-purple-500/10 text-purple-600',
};

export default function Servicii() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getSiteContent().then(res => {
      if (res.success && res.content.services) {
        setServices(res.content.services);
      } else {
        setServices(staticServices);
      }
    });
  }, []);

  return (
    <main className="pt-32 pb-24 bg-ice/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-royal font-bold tracking-[0.2em] uppercase text-sm"
          >
            Serviciile Noastre
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-navy leading-none tracking-tighter"
          >
            Expertiză Completă <br /> pentru <span className="text-royal">Afacerea Ta.</span>
          </motion.h1>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto italic">
            Oferim soluții integrate de contabilitate, consultanță fiscală și resurse umane, adaptate nevoilor specifice fiecărui client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.title] || Briefcase;
            const colorClass = colorMap[service.title] || 'bg-slate-500/10 text-slate-600';
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-royal/5 hover:shadow-royal/10 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4 uppercase tracking-tight">{service.title}</h3>
                <p className="text-navy/60 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {(service.details || []).map((detail: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-medium text-navy/80">
                      <div className="w-1.5 h-1.5 bg-royal rounded-full mt-1.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 bg-navy rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Ai nevoie de un audit <br /> sau o ofertă personalizată?</h2>
            <p className="text-blue-100/60 max-w-xl mx-auto text-lg italic">
              Echipa noastră de experți CCF este pregătită să îți ofere cele mai bune soluții pentru stabilitatea financiară a companiei tale.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact" 
                className="bg-white text-navy px-10 py-4 rounded-full font-bold hover:bg-royal hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
              >
                Solicită Consultanță Gratuită
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
