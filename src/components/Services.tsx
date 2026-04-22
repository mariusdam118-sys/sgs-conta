'use client';

import { motion } from 'framer-motion';
import { services as staticServices } from '@/src/lib/data';
import { getSiteContent } from '@/src/lib/actions';
import { useEffect, useState } from 'react';
import { Calculator, ShieldCheck, Users, TrendingUp, Briefcase, FileText } from 'lucide-react';

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

export default function Services() {
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
    <section id="servicii" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl space-y-4">
            <h4 className="text-royal font-bold tracking-[0.2em] uppercase text-sm">Expertiză</h4>
            <h2 className="text-4xl md:text-5xl font-black text-navy leading-tight">
              Soluții Contabile <br /> Construite pentru <span className="text-royal">Performanță.</span>
            </h2>
          </div>
          <p className="text-navy/60 max-w-sm md:text-right italic">
            Acoperim tot spectrul financiar pentru a vă permite să vă concentrați exclusiv pe creșterea afacerii.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(0, 4).map((service, index) => {
            const Icon = iconMap[service.title] || Briefcase;
            const colorClass = colorMap[service.title] || 'bg-slate-500/10 text-slate-600';

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[32px] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-royal/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{service.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
